# DNS Configuration for Email & Newsletter

## Required DNS Records (Add in Vercel Dashboard)

### 1. Proton Mail Records (Already Set)
These should already be configured if you're receiving emails:

```dns
# MX Records (Mail receiving)
MX    10    mail.protonmail.ch
MX    20    mailsec.protonmail.ch

# SPF Record (Sending verification)
TXT    "v=spf1 include:_spf.protonmail.ch ~all"

# DKIM (Proton's signing)
protonmail._domainkey    CNAME    protonmail.domainkey.[yourkey].domains.proton.ch

# DMARC (Email authentication)
_dmarc    TXT    "v=DMARC1; p=quarantine; rua=mailto:dmarc@anmol.am"
```

### 2. Buttondown Records (For Newsletter)

After signing up for Buttondown, add these:

```dns
# Update SPF to include Buttondown
TXT    "v=spf1 include:_spf.protonmail.ch include:spf.buttondown.email ~all"

# DKIM for Buttondown (they'll provide the key)
buttondown._domainkey    TXT    "k=rsa; p=[key-from-buttondown]"
```

### 3. Resend Records (For Transactional)

After configuring Resend:

```dns
# Update SPF to include Resend
TXT    "v=spf1 include:_spf.protonmail.ch include:spf.buttondown.email include:amazonses.com ~all"

# DKIM for Resend (they'll provide)
resend._domainkey    CNAME    [value-from-resend].amazonses.com
```

## Final SPF Record (All Services)

```dns
TXT    "v=spf1 include:_spf.protonmail.ch include:spf.buttondown.email include:amazonses.com ~all"
```

## Verification Steps

1. **Proton Mail**: Should already be working
2. **Buttondown**: 
   - Go to Settings → Custom Domain
   - Enter anmol.am
   - Add provided DNS records
   - Verify domain
3. **Resend**:
   - Go to Domains → Add Domain
   - Enter anmol.am
   - Add provided DNS records
   - Verify domain

## Testing

Use these tools to verify configuration:
- [MXToolbox](https://mxtoolbox.com/SuperTool.aspx)
- [Mail-Tester](https://www.mail-tester.com/)
- [DMARC Analyzer](https://dmarcanalyzer.com/)

## Important Notes

- DNS changes can take 24-48 hours to propagate
- SPF record must include ALL sending services
- DKIM keys are unique per service
- DMARC helps prevent spoofing