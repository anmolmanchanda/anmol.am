# Upstash Redis Setup Guide (formerly Vercel KV)

## Overview
This portfolio uses Upstash Redis for view tracking and other real-time features. Previously configured with Vercel KV, now migrated to Upstash Redis for better flexibility.

## Setup Instructions

### 1. Create an Upstash Redis Database

1. Go to [Upstash Console](https://console.upstash.com)
2. Click **Create Database**
3. Choose a name (e.g., `portfolio-redis`)
4. Select your preferred region (closest to your users)
5. Enable **Eviction** if you want automatic cleanup
6. Click **Create**

### 2. Connect to Your Project

After creating the database:

1. In Upstash Console, go to your database details
2. Copy the following environment variables:
   - `UPSTASH_REDIS_REST_URL` - REST API endpoint
   - `UPSTASH_REDIS_REST_TOKEN` - Authentication token
3. Add these to your Vercel project:
   - Go to Vercel Dashboard > Settings > Environment Variables
   - Add both variables for all environments

### 3. Local Development

For local development, you need to pull these environment variables:

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Link your project
vercel link

# Pull environment variables
vercel env pull .env.development.local
```

### 4. Verify Setup

Your `.env.development.local` should now contain:
```env
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."
```

### 5. Test View Tracking

1. Start your development server: `npm run dev`
2. Visit a blog post
3. Check the Upstash Console Data Browser to see if keys are being created
4. Keys will be in format: `views:blog-post-slug`

## Features Using Upstash Redis

### 1. View Tracking
- **Location**: `/app/api/views/track/route.ts`
- **How it works**:
  - Tracks unique views per IP (hashed for privacy)
  - 15-minute cooldown per IP to prevent spam
  - Stores view counts with key `views:{slug}`

### 2. View Cooldowns
- Prevents the same IP from inflating view counts
- Stored as `view_cooldown:{slug}:{hashedIP}`
- Expires after 15 minutes

### 3. Analytics (Optional)
- Detailed tracking data stored for 24 hours
- Key format: `analytics:{slug}:{timestamp}`

## Newsletter Subscription Flow

### What Happens When Someone Subscribes:

1. **User enters email** in the Newsletter component
2. **Frontend validation** checks email format
3. **API call** to `/api/newsletter`
4. **Server-side processing**:
   - Validates email format again
   - Logs the subscription (currently console.log)
   - Returns success response

### Current Implementation (Basic):
```typescript
// /app/api/newsletter/route.ts
- Validates email
- Logs to console
- Returns success message
```

### Production Implementation (Recommended):

To make newsletter functional, integrate with an email service:

#### Option 1: Resend (Recommended)
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// In your API route:
await resend.contacts.create({
  email: email,
  audienceId: process.env.RESEND_AUDIENCE_ID
});

// Send welcome email
await resend.emails.send({
  from: 'noreply@yourdomain.com',
  to: email,
  subject: 'Welcome to the Newsletter!',
  html: '<p>Thanks for subscribing!</p>'
});
```

#### Option 2: Mailchimp
```typescript
import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

await mailchimp.lists.addListMember(
  process.env.MAILCHIMP_LIST_ID,
  { 
    email_address: email, 
    status: 'subscribed' 
  }
);
```

#### Option 3: Store in Database
```typescript
// Using Upstash Redis
import { Redis } from '@upstash/redis'
const redis = Redis.fromEnv()

await redis.sadd('newsletter_subscribers', email);
await redis.set(`subscriber:${email}`, {
  email,
  subscribedAt: new Date().toISOString(),
  status: 'active'
});
```

### Environment Variables Needed:

Add to `.env.local`:
```env
# For Resend
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_AUDIENCE_ID=aud_xxxxxxxxxxxxx

# OR for Mailchimp
MAILCHIMP_API_KEY=xxxxxxxxxxxxx-us1
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_LIST_ID=xxxxxxxxxxxxx

# For sending emails
EMAIL_FROM=noreply@yourdomain.com
```

## Troubleshooting

### View counts not updating?
1. Check if Redis is connected: Visit Upstash Console
2. Verify environment variables are loaded (UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN)
3. Check browser console for API errors
4. Ensure you're not in the 15-minute cooldown period

### Newsletter not working?
1. Currently only logs to server console
2. Implement email service integration (see above)
3. Check API response in Network tab

### Local development issues?
1. Run `vercel env pull .env.development.local` to get latest env vars
2. Restart development server after updating `.env.development.local`
3. Check that UPSTASH_REDIS_ variables are present

## Costs

- **Upstash Redis Free Tier**: 
  - 10,000 commands/day
  - 256MB storage
  - Perfect for portfolio sites

- **For higher traffic**:
  - Pay as you go: $0.2 per 100K commands
  - Storage: First 256MB free, then $0.25 per GB

## Security Notes

1. **IP Hashing**: IPs are hashed with salt before storage
2. **Rate Limiting**: 15-minute cooldown prevents spam
3. **Read-only tokens**: Use for public-facing features
4. **Environment variables**: Never commit to git

---

**Last Updated**: January 2025  
**Status**: Ready for production use