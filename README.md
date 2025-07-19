# anmol.am - AI-Assisted Portfolio & Technical Showcase

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/Portfolio-Live-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-15.4.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4-cyan)
![PWA](https://img.shields.io/badge/PWA-Ready-purple)

**A cutting-edge portfolio showcasing AI-assisted development methodologies and modern web technologies**

[🚀 Live Demo](https://anmol.am) | [📖 Documentation](#documentation) | [🎯 Features](#features)

</div>

## 🚨 CRITICAL GIT WORKFLOW WARNING

**NEVER WORK DIRECTLY ON MAIN BRANCH!**

Always create a feature branch:
```bash
git checkout -b feature/your-feature-name
```

See `CRITICAL_GIT_WORKFLOW.md` for complete workflow rules and safety measures.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Quick Start](#quick-start)
5. [Development Setup](#development-setup)
6. [Architecture Guide](#architecture-guide)
7. [Feature Documentation](#feature-documentation)
8. [Customization Guide](#customization-guide)
9. [Deployment Guide](#deployment-guide)
10. [API Documentation](#api-documentation)
11. [Contributing Guidelines](#contributing-guidelines)

## 🌟 Overview

This portfolio represents a comprehensive demonstration of modern web development excellence, showcasing:

- **AI-Assisted Development**: Cutting-edge development methodologies using Claude AI, Cursor AI, and other AI tools
- **Technical Solutions Architecture**: Real-world enterprise solutions including TB-scale data pipelines for UN-Habitat
- **Modern Web Technologies**: Next.js 15, React 19, TypeScript 5, and Tailwind CSS v4
- **Professional Design**: Apple-inspired liquid glass effects with advanced animations
- **Performance Excellence**: 95+ Lighthouse scores across all metrics

## 🚀 Features

### Core Portfolio Features
- ✨ **Modern Design System**: Liquid glass effects and advanced animations
- 🌙 **Dark/Light Mode**: System-aware theme switching with seamless transitions
- 📱 **Mobile-First Responsive**: Comprehensive responsive design with touch-friendly interactions
- ⚡ **Performance Optimized**: 95+ Lighthouse scores across all metrics
- 🔍 **SEO Excellence**: Complete meta tags, sitemap, and structured data

### Advanced UI/UX Features
- 🎯 **Command Palette**: Advanced search/navigation system (⌘K) with semantic search
- 📊 **Live Analytics Dashboard**: Real-time visitor counter and engagement tracking
- 🔄 **GitHub Integration**: Live GitHub activity feed with real repository data
- 📱 **PWA Ready**: Progressive Web App with offline support and install prompts
- 🎨 **Interactive Animations**: Neural network patterns, 3D cards, and parallax effects

### Phase 4 Advanced Features
- 📈 **Real-time Analytics**: Live visitor metrics and comprehensive analytics
- 🐙 **GitHub Activity Feed**: Live integration showing commits, PRs, and repository activity
- ⌨️ **Enhanced Command Palette**: Full-featured search across all content
- 🎵 **Spotify Integration**: Framework ready for real-time music status (currently mock)
- ⚡ **Performance Dashboard**: Real-time Core Web Vitals monitoring

### Mobile Optimizations
- 👆 **Touch-Friendly Design**: 44px minimum touch targets throughout
- 📏 **Responsive Breakpoints**: Mobile-first approach with progressive enhancement
- 🔄 **Mobile Search Access**: Dedicated mobile search functionality
- 📱 **Optimized Layouts**: Mobile-specific spacing and component sizing

## 🛠️ Technology Stack

### Frontend Core
- **[Next.js 15.4.1](https://nextjs.org)** - React framework with App Router
- **[React 19.1.0](https://react.dev)** - Latest React with concurrent features
- **[TypeScript 5](https://typescriptlang.org)** - Full type safety throughout
- **[Tailwind CSS v4](https://tailwindcss.com)** - Next-generation utility-first CSS

### UI/UX Libraries
- **[Framer Motion 12.23.6](https://framer.com/motion)** - Advanced animations and micro-interactions
- **[Lucide React 0.469.0](https://lucide.dev)** - Modern, consistent icon system
- **[next-themes 0.4.5](https://github.com/pacocoursey/next-themes)** - Seamless theme switching
- **[clsx 2.1.1](https://github.com/lukeed/clsx)** - Conditional className utilities

### Content & Forms
- **[React Hook Form 7.54.2](https://react-hook-form.com)** - Performant forms with validation
- **[@next/mdx 15.4.1](https://nextjs.org/docs/app/building-your-application/configuring/mdx)** - MDX support for blog content
- **[gray-matter 4.0.3](https://github.com/jonschlinkert/gray-matter)** - Front matter parsing
- **[reading-time 1.5.0](https://github.com/ngryman/reading-time)** - Reading time calculation

### Analytics & Performance
- **[@vercel/analytics 1.4.1](https://vercel.com/analytics)** - Real-time performance analytics
- **Custom Service Worker** - PWA implementation with intelligent caching
- **GitHub API Integration** - Real-time repository activity

### Development Tools
- **ESLint 9** - Latest linting with comprehensive Next.js rules
- **Custom Git Workflow** - Advanced branching strategy with protection mechanisms

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** and npm
- **Git** for version control
- **Modern browser** with PWA support

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/anmolmanchanda/anmol.am.git
cd anmol.am
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
# Create environment file (no .env.example currently exists)
touch .env.local
```

4. **Run the development server:**
```bash
npm run dev
```

5. **Open your browser:**
Visit [http://localhost:3000](http://localhost:3000) to see the portfolio.

## 💻 Development Setup

### Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Analytics (Optional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id

# Contact Form (Required for contact functionality)
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=your@email.com

# GitHub Integration (Optional - fallback to public API)
GITHUB_TOKEN=your_github_personal_access_token

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Development Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Git Workflow Safety
npm run check-branch    # Check current git branch
npm run safe-branch     # Display current branch with warnings
npm run protect-main    # Display main branch protection reminder
```

### Git Workflow Rules

⚠️ **Critical**: This project enforces strict git workflow rules:

1. **Never work directly on main branch**
2. **Always create feature branches**: `git checkout -b feature/your-feature-name`
3. **Pre-commit hooks** prevent direct commits to main
4. **Multiple safety reminders** throughout the development process

See `CRITICAL_GIT_WORKFLOW.md` for complete guidelines.

## 🏗️ Architecture Guide

### Project Structure
```
anmol.am/
├── app/                     # Next.js App Router
│   ├── layout.tsx          # Root layout with providers and meta tags
│   ├── page.tsx            # Homepage composition
│   ├── globals.css         # Global styles with custom animations
│   ├── about/              # About page with interactive timeline
│   ├── projects/           # Projects showcase with dynamic routes
│   ├── blog/               # Blog with MDX support
│   ├── contact/            # Contact form with email integration
│   ├── personal/           # Personal interests and links
│   └── api/                # API routes
│       ├── analytics/      # Real-time analytics endpoint
│       └── contact/        # Contact form submission
├── components/             # Modular React components
│   ├── CommandPalette.tsx  # Advanced search functionality
│   ├── Phase4Features.tsx  # Live dashboard components
│   ├── InteractiveEffects.tsx # Animation and parallax systems
│   ├── DrribbleInspiredFeatures.tsx # Advanced UI components
│   ├── Header.tsx          # Navigation with mobile optimization
│   ├── Footer.tsx          # Footer with live dashboard
│   └── [other components]  # UI building blocks
├── lib/                    # Utilities and configuration
│   ├── config.ts          # Site configuration
│   ├── utils.ts           # Utility functions
│   └── validations.ts     # Form validation schemas
├── types/                  # TypeScript definitions
│   └── index.ts           # Custom type definitions
├── public/                 # Static assets
│   ├── images/            # Optimized images and avatars
│   │   ├── home_avatar.JPG      # Home page avatar
│   │   ├── about_avatar.JPG     # About page avatar
│   │   ├── life_avatar.jpeg     # Personal page avatar
│   │   └── [org logos]          # Organization logos
│   ├── manifest.json      # PWA manifest
│   └── sw.js             # Service worker
├── CRITICAL_GIT_WORKFLOW.md # Comprehensive git workflow documentation
├── GIT_SAFETY_REMINDERS.txt # Additional safety reminders
└── Configuration files     # Next.js, Vercel, TypeScript configs
```

### Component Architecture

**Design Principles:**
- **Single Responsibility**: Each component has one clear purpose
- **Composable Structure**: Homepage built from independent, reusable sections
- **Type Safety**: Full TypeScript coverage with custom interfaces
- **Performance First**: Server components by default, client components only when needed

**Key Components:**
- `CommandPalette.tsx`: Advanced search with keyboard navigation
- `Phase4Features.tsx`: Real-time analytics and GitHub integration
- `InteractiveEffects.tsx`: Animation system with scroll triggers
- `DrribbleInspiredFeatures.tsx`: 3D effects and liquid glass components

## 📖 Feature Documentation

### Command Palette (⌘K)

Advanced search and navigation system:

**Usage:**
- **Open**: `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux)
- **Navigate**: Arrow keys ↑↓
- **Select**: Enter
- **Close**: Escape

**Features:**
- Semantic search across all content
- Keyboard-first navigation
- Mobile touch support
- Recently accessed items

### Real-time Analytics Dashboard

Live visitor tracking and engagement metrics:

**Features:**
- Real-time visitor counter
- Unique visitors tracking
- Online user indicator
- Fallback to localStorage for basic metrics

**Setup:**
```env
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
```

### GitHub Integration

Live repository activity feed:

**Features:**
- Real-time commit activity
- Pull request updates
- Repository statistics
- Automatic fallback to mock data

**Configuration:**
```env
GITHUB_TOKEN=your_personal_access_token  # Optional for higher rate limits
```

### Progressive Web App (PWA)

Complete PWA implementation:

**Features:**
- Offline support with intelligent caching
- Install prompts on supported devices
- App-like experience on mobile
- Background sync for analytics

**Installation:**
- **Desktop**: Install button appears in address bar
- **Mobile**: "Add to Home Screen" prompt
- **Programmatic**: Install button in footer

### Mobile Optimizations

Comprehensive mobile-first design:

**Touch Targets:**
- Minimum 44px touch targets throughout
- Optimized spacing for thumb navigation
- Enhanced button sizes on mobile

**Responsive Design:**
- Mobile-first breakpoint strategy
- Progressive enhancement for larger screens
- Optimized content density per device

## 🎨 Customization Guide

### Personal Information

Edit `lib/config.ts` to update site configuration:

```typescript
export const siteConfig = {
  name: "Your Name",
  title: "Your Professional Title",
  url: "https://yourdomain.com",
  email: "your@email.com",
  description: "Your professional description",
  keywords: ["keyword1", "keyword2"],
  author: {
    name: "Your Name",
    email: "your@email.com",
    twitter: "@yourhandle"
  },
  links: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourprofile",
    // ... other social links
  }
}
```

### Content Management

**Projects:**
- Edit the projects array in `app/projects/page.tsx`
- Add project images to `public/images/projects/`
- Update project metadata and descriptions

**Experience & Education:**
- Modify experience data in `app/about/page.tsx`
- Update timeline entries and achievements
- Replace organization logos in `public/images/`

**Personal Interests:**
- Update links and descriptions in `app/personal/page.tsx`
- Modify categories and platform links

### Avatar Images

Page-specific avatars are located in `public/images/`:

```
public/images/
├── home_avatar.JPG      # Professional headshot (home page)
├── about_avatar.JPG     # Business portrait (about page)
└── life_avatar.jpeg     # Casual photo (personal page)
```

### Styling & Theming

**Color System:**
Update CSS variables in `app/globals.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... other color variables */
}

[data-theme="dark"] {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode variables */
}
```

**Animation System:**
Customize animation timings and effects:

```css
@keyframes neural-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
}

.neural-glow {
  animation: neural-pulse 3s ease-in-out infinite;
}
```

**Typography:**
Modify font imports in `app/layout.tsx`:

```typescript
import { Inter, JetBrains_Mono } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
const mono = JetBrains_Mono({ subsets: ["latin"] })
```

## 🚀 Deployment Guide

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Import to Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository

3. **Configure Environment Variables:**
```env
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=your@email.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

4. **Deploy:**
   - Vercel automatically deploys on push to main
   - Preview deployments for feature branches

### Custom Domain Setup

1. **Add Domain in Vercel:**
   - Go to Project Settings → Domains
   - Add your custom domain

2. **Configure DNS:**
   - Add CNAME record pointing to `cname.vercel-dns.com`
   - Or A record pointing to Vercel's IP

3. **Update Configuration:**
```typescript
// lib/config.ts
export const siteConfig = {
  url: "https://yourdomain.com",
  // ... other config
}
```

### Performance Optimization

**Build Optimization:**
```bash
npm run build  # Optimized production build
npm run start  # Start production server locally
```

**Lighthouse Optimization:**
- Images are optimized with Next.js Image component
- Critical CSS is inlined automatically
- JavaScript is code-split by route
- Service worker provides intelligent caching

## 📡 API Documentation

### Analytics Endpoint

**Endpoint:** `GET /api/analytics`

**Response:**
```json
{
  "totalVisits": 1234,
  "uniqueVisitors": 867,
  "onlineNow": 5,
  "bounceRate": 32.5,
  "avgSession": "3:45"
}
```

**Features:**
- Real-time visitor tracking
- Fallback to localStorage
- Privacy-focused implementation

### Contact Form Endpoint

**Endpoint:** `POST /api/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello, I'd like to discuss..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

**Email Services Supported:**
- **Resend** (recommended)
- **SendGrid**
- **Nodemailer** (SMTP)

### GitHub Integration

**Live Activity Feed:**
- Fetches from GitHub API: `https://api.github.com/users/anmolmanchanda/events/public`
- Filters for commits, PRs, and repository activity
- Graceful fallback to mock data

**Rate Limiting:**
- Public API: 60 requests/hour
- Authenticated: 5000 requests/hour (with GITHUB_TOKEN)

## 🤝 Contributing Guidelines

### Development Workflow

1. **Never work on main branch:**
```bash
git checkout -b feature/your-feature-name
```

2. **Make your changes:**
   - Follow existing code style
   - Add TypeScript types for new features
   - Update documentation for significant changes

3. **Test your changes:**
```bash
npm run lint     # Check code style
npm run build    # Ensure build succeeds
```

4. **Commit with descriptive messages:**
```bash
git add .
git commit -m "Add real-time analytics dashboard

- Implement visitor counter with localStorage fallback
- Add online user indicator
- Integrate with Vercel Analytics API
- Add responsive mobile layout"
```

5. **Push and create PR:**
```bash
git push -u origin feature/your-feature-name
```

### Code Style Guidelines

**TypeScript:**
- Use interfaces for object types
- Prefer `const` assertions for literal types
- Include JSDoc comments for complex functions

**Components:**
- Use functional components with hooks
- Implement proper prop types
- Follow single responsibility principle

**Styling:**
- Use Tailwind CSS utility classes
- Prefer composition over long className strings
- Use CSS variables for theme values

### Git Safety Measures

This project includes multiple safety measures:

1. **Pre-commit hooks** prevent direct commits to main
2. **Multiple reminder files** document the workflow
3. **NPM scripts** provide branch checking utilities
4. **Comprehensive documentation** in `CRITICAL_GIT_WORKFLOW.md`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

### Technologies
- **[Next.js](https://nextjs.org)** - React framework
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS
- **[Framer Motion](https://framer.com/motion)** - Animation library
- **[Lucide](https://lucide.dev)** - Icon library
- **[Vercel](https://vercel.com)** - Deployment platform

### Design Inspiration
- Apple's design philosophy and liquid glass effects
- Modern portfolio websites and professional showcases
- AI-assisted development methodologies

### AI Development Tools
- **Claude AI** - Primary development assistant
- **Cursor AI** - Code completion and assistance
- **GitHub Copilot** - Additional code suggestions

---

<div align="center">

**Built with ❤️ by [Anmol Manchanda](https://anmol.am)**

*Demonstrating the future of AI-assisted development*

[🚀 View Live](https://anmol.am) | [📧 Contact](mailto:hi@anmol.am) | [💼 LinkedIn](https://linkedin.com/in/anmolmanchanda)

</div>