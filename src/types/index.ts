/**
 * Global TypeScript Type Definitions
 */

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  code?: string
  details?: Record<string, any>
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: {
    page: number
    perPage: number
    total: number
    totalPages: number
  }
}

// ============================================
// Timeline & Activity Types
// ============================================

export interface TimelineItem {
  id: string
  title: string
  description?: string
  type: 'fitness' | 'learning' | 'creative' | 'entertainment' | 'reading' | 'wellness' | 'cooking' | 'travel' | 'music' | 'info'
  timestamp: Date
  url?: string
  tags?: string[]
  metadata?: Record<string, any>
}

// ============================================
// External API Types
// ============================================

export interface DuolingoStats {
  streak: number
  totalXP: number
  languages: Array<{
    name: string
    xp: number
    level?: string
    crowns?: number
  }>
  lastActivity?: string
}

export interface LetterboxdFilm {
  title: string
  rating?: number
  date?: string
  link?: string
  watched: boolean
}

export interface LetterboxdStats {
  filmsThisYear: number
  totalFilms: number
  avgRating: string | number
  watchlist: number
  recentFilms: LetterboxdFilm[]
  favoriteFilms: LetterboxdFilm[]
}

export interface GitHubStats {
  publicRepos: number
  followers: number
  totalStars: number
  totalForks: number
  estimatedLOC: number
  contributions: number
  recentActivity?: Array<{
    type: string
    repo: string
    date: string
    commits?: number
  }>
}

export interface StravaStats {
  totalRuns: number
  totalDistance: string
  totalDistanceRaw: number
  thisYear: {
    runs: number
    distance: string
    time: string
    elevation: string
  }
  recent: {
    runs: number
    distance: string
    time: string
  }
}

export interface GoodreadsStats {
  currentlyReading: string
  author: string
  booksThisYear: number
  totalBooks: number
  avgRating: number
}

export interface WakaTimeStats {
  dailyAverage: string
  thisWeek: string
  bestDay: string
  languages: string[]
}

// ============================================
// Life & Work Stats Types
// ============================================

export interface LifeStats {
  kmRun: number
  runsThisYear: number
  duolingoStreak: number
  totalXP: number
  frenchLevel: string
  booksThisYear: number
  currentlyReading: string
  filmsThisYear: number
  totalFilms: number
  avgRating: string | number
  poemsWritten: number
}

export interface WorkStats {
  linesOfCode: number
  publicRepos: number
  githubStars: number
  codingThisWeek: string
  dailyAverage: string
  topLanguages: string[]
  contributions: number
}

// ============================================
// Blog & Content Types
// ============================================

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  tags: string[]
  readingTime: string
  views?: number
  featured?: boolean
  published: boolean
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  image?: string
  featured?: boolean
  category: 'web' | 'mobile' | 'ai' | 'data' | 'other'
  status: 'completed' | 'in-progress' | 'planned'
  startDate?: string
  endDate?: string
}

// ============================================
// UI Component Types
// ============================================

export interface Widget {
  title: string
  value: string | number
  subtitle?: string
  url?: string
  icon?: React.ReactNode
  color?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
}

export interface NavigationItem {
  name: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  external?: boolean
  badge?: string
  children?: NavigationItem[]
}

// ============================================
// Form Types
// ============================================

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  company?: string
}

export interface NewsletterFormData {
  email: string
  name?: string
}

// ============================================
// Analytics Types
// ============================================

export interface AnalyticsData {
  totalVisits: number
  uniqueVisitors: number
  monthlyVisits: number
  weeklyVisits: number
  todayVisits: number
  onlineNow: number
  avgSessionDuration: string
  bounceRate: number
  topPages: Array<{
    path: string
    visits: number
  }>
}

export interface ViewData {
  slug: string
  views: number
  lastViewed?: string
}

// ============================================
// User & Auth Types
// ============================================

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'user'
  createdAt: Date
  updatedAt: Date
}

export interface Session {
  user: User
  expires: Date
}

// ============================================
// Utility Types
// ============================================

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = 
  T extends (...args: any) => Promise<infer R> ? R : never

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>