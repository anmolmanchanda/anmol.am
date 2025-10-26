export interface TrackerData {
  // Custom Trackers
  daysSinceLastPoem: number
  currentSideProject: string
  learningQueue: string[]

  // Life Stats
  booksReadThisYear: number
  poemsWritten: number
  kmRun: number
  coffeesConsumed: number
  countriesVisited: number
  languagesSpoken: number
  cuisinesMastered: number
  daysMeditated: number

  // Work Stats
  citiesImpacted: number
  yearsExperience: number
  projectsCompleted: number
  dataProcessed: string
  currentRole: string

  // Tech Stack (Work)
  currentlyUsing: {
    llms: string[]
    editor: string[]
    frameworks: string[]
    databases: string[]
    tools: string[]
  }

  // Learning Progress
  learning: {
    french: {
      level: string
      streak: number
    }
    aws: {
      progress: number
      target: string
    }
    ml: {
      status: string
      course: string
    }
  }

  // Last Updated
  lastUpdated: string
}

export interface AnalyticsData {
  totalViews: number
  uniquePages: number
  pages: Array<{ slug: string; views: number }>
  keepAliveActive: boolean
  lastKeepAlive: string | null
}

export interface RedisStats {
  totalKeys: number
  categories: {
    views: number
    cooldowns: number
    analytics: number
    system: number
    other: number
  }
  approximateSize: number
  sizeFormatted: string
}

export interface RedisKey {
  key: string
  type: string
  size: number
  ttl: string
  preview: string
}

export interface HistoricalDataPoint {
  timestamp: string
  booksReadThisYear: number
  poemsWritten: number
  kmRun: number
  coffeesConsumed: number
}

export interface HistoricalData {
  dataPoints: HistoricalDataPoint[]
}

export interface TimelineEntry {
  id: string
  timestamp: string
  type: 'life' | 'work'
  changes: Array<{
    field: string
    label: string
    oldValue: any
    newValue: any
  }>
  description: string
}

export type Tab = 'analytics' | 'trackers' | 'redis' | 'settings'

export const DEFAULT_TRACKER_DATA: TrackerData = {
  daysSinceLastPoem: 0,
  currentSideProject: "Portfolio Website v2",
  learningQueue: ["Rust", "WebAssembly", "Kubernetes"],
  booksReadThisYear: 24,
  poemsWritten: 37,
  kmRun: 523,
  coffeesConsumed: 999,
  countriesVisited: 12,
  languagesSpoken: 3,
  cuisinesMastered: 15,
  daysMeditated: 156,
  citiesImpacted: 12,
  yearsExperience: 8,
  projectsCompleted: 50,
  dataProcessed: "3TB",
  currentRole: "Senior Software Engineer",
  currentlyUsing: {
    llms: ["Claude 3.5 Sonnet", "GPT-4"],
    editor: ["Cursor", "VS Code"],
    frameworks: ["Next.js 15", "React 19"],
    databases: ["PostgreSQL", "Redis"],
    tools: ["Docker", "Git", "Vercel"]
  },
  learning: {
    french: {
      level: "A2",
      streak: 45
    },
    aws: {
      progress: 35,
      target: "Solutions Architect Associate"
    },
    ml: {
      status: "Starting Soon",
      course: "Fast.ai"
    }
  },
  lastUpdated: new Date().toISOString()
}
