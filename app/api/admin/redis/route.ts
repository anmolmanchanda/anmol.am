import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { verifySession, getSessionFromCookie } from '@/lib/auth'

// Verify admin authentication
async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const cookieHeader = request.headers.get('cookie')
  const token = getSessionFromCookie(cookieHeader)

  if (!token) return false

  const session = await verifySession(token)
  return !!session
}

// GET - List all Redis keys with pagination
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    if (!(await isAuthenticated(request))) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if Redis is configured
    if (!process.env['UPSTASH_REDIS_REST_URL'] || !process.env['UPSTASH_REDIS_REST_TOKEN']) {
      return NextResponse.json(
        { success: false, message: 'Redis not configured' },
        { status: 500 }
      )
    }

    const redis = Redis.fromEnv()
    const { searchParams } = new URL(request.url)
    const pattern = searchParams.get('pattern') || '*'
    const action = searchParams.get('action')

    // Handle different actions
    if (action === 'keys') {
      const keys = await redis.keys(pattern)

      // Get details for each key
      const keyDetails = await Promise.all(
        keys.slice(0, 100).map(async (key) => {
          const value = await redis.get(key)
          const ttl = await redis.ttl(key)

          return {
            key,
            type: typeof value,
            size: JSON.stringify(value).length,
            ttl: ttl === -1 ? 'No expiration' : `${ttl}s`,
            preview: typeof value === 'string'
              ? value.substring(0, 100)
              : JSON.stringify(value).substring(0, 100)
          }
        })
      )

      return NextResponse.json({
        success: true,
        keys: keyDetails,
        total: keys.length,
        showing: Math.min(keys.length, 100)
      })
    }

    if (action === 'stats') {
      // Get Redis statistics
      const allKeys = await redis.keys('*')
      const viewKeys = await redis.keys('views:*')
      const cooldownKeys = await redis.keys('view_cooldown:*')
      const analyticsKeys = await redis.keys('analytics:*')
      const systemKeys = await redis.keys('system:*')

      // Calculate total size (approximate)
      let totalSize = 0
      for (const key of allKeys.slice(0, 100)) {
        const value = await redis.get(key)
        totalSize += JSON.stringify(value).length
      }

      return NextResponse.json({
        success: true,
        stats: {
          totalKeys: allKeys.length,
          categories: {
            views: viewKeys.length,
            cooldowns: cooldownKeys.length,
            analytics: analyticsKeys.length,
            system: systemKeys.length,
            other: allKeys.length - viewKeys.length - cooldownKeys.length - analyticsKeys.length - systemKeys.length
          },
          approximateSize: totalSize,
          sizeFormatted: `${(totalSize / 1024).toFixed(2)} KB`
        }
      })
    }

    // Default: return basic info
    const keys = await redis.keys('*')
    return NextResponse.json({
      success: true,
      keyCount: keys.length
    })

  } catch (error) {
    console.error('Redis API error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch Redis data', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// DELETE - Clear Redis cache (all or by pattern)
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    if (!(await isAuthenticated(request))) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if Redis is configured
    if (!process.env['UPSTASH_REDIS_REST_URL'] || !process.env['UPSTASH_REDIS_REST_TOKEN']) {
      return NextResponse.json(
        { success: false, message: 'Redis not configured' },
        { status: 500 }
      )
    }

    const redis = Redis.fromEnv()
    const { searchParams } = new URL(request.url)
    const pattern = searchParams.get('pattern') || searchParams.get('key')

    if (!pattern) {
      return NextResponse.json(
        { success: false, message: 'Pattern or key required' },
        { status: 400 }
      )
    }

    // If it's a specific key, delete it
    if (!pattern.includes('*')) {
      await redis.del(pattern)
      return NextResponse.json({
        success: true,
        message: `Deleted key: ${pattern}`,
        deleted: 1
      })
    }

    // If it's a pattern, delete all matching keys
    const keys = await redis.keys(pattern)

    if (keys.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No keys matched the pattern',
        deleted: 0
      })
    }

    // Delete all matching keys
    for (const key of keys) {
      await redis.del(key)
    }

    return NextResponse.json({
      success: true,
      message: `Deleted ${keys.length} keys matching pattern: ${pattern}`,
      deleted: keys.length
    })

  } catch (error) {
    console.error('Redis delete error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete Redis keys', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
