# 🔒 Security Protocols & Best Practices

## 🛡️ Security Overview

**Security Level**: Production-Ready  
**Compliance**: GDPR, WCAG 2.1  
**Last Audit**: January 2025  

## 🔐 Authentication & Authorization

### Environment Variables
```bash
# NEVER commit secrets to git
# Use .env.local for local development
# Use Vercel environment variables for production

# Good Practice
NEXT_PUBLIC_API_URL=https://api.anmol.am  # Public URLs are OK
API_SECRET_KEY=${process.env.API_SECRET_KEY}  # Private keys from env

# Bad Practice
API_KEY="sk_live_abc123"  # NEVER hardcode secrets
```

### API Key Management
```typescript
// Always validate API keys server-side
export async function POST(request: Request) {
  const apiKey = request.headers.get('x-api-key')
  
  if (!apiKey || apiKey !== process.env.API_SECRET_KEY) {
    return new Response('Unauthorized', { status: 401 })
  }
  
  // Process request...
}
```

## 🛡️ Input Validation & Sanitization

### Form Validation
```typescript
import { z } from 'zod'

// Define schema
const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
})

// Validate input
export async function POST(request: Request) {
  const body = await request.json()
  
  try {
    const validated = contactSchema.parse(body)
    // Process validated data
  } catch (error) {
    return new Response('Invalid input', { status: 400 })
  }
}
```

### SQL Injection Prevention
```typescript
// NEVER do this
const query = `SELECT * FROM users WHERE id = ${userId}`

// Always use parameterized queries
const query = 'SELECT * FROM users WHERE id = ?'
const result = await db.query(query, [userId])
```

### XSS Prevention
```typescript
// Sanitize user input
import DOMPurify from 'isomorphic-dompurify'

const sanitized = DOMPurify.sanitize(userInput)

// React automatically escapes values
<div>{userInput}</div>  // Safe

// Dangerous - only use with trusted content
<div dangerouslySetInnerHTML={{ __html: trustedHTML }} />
```

## 🔒 Security Headers

### Next.js Middleware
```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  // Content Security Policy
  response.headers.set('Content-Security-Policy', `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' *.vercel-insights.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https:;
    font-src 'self' data:;
    connect-src 'self' *.vercel-insights.com api.github.com;
    frame-ancestors 'none';
  `.replace(/\s+/g, ' ').trim())
  
  return response
}
```

### CORS Configuration
```typescript
// app/api/route.ts
export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://anmol.am',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  })
}
```

## 🔑 Authentication Best Practices

### Session Management
```typescript
// Use secure session cookies
import { cookies } from 'next/headers'

export async function createSession(userId: string) {
  const sessionToken = crypto.randomUUID()
  
  cookies().set('session', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  })
  
  // Store session in database
  await saveSession(sessionToken, userId)
}
```

### Password Security
```typescript
// Never store plain text passwords
import bcrypt from 'bcryptjs'

// Hash password
const hashedPassword = await bcrypt.hash(password, 12)

// Verify password
const isValid = await bcrypt.compare(password, hashedPassword)
```

## 🚨 Rate Limiting

### API Rate Limiting
```typescript
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP',
})

// Apply to API routes
export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  
  if (await isRateLimited(ip)) {
    return new Response('Too many requests', { status: 429 })
  }
  
  // Process request...
}
```

### DDoS Protection
```typescript
// Implement request throttling
const requestCounts = new Map()

export async function middleware(request: NextRequest) {
  const ip = request.ip || 'unknown'
  const count = requestCounts.get(ip) || 0
  
  if (count > 1000) { // 1000 requests per minute
    return new Response('Too many requests', { status: 429 })
  }
  
  requestCounts.set(ip, count + 1)
  
  // Clear counts every minute
  setTimeout(() => requestCounts.delete(ip), 60000)
}
```

## 🔍 Security Auditing

### Dependency Scanning
```bash
# Check for vulnerabilities
npm audit

# Fix automatically
npm audit fix

# Force fixes (careful!)
npm audit fix --force

# Use Snyk for advanced scanning
npx snyk test
npx snyk monitor
```

### Code Scanning
```yaml
# .github/workflows/security.yml
name: Security Scan
on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Run Snyk
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
      
      - name: CodeQL Analysis
        uses: github/codeql-action/analyze@v2
```

## 🗝️ Secrets Management

### Environment Variable Security
```bash
# .env.local (git ignored)
DATABASE_URL=postgresql://...
API_SECRET_KEY=sk_live_...
SMTP_PASSWORD=...

# .env.example (committed)
DATABASE_URL=postgresql://user:pass@host:5432/db
API_SECRET_KEY=your_api_key_here
SMTP_PASSWORD=your_smtp_password_here
```

