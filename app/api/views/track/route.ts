import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { createHash } from 'crypto'

// Initialize Redis with Upstash
const redis = Redis.fromEnv()

// Types for view tracking
interface ViewTrackRequest {
  slug: string
}

// Helper function to get client IP
function getClientIP(request: NextRequest): string {
  // Try various headers that might contain the real IP
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (forwarded) {
    // x-forwarded-for can be a comma-separated list, take the first one
    return forwarded.split(',')[0]?.trim() || '0.0.0.0'
  }
  
  if (realIP) {
    return realIP
  }
  
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  
  // Fallback to a default (this shouldn't happen in production)
  return 'unknown'
}

// Helper function to hash IP for privacy
function hashIP(ip: string): string {
  return createHash('sha256').update(ip + (process.env['IP_SALT'] || 'default-salt')).digest('hex')
}

export async function POST(request: NextRequest) {
  try {
    const body: ViewTrackRequest = await request.json()
    const { slug } = body
    
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { success: false, views: 0, message: 'Invalid slug' },
        { status: 400 }
      )
    }
    
    // Get and hash the client IP
    const clientIP = getClientIP(request)
    const hashedIP = hashIP(clientIP)
    
    // Check if this IP has viewed this article recently (15 minutes cooldown)
    const cooldownKey = `view_cooldown:${slug}:${hashedIP}`
    const recentView = await redis.get(cooldownKey)
    
    if (recentView) {
      // IP has viewed recently, return current count without incrementing
      const currentViews = await redis.get(`views:${slug}`) || 0
      return NextResponse.json({
        success: true,
        views: Number(currentViews),
        message: 'View already counted recently'
      })
    }
    
    // Increment the view count atomically
    const viewKey = `views:${slug}`
    const newViews = await redis.incr(viewKey)
    
    // Set cooldown for this IP (15 minutes = 900 seconds)
    await redis.setex(cooldownKey, 900, Date.now().toString())
    
    // Optional: Track detailed analytics (for admin purposes)
    const analyticsKey = `analytics:${slug}:${Date.now()}`
    await redis.setex(analyticsKey, 86400, JSON.stringify({ // 24 hours retention
      timestamp: Date.now(),
      hashedIP,
      userAgent: request.headers.get('user-agent')?.substring(0, 200) // Truncate for storage
    }))
    
    return NextResponse.json({
      success: true,
      views: newViews,
      message: 'View tracked successfully'
    })
    
  } catch (error) {
    console.error('Error tracking view:', error)
    return NextResponse.json(
      { success: false, views: 0, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve current views
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    
    if (!slug) {
      return NextResponse.json(
        { success: false, views: 0, message: 'Slug parameter required' },
        { status: 400 }
      )
    }
    
    const views = await redis.get(`views:${slug}`) || 0
    
    return NextResponse.json({
      success: true,
      views: Number(views)
    })
    
  } catch (error) {
    console.error('Error retrieving views:', error)
    return NextResponse.json(
      { success: false, views: 0, message: 'Internal server error' },
      { status: 500 }
    )
  }
}