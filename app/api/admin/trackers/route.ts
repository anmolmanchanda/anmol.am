import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const TRACKER_KEY = 'tracker:data'
const LOCAL_STORAGE_PATH = path.join(process.cwd(), 'tracker-data.json')

// Try Redis first, fall back to local file storage
async function getData() {
  // If Redis is configured, use it
  if (process.env['UPSTASH_REDIS_REST_URL'] && process.env['UPSTASH_REDIS_REST_TOKEN']) {
    try {
      const { redis } = await import('@/lib/redis')
      const data = await redis.get(TRACKER_KEY)
      return data
    } catch (error) {
      console.log('Redis not available, using local storage')
    }
  }
  
  // Fall back to local file storage
  try {
    if (fs.existsSync(LOCAL_STORAGE_PATH)) {
      const fileData = fs.readFileSync(LOCAL_STORAGE_PATH, 'utf8')
      return JSON.parse(fileData)
    }
  } catch (error) {
    console.error('Error reading local storage:', error)
  }
  
  return null
}

export async function GET() {
  try {
    const data = await getData()
    
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

async function saveData(data: any) {
  // If Redis is configured, use it
  if (process.env['UPSTASH_REDIS_REST_URL'] && process.env['UPSTASH_REDIS_REST_TOKEN']) {
    try {
      const { redis } = await import('@/lib/redis')
      await redis.set(TRACKER_KEY, JSON.stringify(data))
      return true
    } catch (error) {
      console.log('Redis not available, using local storage')
    }
  }
  
  // Fall back to local file storage
  try {
    fs.writeFileSync(LOCAL_STORAGE_PATH, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error('Error writing to local storage:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Save data
    const saved = await saveData(data)
    
    if (saved) {
      return NextResponse.json({
        success: true,
        message: 'Data saved successfully'
      })
    } else {
      throw new Error('Failed to save data')
    }
  } catch (error) {
    console.error('Failed to save tracker data:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to save data' },
      { status: 500 }
    )
  }
}