import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { DEFAULT_TRACKER_DATA, type TrackerData, type TimelineEntry } from '@/app/admin/types'

const TRACKER_KEY = 'tracker:data'
const TIMELINE_KEY = 'tracker:timeline'
const LOCAL_STORAGE_PATH = path.join(process.cwd(), 'data', 'tracker-data.json')
const TIMELINE_STORAGE_PATH = path.join(process.cwd(), 'data', 'timeline.json')
const MAX_TIMELINE_ENTRIES = 100

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.dirname(LOCAL_STORAGE_PATH)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

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
    ensureDataDir()
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

    // If no data exists, initialize with default data
    const trackerData = data || DEFAULT_TRACKER_DATA

    // If this is the first time, save the default data
    if (!data) {
      await saveData(trackerData)
    }

    return NextResponse.json({
      success: true,
      data: trackerData
    })
  } catch (error) {
    console.error('Failed to fetch tracker data:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}

// Field labels for timeline descriptions
const FIELD_LABELS: Record<string, { label: string; type: 'life' | 'work' }> = {
  booksReadThisYear: { label: 'Books Read', type: 'life' },
  poemsWritten: { label: 'Poems Written', type: 'life' },
  kmRun: { label: 'KM Run', type: 'life' },
  coffeesConsumed: { label: 'Coffees Consumed', type: 'life' },
  countriesVisited: { label: 'Countries Visited', type: 'life' },
  languagesSpoken: { label: 'Languages Spoken', type: 'life' },
  cuisinesMastered: { label: 'Cuisines Mastered', type: 'life' },
  daysMeditated: { label: 'Days Meditated', type: 'life' },
  citiesImpacted: { label: 'Cities Impacted', type: 'work' },
  yearsExperience: { label: 'Years Experience', type: 'work' },
  projectsCompleted: { label: 'Projects Completed', type: 'work' },
  dataProcessed: { label: 'Data Processed', type: 'work' },
  currentRole: { label: 'Current Role', type: 'work' },
  currentSideProject: { label: 'Side Project', type: 'life' }
}

// Generate timeline entries from changes (split by type)
function generateTimelineEntries(oldData: TrackerData | null, newData: TrackerData): TimelineEntry[] {
  if (!oldData) return []

  const changes: TimelineEntry['changes'] = []

  // Check for changes in tracked fields
  Object.entries(FIELD_LABELS).forEach(([field, config]) => {
    const oldValue = oldData[field as keyof TrackerData]
    const newValue = newData[field as keyof TrackerData]

    // Skip if values are the same
    if (oldValue === newValue) return

    // Skip insignificant changes (e.g., adding 1 to a counter)
    if (typeof oldValue === 'number' && typeof newValue === 'number') {
      const diff = Math.abs(newValue - oldValue)
      if (diff < 5) return // Only track changes >= 5
    }

    changes.push({
      field,
      label: config.label,
      oldValue,
      newValue
    })
  })

  if (changes.length === 0) return []

  // Split changes by type
  const lifeChanges = changes.filter(c => FIELD_LABELS[c.field]?.type === 'life')
  const workChanges = changes.filter(c => FIELD_LABELS[c.field]?.type === 'work')

  const entries: TimelineEntry[] = []
  const timestamp = new Date().toISOString()
  const baseId = Date.now()

  // Create life entry if there are life changes
  if (lifeChanges.length > 0) {
    const description = lifeChanges.length === 1 && lifeChanges[0]
      ? `Updated ${lifeChanges[0].label}: ${lifeChanges[0].oldValue} → ${lifeChanges[0].newValue}`
      : `Updated ${lifeChanges.length} life stats`

    entries.push({
      id: `timeline-life-${baseId}`,
      timestamp,
      type: 'life',
      changes: lifeChanges,
      description
    })
  }

  // Create work entry if there are work changes
  if (workChanges.length > 0) {
    const description = workChanges.length === 1 && workChanges[0]
      ? `Updated ${workChanges[0].label}: ${workChanges[0].oldValue} → ${workChanges[0].newValue}`
      : `Updated ${workChanges.length} work stats`

    entries.push({
      id: `timeline-work-${baseId}`,
      timestamp,
      type: 'work',
      changes: workChanges,
      description
    })
  }

  return entries
}

// Save/load timeline
async function saveTimeline(entries: TimelineEntry[]) {
  // Keep only recent entries
  const recentEntries = entries.slice(-MAX_TIMELINE_ENTRIES)

  if (process.env['UPSTASH_REDIS_REST_URL'] && process.env['UPSTASH_REDIS_REST_TOKEN']) {
    try {
      const { redis } = await import('@/lib/redis')
      await redis.set(TIMELINE_KEY, JSON.stringify(recentEntries))
      return true
    } catch {
      // Fall through
    }
  }

  try {
    ensureDataDir()
    fs.writeFileSync(TIMELINE_STORAGE_PATH, JSON.stringify(recentEntries, null, 2))
    return true
  } catch {
    return false
  }
}

async function loadTimeline(): Promise<TimelineEntry[]> {
  if (process.env['UPSTASH_REDIS_REST_URL'] && process.env['UPSTASH_REDIS_REST_TOKEN']) {
    try {
      const { redis } = await import('@/lib/redis')
      const data = await redis.get(TIMELINE_KEY)
      if (data) return JSON.parse(data as string)
    } catch {
      // Fall through
    }
  }

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
    ensureDataDir()
    fs.writeFileSync(LOCAL_STORAGE_PATH, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error('Error writing to local storage:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const newData = await request.json()

    // Get old data for change detection
    const oldData = await getData()

    // Generate timeline entries if there are changes (split by type)
    if (oldData) {
      const timelineEntries = generateTimelineEntries(oldData, newData)
      if (timelineEntries.length > 0) {
        const timeline = await loadTimeline()
        timeline.push(...timelineEntries)
        await saveTimeline(timeline)
      }
    }

    // Save new data
    const saved = await saveData(newData)

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