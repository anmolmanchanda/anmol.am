# View Tracking System Setup Instructions

This guide will help you set up the real-time view tracking system with IP-based deduplication for your anmol.am portfolio.

## Prerequisites

- Vercel account for deployment
- Access to Vercel KV (Redis) database
- Environment variable configuration access

## Step 1: Set Up Vercel KV Database

### 1.1 Create Vercel KV Instance

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Storage** → **Create Database**
3. Select **KV (Redis)**
4. Choose a name for your database (e.g., `anmol-portfolio-views`)
5. Select a region closest to your users
6. Click **Create**

### 1.2 Get KV Connection Details

After creating the KV instance:

1. Go to your KV dashboard
2. Click on **Settings** tab
3. Copy the following values:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`

## Step 2: Configure Environment Variables

### 2.1 Local Development (.env.local)

Create or update your `.env.local` file:

```env
# View Tracking Configuration
KV_REST_API_URL=https://your-kv-instance.upstash.io
KV_REST_API_TOKEN=your_kv_token_here

# IP Salt for Privacy (generate a random string)
IP_SALT=your_random_salt_string_for_ip_hashing_security

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2.2 Production Environment (Vercel)

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `KV_REST_API_URL` | Your KV REST API URL | Production, Preview |
| `KV_REST_API_TOKEN` | Your KV REST API Token | Production, Preview |
| `IP_SALT` | Random string for IP hashing | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | https://yourdomain.com | Production |

## Step 3: Generate IP Salt

For security, generate a random salt for IP hashing:

```bash
# Option 1: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 2: Using OpenSSL
openssl rand -hex 32

# Option 3: Using online generator
# Visit: https://www.random.org/strings/
```

Use the generated string as your `IP_SALT` value.

## Step 4: Deploy to Vercel

### 4.1 Push Changes

```bash
git add .
git commit -m "Add view tracking system with real-time analytics"
git push origin main
```

### 4.2 Verify Deployment

1. Check Vercel deployment logs
2. Ensure all environment variables are set
3. Test the API endpoints:
   - `https://yourdomain.com/api/views/track`
   - `https://yourdomain.com/api/views/[slug]`
   - `https://yourdomain.com/api/views/batch`

## Step 5: Test the System

### 5.1 Test View Tracking

1. Visit any blog article on your site
2. Check the Vercel KV dashboard for new keys:
   - `views:article-slug` (view count)
   - `view_cooldown:article-slug:hashedIP` (IP cooldown)

### 5.2 Verify IP Deduplication

1. Refresh the same article multiple times
2. View count should only increment once per 15-minute window
3. Check the KV dashboard to see cooldown keys

### 5.3 Test Batch API

```bash
# Test batch endpoint
curl -X POST https://yourdomain.com/api/views/batch \
  -H "Content-Type: application/json" \
  -d '{"slugs":["building-scalable-web-apps-nextjs","power-of-typescript"]}'
```

## Step 6: Monitor and Debug

### 6.1 Check Vercel Function Logs

1. Go to Vercel Dashboard → Functions
2. Check logs for view tracking endpoints
3. Look for any errors or warnings

### 6.2 Monitor KV Usage

1. Go to Vercel KV Dashboard
2. Check **Metrics** tab for:
   - Request count
   - Storage usage
   - Response times

### 6.3 Debug Common Issues

**Issue: Views not incrementing**
```bash
# Check if KV is accessible
curl https://yourdomain.com/api/views/test-slug

# Expected response:
{"success":true,"views":0}
```

**Issue: IP cooldown not working**
- Verify `IP_SALT` is set in environment variables
- Check Vercel function logs for IP detection

**Issue: High response times**
- Monitor KV metrics in Vercel dashboard
- Consider upgrading KV plan if needed

## Step 7: Performance Optimization

### 7.1 KV Configuration

For optimal performance:

1. Choose KV region closest to your users
2. Monitor request patterns in KV dashboard
3. Consider upgrading KV plan for high traffic

### 7.2 Caching Strategy

The system implements automatic caching:
- View counts cached in KV with no expiration
- IP cooldowns expire automatically after 15 minutes
- Analytics data expires after 24 hours

## Step 8: Security Considerations

### 8.1 IP Privacy Protection

- IPs are hashed with SHA-256 + salt
- Raw IPs are never stored
- Cooldown data expires automatically

### 8.2 Rate Limiting

The system includes built-in protection:
- 15-minute cooldown per IP per article
- Invalid requests return appropriate error codes
- Failed requests don't affect view counts

## Step 9: Scaling and Monitoring

### 9.1 KV Scaling

Vercel KV automatically scales, but monitor:
- Request volume
- Storage usage
- Response times

### 9.2 Analytics Integration

View data can be exported for analytics:

```typescript
// Example: Export view data
async function exportViewData() {
  const response = await fetch('/api/views/batch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      slugs: ['all-your-article-slugs'] 
    })
  })
  
  const data = await response.json()
  console.log('View analytics:', data.views)
}
```

## Troubleshooting

### Common Error Messages

**"Internal server error"**
- Check environment variables are set correctly
- Verify KV credentials in Vercel dashboard
- Check function logs for detailed error

**"Invalid slug"**
- Ensure article slug matches exactly
- Check for special characters or spaces

**"View already counted recently"**
- Normal behavior for IP deduplication
- Wait 15 minutes to test increment again

### Support Resources

1. **Vercel KV Documentation**: https://vercel.com/docs/storage/vercel-kv
2. **Next.js API Routes**: https://nextjs.org/docs/api-routes/introduction
3. **Vercel Function Logs**: Your Vercel Dashboard → Functions

## Success Indicators

✅ **System Working Correctly When:**
- View counts increment for new visitors
- Same IP doesn't increment within 15 minutes
- Batch API returns accurate counts
- No errors in Vercel function logs
- KV dashboard shows activity

## Need Help?

If you encounter issues:

1. Check Vercel function logs first
2. Verify all environment variables are set
3. Test API endpoints manually
4. Monitor KV dashboard for errors
5. Check this document's troubleshooting section

The view tracking system should now be fully operational with accurate, privacy-protected analytics for your blog articles!