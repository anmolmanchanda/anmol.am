import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function GET(request: NextRequest) {
  try {
    // Test basic KV operations
    const testKey = 'test:connection'
    const testValue = Date.now()
    
    // Try to set a value
    await kv.set(testKey, testValue)
    
    // Try to get the value back
    const retrievedValue = await kv.get(testKey)
    
    // Try to increment a counter
    const counterKey = 'test:counter'
    const counterValue = await kv.incr(counterKey)
    
    // Get a specific view count
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    let viewCount = null
    
    if (slug) {
      viewCount = await kv.get(`views:${slug}`)
    }
    
    return NextResponse.json({
      success: true,
      connection: 'Redis connection successful',
      testSet: testValue,
      testGet: retrievedValue,
      counter: counterValue,
      viewCount: viewCount ? Number(viewCount) : null,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Redis connection test failed:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      type: error instanceof Error ? error.constructor.name : 'Unknown',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}