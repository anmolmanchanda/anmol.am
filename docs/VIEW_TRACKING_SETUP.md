# View Tracking System Setup Instructions

This guide will help you set up the real-time view tracking system with IP-based deduplication for your anmol.am portfolio.

## Prerequisites

- Vercel account for deployment
- Access to Vercel KV (Redis) database
- Environment variable configuration access

## Step 1: Set Up Vercel KV Database

### 1.1 Create Vercel KV Instance (Updated for Marketplace)

**Important**: Vercel KV has moved to the Vercel Marketplace. Follow these updated steps:

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Marketplace** (or **Integrations**)
3. Search for **"Upstash Redis"** or **"KV Database"**
4. Select **Upstash for Redis** (this is the evolution of Vercel KV)
5. Click **Add Integration**
6. Choose your Vercel project to connect to
7. Configure the database:
   - Database name: `anmol-portfolio-views`
   - Region: Select closest to your users
   - Plan: Choose based on your usage (Free tier available)
8. Click **Create Database**

**Alternative Options:**
- **Redis Serverless**: Another option in the marketplace
- **Upstash Redis**: Recommended as it's the official successor to Vercel KV

### 1.2 Get KV Connection Details

After creating the Upstash Redis instance:

1. Go to your **Upstash Console** (you'll be redirected after setup)
2. Select your database from the dashboard
3. Navigate to **Details** or **Settings** tab
4. Copy the following values:
   - `UPSTASH_REDIS_REST_URL` (or `KV_REST_API_URL`)
   - `UPSTASH_REDIS_REST_TOKEN` (or `KV_REST_API_TOKEN`)

**Note**: The environment variable names may be automatically set by the Vercel integration. Check your project's environment variables in Vercel Dashboard.

## Step 2: Configure Environment Variables

### 2.1 Local Development (.env.local)

Create or update your `.env.local` file:

```env
# View Tracking Configuration (Upstash Redis)
# Option 1: If using standard KV environment variables
KV_REST_API_URL=https://your-redis-instance.upstash.io
KV_REST_API_TOKEN=your_redis_token_here

# Option 2: If using Upstash-specific variables (check Vercel dashboard)
UPSTASH_REDIS_REST_URL=https://your-redis-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_redis_token_here

# IP Salt for Privacy (generate a random string)
IP_SALT=your_random_salt_string_for_ip_hashing_security

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2.2 Production Environment (Vercel)

**Note**: If you used the Vercel Marketplace integration, some environment variables may already be configured automatically.

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Check if the following are already set by the integration, if not, add them:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `KV_REST_API_URL` or `UPSTASH_REDIS_REST_URL` | Your Redis REST API URL | Production, Preview |
| `KV_REST_API_TOKEN` or `UPSTASH_REDIS_REST_TOKEN` | Your Redis REST API Token | Production, Preview |
| `IP_SALT` | Random string for IP hashing | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | https://yourdomain.com | Production |

**Important**: Check which variable naming convention your setup uses (KV_* or UPSTASH_*) and ensure your code matches.

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
2. Check the Upstash Redis dashboard for new keys:
   - `views:article-slug` (view count)
   - `view_cooldown:article-slug:hashedIP` (IP cooldown)

### 5.2 Verify IP Deduplication

1. Refresh the same article multiple times
2. View count should only increment once per 15-minute window
3. Check the Upstash Redis dashboard to see cooldown keys

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

### 6.2 Monitor Redis Usage

1. Go to Upstash Console
2. Select your database
3. Check **Metrics** or **Analytics** tab for:
   - Request count
   - Storage usage
   - Response times
   - Connection metrics

### 6.3 Debug Common Issues

**Issue: Views not incrementing**
```bash
# Check if Redis is accessible
curl https://yourdomain.com/api/views/test-slug

# Expected response:
{"success":true,"views":0}
```

**Issue: IP cooldown not working**
- Verify `IP_SALT` is set in environment variables
- Check Vercel function logs for IP detection
- Ensure Redis connection variables are correct

**Issue: High response times**
- Monitor Redis metrics in Upstash console
- Check network latency to Redis region
- Consider upgrading Redis plan if needed

**Issue: Environment variable errors**
- Verify correct variable names (KV_* vs UPSTASH_*)
- Check Vercel marketplace integration settings
- Ensure variables are set for correct environments

## Step 7: Performance Optimization

### 7.1 Redis Configuration

For optimal performance:

1. Choose Redis region closest to your users
2. Monitor request patterns in Upstash console
3. Consider upgrading Redis plan for high traffic
4. Use connection pooling if needed for high-volume applications

### 7.2 Caching Strategy

The system implements automatic caching:
- View counts cached in Redis with no expiration
- IP cooldowns expire automatically after 15 minutes (TTL)
- Analytics data expires after 24 hours
- Redis handles memory management with LRU eviction if needed

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

### 9.1 Redis Scaling

Upstash Redis automatically scales, but monitor:
- Request volume and throughput
- Storage usage and memory consumption
- Response times and latency
- Connection count and limits

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
- Verify Redis credentials in Vercel dashboard and Upstash console
- Check function logs for detailed error
- Ensure correct variable naming convention (KV_* vs UPSTASH_*)

**"Invalid slug"**
- Ensure article slug matches exactly
- Check for special characters or spaces

**"View already counted recently"**
- Normal behavior for IP deduplication
- Wait 15 minutes to test increment again

### Support Resources

1. **Upstash Redis Documentation**: https://docs.upstash.com/redis
2. **Vercel Marketplace Integrations**: https://vercel.com/integrations
3. **Next.js API Routes**: https://nextjs.org/docs/api-routes/introduction
4. **Vercel Function Logs**: Your Vercel Dashboard → Functions
5. **Upstash Console**: https://console.upstash.com/

## Success Indicators

✅ **System Working Correctly When:**
- View counts increment for new visitors
- Same IP doesn't increment within 15 minutes
- Batch API returns accurate counts
- No errors in Vercel function logs
- Upstash Redis console shows activity and metrics
- Environment variables are properly configured

## Need Help?

If you encounter issues:

1. Check Vercel function logs first
2. Verify all environment variables are set (check both Vercel and Upstash)
3. Test API endpoints manually
4. Monitor Upstash Redis console for errors and metrics
5. Verify correct environment variable naming convention
6. Check this document's troubleshooting section

The view tracking system should now be fully operational with accurate, privacy-protected analytics for your blog articles!