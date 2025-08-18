import { NextResponse } from 'next/server'
import { fetchDuolingoStats } from '@/src/services/external-apis'

export async function GET() {
  try {
    const stats = await fetchDuolingoStats('manchandaanmol')
    return NextResponse.json({
      success: true,
      data: stats
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}

export async function POST() {
  return GET()
}