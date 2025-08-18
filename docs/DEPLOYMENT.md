# Deployment Guide

This guide covers comprehensive deployment strategies for the anmol.am portfolio website.

## 📋 Table of Contents

1. [Quick Deploy to Vercel](#quick-deploy-to-vercel)
2. [Alternative Deployment Platforms](#alternative-deployment-platforms)
3. [Environment Configuration](#environment-configuration)
4. [Custom Domain Setup](#custom-domain-setup)
5. [Performance Optimization](#performance-optimization)
6. [Monitoring & Analytics](#monitoring--analytics)
7. [Troubleshooting](#troubleshooting)

## 🚀 Quick Deploy to Vercel (Recommended)

Vercel is the recommended platform for Next.js applications with zero-configuration deployment.

### Prerequisites
- GitHub account with your repository
- Vercel account (free tier available)

### Step-by-Step Deployment

1. **Push your code to GitHub:**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Connect to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/login with your GitHub account
   - Click "New Project"
   - Import your `anmol.am` repository

3. **Configure Project Settings:**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Set Environment Variables:**
   ```env
   # Required
   RESEND_API_KEY=your_resend_api_key
   EMAIL_FROM=noreply@yourdomain.com
   EMAIL_TO=your@email.com
   NEXT_PUBLIC_SITE_URL=https://yourdomain.vercel.app
   
   # Optional but recommended
   NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
   GITHUB_TOKEN=your_github_token
   ```

5. **Deploy:**
   - Click "Deploy"
   - Wait for build completion (~2-3 minutes)
   - Your site will be live at `https://your-project.vercel.app`

### Automatic Deployments

Vercel automatically deploys:
- **Production**: All pushes to `main` branch
- **Preview**: All pushes to feature branches
- **Pull Requests**: Automatic preview deployments

## 🌐 Alternative Deployment Platforms

### Netlify

1. **Connect Repository:**
   - Login to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings:**
   ```
   Build command: npm run build
   Publish directory: out
   ```

3. **Add to next.config.js:**
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }
   
   module.exports = nextConfig
   ```

### AWS Amplify

1. **Connect Repository:**
   - Open AWS Amplify Console
   - Click "New app" → "Host web app"
   - Connect your GitHub repository

2. **Build Settings:**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

### Docker Deployment

1. **Create Dockerfile:**
   ```dockerfile
   FROM node:18-alpine AS base
   
   FROM base AS deps
   RUN apk add --no-cache libc6-compat
   WORKDIR /app
   COPY package.json package-lock.json ./
   RUN npm ci --only=production
   
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build
   
   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV production
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs
   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
   USER nextjs
   EXPOSE 3000
   ENV PORT 3000
   CMD ["node", "server.js"]
   ```

2. **Build and Deploy:**
   ```bash
   docker build -t anmol-portfolio .
   docker run -p 3000:3000 anmol-portfolio
   ```

## ⚙️ Environment Configuration

### Required Environment Variables

```env
# Contact Form (Required)
RESEND_API_KEY=re_your_api_key
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=your@email.com

# Site Configuration (Required)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Optional Environment Variables

```env
# Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id

# GitHub Integration
GITHUB_TOKEN=ghp_your_token
NEXT_PUBLIC_GITHUB_USERNAME=yourusername

# Future Spotify Integration
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token
```

### Platform-Specific Environment Setup

**Vercel:**
- Go to Project Settings → Environment Variables
- Add variables with appropriate environments (Production, Preview, Development)

**Netlify:**
- Go to Site Settings → Environment Variables
- Add variables (automatically applied to all deployments)

**AWS Amplify:**
- Go to App Settings → Environment Variables
- Add variables with appropriate branch mapping

## 🔗 Custom Domain Setup

### Vercel Custom Domain

1. **Add Domain:**
   - Go to Project Settings → Domains
   - Add your custom domain (e.g., `anmol.am`)

2. **Configure DNS:**
   ```
   Type: CNAME
   Name: @ (or www)
   Value: cname.vercel-dns.com
   ```

3. **SSL Certificate:**
   - Automatically provisioned by Vercel
   - Usually takes 5-10 minutes

### Netlify Custom Domain

1. **Add Domain:**
   - Go to Site Settings → Domain Management
   - Add custom domain

2. **Configure DNS:**
   ```
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   
   Type: A
   Name: @
   Value: 75.2.60.5
   ```

### Domain Verification

After setting up DNS records:

1. **Update site configuration:**
   ```typescript
   // lib/config.ts
   export const siteConfig = {
     url: "https://yourdomain.com",
     // ... other config
   }
   ```

2. **Update environment variables:**
   ```env
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

3. **Test deployment:**
   ```bash
   curl -I https://yourdomain.com
   ```

## ⚡ Performance Optimization

### Build Optimization

1. **Analyze Bundle Size:**
   ```bash
   npm run build
   npx @next/bundle-analyzer
   ```

2. **Optimize Images:**
   - All images use Next.js Image component
   - Automatic WebP conversion
   - Responsive image loading

3. **Code Splitting:**
   - Automatic route-based splitting
   - Dynamic imports for heavy components
   - Tree shaking enabled

### Production Configuration

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable SWC minification
  swcMinify: true,
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000,
  },
  
  // Compression
  compress: true,
  
  // Headers for performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
```

### CDN Configuration

**Vercel Edge Network:**
- Automatic global CDN
- Edge caching for static assets
- Automatic image optimization

**Cloudflare (Optional):**
```bash
# Set up Cloudflare for additional caching
# Configure in Cloudflare dashboard:
# - Browser Cache TTL: 1 year for static assets
# - Edge Cache TTL: 1 month for pages
# - Enable Brotli compression
```

## 📊 Monitoring & Analytics

### Vercel Analytics

1. **Enable in Vercel Dashboard:**
   - Go to Project → Analytics
   - Enable Web Analytics

2. **Add to environment:**
   ```env
   NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
   ```

3. **Already integrated in codebase:**
   ```typescript
   // app/layout.tsx
   import { Analytics } from "@vercel/analytics/react"
   // Component already included
   ```

### Google Analytics 4 (Optional)

1. **Add to environment:**
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

2. **Add to layout:**
   ```typescript
   // app/layout.tsx
   import Script from 'next/script'
   
   export default function RootLayout({ children }) {
     return (
       <html>
         <head>
           <Script
             src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
             strategy="afterInteractive"
           />
           <Script id="google-analytics" strategy="afterInteractive">
             {`
               window.dataLayer = window.dataLayer || [];
               function gtag(){dataLayer.push(arguments);}
               gtag('js', new Date());
               gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
             `}
           </Script>
         </head>
         <body>{children}</body>
       </html>
     )
   }
   ```

### Core Web Vitals Monitoring

```typescript
// lib/web-vitals.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric) {
  // Send to your analytics service
  console.log(metric)
}

getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getFCP(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
```

## 🔧 Troubleshooting

### Common Build Issues

**1. Environment Variables Not Working:**
```bash
# Check environment variables are set
echo $RESEND_API_KEY

# Verify in build logs
npm run build 2>&1 | grep "Environment"
```

**2. Image Optimization Errors:**
```bash
# Ensure images are in correct format
file public/images/home_avatar.JPG

# Check Next.js image config
cat next.config.js | grep -A 10 "images"
```

**3. TypeScript Build Errors:**
```bash
# Run type checking
npm run type-check

# Fix any TypeScript errors
npx tsc --noEmit
```

### Deployment Failures

**1. Build Command Failures:**
```bash
# Test build locally
npm run build

# Check package.json scripts
cat package.json | grep -A 5 "scripts"
```

**2. Environment Variable Issues:**
```bash
# Verify all required env vars are set
node -e "console.log(process.env.RESEND_API_KEY ? 'Set' : 'Missing')"
```

**3. DNS Issues:**
```bash
# Check DNS propagation
dig yourdomain.com
nslookup yourdomain.com

# Test SSL certificate
openssl s_client -connect yourdomain.com:443
```

### Performance Issues

**1. Slow Loading:**
```bash
# Analyze bundle size
npm run build --analyze

# Check Core Web Vitals
npm install -g lighthouse
lighthouse https://yourdomain.com
```

**2. API Rate Limiting:**
```bash
# Check GitHub API limits
curl -H "Authorization: token $GITHUB_TOKEN" \
  https://api.github.com/rate_limit
```

### Monitoring Commands

```bash
# Check site availability
curl -I https://yourdomain.com

# Monitor response times
curl -w "@curl-format.txt" -o /dev/null -s https://yourdomain.com

# Check SSL certificate expiry
echo | openssl s_client -connect yourdomain.com:443 2>/dev/null | \
  openssl x509 -noout -dates
```

## 🔄 Continuous Deployment

### GitHub Actions (Optional)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm install
      - run: npm run build
      - run: npm run test
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### Pre-deployment Checklist

- [ ] All environment variables configured
- [ ] Build passes locally (`npm run build`)
- [ ] Linting passes (`npm run lint`)
- [ ] Custom domain DNS configured
- [ ] SSL certificate working
- [ ] Analytics tracking setup
- [ ] Contact form tested
- [ ] GitHub integration working
- [ ] PWA manifest valid

---

For additional support, refer to the main [README.md](README.md) or create an issue in the repository.