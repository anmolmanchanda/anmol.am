# Redis Setup & Maintenance Guide

## ⚠️ Important: Preventing Auto-Deletion

Upstash free tier databases can be deleted if inactive for 30 days. This setup includes an **automatic keep-alive system** to prevent this.

## 🔧 Initial Setup

### 1. Create Upstash Redis Database

1. Go to: https://console.upstash.com/
2. Click "Create Database"
3. Configuration:
   - **Name:** `anmol-portfolio` (or your choice)
   - **Region:** `us-east-1` (or closest to your users)
   - **Type:** Regional (free)
4. Click "Create"

### 2. Get Your Credentials

After creating the database:
1. Click on your database name
2. Scroll to "REST API" section
3. Copy both values:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

### 3. Add to Vercel Environment Variables

Go to: https://vercel.com/anmolmanchanda/anmol-am/settings/environment-variables

Add these variables (select "Production, Preview, Development" for all):

| Variable Name | Example Value | Where to Get It |
|--------------|---------------|-----------------|
| `IP_SALT` | `Iick7i5vuzQPw9c8DB9DMC4j04aDV+DFau8FHA8nuJw=` | Run: `openssl rand -base64 32` |
| `UPSTASH_REDIS_REST_URL` | `https://your-db.upstash.io` | Upstash Console → Your DB → REST API |
| `UPSTASH_REDIS_REST_TOKEN` | `AYxxxxx...` | Upstash Console → Your DB → REST API |
| `KV_REST_API_URL` | Same as `UPSTASH_REDIS_REST_URL` | (duplicate for compatibility) |
| `KV_REST_API_TOKEN` | Same as `UPSTASH_REDIS_REST_TOKEN` | (duplicate for compatibility) |

### 4. Redeploy

After adding environment variables:
```bash
git push
```

Or manually redeploy in Vercel dashboard.

---

## 🤖 Auto Keep-Alive System

### How It Works

A Vercel Cron job runs **daily at midnight UTC** and pings Redis to keep it active.

**Configuration:** `vercel.json`
```json
{
  "crons": [
    {
      "path": "/api/cron/keep-alive",
      "schedule": "0 0 * * *"
    }
  ]
}
```

**Endpoint:** `/api/cron/keep-alive`
- Runs automatically every day
- Writes a timestamp to Redis
- Keeps database active
- Prevents auto-deletion

### Verify Cron is Running

After deployment, check Vercel:
1. Go to: https://vercel.com/anmolmanchanda/anmol-am/logs
2. Filter by: `/api/cron/keep-alive`
3. Should see daily executions

Or manually test:
```bash
curl https://anmol.am/api/cron/keep-alive
```

Expected response:
```json
{
  "success": true,
  "message": "Redis keep-alive ping successful",
  "timestamp": "2025-01-XX...",
  "verified": true
}
```

---

## 🔍 Monitoring

### Check Redis Health

**Option 1: Via Upstash Console**
1. Go to: https://console.upstash.com/
2. Click your database
3. Check "Last Activity" timestamp
4. Should update daily

**Option 2: Via API**
```bash
# Should return view count
curl https://anmol.am/api/views/test
```

**Option 3: Via Vercel Logs**
1. Go to: https://vercel.com/anmolmanchanda/anmol-am/logs
2. Search for: "Keep-alive"
3. Verify daily pings

---

## 🛠️ Troubleshooting

### "Redis not configured" Error

**Problem:** Environment variables not set

**Solution:**
1. Check Vercel → Settings → Environment Variables
2. Verify all 5 variables are present
3. Redeploy after adding

### "Ping failed" Error

**Problem:** Redis credentials invalid or database deleted

**Solution:**
1. Go to Upstash Console
2. Verify database still exists
3. Check credentials match Vercel env vars
4. Regenerate token if needed

### Database Still Deleted After 30 Days

**Problem:** Cron job not running

**Solution:**
1. Check Vercel logs for cron executions
2. Verify `vercel.json` includes cron config
3. Redeploy to activate cron
4. Manually ping: `curl https://anmol.am/api/cron/keep-alive`

---

## 📊 What's Stored in Redis

| Key Pattern | Purpose | Retention |
|------------|---------|-----------|
| `views:{slug}` | Page view counts | Permanent |
| `view_cooldown:{slug}:{hashedIP}` | 15-min duplicate prevention | 15 minutes |
| `analytics:{slug}:{timestamp}` | Detailed visit data | 24 hours |
| `tracker:data` | Personal stats from /admin | Permanent |
| `system:keepalive` | Keep-alive timestamp | 48 hours |

---

## 🔒 Security Notes

- **IP addresses are hashed** with `IP_SALT` before storage
- **No plain-text IPs** are ever saved
- **Analytics auto-expire** after 24 hours
- **Redis credentials** should never be committed to git

---

## 🆘 Emergency Recovery

If database is deleted:

1. **Create new database** in Upstash Console
2. **Update Vercel env vars** with new credentials
3. **Redeploy** - view counts will start from 0
4. **Keep-alive will auto-start** with next cron run

Note: Historical view counts cannot be recovered if database is deleted.

---

## ✅ Setup Checklist

- [ ] Upstash account created
- [ ] Redis database created
- [ ] All 5 env vars added to Vercel
- [ ] `IP_SALT` generated and added
- [ ] Redeployed after adding env vars
- [ ] Verified `/api/cron/keep-alive` works
- [ ] Checked Vercel logs for cron executions
- [ ] Tested view tracking on a page

---

Last updated: January 2025
