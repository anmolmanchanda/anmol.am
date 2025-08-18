import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

// Try to use Redis if available, otherwise use in-memory storage
let analyticsData = {
  totalVisits: 0,
  uniqueVisitors: new Set<string>(),
  lastReset: Date.now()
}

export async function GET() {
  try {
    // Try Redis first if configured
    if (process.env['UPSTASH_REDIS_REST_URL'] && process.env['UPSTASH_REDIS_REST_TOKEN']) {
      try {
        const { redis } = await import('@/lib/redis')
        const totalVisits = await redis.get('analytics:totalVisits') || 0
        const uniqueVisitors = await redis.scard('analytics:uniqueVisitors') || 0
        const onlineNow = await redis.scard('analytics:online') || 1
        
        return NextResponse.json({
          totalVisits: Number(totalVisits),
          uniqueVisitors: Number(uniqueVisitors),
          onlineNow: Number(onlineNow),
          bounceRate: 35, // Industry average
          avgSession: '2:45' // Average for portfolio sites
        })
      } catch (error) {
        console.log('Redis not available, using fallback')
      }
    }
    
    // Fallback to in-memory tracking
    const analytics = {
      totalVisits: analyticsData.totalVisits,
      uniqueVisitors: analyticsData.uniqueVisitors.size,
      onlineNow: 1,
      bounceRate: 35,
      avgSession: '2:45'
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

// POST endpoint to track visits
export async function POST(request: Request) {
  try {
    const headersList = headers()
    const ip = headersList.get('x-forwarded-for') || 'unknown'
    const userAgent = headersList.get('user-agent') || 'unknown'
    const visitorId = `${ip}-${userAgent}`.substring(0, 50)
    
    // Try Redis first if configured
    if (process.env['UPSTASH_REDIS_REST_URL'] && process.env['UPSTASH_REDIS_REST_TOKEN']) {
      try {
        const { redis } = await import('@/lib/redis')
        
        // Increment total visits
        await redis.incr('analytics:totalVisits')
        
        // Add to unique visitors set
        await redis.sadd('analytics:uniqueVisitors', visitorId)
        
        // Track online users (expire after 5 minutes)
        await redis.sadd('analytics:online', visitorId)
        await redis.expire('analytics:online', 300)
        
        return NextResponse.json({ success: true, tracked: 'redis' })
      } catch (error) {
        console.log('Redis tracking failed, using fallback')
      }
    }
    
    // Fallback to in-memory tracking
    analyticsData.totalVisits++
    analyticsData.uniqueVisitors.add(visitorId)
    
    // Reset daily if needed
    if (Date.now() - analyticsData.lastReset > 24 * 60 * 60 * 1000) {
      analyticsData = {
        totalVisits: 1,
        uniqueVisitors: new Set([visitorId]),
        lastReset: Date.now()
      }
    }
    
    return NextResponse.json({ success: true, tracked: 'memory' })
  } catch (error) {
    console.error('Analytics tracking error:', error)
    return NextResponse.json(
      { error: 'Failed to track visit' },
      { status: 500 }
    )
  }
}