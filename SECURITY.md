# Security Configuration Guide

This document provides step-by-step instructions for securing your anmol.am portfolio website.

## 🔒 Critical Security Setup

### 1. IP Salt Configuration (REQUIRED)

The IP salt is used to hash visitor IP addresses before storage, protecting user privacy.

**Steps:**

1. Generate a secure random salt:
   ```bash
   openssl rand -base64 32
   ```

2. Copy the output and add to your `.env.local`:
   ```bash
   IP_SALT=your_generated_random_string_here
   ```

3. **NEVER commit this value to git!** It must remain secret.

**Why this matters:**
- Without a salt, hashed IPs could be vulnerable to rainbow table attacks
- The salt ensures visitor privacy even if the database is compromised
- Required for GDPR/CCPA compliance

---

### 2. Upstash Redis Configuration (REQUIRED)

Redis is used to store view counts and analytics data.

**Steps:**

1. Create a free account at [Upstash](https://console.upstash.com/)

2. Create a new Redis database:
   - Go to the Upstash Console
   - Click "Create Database"
   - Choose a region close to your users
   - Select the free tier

3. Copy your credentials from the dashboard:
   - Click on your database
   - Go to "REST API" section
   - Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`

4. Add to `.env.local`:
   ```bash
   UPSTASH_REDIS_REST_URL=https://your-redis-instance.upstash.io
   UPSTASH_REDIS_REST_TOKEN=your_token_here

   # Also set these for Vercel KV compatibility
   KV_REST_API_URL=https://your-redis-instance.upstash.io
   KV_REST_API_TOKEN=your_token_here
   ```

5. **For production (Vercel):**
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add both `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
   - Also add `KV_REST_API_URL` and `KV_REST_API_TOKEN` with the same values
   - Add `IP_SALT` with your generated salt

---

### 3. Admin Password Configuration (RECOMMENDED)

The `/admin` page allows you to update personal stats displayed on your site.

**Default Security Risk:**
- Currently uses password `admin123` (INSECURE!)
- Anyone can access `/admin` with this default password

**Steps to secure:**

1. Choose a strong password (e.g., `MyS3cur3P@ssw0rd!`)

2. Generate SHA-256 hash:
   ```bash
   echo -n "MyS3cur3P@ssw0rd!" | shasum -a 256
   ```

3. Copy the hash (first part, without trailing ` -`)

4. Add to `.env.local`:
   ```bash
   ADMIN_PASSWORD_HASH=5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8
   ```

5. **For production (Vercel):**
   - Add `ADMIN_PASSWORD_HASH` to your environment variables

**Alternative:**
If you don't plan to use `/admin`, you can leave it as is, but be aware anyone can access it with `admin123`.

---

## 🛡️ Production Deployment Checklist

Before deploying to production, ensure:

- [ ] `IP_SALT` is set in environment variables (Vercel/hosting platform)
- [ ] `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are set
- [ ] `KV_REST_API_URL` and `KV_REST_API_TOKEN` are set (same as Upstash)
- [ ] `ADMIN_PASSWORD_HASH` is set to a secure hash (if using admin panel)
- [ ] `.env.local` is in `.gitignore` (never commit secrets!)
- [ ] Contact form email credentials are configured (`RESEND_API_KEY`)
- [ ] `NEXT_PUBLIC_SITE_URL` is set to your production domain

---

## 🔐 Security Features Already Implemented

Your site includes these security measures out of the box:

### IP Address Protection
- All IP addresses are hashed with SHA-256 before storage
- Salt prevents rainbow table attacks
- IPs never stored in plain text

### Security Headers
Configured in `next.config.ts`:
- `X-Frame-Options: DENY` - Prevents clickjacking
- `X-Content-Type-Options: nosniff` - Prevents MIME sniffing
- `X-XSS-Protection` - Browser XSS protection
- `Content-Security-Policy` - Controls resource loading
- `Referrer-Policy` - Controls referrer information

### Data Retention
- Detailed analytics expire after 24 hours
- View counts persist but contain no PII
- No long-term storage of personal data

### Privacy-First Tracking
- No Google Analytics
- No advertising trackers
- No cookies except essential ones
- Anonymous page view counting only

---

## 🔍 Testing Your Security Setup

### 1. Verify IP Hashing

Check logs to ensure IPs are being hashed:
```bash
# In production, check Vercel logs
# Look for hashed IPs (long hex strings) instead of plain IPs
```

### 2. Test Admin Authentication

1. Navigate to `/admin`
2. Try the old password `admin123` - should fail
3. Use your new password - should succeed

### 3. Verify Redis Connection

Check that view counts are incrementing:
1. Visit a blog post or project page
2. Refresh the page
3. View count should NOT increment (15-minute cooldown)
4. Wait 15 minutes and refresh - should increment

---

## 🚨 Security Incident Response

If you suspect a security breach:

1. **Immediately rotate credentials:**
   ```bash
   # Generate new IP salt
   openssl rand -base64 32

   # Update in Vercel environment variables
   ```

2. **Check Upstash Redis logs:**
   - Go to Upstash Console
   - Check for unusual access patterns

3. **Reset admin password:**
   ```bash
   echo -n "NewSecurePassword123!" | shasum -a 256
   # Update ADMIN_PASSWORD_HASH
   ```

4. **Review Vercel logs:**
   - Check for suspicious API calls
   - Look for unusual traffic patterns

---

## 📞 Questions or Concerns?

If you discover a security vulnerability:

1. **DO NOT** open a public GitHub issue
2. Email: anmol@anmol.am
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact

---

## ✅ Quick Setup Script

Run this to set up all security variables at once:

```bash
# Generate and set IP_SALT
echo "IP_SALT=$(openssl rand -base64 32)" >> .env.local

# Prompt for admin password
echo "Enter your admin password:"
read -s ADMIN_PASS
echo "ADMIN_PASSWORD_HASH=$(echo -n "$ADMIN_PASS" | shasum -a 256 | cut -d ' ' -f1)" >> .env.local

echo "✅ Security variables set in .env.local"
echo "⚠️  Remember to set these in Vercel environment variables for production!"
```

**After running:**
- Manually add Upstash Redis credentials to `.env.local`
- Copy all variables to Vercel environment settings

---

## 📚 Additional Resources

- [Upstash Redis Docs](https://docs.upstash.com/redis)
- [Next.js Security Best Practices](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

---

Last updated: January 2025
