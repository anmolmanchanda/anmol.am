import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface TrackerData {
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

interface GitHubActivity {
  id: string
  type: 'push' | 'pull_request' | 'issue' | 'star' | 'fork'
  repo: string
  description: string
  date: string
  url?: string
  isPrivate?: boolean
}

interface SpotifyActivity {
  track: string
  artist: string
  album: string
  isPlaying: boolean
  imageUrl?: string
  trackUrl?: string
}

interface ActivityFeedItem {
  id: string
  type: 'github' | 'blog' | 'spotify' | 'duolingo' | 'custom'
  title: string
  description?: string
  timestamp: string
  url?: string
  icon?: string
  metadata?: any
}

interface ActivityStore {
  // Tracker Data
  trackerData: TrackerData | null
  fetchTrackerData: () => Promise<void>
  
  // GitHub Activity
  githubActivities: GitHubActivity[]
  fetchGitHubActivity: () => Promise<void>
  
  // Spotify Now Playing
  spotifyNowPlaying: SpotifyActivity | null
  fetchSpotifyNowPlaying: () => Promise<void>
  
  // Unified Activity Feed
  activityFeed: ActivityFeedItem[]
  fetchActivityFeed: () => Promise<void>
  
  // Loading states
  isLoading: {
    trackers: boolean
    github: boolean
    spotify: boolean
    feed: boolean
  }
  
  // Error states
  errors: {
    trackers?: string
    github?: string
    spotify?: string
    feed?: string
  }
}

export const useActivityStore = create<ActivityStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        trackerData: null,
        githubActivities: [],
        spotifyNowPlaying: null,
        activityFeed: [],
        isLoading: {
          trackers: false,
          github: false,
          spotify: false,
          feed: false
        },
        errors: {},
        
        // Fetch tracker data
        fetchTrackerData: async () => {
          set((state) => ({
            isLoading: { ...state.isLoading, trackers: true },
            errors: { ...state.errors, trackers: undefined }
          }))
          
          try {
            const response = await fetch('/api/admin/trackers')
            const result = await response.json()
            
            if (result.success && result.data) {
              set({ 
                trackerData: result.data,
                isLoading: (state) => ({ ...state.isLoading, trackers: false })
              })
            } else {
              // Set default data if none exists
              set({
                trackerData: {
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
                },
                isLoading: (state) => ({ ...state.isLoading, trackers: false })
              })
            }
          } catch (error) {
            set((state) => ({
              errors: { ...state.errors, trackers: 'Failed to fetch tracker data' },
              isLoading: { ...state.isLoading, trackers: false }
            }))
          }
        },
        
        // Fetch GitHub activity
        fetchGitHubActivity: async () => {
          set((state) => ({
            isLoading: { ...state.isLoading, github: true },
            errors: { ...state.errors, github: undefined }
          }))
          
          try {
            const response = await fetch('/api/github/activity')
            const result = await response.json()
            
            if (result.success) {
              set({ 
                githubActivities: result.activities || [],
                isLoading: (state) => ({ ...state.isLoading, github: false })
              })
            } else {
              throw new Error('Failed to fetch GitHub activity')
            }
          } catch (error) {
            set((state) => ({
              errors: { ...state.errors, github: 'Failed to fetch GitHub activity' },
              isLoading: { ...state.isLoading, github: false }
            }))
          }
        },
        
        // Fetch Spotify now playing
        fetchSpotifyNowPlaying: async () => {
          set((state) => ({
            isLoading: { ...state.isLoading, spotify: true },
            errors: { ...state.errors, spotify: undefined }
          }))
          
          try {
            const response = await fetch('/api/spotify/now-playing')
            const result = await response.json()
            
            if (result.success) {
              set({ 
                spotifyNowPlaying: result.data || null,
                isLoading: (state) => ({ ...state.isLoading, spotify: false })
              })
            } else {
              throw new Error('Failed to fetch Spotify data')
            }
          } catch (error) {
            set((state) => ({
              errors: { ...state.errors, spotify: 'Failed to fetch Spotify data' },
              isLoading: { ...state.isLoading, spotify: false }
            }))
          }
        },
        
        // Fetch unified activity feed
        fetchActivityFeed: async () => {
          set((state) => ({
            isLoading: { ...state.isLoading, feed: true },
            errors: { ...state.errors, feed: undefined }
          }))
          
          try {
            // Fetch all data sources in parallel
            await Promise.all([
              get().fetchGitHubActivity(),
              get().fetchSpotifyNowPlaying(),
              get().fetchTrackerData()
            ])
            
            // Combine into unified feed
            const feed: ActivityFeedItem[] = []
            
            // Add GitHub activities
            const githubActivities = get().githubActivities
            githubActivities.forEach(activity => {
              feed.push({
                id: activity.id,
                type: 'github',
                title: `${activity.type} on ${activity.repo}`,
                description: activity.description,
                timestamp: activity.date,
                url: activity.url,
                icon: 'github'
              })
            })
            
            // Sort by timestamp
            feed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            
            set({
              activityFeed: feed,
              isLoading: (state) => ({ ...state.isLoading, feed: false })
            })
          } catch (error) {
            set((state) => ({
              errors: { ...state.errors, feed: 'Failed to fetch activity feed' },
              isLoading: { ...state.isLoading, feed: false }
            }))
          }
        }
      }),
      {
        name: 'activity-store',
        partialize: (state) => ({
          // Only persist non-sensitive data
          trackerData: state.trackerData
        })
      }
    )
  )
)