# DNS Configuration for Email (Simplified)

## Required DNS Records (Add in Vercel Dashboard)

### 1. Proton Mail Records (For Receiving)
These should already be configured if you're receiving emails:

```dns
# MX Records (Mail receiving)
MX    10    mail.protonmail.ch
MX    20    mailsec.protonmail.ch

# SPF Record (Allows Proton to send on your behalf)
TXT    "v=spf1 include:_spf.protonmail.ch ~all"

# DKIM (Proton's signing key)
protonmail._domainkey    CNAME    protonmail.domainkey.[yourkey].domains.proton.ch

# DMARC (Email authentication policy)
_dmarc    TXT    "v=DMARC1; p=quarantine"
```

### 2. Buttondown Records (For Newsletter Sending)

After setting up custom domain in Buttondown ($50 one-time):

```dns
# Update SPF to include Buttondown
TXT    "v=spf1 include:_spf.protonmail.ch include:spf.buttondown.email ~all"

# DKIM for Buttondown (they'll provide the exact key)
buttondown._domainkey    TXT    "k=rsa; p=[key-from-buttondown]"
```

## Verification Steps

1. **Proton Mail**: Should already be working
2. **Buttondown**: 
   - Go to Settings → Custom Domain
   - Enter anmol.am
   - Pay $50 one-time fee
   - Add provided DNS records
   - Click Verify

## Testing

Use these tools to verify configuration:
- [MXToolbox](https://mxtoolbox.com/SuperTool.aspx)
- [Mail-Tester](https://www.mail-tester.com/)

## Important Notes

- DNS changes can take 24-48 hours to propagate
- SPF record must include ALL services that send email
- The custom domain fee for Buttondown is optional but recommended for professionalism
- Without custom domain, emails come from @buttondown.email

## Email Flow

```
Receiving (all emails):
anmol.am → Proton Mail → Your inbox

Sending (newsletter):
Buttondown → notes@anmol.am → Subscribers
```

That's it! Much simpler than multiple services.