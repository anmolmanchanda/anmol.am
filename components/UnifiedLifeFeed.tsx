"use client"

import { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { 
  BookOpen, Activity, Film, PenTool, Globe, 
  Clock, ExternalLink, Loader2, Coffee, Code,
  MapPin, Utensils, Languages, Brain, Trophy,
  TrendingUp, Calendar
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useActivityStore } from "@/lib/store"

interface FeedItem {
  id: string
  type: 'poem' | 'run' | 'movie' | 'book' | 'language' | 'travel' | 'achievement'
  title: string
  description?: string
  timestamp: Date
  url?: string
  source: string
  icon: React.ReactNode
  metadata?: {
    distance?: string
    duration?: string
    rating?: number
    author?: string
    location?: string
    streak?: number
    language?: string
  }
}

function FeedCard({ item }: { item: FeedItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4"
    >
      <div className="liquid-glass rounded-lg border backdrop-blur-md p-4 hover:shadow-lg transition-all">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              {item.icon}
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <div>
                <h3 className="font-semibold text-sm">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.source}</p>
              </div>
              {item.url && (
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3 h-3 text-muted-foreground hover:text-primary" />
                </a>
              )}
            </div>
            
            {item.description && (
              <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
            )}
            
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDistanceToNow(item.timestamp, { addSuffix: true })}
              </span>
              
              {item.metadata?.distance && (
                <span>{item.metadata.distance}</span>
              )}
              
              {item.metadata?.rating && (
                <span>{"★".repeat(item.metadata.rating)}</span>
              )}
              
              {item.metadata?.streak && (
                <span className="text-orange-500">{item.metadata.streak} day streak 🔥</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function UnifiedLifeFeed() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([])
  const [loading, setLoading] = useState(true)
  const { trackerData, fetchTrackerData } = useActivityStore()
  
  const fetchFeed = useCallback(async () => {
    try {
      setLoading(true)
      
      if (!trackerData) {
        await fetchTrackerData()
      }
      
      const items: FeedItem[] = []
      
      // Add mock Strava activities
      items.push({
        id: 'strava-1',
        type: 'run',
        title: 'Morning Run',
        description: 'Easy recovery run through the park',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        url: 'https://strava.com/activities/123456',
        source: 'Strava',
        icon: <Activity className="w-5 h-5 text-orange-500" />,
        metadata: {
          distance: '5.2 km',
          duration: '28:45'
        }
      })
      
      // Add recent poem
      items.push({
        id: 'poem-1',
        type: 'poem',
        title: 'New Poem: "Digital Dreams"',
        description: 'Exploring the intersection of technology and humanity',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        url: 'https://poetify.blogspot.com',
        source: 'Poetify',
        icon: <PenTool className="w-5 h-5 text-purple-500" />
      })
      
      // Add Letterboxd review
      items.push({
        id: 'movie-1',
        type: 'movie',
        title: 'Watched "Oppenheimer"',
        description: 'A masterpiece of cinema that explores the weight of genius',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        url: 'https://letterboxd.com/anmolmanchanda/film/oppenheimer',
        source: 'Letterboxd',
        icon: <Film className="w-5 h-5 text-blue-500" />,
        metadata: {
          rating: 5
        }
      })
      
      // Add Duolingo progress
      if (trackerData?.learning?.french) {
        items.push({
          id: 'duolingo-1',
          type: 'language',
          title: 'French Lesson Completed',
          description: 'Practiced verb conjugations and daily conversations',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          source: 'Duolingo',
          icon: <Globe className="w-5 h-5 text-green-500" />,
          metadata: {
            streak: trackerData.learning.french.streak,
            language: 'French'
          }
        })
      }
      
      // Add book from Goodreads
      items.push({
        id: 'book-1',
        type: 'book',
        title: 'Currently Reading: "Atomic Habits"',
        description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        url: 'https://www.goodreads.com/user/show/83373769-anmol-manchanda',
        source: 'Goodreads',
        icon: <BookOpen className="w-5 h-5 text-green-500" />,
        metadata: {
          author: 'James Clear'
        }
      })
      
      // Add travel/achievement
      items.push({
        id: 'achievement-1',
        type: 'achievement',
        title: 'Completed 500km Running Goal',
        description: 'Reached yearly running milestone!',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        source: 'Personal',
        icon: <Trophy className="w-5 h-5 text-yellow-500" />
      })
      
      // Sort by timestamp
      items.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      
      setFeedItems(items)
    } catch (error) {
      console.error('Failed to fetch feed:', error)
    } finally {
      setLoading(false)
    }
  }, [trackerData, fetchTrackerData])
  
  useEffect(() => {
    fetchFeed()
  }, [fetchFeed])
  
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    )
  }
  
  return (
    <div className="space-y-2">
      {feedItems.map(item => (
        <FeedCard key={item.id} item={item} />
      ))}
      
      {feedItems.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No recent activity
        </div>
      )}
    </div>
  )
}

// Additional Life Stats Component
export function LifeMetrics() {
  const metrics = [
    { icon: <MapPin className="w-4 h-4" />, value: "12", label: "Countries Visited", color: "text-blue-500" },
    { icon: <Languages className="w-4 h-4" />, value: "3", label: "Languages Spoken", color: "text-purple-500" },
    { icon: <Utensils className="w-4 h-4" />, value: "15", label: "Cuisines Mastered", color: "text-orange-500" },
    { icon: <Brain className="w-4 h-4" />, value: "156", label: "Days Meditated", color: "text-green-500" },
    { icon: <BookOpen className="w-4 h-4" />, value: "24", label: "Books This Year", color: "text-indigo-500" },
    { icon: <PenTool className="w-4 h-4" />, value: "37", label: "Poems Written", color: "text-pink-500" },
    { icon: <Activity className="w-4 h-4" />, value: "523", label: "KM Run", color: "text-red-500" },
    { icon: <Coffee className="w-4 h-4" />, value: "∞", label: "Coffees", color: "text-amber-600" }
  ]
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="liquid-glass rounded-xl border backdrop-blur-md p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <div className={metric.color}>{metric.icon}</div>
            <span className="text-2xl font-bold">{metric.value}</span>
          </div>
          <p className="text-xs text-muted-foreground">{metric.label}</p>
        </motion.div>
      ))}
    </div>
  )
}

// Work Stats Component
export function WorkMetrics() {
  const metrics = [
    { icon: <Code className="w-4 h-4" />, value: "1.2M", label: "Lines of Code", color: "text-green-500" },
    { icon: <Trophy className="w-4 h-4" />, value: "50+", label: "Projects Completed", color: "text-yellow-500" },
    { icon: <Globe className="w-4 h-4" />, value: "12", label: "Cities Impacted", color: "text-blue-500" },
    { icon: <TrendingUp className="w-4 h-4" />, value: "3TB", label: "Data Processed", color: "text-purple-500" },
    { icon: <Calendar className="w-4 h-4" />, value: "8", label: "Years Experience", color: "text-orange-500" },
    { icon: <Brain className="w-4 h-4" />, value: "15", label: "Tech Stack Items", color: "text-pink-500" }
  ]
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="liquid-glass rounded-xl border backdrop-blur-md p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <div className={metric.color}>{metric.icon}</div>
            <span className="text-2xl font-bold">{metric.value}</span>
          </div>
          <p className="text-xs text-muted-foreground">{metric.label}</p>
        </motion.div>
      ))}
    </div>
  )
}