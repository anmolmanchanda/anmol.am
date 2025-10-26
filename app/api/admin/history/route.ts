import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { redis } from '@/lib/redis'
import type { HistoricalDataPoint } from '@/app/admin/types'

const HISTORY_KEY = 'tracker:history'
const MAX_HISTORY_DAYS = 90 // Keep 90 days of history

async function verifyAuth() {
  const cookieStore = await cookies()
  const session = cookieStore.get('admin_session')

  if (!session) {
    return false
  }

  try {
    const sessionData = await redis.get(`admin:session:${session.value}`)
    return sessionData === 'authenticated'
  } catch {
    return false
  }
}

export async function GET() {
  const isAuthenticated = await verifyAuth()

  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const historyData = await redis.get(HISTORY_KEY)

    if (!historyData) {
      return NextResponse.json({ success: true, data: [] })
    }

    const dataPoints = JSON.parse(historyData as string) as HistoricalDataPoint[]

    return NextResponse.json({ success: true, data: dataPoints })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch historical data' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const isAuthenticated = await verifyAuth()

  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { booksReadThisYear, poemsWritten, kmRun, coffeesConsumed } = body

    const newDataPoint: HistoricalDataPoint = {
      timestamp: new Date().toISOString(),
      booksReadThisYear,
      poemsWritten,
      kmRun,
      coffeesConsumed
    }

    const existingData = await redis.get(HISTORY_KEY)
    let dataPoints: HistoricalDataPoint[] = []

    if (existingData) {
      dataPoints = JSON.parse(existingData as string) as HistoricalDataPoint[]
    }

    dataPoints.push(newDataPoint)

    if (dataPoints.length > MAX_HISTORY_DAYS) {
      dataPoints = dataPoints.slice(-MAX_HISTORY_DAYS)
    }

    await redis.set(HISTORY_KEY, JSON.stringify(dataPoints))

    return NextResponse.json({
      success: true,
      message: 'Historical snapshot saved',
      dataPoint: newDataPoint
    })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to save historical data' },
      { status: 500 }
    )
  }
}
