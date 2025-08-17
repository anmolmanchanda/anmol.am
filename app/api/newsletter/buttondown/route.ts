import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { ContentStream } from '@/lib/content-streams'

interface ButtondownSubscriber {
  email: string
  tags: string[]
  metadata?: Record<string, any>
  referrer_url?: string
}

// Initialize Redis for backup
const redis = Redis.fromEnv()

// Buttondown API configuration
const BUTTONDOWN_API_KEY = process.env.BUTTONDOWN_API_KEY || ''
const BUTTONDOWN_API_URL = 'https://api.buttondown.email/v1'

export async function POST(request: NextRequest) {
  try {
    const { email, streams = ['work'] } = await request.json()
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      )
    }
    
    // Validate streams
    const validStreams: ContentStream[] = ['work', 'personal', 'all']
    const selectedStreams = streams.filter((s: string) => 
      validStreams.includes(s as ContentStream)
    )
    
    if (selectedStreams.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Please select at least one content stream' },
        { status: 400 }
      )
    }
    
    // Check if already subscribed (Redis)
    const isSubscribed = await redis.sismember('newsletter_subscribers', email)
    if (isSubscribed) {
      // Update streams preference
      await redis.hset(`subscriber:${email}`, {
        streams: selectedStreams.join(','),
        updatedAt: new Date().toISOString()
      })
    } else {
      // New subscriber - store in Redis
      await redis.sadd('newsletter_subscribers', email)
      await redis.hset(`subscriber:${email}`, {
        email,
        streams: selectedStreams.join(','),
        subscribedAt: new Date().toISOString(),
        status: 'active',
        source: 'portfolio_website'
      })
    }
    
    // Subscribe via Buttondown API if configured
    if (BUTTONDOWN_API_KEY) {
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
                tags: selectedStreams
              })
            }
          )
        } else {
          // Create new subscriber
          const subscriberData: ButtondownSubscriber = {
            email,
            tags: selectedStreams,
            referrer_url: 'https://anmol.am',
            metadata: {
              source: 'portfolio',
              signup_date: new Date().toISOString()
            }
          }
          
          const response = await fetch(
            `${BUTTONDOWN_API_URL}/subscribers`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Token ${BUTTONDOWN_API_KEY}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(subscriberData)
            }
          )
          
          if (!response.ok) {
            const error = await response.text()
            console.error('Buttondown API error:', error)
            // Don't fail the request - we have Redis backup
          }
        }
        
        // Send welcome email via Buttondown
        await sendWelcomeEmail(email, selectedStreams)
        
      } catch (buttondownError) {
        console.error('Buttondown integration error:', buttondownError)
        // Continue - we have Redis backup
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Successfully subscribed to ${selectedStreams.join(', ')} updates!`,
      streams: selectedStreams
    })
    
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
    
    // Check Redis
    const isSubscribed = await redis.sismember('newsletter_subscribers', email)
    
    if (isSubscribed) {
      const subscriber = await redis.hgetall(`subscriber:${email}`)
      return NextResponse.json({
        success: true,
        subscribed: true,
        streams: subscriber?.streams?.split(',') || ['work']
      })
    }
    
    // Check Buttondown if not in Redis
    if (BUTTONDOWN_API_KEY) {
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

// DELETE endpoint to unsubscribe
export async function DELETE(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email required' },
        { status: 400 }
      )
    }
    
    // Remove from Redis
    await redis.srem('newsletter_subscribers', email)
    await redis.del(`subscriber:${email}`)
    
    // Remove from Buttondown
    if (BUTTONDOWN_API_KEY) {
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
          await fetch(
            `${BUTTONDOWN_API_URL}/subscribers/${subscriber.id}`,
            {
              method: 'DELETE',
              headers: {
                'Authorization': `Token ${BUTTONDOWN_API_KEY}`
              }
            }
          )
        }
      } catch (error) {
        console.error('Buttondown unsubscribe error:', error)
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed'
    })
    
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to unsubscribe' },
      { status: 500 }
    )
  }
}

// Helper function to send welcome email
async function sendWelcomeEmail(email: string, streams: string[]) {
  if (!BUTTONDOWN_API_KEY) return
  
  const streamText = streams.includes('all') 
    ? 'all content' 
    : streams.join(' and ') + ' content'
  
  const emailContent = `
# Welcome to My Newsletter! 🎉

Thank you for subscribing to receive ${streamText} updates.

## What to Expect

Based on your preferences, you'll receive:

${streams.includes('work') || streams.includes('all') ? `
### 📚 Technical Content
- In-depth technical articles and tutorials
- Enterprise architecture insights
- AI-assisted development updates
- Open source project announcements
` : ''}

${streams.includes('personal') || streams.includes('all') ? `
### 🌟 Personal Updates
- Life updates and reflections
- Personal project progress
- Thoughts on technology and career
- Behind-the-scenes content
` : ''}

## Manage Your Subscription

You can update your preferences or unsubscribe at any time by visiting:
[Subscription Preferences](https://anmol.am/newsletter/preferences?email=${encodeURIComponent(email)})

## Get in Touch

Feel free to reply to any newsletter - I read every response!

Best regards,  
**Anmol Manchanda**  
[anmol.am](https://anmol.am)
`
  
  try {
    await fetch(`${BUTTONDOWN_API_URL}/emails`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${BUTTONDOWN_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subject: 'Welcome to my newsletter! 🚀',
        body: emailContent,
        to: [email],
        from_email: 'newsletter@anmol.am',
        from_name: 'Anmol Manchanda'
      })
    })
  } catch (error) {
    console.error('Welcome email error:', error)
  }
}