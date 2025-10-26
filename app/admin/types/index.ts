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

export type Tab = 'analytics' | 'trackers' | 'redis' | 'settings'

export const DEFAULT_TRACKER_DATA: TrackerData = {
  daysSinceLastPoem: 0,
  currentSideProject: "Portfolio Website v2",
  learningQueue: ["Rust", "WebAssembly", "Kubernetes"],
  booksReadThisYear: 24,
  poemsWritten: 37,
  kmRun: 523,
  coffeesConsumed: 999,
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
