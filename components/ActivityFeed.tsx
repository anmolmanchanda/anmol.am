"use client"

import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { 
  Github, BookOpen, Code, Zap, FileText, Hash, 
  Globe, Clock, ExternalLink, Loader2,
  Award, Target, Activity
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useActivityStore } from "@/lib/store"

interface ActivityItem {
  id: string
  type: 'github' | 'blog' | 'learning' | 'certification' | 'project' | 'custom'
  title: string
  description?: string
  timestamp: Date
  url?: string
  icon: React.ReactNode
  metadata?: {
    language?: string
    stars?: number
    commits?: number
    progress?: number
    category?: string
  }
}

interface LifeActivityItem {
  id: string
  type: 'book' | 'poem' | 'workout' | 'movie' | 'duolingo' | 'custom'
  title: string
  description?: string
  timestamp: Date
  url?: string
  icon: React.ReactNode
  metadata?: {
    author?: string
    rating?: number
    distance?: string
    duration?: string
    streak?: number
  }
}

function ActivityCard({ activity }: { activity: ActivityItem | LifeActivityItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex gap-4 group"
    >
      {/* Timeline dot */}
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          {activity.icon}
        </div>
        <div className="w-px h-full bg-border" />
      </div>
      
      {/* Content */}
      <div className="flex-1 pb-8">
        <div className="liquid-glass rounded-lg border backdrop-blur-md p-4 hover:shadow-lg transition-all">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-sm">{activity.title}</h3>
            {activity.url && (
              <a href={activity.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3 text-muted-foreground hover:text-primary" />
              </a>
            )}
          </div>
          
          {activity.description && (
            <p className="text-xs text-muted-foreground mb-2">{activity.description}</p>
          )}
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
            </span>
            
            {activity.metadata && 'language' in activity.metadata && activity.metadata.language && (
              <span className="px-2 py-0.5 bg-secondary rounded-full">
                {activity.metadata.language}
              </span>
            )}
            
            {activity.metadata && 'progress' in activity.metadata && activity.metadata.progress !== undefined && (
              <span className="flex items-center gap-1">
                <Target className="w-3 h-3" />
                {activity.metadata.progress}%
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function WorkActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)
  const { trackerData, fetchTrackerData } = useActivityStore()
  
  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true)
      
      // Fetch GitHub activity
      const githubRes = await fetch('https://api.github.com/users/anmolmanchanda/events/public?per_page=10')
      const githubData = await githubRes.json()
      
      const activities: ActivityItem[] = []
      
      // Process GitHub events
      githubData.slice(0, 5).forEach((event: any) => {
        let title = ''
        let description = ''
        let icon = <Github className="w-5 h-5 text-primary" />
        
        // Simplify repo name by removing username if it's yours
        const repoName = event.repo.name.replace('anmolmanchanda/', '')
        
        switch(event.type) {
          case 'PushEvent':
            title = `Pushed to ${repoName}`
            description = `${event.payload.commits?.length || 0} commits`
            icon = <Code className="w-5 h-5 text-green-500" />
            break
          case 'CreateEvent':
            title = `Created ${event.payload.ref_type} in ${repoName}`
            icon = <Zap className="w-5 h-5 text-purple-500" />
            break
          case 'PullRequestEvent':
            title = `${event.payload.action} PR in ${repoName}`
            description = event.payload.pull_request?.title
            icon = <Github className="w-5 h-5 text-blue-500" />
            break
          case 'IssuesEvent':
            title = `${event.payload.action} issue in ${repoName}`
            description = event.payload.issue?.title
            icon = <Hash className="w-5 h-5 text-orange-500" />
            break
          default:
            title = `${event.type.replace('Event', '')} in ${repoName}`
        }
        
        activities.push({
          id: event.id,
          type: 'github',
          title,
          description,
          timestamp: new Date(event.created_at),
          url: `https://github.com/${event.repo.name}`,
          icon,
          metadata: {}
        })
      })
      
      // Add recent blog posts with more variety
      const blogPosts = [
        {
          title: 'Building TB-Scale Infrastructure',
          description: 'Deep dive into AWS architecture for UN-Habitat',
          url: '/work/building-tb-scale-data-infrastructure-un',
          daysAgo: 2
        },
        {
          title: 'AI-Assisted macOS Development',
          description: 'Building Life Manager with Claude AI',
          url: '/work/ai-assisted-macos-life-manager',
          daysAgo: 7
        }
      ]
      
      // Add a random blog post
      if (blogPosts.length > 0) {
        const randomIndex = Math.floor(Math.random() * blogPosts.length)
        const randomBlog = blogPosts[randomIndex]!
        activities.push({
          id: 'blog-recent',
          type: 'blog',
          title: `Published: ${randomBlog.title}`,
          description: randomBlog.description,
          timestamp: new Date(Date.now() - randomBlog.daysAgo * 24 * 60 * 60 * 1000),
          url: randomBlog.url,
          icon: <FileText className="w-5 h-5 text-primary" />
        })
      }
      
      // Add learning progress from tracker data
      if (trackerData) {
        activities.push({
          id: 'cert-aws',
          type: 'certification',
          title: 'AWS Solutions Architect Progress',
          description: trackerData.learning.aws.target,
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          icon: <Award className="w-5 h-5 text-orange-500" />,
          metadata: { progress: trackerData.learning.aws.progress }
        })
      }
      
      // Sort by timestamp
      activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      
      setActivities(activities)
    } catch (error) {
      console.error('Failed to fetch activities:', error)
    } finally {
      setLoading(false)
    }
  }, [trackerData])
  
  useEffect(() => {
    fetchTrackerData()
    fetchActivities()
  }, [fetchTrackerData, fetchActivities])
  
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    )
  }
  
  return (
    <div className="space-y-2">
      {activities.map(activity => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
      
      {activities.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No recent activity
        </div>
      )}
    </div>
  )
}

