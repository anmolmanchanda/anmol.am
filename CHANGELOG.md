# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2025-08-18

### Added
- **Life Timeline**: Real-time activity tracking with verified data only
  - Duolingo integration showing actual streak (1 day) and XP (3870)
  - Two daily Duolingo sessions displayed in timeline
  - Letterboxd RSS feed integration with real film data and ratings
  - Poetify blog entries with actual poem links from May 2023
  - Strava placeholder with OAuth requirement notice
  
- **External API Integrations**:
  - Duolingo API (`/api/duolingo`) for language learning stats
  - Letterboxd RSS parsing for film watching history
  - GitHub API enhancements for better activity tracking
  - Goodreads RSS ready for book tracking
  
- **UI/UX Enhancements**:
  - Aurora gradient backgrounds with holographic animations
  - Faster animation speeds (8s to 4s for Work page)
  - Life page with joyful, bright color scheme
  - Work page with professional, subtle aurora effect
  - Improved liquid glass effects on cards
  
- **Footer Updates**:
  - Added hiring email (hire@anmol.am)
  - Better responsive layout for mobile
  
### Changed
- Life stats now show real data from APIs instead of mock data
- Duolingo widget displays actual user data (1 day streak, 3870 XP)
- Timeline entries now require verifiable sources
- Aurora backgrounds differentiated per page (Work vs Life)
- Animation speeds optimized for better user experience

### Fixed
- Duolingo stats showing 0 instead of actual values
- TypeScript errors with optional chaining for API responses
- Letterboxd date parsing from RSS feed
- Life timeline showing only real, verifiable activities
- Aurora animation speed across different pages

### Removed
- All fake/mock data from Life timeline
- Placeholder meditation entries (no public APIs available)
- Mock cooking, photography, and travel entries
- Unverifiable activity entries

## [2.0.0] - 2025-08-17

### Added
- **Core Features**:
  - Reading Progress Indicator with circular visualization
  - RSS Feed generation at `/api/rss`
  - XML Sitemap at `/sitemap.xml`
  - View tracking with Redis/Upstash
  - Command Palette (⌘K) for quick navigation
  - PWA support with service worker
  
- **Components**:
  - TableOfContents for blog navigation
  - RelatedPosts with smart suggestions
  - BlogSearch with advanced filters
  - Newsletter subscription component
  - Breadcrumb navigation with schema.org
  
- **Accessibility**:
  - Skip to main content link
  - Full ARIA label support
  - Focus management improvements
  - Reduced motion support
  - WCAG 2.1 Level AA compliance
  
- **SEO Enhancements**:
  - Complete meta tag implementation
  - JSON-LD structured data
  - Open Graph configuration
  - Twitter Cards support
  - Canonical URLs

### Changed
- Upgraded to Next.js 15.4.1
- Upgraded to React 19.1.0
- Migrated to Tailwind CSS v4
- Improved Lighthouse scores to 96/100
- Enhanced Core Web Vitals metrics

### Fixed
- Performance bottlenecks in initial load
- Accessibility issues with keyboard navigation
- SEO metadata inconsistencies
- Mobile responsive layout issues

## [1.9.0] - 2025-08-15

### Added
- GitHub Activity visualization on Projects page
- Analytics API with real-time visitor tracking
- Contact form with Resend integration
- Dark/Light theme toggle with persistence

### Changed
- Improved project card designs
- Enhanced mobile navigation
- Optimized image loading with Sharp

### Fixed
- Theme flashing on initial load
- Contact form validation errors
- Mobile menu z-index issues

## [1.8.0] - 2025-08-10

### Added
- Blog system with MDX support
- Dynamic blog post routing
- Syntax highlighting for code blocks
- Reading time estimation

### Changed
- Restructured content management
- Improved typography styles
- Enhanced code block styling

## [1.7.0] - 2025-08-05

### Added
- Work experience timeline
- Skills visualization
- Professional achievements section
- Enterprise project showcases

### Changed
- Homepage hero section redesign
- Navigation structure improvements
- Footer layout optimization

## [1.6.0] - 2025-07-30

### Added
- Life page with personal interests
- Activity tracking widgets
- External link integrations
- Personal stats dashboard

### Changed
- Color scheme refinements
- Animation timing adjustments
- Component architecture improvements

## [1.5.0] - 2025-07-25

### Added
- Framer Motion animations
- Page transition effects
- Scroll-triggered animations
- Interactive hover states

### Changed
- Animation performance optimizations
- Reduced bundle size
- Improved loading states

## [1.0.0] - 2025-07-18

### Initial Release
- Portfolio website foundation
- Next.js 15 App Router setup
- TypeScript configuration
- Tailwind CSS integration
- Basic page structure
- Responsive design implementation
- Git repository initialization
- Vercel deployment setup

---

## Versioning Guidelines

This project follows Semantic Versioning:
- **Major version (X.0.0)**: Breaking changes or complete redesigns
- **Minor version (0.X.0)**: New features, substantial improvements
- **Patch version (0.0.X)**: Bug fixes, minor adjustments

## Migration Notes

### From v2.0.0 to v2.1.0
- No breaking changes
- External API keys are optional
- Life timeline now shows only real data
- Update environment variables if using external APIs

### From v1.x to v2.0.0
- Complete redesign with new component structure
- Migration from Pages Router to App Router
- Update all import paths
- Review and update environment variables