import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

// This endpoint keeps Redis alive by pinging it daily
// Prevents auto-deletion due to inactivity

export async function GET() {
  try {
    // Only run if Redis is configured
    if (!process.env['UPSTASH_REDIS_REST_URL'] || !process.env['UPSTASH_REDIS_REST_TOKEN']) {
      return NextResponse.json(
        {
          success: false,
          message: 'Redis not configured',
          timestamp: new Date().toISOString()
        },
        { status: 200 }
      )
    }

    const redis = Redis.fromEnv()

    // Simple ping to keep database active
    const pingKey = 'system:keepalive'
    const timestamp = new Date().toISOString()

    // Set a key that expires in 48 hours
    await redis.setex(pingKey, 172800, JSON.stringify({
      timestamp,
      message: 'Keep-alive ping'
    }))

    // Verify it worked
    const result = await redis.get(pingKey)

    return NextResponse.json({
      success: true,
      message: 'Redis keep-alive ping successful',
      timestamp,
      verified: !!result
    })

  } catch (error) {
    console.error('Keep-alive ping failed:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Ping failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