export function LifeActivityFeed() {
  const [activities, setActivities] = useState<LifeActivityItem[]>([])
  const [loading, setLoading] = useState(true)
  const { trackerData, fetchTrackerData } = useActivityStore()
  
  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true)
      
      // Wait for tracker data to be fetched
      if (!trackerData) {
        await fetchTrackerData()
      }
      
      const activities: LifeActivityItem[] = []
      
      // Add activities from tracker data
      const data = trackerData || {
        daysSinceLastPoem: 2,
        learning: {
          french: {
            level: "A2",
            streak: 45
          }
        }
      }
      
      if (data) {
        // Recent poem
        if (data.daysSinceLastPoem === 0) {
          activities.push({
            id: 'poem-recent',
            type: 'poem',
            title: 'Wrote a new poem',
            description: 'Added to personal collection',
            timestamp: new Date(),
            icon: <BookOpen className="w-5 h-5 text-purple-500" />
          })
        }
        
        // French learning streak
        activities.push({
          id: 'french-streak',
          type: 'duolingo',
          title: `French learning streak: ${data.learning.french.streak} days`,
          description: `Level ${data.learning.french.level}`,
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          icon: <Globe className="w-5 h-5 text-green-500" />,
          metadata: { streak: data.learning.french.streak }
        })
        
        // Recent workout (mock)
        activities.push({
          id: 'workout-1',
          type: 'workout',
          title: 'Morning Run',
          description: '5.2 km in 28 minutes',
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
          icon: <Activity className="w-5 h-5 text-orange-500" />,
          metadata: { distance: '5.2 km', duration: '28 min' }
        })
        
        // Reading progress
        activities.push({
          id: 'book-current',
          type: 'book',
          title: 'Currently reading: Atomic Habits',
          description: 'by James Clear',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          icon: <BookOpen className="w-5 h-5 text-blue-500" />,
          metadata: { author: 'James Clear' }
        })
      }
      
      // Sort by timestamp
      activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      
      setActivities(activities)
    } catch (error) {
      console.error('Failed to fetch activities:', error)
    } finally {
      setLoading(false)
    }
  }, [trackerData])
  
  useEffect(() => {
    fetchTrackerData()
    fetchActivities()
  }, [fetchTrackerData, fetchActivities])
  
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    )
  }
  
  return (
    <div className="space-y-2">
      {activities.map(activity => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
      
      {activities.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No recent activity
        </div>
      )}
    </div>
  )
}