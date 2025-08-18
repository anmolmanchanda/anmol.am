import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface TrackerData {
  // Manual Life Stats
  countriesVisited: number
  languagesSpoken: number
  cuisinesMastered: number
  daysMeditated: number
  
  // Manual Work Stats  
  citiesImpacted: number
  yearsExperience: number
  projectsCompleted: number
  dataProcessed: string // "3TB"
  
  // API Keys for external services
  apiKeys?: {
    wakatime?: string
    strava?: string
    duolingo?: string
  }
  
  // Current Status
  currentSideProject: string
  currentlyReading: string
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

interface GitHubActivity {
  id: string
  type: 'push' | 'pull_request' | 'issue' | 'star' | 'fork'
  repo: string
  description: string
  date: string
  url?: string
  isPrivate?: boolean
}


interface ActivityFeedItem {
  id: string
  type: 'github' | 'blog' | 'duolingo' | 'custom'
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
  
  
  // Unified Activity Feed
  activityFeed: ActivityFeedItem[]
  fetchActivityFeed: () => Promise<void>
  
  // Loading states
  isLoading: {
    trackers: boolean
    github: boolean
    feed: boolean
  }
  
  // Error states
  errors: {
    trackers?: string
    github?: string
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
        activityFeed: [],
        isLoading: {
          trackers: false,
          github: false,
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
              set((state) => ({ 
                trackerData: result.data,
                isLoading: { ...state.isLoading, trackers: false }
              }))
            } else {
              // Set default data if none exists
              set((state) => ({
                trackerData: {
                  // Manual Life Stats
                  countriesVisited: 12,
                  languagesSpoken: 3,
                  cuisinesMastered: 15,
                  daysMeditated: 156,
                  
                  // Manual Work Stats
                  citiesImpacted: 12,
                  yearsExperience: 8,
                  projectsCompleted: 50,
                  dataProcessed: "3TB",
                  
                  // Current Status
                  currentSideProject: "Portfolio Website v2",
                  currentlyReading: "Atomic Habits",
                  currentRole: "Senior Software Engineer",
                  
                  // Tech Stack
                  currentlyUsing: {
                    llms: ["Claude 3.5 Sonnet", "GPT-4"],
                    editor: ["Cursor", "VS Code"],
                    frameworks: ["Next.js 15", "React 19"],
                    databases: ["PostgreSQL", "Redis"],
                    tools: ["Docker", "Git", "Vercel"]
                  },
                  
                  // Learning Progress
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
                isLoading: { ...state.isLoading, trackers: false }
              }))
            }
          } catch (error) {
            // Set default data on error
            set((state) => ({
              trackerData: {
                // Manual Life Stats
                countriesVisited: 12,
                languagesSpoken: 3,
                cuisinesMastered: 15,
                daysMeditated: 156,
                
                // Manual Work Stats
                citiesImpacted: 12,
                yearsExperience: 8,
                projectsCompleted: 50,
                dataProcessed: "3TB",
                
                // Current Status
                currentSideProject: "Portfolio Website v2",
                currentlyReading: "Atomic Habits",
                currentRole: "Senior Software Engineer",
                
                // Tech Stack
                currentlyUsing: {
                  llms: ["Claude 3.5 Sonnet", "GPT-4"],
                  editor: ["Cursor", "VS Code"],
                  frameworks: ["Next.js 15", "React 19"],
                  databases: ["PostgreSQL", "Redis"],
                  tools: ["Docker", "Git", "Vercel"]
                },
                
                // Learning Progress
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
              set((state) => ({ 
                githubActivities: result.activities || [],
                isLoading: { ...state.isLoading, github: false }
              }))
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
            
            set((state) => ({
              activityFeed: feed,
              isLoading: { ...state.isLoading, feed: false }
            }))
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