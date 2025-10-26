import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

export async function GET() {
  try {
    // Check if Redis is configured
    if (!process.env['UPSTASH_REDIS_REST_URL'] || !process.env['UPSTASH_REDIS_REST_TOKEN']) {
      // Fallback to basic analytics
      return NextResponse.json({
        totalVisits: 0,
        uniqueVisitors: 0,
        onlineNow: 1,
        bounceRate: 0,
        avgSession: '0:00'
      })
    }

    const redis = Redis.fromEnv()

    // Get all view count keys
    const viewKeys = await redis.keys('views:*')

    // Calculate total views
    let totalViews = 0
    for (const key of viewKeys) {
      const count = await redis.get(key)
      totalViews += Number(count) || 0
    }

    const analytics = {
      totalVisits: totalViews,
      uniquePages: viewKeys.length, // Unique pages with views
      onlineNow: 1, // Current user
      bounceRate: 0, // Would need session tracking
      avgSession: '0:00' // Would need session tracking
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

// Optional: POST endpoint to track visits
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Here you would save the visit data to your database
    // or send it to your analytics service
    
    console.log('Visit tracked:', body)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to track visit' },
      { status: 500 }
    )
  }
}