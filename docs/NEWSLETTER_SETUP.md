# Complete Newsletter Setup Guide

## 🚀 Quick Start

### 1. Proton Mail Setup (5 minutes)
1. Log into Proton Mail
2. Go to Settings → Addresses → Add address
3. Create these aliases:
   - `newsletter@anmol.am` (for newsletter)
   - `hello@anmol.am` (general contact)
   - `noreply@anmol.am` (transactional)

### 2. Buttondown Setup (10 minutes)

1. **Sign up** at [buttondown.email](https://buttondown.email)
2. **Get API Key**:
   - Settings → Programming
   - Copy API key
   - Add to `.env.development.local`:
   ```env
   BUTTONDOWN_API_KEY=your-key-here
   ```

3. **Configure Custom Domain** ($50 one-time):
   - Settings → Custom Domain
   - Enter: `anmol.am`
   - Add DNS records to Vercel (see DNS_CONFIGURATION.md)
   - Verify domain

4. **Set From Address**:
   - Settings → Basics
   - From email: `newsletter@anmol.am`
   - From name: `Anmol Manchanda`
   - Reply-to: `newsletter@anmol.am`

5. **Create Tags** (for streams):
   - Go to Subscribers → Tags
   - Create: `work`, `personal`, `all`

### 3. Resend Setup (5 minutes)

1. **Sign up** at [resend.com](https://resend.com)
2. **Add Domain**:
   - Domains → Add Domain
   - Enter: `anmol.am`
   - Add DNS records to Vercel
   - Verify domain
3. **Get API Key**:
   - API Keys → Create
   - Add to `.env.development.local`:
   ```env
   RESEND_API_KEY=re_xxxxx
   ```

### 4. DNS Configuration (10 minutes)

In Vercel Dashboard → Domains → anmol.am → DNS:

```dns
# Combined SPF (all services)
TXT @ "v=spf1 include:_spf.protonmail.ch include:spf.buttondown.email include:amazonses.com ~all"

# DKIM records (each service provides their own)
CNAME protonmail._domainkey [from-proton]
TXT buttondown._domainkey [from-buttondown]
CNAME resend._domainkey [from-resend]

# DMARC
TXT _dmarc "v=DMARC1; p=quarantine; rua=mailto:dmarc@anmol.am"
```

### 5. Environment Variables

Complete `.env.development.local`:
```env
# Buttondown
BUTTONDOWN_API_KEY=your-buttondown-key

# Resend  
RESEND_API_KEY=re_your-resend-key

# Email Config
EMAIL_FROM=newsletter@anmol.am
EMAIL_REPLY_TO=newsletter@anmol.am

# Upstash Redis (already configured)
UPSTASH_REDIS_REST_URL=https://xxx
UPSTASH_REDIS_REST_TOKEN=xxx
```

## 📧 Email Flow

### Newsletter Subscription Flow:
1. User selects streams (work/personal/all)
2. Subscribes via form
3. Stored in Redis + Buttondown
4. Welcome email sent
5. Tagged by stream preference

### Publishing Flow:
1. Write content on portfolio
2. Choose stream (work/personal)
3. Send via Buttondown to tagged subscribers
4. Replies go to Proton inbox

### Transactional Flow:
1. Contact form → Resend API
2. Sends from `hello@anmol.am`
3. Notification to your Proton inbox

## 🧪 Testing

### 1. Test Newsletter Subscription:
```bash
curl -X POST http://localhost:3000/api/newsletter/buttondown \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","streams":["work","personal"]}'
```

### 2. Test Email Delivery:
- Subscribe with your personal email
- Check welcome email arrives
- Verify "From" shows `newsletter@anmol.am`
- Reply and verify it reaches Proton

### 3. Verify DNS:
- [MXToolbox SPF Check](https://mxtoolbox.com/spf.aspx)
- [Mail-Tester](https://www.mail-tester.com/)
- Send test email, should score 9+/10

## 📊 Costs

| Service | Subscribers | Cost/Month |
|---------|------------|------------|
| Proton Plus | - | Already paying |
| Buttondown | 0-1000 | FREE |
| Buttondown | 1001-2000 | $5 USD (~$7 CAD) |
| Resend | 0-100/day | FREE |
| Upstash Redis | 0-10k commands | FREE |

**Total for 0-1000 subs: $0 extra**

## 🎯 Stream Management

### Content Streams:
- **Work**: Technical articles, tutorials
- **Personal**: Life updates, thoughts
- **All**: Everything

### Publishing by Stream:
```javascript
// In Buttondown, send to specific tag:
To: subscribers with tag "work"
Subject: "New Article: Building at Scale"

// Or send to all:
To: all subscribers
```

### Subscriber Preferences:
Users can update at: `anmol.am/newsletter/preferences`

## 🚨 Important Notes

1. **Domain Verification**: Can take 24-48 hours
2. **First Email**: Send test before real campaign
3. **Replies**: All go to Proton inbox
4. **Unsubscribe**: Handled automatically by Buttondown
5. **Backup**: All subscribers backed up in Redis

## 📈 Growth Path

**0-1000 subscribers**: Current setup (FREE)
**1001-5000**: Pay Buttondown $5-20/month
**5000+**: Consider self-hosting Ghost

## ✅ Checklist

- [ ] Proton aliases created
- [ ] Buttondown account setup
- [ ] Buttondown API key added
- [ ] Resend account setup
- [ ] Resend API key added
- [ ] DNS records updated
- [ ] Domain verified (both services)
- [ ] Test email sent
- [ ] Welcome email works
- [ ] Replies reach Proton

---

**Support**: 
- Buttondown: support@buttondown.email
- Resend: support@resend.com
- Proton: proton.me/support