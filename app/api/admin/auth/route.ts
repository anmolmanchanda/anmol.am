import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Use environment variable or fallback to a default (change this in production!)
const ADMIN_PASSWORD_HASH = process.env['ADMIN_PASSWORD_HASH'] || 
  // Default password is "admin123" - CHANGE THIS!
  crypto.createHash('sha256').update('admin123').digest('hex')

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    if (!password) {
      return NextResponse.json(
        { success: false, message: 'Password required' },
        { status: 400 }
      )
    }
    
    // Hash the provided password
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex')
    
    // Check if it matches
    if (hashedPassword === ADMIN_PASSWORD_HASH) {
      // In production, you'd want to create a session token here
      return NextResponse.json(
        { success: true, authenticated: true },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid password' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Admin auth error:', error)
    return NextResponse.json(
      { success: false, message: 'Authentication failed' },
      { status: 500 }
    )
  }
}