### Vercel Environment Variables
```bash
# Set production secrets
vercel env add DATABASE_URL production
vercel env add API_SECRET_KEY production

# Never log secrets
console.log(process.env.API_KEY) // BAD
console.log('API Key is set:', !!process.env.API_KEY) // OK
```

## 🛡️ Data Protection

### Personal Data Handling
```typescript
// GDPR Compliance
interface UserData {
  id: string
  email: string // PII - handle carefully
  name?: string // PII - optional
  preferences: object // Non-PII
}

// Data minimization
function collectUserData(input: any): UserData {
  return {
    id: generateId(),
    email: input.email, // Only collect what's needed
    preferences: input.preferences || {}
  }
}

// Right to deletion
async function deleteUserData(userId: string) {
  await db.user.delete({ where: { id: userId } })
  await db.session.deleteMany({ where: { userId } })
  // Delete from all systems
}
```

### Encryption
```typescript
import crypto from 'crypto'

// Encrypt sensitive data
function encrypt(text: string): string {
  const algorithm = 'aes-256-gcm'
  const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex')
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  
  const authTag = cipher.getAuthTag()
  
  return iv.toString('hex') + ':' + authTag.toString('hex') + ':' + encrypted
}

// Decrypt
function decrypt(encryptedData: string): string {
  const parts = encryptedData.split(':')
  const iv = Buffer.from(parts[0], 'hex')
  const authTag = Buffer.from(parts[1], 'hex')
  const encrypted = parts[2]
  
  const algorithm = 'aes-256-gcm'
  const key = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex')
  const decipher = crypto.createDecipheriv(algorithm, key, iv)
  decipher.setAuthTag(authTag)
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  
  return decrypted
}
```

## 🚫 Common Security Mistakes

### What NOT to Do
```typescript
// ❌ BAD: Exposing sensitive data in client
const API_KEY = "sk_live_abc123"

// ❌ BAD: Trusting client input
const isAdmin = request.body.isAdmin

// ❌ BAD: Using eval
eval(userInput)

// ❌ BAD: Weak random values
Math.random() // For security

// ❌ BAD: Storing passwords in plain text
database.save({ password: userPassword })

// ❌ BAD: SQL injection vulnerable
db.query(`SELECT * FROM users WHERE id = ${id}`)

// ❌ BAD: XSS vulnerable
innerHTML = userContent

// ❌ BAD: Logging sensitive data
console.log('User password:', password)
```

### What TO Do
```typescript
// ✅ GOOD: Use environment variables
const API_KEY = process.env.API_SECRET_KEY

// ✅ GOOD: Verify permissions server-side
const isAdmin = await checkUserPermissions(userId)

// ✅ GOOD: Parse JSON safely
JSON.parse(userInput)

// ✅ GOOD: Cryptographically secure random
crypto.randomBytes(32)

// ✅ GOOD: Hash passwords
const hash = await bcrypt.hash(password, 12)

// ✅ GOOD: Parameterized queries
db.query('SELECT * FROM users WHERE id = ?', [id])

// ✅ GOOD: Sanitize user content
DOMPurify.sanitize(userContent)

// ✅ GOOD: Log safely
console.log('User authenticated:', userId)
```

## 📋 Security Checklist

### Before Deploy
- [ ] All secrets in environment variables
- [ ] Input validation implemented
- [ ] SQL injection prevention
- [ ] XSS prevention measures
- [ ] CSRF protection enabled
- [ ] Rate limiting configured
- [ ] Security headers set
- [ ] HTTPS enforced
- [ ] Dependencies updated
- [ ] Security scan passed

### Regular Audits
- [ ] Weekly: Dependency updates
- [ ] Monthly: Security scan
- [ ] Quarterly: Penetration testing
- [ ] Yearly: Full security audit

## 🚨 Incident Response

### Security Breach Protocol
1. **Detect**: Monitor for unusual activity
2. **Contain**: Isolate affected systems
3. **Assess**: Determine scope of breach
4. **Notify**: Inform affected users (GDPR: within 72 hours)
5. **Remediate**: Fix vulnerability
6. **Review**: Post-incident analysis
7. **Improve**: Update security measures

### Emergency Contacts
- Security Team: security@anmol.am
- Vercel Support: support.vercel.com
- GitHub Security: github.com/security

---

**Last Updated**: January 19, 2025  
**Security Level**: High  
**Compliance**: GDPR, WCAG 2.1