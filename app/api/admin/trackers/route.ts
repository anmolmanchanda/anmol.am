import { NextRequest, NextResponse } from 'next/server'
import { redis } from '@/lib/redis'

const TRACKER_KEY = 'tracker:data'

export async function GET() {
  try {
    // Get tracker data from Redis
    const data = await redis.get(TRACKER_KEY)
    
    return NextResponse.json({
      success: true,
      data: data || null
    })
  } catch (error) {
    console.error('Failed to fetch tracker data:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Save to Redis
    await redis.set(TRACKER_KEY, JSON.stringify(data))
    
    return NextResponse.json({
      success: true,
      message: 'Data saved successfully'
    })
  } catch (error) {
    console.error('Failed to save tracker data:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to save data' },
      { status: 500 }
    )
  }
}