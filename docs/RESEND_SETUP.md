# Resend Newsletter Setup Guide

## Overview
This portfolio uses Resend for newsletter management with Upstash Redis for subscriber storage. This provides a robust, scalable solution with both email delivery and subscriber management.

## Setup Instructions

### 1. Create Resend Account

1. Go to [Resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 2. Get API Key

1. Go to [API Keys](https://resend.com/api-keys)
2. Click **Create API Key**
3. Name it (e.g., "Portfolio Newsletter")
4. Copy the key (starts with `re_`)

### 3. Create Audience (Optional but Recommended)

1. Go to [Audiences](https://resend.com/audiences)
2. Click **Create Audience**
3. Name it (e.g., "Portfolio Subscribers")
4. Copy the Audience ID

### 4. Verify Domain (For Production)

1. Go to [Domains](https://resend.com/domains)
2. Add your domain (e.g., anmol.am)
3. Add the DNS records as shown
4. Wait for verification (usually < 1 hour)

### 5. Add Environment Variables

Add to `.env.development.local` and Vercel:

```env
# Resend Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_AUDIENCE_ID=aud_xxxxxxxxxxxxx
EMAIL_FROM=hello@anmol.am

# Already configured (Upstash Redis)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

### 6. Deploy to Vercel

```bash
# Add environment variables to Vercel
vercel env add RESEND_API_KEY production
vercel env add RESEND_AUDIENCE_ID production
vercel env add EMAIL_FROM production

# Deploy
git push origin main
```

## Features

### What This Implementation Does:

1. **Validates Email** - Server-side validation
2. **Prevents Duplicates** - Checks Redis before subscribing
3. **Stores in Redis** - Maintains subscriber list
4. **Adds to Resend Audience** - If configured
5. **Sends Welcome Email** - Professional HTML email
6. **Graceful Fallback** - Works even if Resend isn't configured

### Subscriber Data Structure:

```
Redis Keys:
- newsletter_subscribers (set) - All subscriber emails
- subscriber:{email} (hash) - Individual subscriber data
  - email
  - subscribedAt
  - status
  - source
```

## Testing

### Local Testing:
```bash
# Test subscription
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Check subscription status
curl http://localhost:3000/api/newsletter?email=test@example.com
```

### Production Testing:
1. Subscribe with a real email
2. Check Resend dashboard for contact
3. Verify welcome email received
4. Check Redis for subscriber data

## Costs

### Resend Free Tier:
- **100 emails/day**
- **3,000 emails/month**
- 1 audience
- Perfect for portfolios

### Upstash Redis Free Tier:
- **10,000 commands/day**
- **256MB storage**
- Handles thousands of subscribers

### When to Upgrade:
- **> 100 subscribers/day**: Upgrade Resend
- **> 10,000 subscribers**: Consider dedicated database
- **Custom features**: Add segmentation, tags, etc.

## Email Templates

### Current Welcome Email:
- Clean, professional design
- Lists newsletter topics
- Unsubscribe instructions
- Mobile responsive

### To Customize:
Edit the HTML in `/app/api/newsletter/route.ts`

### Future Enhancements:
1. **React Email Templates** - Component-based emails
2. **Double Opt-in** - Confirmation emails
3. **Preference Center** - Topic selection
4. **Analytics** - Open/click tracking

## Admin Features (Optional)

### View Subscribers:
```typescript
// Add to /app/api/newsletter/admin/route.ts
const subscribers = await redis.smembers('newsletter_subscribers')
const count = await redis.scard('newsletter_subscribers')
```

### Export Subscribers:
```typescript
// Get all subscriber details
const emails = await redis.smembers('newsletter_subscribers')
const details = await Promise.all(
  emails.map(email => redis.hgetall(`subscriber:${email}`))
)
```

### Unsubscribe:
```typescript
// Remove from Redis and Resend
await redis.srem('newsletter_subscribers', email)
await redis.del(`subscriber:${email}`)
// Also remove from Resend audience
```

## Troubleshooting

### Emails not sending?
1. Check RESEND_API_KEY is set
2. Verify domain if using custom from address
3. Check Resend dashboard for errors
4. Look at server logs

### Already subscribed error?
- Email exists in Redis
- Clear with: `redis.srem('newsletter_subscribers', email)`

### Resend API errors?
- Check API key permissions
- Verify audience ID is correct
- Check Resend status page

## Security

1. **Email Validation** - Prevents injection
2. **Rate Limiting** - Consider adding (via Upstash)
3. **GDPR Compliance** - Store minimal data
4. **Unsubscribe** - Required by law

## Monitoring

Check these regularly:
1. **Resend Dashboard** - Delivery rates
2. **Redis Console** - Subscriber growth
3. **Server Logs** - Errors
4. **Bounce Rate** - Clean list regularly

---

**Last Updated**: January 2025  
**Status**: Production Ready  
**Support**: Check Resend docs at resend.com/docs