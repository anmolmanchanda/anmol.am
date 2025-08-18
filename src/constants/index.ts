/**
 * Application Constants
 */

// ============================================
// API Endpoints
// ============================================

export const API_ENDPOINTS = {
  // Internal APIs
  ANALYTICS: '/api/analytics',
  CONTACT: '/api/contact',
  RSS: '/api/rss',
  SITEMAP: '/sitemap.xml',
  VIEWS: {
    TRACK: '/api/views/track',
    GET: (slug: string) => `/api/views/${slug}`,
    BATCH: '/api/views/batch',
  },
  
  // External API Integrations
  DUOLINGO: '/api/duolingo',
  LETTERBOXD: '/api/letterboxd',
  GITHUB_ACTIVITY: '/api/github-activity',
  STRAVA: '/api/strava',
  
  // Test Endpoints (Dev only)
  TEST_DUOLINGO: '/api/test-duolingo',
} as const

// ============================================
// External URLs
// ============================================

export const EXTERNAL_URLS = {
  // Social Media
  GITHUB: 'https://github.com/anmolmanchanda',
  LINKEDIN: 'https://linkedin.com/in/anmolmanchanda',
  TWITTER: 'https://twitter.com/anmolmanchanda',
  FIVERR: 'https://www.fiverr.com/anmolmanchanda',
  
  // Life Activities
  STRAVA: 'https://strava.com/athletes/131445218',
  DUOLINGO: 'https://www.duolingo.com/profile/manchandaanmol',
  GOODREADS: 'https://www.goodreads.com/user/show/83373769-anmol-manchanda',
  LETTERBOXD: 'https://letterboxd.com/anmolmanchanda',
  SPOTIFY: 'https://open.spotify.com/user/8yxq6bc2x81yri8o7yqi1fuup',
  POETIFY: 'https://poetify.blogspot.com',
  NOTION_AI: 'https://ai-resource-library.notion.site/AI-LLM-Resource-Library-2212a9c0cb8e80f9bf46d9a3971475bc',
} as const

// ============================================
// Application Routes
// ============================================

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PROJECTS: '/projects',
  WORK: '/work',
  LIFE: '/life',
  BLOG: '/blog',
  CONTACT: '/contact',
  ADMIN: '/admin',
} as const

// ============================================
// Timeline Categories
// ============================================

export const TIMELINE_CATEGORIES = {
  FITNESS: 'fitness',
  LEARNING: 'learning',
  CREATIVE: 'creative',
  ENTERTAINMENT: 'entertainment',
  READING: 'reading',
  WELLNESS: 'wellness',
  COOKING: 'cooking',
  TRAVEL: 'travel',
  MUSIC: 'music',
  INFO: 'info',
} as const

// ============================================
// Project Categories
// ============================================

export const PROJECT_CATEGORIES = {
  WEB: 'web',
  MOBILE: 'mobile',
  AI: 'ai',
  DATA: 'data',
  OTHER: 'other',
} as const

// ============================================
// Project Status
// ============================================

export const PROJECT_STATUS = {
  COMPLETED: 'completed',
  IN_PROGRESS: 'in-progress',
  PLANNED: 'planned',
} as const

// ============================================
// Cache Keys
// ============================================

export const CACHE_KEYS = {
  GITHUB_STATS: 'github-stats',
  STRAVA_STATS: 'strava-stats',
  DUOLINGO_STATS: 'duolingo-stats',
  LETTERBOXD_STATS: 'letterboxd-stats',
  BLOG_POSTS: 'blog-posts',
  PROJECTS: 'projects',
  ANALYTICS: 'analytics',
} as const

// ============================================
// Cache TTL (in seconds)
// ============================================

export const CACHE_TTL = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  DAY: 86400, // 24 hours
} as const

// ============================================
// Rate Limits
// ============================================

export const RATE_LIMITS = {
  DEFAULT: {
    REQUESTS: 100,
    WINDOW: 60, // seconds
  },
  CONTACT_FORM: {
    REQUESTS: 5,
    WINDOW: 3600, // 1 hour
  },
  NEWSLETTER: {
    REQUESTS: 3,
    WINDOW: 3600, // 1 hour
  },
} as const

// ============================================
// Error Messages
// ============================================

export const ERROR_MESSAGES = {
  GENERIC: 'An unexpected error occurred. Please try again later.',
  NOT_FOUND: 'The requested resource was not found.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  RATE_LIMITED: 'Too many requests. Please try again later.',
  INVALID_INPUT: 'Invalid input provided. Please check your data.',
  API_ERROR: 'Failed to fetch data from external service.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
} as const

// ============================================
// Success Messages
// ============================================

export const SUCCESS_MESSAGES = {
  CONTACT_SENT: 'Your message has been sent successfully!',
  NEWSLETTER_SUBSCRIBED: 'Successfully subscribed to the newsletter!',
  NEWSLETTER_UNSUBSCRIBED: 'Successfully unsubscribed from the newsletter.',
  DATA_SAVED: 'Data saved successfully.',
  DATA_DELETED: 'Data deleted successfully.',
} as const

// ============================================
// SEO Defaults
// ============================================

export const SEO_DEFAULTS = {
  TITLE_TEMPLATE: '%s | Anmol Manchanda',
  DEFAULT_TITLE: 'Anmol Manchanda - Technical Solutions Architect',
  DEFAULT_DESCRIPTION: 'Technical Solutions Architect specializing in AI-assisted development, enterprise solutions, and modern web technologies.',
  DEFAULT_IMAGE: '/images/og-image.png',
  SITE_NAME: 'anmol.am',
  TWITTER_HANDLE: '@anmolmanchanda',
} as const

// ============================================
// Animation Durations (ms)
// ============================================

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
} as const

// ============================================
// Breakpoints
// ============================================

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const

// ============================================
// Z-Index Scale
// ============================================

export const Z_INDEX = {
  DROPDOWN: 10,
  MODAL_BACKDROP: 40,
  MODAL: 50,
  POPOVER: 60,
  TOOLTIP: 70,
  TOAST: 80,
  COMMAND_PALETTE: 90,
  SKIP_LINK: 100,
} as const