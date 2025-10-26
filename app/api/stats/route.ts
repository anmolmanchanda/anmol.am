import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

// Real stats from Redis
export async function GET() {
  try {
    // Check if Redis is configured
    if (!process.env['UPSTASH_REDIS_REST_URL'] || !process.env['UPSTASH_REDIS_REST_TOKEN']) {
      return NextResponse.json(
        {
          success: false,
          message: 'Redis not configured'
        },
        { status: 500 }
      )
    }

    const redis = Redis.fromEnv()

    // Get all view count keys
    const viewKeys = await redis.keys('views:*')

    // Get all view counts
    const viewCounts: Record<string, number> = {}
    let totalViews = 0

    for (const key of viewKeys) {
      const count = await redis.get(key)
      const slug = key.replace('views:', '')
      viewCounts[slug] = Number(count) || 0
      totalViews += Number(count) || 0
    }

    // Get keep-alive status
    const keepAlive = await redis.get('system:keepalive')

    // Parse keep-alive data (Upstash Redis auto-parses JSON, so check type first)
    let lastKeepAliveTimestamp = null
    if (keepAlive) {
      try {
        // If it's already an object, use it directly
        if (typeof keepAlive === 'object' && keepAlive !== null) {
          lastKeepAliveTimestamp = (keepAlive as any).timestamp
        } else if (typeof keepAlive === 'string') {
          // If it's a string, parse it
          const parsed = JSON.parse(keepAlive)
          lastKeepAliveTimestamp = parsed.timestamp
        }
      } catch (e) {
        // If parsing fails, just use the raw value as timestamp
        lastKeepAliveTimestamp = keepAlive
      }
    }

    // Sort by views (descending)
    const sortedPages = Object.entries(viewCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([slug, views]) => ({ slug, views }))

    return NextResponse.json({
      success: true,
      stats: {
        totalViews,
        uniquePages: viewKeys.length,
        pages: sortedPages,
        keepAliveActive: !!keepAlive,
        lastKeepAlive: lastKeepAliveTimestamp
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Stats API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch stats',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
