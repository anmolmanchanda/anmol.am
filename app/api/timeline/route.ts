import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import fs from 'fs'
import path from 'path'
import type { TimelineEntry } from '@/app/admin/types'

const TIMELINE_KEY = 'tracker:timeline'
const TIMELINE_STORAGE_PATH = path.join(process.cwd(), 'data', 'timeline.json')

async function loadTimeline(): Promise<TimelineEntry[]> {
  // Try Redis first
  if (process.env['UPSTASH_REDIS_REST_URL'] && process.env['UPSTASH_REDIS_REST_TOKEN']) {
    try {
      const redis = Redis.fromEnv()
      const data = await redis.get(TIMELINE_KEY)
      if (data) {
        return typeof data === 'string' ? JSON.parse(data) : (data as TimelineEntry[])
      }
    } catch {
      // Fall through to file system
    }
  }

  // Fall back to local file storage
  try {
    if (fs.existsSync(TIMELINE_STORAGE_PATH)) {
      const fileData = fs.readFileSync(TIMELINE_STORAGE_PATH, 'utf8')
      return JSON.parse(fileData)
    }
  } catch {
    // Return empty
  }

  return []
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') as 'life' | 'work' | null

    const timeline = await loadTimeline()

    // Filter by type if specified
    const filteredTimeline = type
      ? timeline.filter(entry => entry.type === type)
      : timeline

    // Sort by timestamp descending (newest first)
    const sortedTimeline = filteredTimeline.sort((a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )

    return NextResponse.json({
      success: true,
      timeline: sortedTimeline,
      total: sortedTimeline.length
    })
  } catch (error) {
    console.error('Failed to load timeline:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to load timeline' },
      { status: 500 }
    )
  }
}
