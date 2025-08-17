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
      // Check if subscriber exists
      const checkResponse = await fetch(
        `${BUTTONDOWN_API_URL}/subscribers?email=${encodeURIComponent(email)}`,
        {
          headers: {
            'Authorization': `Token ${BUTTONDOWN_API_KEY}`
          }
        }
      )
      
      const subscribers = await checkResponse.json()
      const existingSubscriber = subscribers.results?.find(
        (s: any) => s.email === email
      )
      
      if (existingSubscriber) {
        // Update existing subscriber's tags
        await fetch(
          `${BUTTONDOWN_API_URL}/subscribers/${existingSubscriber.id}`,
          {
            method: 'PATCH',
            headers: {
              'Authorization': `Token ${BUTTONDOWN_API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              tags: streams
            })
          }
        )
        
        return NextResponse.json({
          success: true,
          message: 'Preferences updated successfully!'
        })
      } else {
        // Create new subscriber
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
              referrer_url: 'https://anmol.am',
              metadata: {
                source: 'portfolio',
                signup_date: new Date().toISOString()
              }
            })
          }
        )
        
        if (!response.ok) {
          const error = await response.text()
          console.error('Buttondown API error:', error)
          throw new Error('Failed to subscribe')
        }
        
        return NextResponse.json({
          success: true,
          message: 'Successfully subscribed! Check your email for confirmation.'
        })
      }
    } catch (buttondownError) {
      console.error('Buttondown error:', buttondownError)
      throw buttondownError
    }
    
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}

// GET endpoint to check subscription status
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
    
    try {
      const response = await fetch(
        `${BUTTONDOWN_API_URL}/subscribers?email=${encodeURIComponent(email)}`,
        {
          headers: {
            'Authorization': `Token ${BUTTONDOWN_API_KEY}`
          }
        }
      )
      
      const data = await response.json()
      const subscriber = data.results?.find((s: any) => s.email === email)
      
      if (subscriber) {
        return NextResponse.json({
          success: true,
          subscribed: true,
          streams: subscriber.tags || ['work']
        })
      }
    } catch (error) {
      console.error('Buttondown check error:', error)
    }
    
    return NextResponse.json({
      success: true,
      subscribed: false,
      streams: []
    })
    
  } catch (error) {
    console.error('Error checking subscription:', error)
    return NextResponse.json(
      { success: false, subscribed: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}