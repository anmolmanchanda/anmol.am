import { NextRequest, NextResponse } from 'next/server'

interface NewsletterRequest {
  email: string
  streams?: string[]
}

// Buttondown API configuration
const BUTTONDOWN_API_KEY = process.env['BUTTONDOWN_API_KEY'] || ''
const BUTTONDOWN_API_URL = 'https://api.buttondown.email/v1'

export async function POST(request: NextRequest) {
  try {
    const body: NewsletterRequest = await request.json()
    const { email, streams = ['work'] } = body
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      )
    }
    
    // If Buttondown is not configured, just log and return success
    if (!BUTTONDOWN_API_KEY) {
      console.log('Newsletter subscription (Buttondown not configured):', email, streams)
      return NextResponse.json({
        success: true,
        message: 'Subscription recorded! We\'ll be in touch soon.'
      })
    }
    
    try {
      // Directly create/update subscriber (Buttondown handles duplicates)
      const response = await fetch(
        `${BUTTONDOWN_API_URL}/subscribers`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Token ${BUTTONDOWN_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            tags: streams,
            referrer_url: 'https://anmol.am'
          })
        }
      )
      
      // Check response
      if (response.ok) {
        return NextResponse.json({
          success: true,
          message: 'Successfully subscribed! Check your email for confirmation.'
        })
      } else if (response.status === 409) {
        // Already subscribed
        return NextResponse.json({
          success: true,
          message: 'You\'re already subscribed! Check your email for updates.'
        })
      } else {
        const errorText = await response.text()
        console.error('Buttondown API error:', response.status, errorText)
        
        // Parse common errors
        if (errorText.includes('email')) {
          return NextResponse.json(
            { success: false, message: 'Invalid email address. Please check and try again.' },
            { status: 400 }
          )
        }
        
        throw new Error('Subscription failed')
      }
    } catch (fetchError) {
      console.error('Buttondown fetch error:', fetchError)
      throw fetchError
    }
    
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    )
  }
}

// GET endpoint to check subscription status (simplified)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    if (!email) {
      return NextResponse.json(
        { success: false, subscribed: false, message: 'Email required' },
        { status: 400 }
      )
    }
    
    if (!BUTTONDOWN_API_KEY) {
      return NextResponse.json({
        success: true,
        subscribed: false,
        message: 'Newsletter not configured'
      })
    }
    
    // For now, just return false - Buttondown's subscriber search is complex
    return NextResponse.json({
      success: true,
      subscribed: false,
      streams: ['work']
    })
    
  } catch (error) {
    console.error('Error checking subscription:', error)
    return NextResponse.json(
      { success: false, subscribed: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}