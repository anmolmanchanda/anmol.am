# Simplified Newsletter Setup Guide

## 🚀 Quick Start (10 minutes total)

### 1. Proton Mail Setup (2 minutes)
Create ONE alias in Proton Mail:
- `notes@anmol.am` (for everything: newsletter, contact, transactional)

### 2. Buttondown Setup (5 minutes)

1. **Sign up** at [buttondown.email](https://buttondown.email)

2. **Get API Key**:
   - Settings → Programming
   - Copy API key
   - Add to `.env.development.local`:
   ```env
   BUTTONDOWN_API_KEY=your-key-here
   ```

3. **Configure From Address**:
   - Settings → Basics
   - From email: `notes@anmol.am`
   - From name: `Anmol Manchanda`
   - Reply-to: `notes@anmol.am`

4. **Create Tags** (for streams):
   - Go to Subscribers → Tags
   - Create: `work`, `personal`, `all`

5. **Custom Domain** (Optional - $50 one-time):
   - Settings → Custom Domain
   - Enter: `anmol.am`
   - Add DNS records to Vercel

### 3. DNS Configuration (3 minutes)

In Vercel Dashboard → Domains → anmol.am → DNS:

```dns
# SPF Record (add Buttondown to existing)
TXT @ "v=spf1 include:_spf.protonmail.ch include:spf.buttondown.email ~all"

# DKIM for Buttondown (they'll provide the key)
TXT buttondown._domainkey "k=rsa; p=[key-from-buttondown]"

# DMARC (if not already set)
TXT _dmarc "v=DMARC1; p=quarantine"
```

### 4. Environment Variables

Complete `.env.development.local`:
```env
# Buttondown
BUTTONDOWN_API_KEY=your-buttondown-key

# Email Config (optional, used in code)
EMAIL_FROM=notes@anmol.am
EMAIL_REPLY_TO=notes@anmol.am

# Upstash Redis (for view tracking, already configured)
UPSTASH_REDIS_REST_URL=https://xxx
UPSTASH_REDIS_REST_TOKEN=xxx
```

## 📧 How It Works

### Everything Through Buttondown:
- **Newsletter subscriptions** → Buttondown API
- **Welcome emails** → Buttondown automatic
- **Contact form** → Buttondown API (future)
- **Replies** → Go to your Proton `notes@` inbox

### No Need For:
- ❌ Resend (redundant)
- ❌ Redis subscriber storage (Buttondown stores)
- ❌ Multiple email services
- ❌ Complex configurations

## 🧪 Testing

### Test Newsletter Subscription:
```bash
curl -X POST http://localhost:3000/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","streams":["work"]}'
```

### Verify Setup:
1. Subscribe with your email
2. Check welcome email arrives
3. Verify "From" shows `notes@anmol.am`
4. Reply and verify it reaches Proton

## 📊 Costs

| Subscribers | Monthly Cost |
|-------------|--------------|
| 0-1000 | **FREE** |
| 1001-2000 | $5 USD (~$7 CAD) |
| 2001-5000 | $20 USD (~$27 CAD) |

## 🎯 Stream Management

### Content Streams:
- **Work**: Technical articles, tutorials
- **Personal**: Life updates, thoughts
- **All**: Everything

Users select their preference when subscribing.

## ✅ Checklist

- [ ] Create `notes@anmol.am` in Proton
- [ ] Sign up for Buttondown
- [ ] Add Buttondown API key
- [ ] Configure from address
- [ ] Create stream tags
- [ ] Update DNS records
- [ ] Test subscription
- [ ] Verify email delivery

## 🚨 That's It!

No Resend. No Redis backup. No complexity.

Just Buttondown + Proton = Professional newsletter system for FREE (up to 1000 subscribers).

---

**Support**: support@buttondown.email