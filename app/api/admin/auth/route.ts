import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { createSession } from '@/lib/auth'

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
      // Create JWT session token
      const token = await createSession('admin', 'admin')

      const response = NextResponse.json(
        { success: true, authenticated: true, token },
        { status: 200 }
      )

      // Set secure HTTP-only cookie
      response.cookies.set('admin_session', token, {
        httpOnly: true,
        secure: process.env['NODE_ENV'] === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })

      return response
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

// Verify session endpoint
export async function GET(request: NextRequest) {
  try {
    const { verifySession, getSessionFromCookie } = await import('@/lib/auth')
    const cookieHeader = request.headers.get('cookie')
    const token = getSessionFromCookie(cookieHeader)

    if (!token) {
      return NextResponse.json(
        { success: false, authenticated: false },
        { status: 401 }
      )
    }

    const session = await verifySession(token)

    if (!session) {
      return NextResponse.json(
        { success: false, authenticated: false },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { success: true, authenticated: true, session },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, authenticated: false },
      { status: 401 }
    )
  }
}

// Logout endpoint
export async function DELETE() {
  const response = NextResponse.json(
    { success: true, message: 'Logged out successfully' },
    { status: 200 }
  )

  // Clear the session cookie
  response.cookies.delete('admin_session')

  return response
}