import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { Redis } from '@upstash/redis'

interface NewsletterRequest {
  email: string
}

// Initialize services
const resend = new Resend(process.env.RESEND_API_KEY)
const redis = Redis.fromEnv()

export async function POST(request: NextRequest) {
  try {
    const body: NewsletterRequest = await request.json()
    const { email } = body
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      )
    }
    
    // Check if already subscribed (using Redis)
    const isSubscribed = await redis.sismember('newsletter_subscribers', email)
    if (isSubscribed) {
      return NextResponse.json(
        { success: false, message: 'You are already subscribed!' },
        { status: 400 }
      )
    }
    
    // Store in Redis
    await redis.sadd('newsletter_subscribers', email)
    await redis.hset(`subscriber:${email}`, {
      email,
      subscribedAt: new Date().toISOString(),
      status: 'active',
      source: 'portfolio_website'
    })
    
    // If Resend is configured, send welcome email and add to audience
    if (process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID) {
      try {
        // Add to Resend audience
        await resend.contacts.create({
          email: email,
          audienceId: process.env.RESEND_AUDIENCE_ID
        })
        
        // Send welcome email
        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'Anmol Manchanda <hello@anmol.am>',
          to: email,
          subject: 'Welcome to my newsletter! 🚀',
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #333; font-size: 28px; margin-bottom: 20px;">Welcome aboard! 🎉</h1>
              
              <p style="color: #666; font-size: 16px; line-height: 1.6;">Thank you for subscribing to my newsletter!</p>
              
              <p style="color: #666; font-size: 16px; line-height: 1.6;">You'll receive updates about:</p>
              <ul style="color: #666; font-size: 16px; line-height: 1.8;">
                <li>New technical articles and tutorials</li>
                <li>AI-assisted development insights</li>
                <li>Open source projects and tools</li>
                <li>Enterprise architecture patterns</li>
              </ul>
              
              <p style="color: #666; font-size: 16px; line-height: 1.6;">Feel free to reply to this email if you have any questions or topics you'd like me to cover.</p>
              
              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
              
              <p style="color: #999; font-size: 14px;">Best regards,<br><strong>Anmol Manchanda</strong><br>AI-Assisted Developer & Technical Architect</p>
              
              <p style="color: #999; font-size: 12px; margin-top: 20px;">You can unsubscribe at any time by replying with "unsubscribe".</p>
            </div>
          `
        })
      } catch (resendError) {
        // Log error but don't fail the subscription
        console.error('Resend error (subscription still saved):', resendError)
      }
    }
    
    // Log for monitoring
    console.log('New newsletter subscription:', email)
    
    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed! Check your email for confirmation.'
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
    
    const isSubscribed = await redis.sismember('newsletter_subscribers', email)
    
    return NextResponse.json({
      success: true,
      subscribed: Boolean(isSubscribed)
    })
    
  } catch (error) {
    console.error('Error checking subscription:', error)
    return NextResponse.json(
      { success: false, subscribed: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}