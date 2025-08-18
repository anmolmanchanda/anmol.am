import { NextRequest, NextResponse } from 'next/server'
import { fetchLetterboxdStats } from '@/src/services/external-apis'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const username = searchParams.get('username') || 'anmolmanchanda'
  
  try {
    const stats = await fetchLetterboxdStats(username)
    return NextResponse.json(stats)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch Letterboxd data' },
      { status: 500 }
    )
  }
}