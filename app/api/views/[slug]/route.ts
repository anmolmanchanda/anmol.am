import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    if (!slug) {
      return NextResponse.json(
        { success: false, views: 0, message: 'Slug parameter required' },
        { status: 400 }
      )
    }
    
    const views = await kv.get(`views:${slug}`) || 0
    
    return NextResponse.json({
      success: true,
      slug,
      views: Number(views)
    })
    
  } catch (error) {
    console.error('Error retrieving views for slug:', error)
    return NextResponse.json(
      { success: false, views: 0, message: 'Internal server error' },
      { status: 500 }
    )
  }
}