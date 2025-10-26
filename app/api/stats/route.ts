import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { fetchAllStats } from '@/src/services/external-apis'
import fs from 'fs'
import path from 'path'

const TRACKER_KEY = 'tracker:data'
const LOCAL_STORAGE_PATH = path.join(process.cwd(), 'data', 'tracker-data.json')

// Get admin tracker data
async function getTrackerData() {
  // Try Redis first
  if (process.env['UPSTASH_REDIS_REST_URL'] && process.env['UPSTASH_REDIS_REST_TOKEN']) {
    try {
      const redis = Redis.fromEnv()
      const data = await redis.get(TRACKER_KEY)
      if (data) return data
    } catch {
      // Fall through to file system
    }
  }

  // Fall back to local file storage
  try {
    if (fs.existsSync(LOCAL_STORAGE_PATH)) {
      const fileData = fs.readFileSync(LOCAL_STORAGE_PATH, 'utf8')
      return JSON.parse(fileData)
    }
  } catch {
    // No data available
  }

  return null
}

// Real stats from Redis
export async function GET() {
  try {
    // Analytics data (requires Redis)
    let totalViews = 0
    let sortedPages: Array<{ slug: string; views: number }> = []
    let lastKeepAliveTimestamp = null

    // Try to get analytics data from Redis if configured
    if (process.env['UPSTASH_REDIS_REST_URL'] && process.env['UPSTASH_REDIS_REST_TOKEN']) {
      try {
        const redis = Redis.fromEnv()

        // Get all view count keys
        const viewKeys = await redis.keys('views:*')

        // Get all view counts
        const viewCounts: Record<string, number> = {}

        for (const key of viewKeys) {
          const count = await redis.get(key)
          const slug = key.replace('views:', '')
          viewCounts[slug] = Number(count) || 0
          totalViews += Number(count) || 0
        }

        // Get keep-alive status
        const keepAlive = await redis.get('system:keepalive')

        // Parse keep-alive data (Upstash Redis auto-parses JSON, so check type first)
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
        sortedPages = Object.entries(viewCounts)
          .sort(([, a], [, b]) => b - a)
          .map(([slug, views]) => ({ slug, views }))
      } catch {
        // Redis failed, continue without analytics data
      }
    }

    // Fetch external API stats and admin tracker data
    const [externalStats, trackerData] = await Promise.all([
      fetchAllStats().catch(() => null),
      getTrackerData().catch(() => null)
    ])

    // Merge stats: admin tracker data takes priority over external APIs
    const lifeStats = {
      ...(externalStats?.life || {}),
      ...(trackerData && {
        booksReadThisYear: trackerData.booksReadThisYear,
        poemsWritten: trackerData.poemsWritten,
        kmRun: trackerData.kmRun,
        coffeesConsumed: trackerData.coffeesConsumed,
        countriesVisited: trackerData.countriesVisited,
        languagesSpoken: trackerData.languagesSpoken,
        cuisinesMastered: trackerData.cuisinesMastered,
        daysMeditated: trackerData.daysMeditated,
        currentlyReading: trackerData.currentSideProject || externalStats?.life?.currentlyReading,
        currentSideProject: trackerData.currentSideProject,
        learningQueue: trackerData.learningQueue,
        // Learning progress
        duolingoStreak: trackerData.learning?.french?.streak || externalStats?.life?.duolingoStreak,
        frenchLevel: trackerData.learning?.french?.level || externalStats?.life?.frenchLevel,
        awsProgress: trackerData.learning?.aws?.progress,
        awsTarget: trackerData.learning?.aws?.target,
      })
    }

    const workStats = {
      ...(externalStats?.work || {}),
      ...(trackerData && {
        citiesImpacted: trackerData.citiesImpacted,
        yearsExperience: trackerData.yearsExperience,
        projectsCompleted: trackerData.projectsCompleted,
        dataProcessed: trackerData.dataProcessed,
        currentRole: trackerData.currentRole,
        currentlyUsing: trackerData.currentlyUsing,
      })
    }

    return NextResponse.json({
      success: true,
      stats: {
        // View tracking stats
        totalViews,
        uniquePages: sortedPages.length,
        pages: sortedPages,
        keepAliveActive: !!lastKeepAliveTimestamp,
        lastKeepAlive: lastKeepAliveTimestamp,
        // Life and work stats
        life: lifeStats,
        work: workStats,
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
