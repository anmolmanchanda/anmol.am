import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

interface BatchViewRequest {
  slugs: string[]
}

interface BatchViewResponse {
  success: boolean
  views: Record<string, number>
  message?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: BatchViewRequest = await request.json()
    const { slugs } = body
    
    if (!Array.isArray(slugs) || slugs.length === 0) {
      return NextResponse.json(
        { success: false, views: {}, message: 'Invalid slugs array' },
        { status: 400 }
      )
    }
    
    // Validate slugs
    const validSlugs = slugs.filter(slug => typeof slug === 'string' && slug.length > 0)
    
    if (validSlugs.length === 0) {
      return NextResponse.json(
        { success: false, views: {}, message: 'No valid slugs provided' },
        { status: 400 }
      )
    }
    
    // Batch get all view counts
    const viewKeys = validSlugs.map(slug => `views:${slug}`)
    const viewCounts = await kv.mget(...viewKeys)
    
    // Build response object
    const views: Record<string, number> = {}
    validSlugs.forEach((slug, index) => {
      views[slug] = Number(viewCounts[index]) || 0
    })
    
    return NextResponse.json({
      success: true,
      views
    })
    
  } catch (error) {
    console.error('Error retrieving batch views:', error)
    return NextResponse.json(
      { success: false, views: {}, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET endpoint for batch retrieval via query params
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slugsParam = searchParams.get('slugs')
    
    if (!slugsParam) {
      return NextResponse.json(
        { success: false, views: {}, message: 'Slugs parameter required' },
        { status: 400 }
      )
    }
    
    const slugs = slugsParam.split(',').map(s => s.trim()).filter(s => s.length > 0)
    
    if (slugs.length === 0) {
      return NextResponse.json(
        { success: false, views: {}, message: 'No valid slugs provided' },
        { status: 400 }
      )
    }
    
    // Batch get all view counts
    const viewKeys = slugs.map(slug => `views:${slug}`)
    const viewCounts = await kv.mget(...viewKeys)
    
    // Build response object
    const views: Record<string, number> = {}
    slugs.forEach((slug, index) => {
      views[slug] = Number(viewCounts[index]) || 0
    })
    
    return NextResponse.json({
      success: true,
      views
    })
    
  } catch (error) {
    console.error('Error retrieving batch views:', error)
    return NextResponse.json(
      { success: false, views: {}, message: 'Internal server error' },
      { status: 500 }
    )
  }
}