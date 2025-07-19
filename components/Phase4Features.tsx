"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, Download, Users, Clock, GitBranch, Music } from 'lucide-react'

// PWA Install Prompt
export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstall, setShowInstall] = useState(false)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstall(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setShowInstall(false)
    }
    setDeferredPrompt(null)
  }

  if (!showInstall) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      className="fixed bottom-4 right-4 z-50 max-w-sm"
    >
      <div className="liquid-glass p-4 rounded-xl border backdrop-blur-md shadow-lg">
        <div className="flex items-start gap-3">
          <Download className="w-5 h-5 text-primary mt-1" />
          <div className="flex-1">
            <h4 className="font-semibold text-sm">Install Anmol&apos;s Portfolio</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Add to your home screen for quick access
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleInstall}
                className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Install
              </button>
              <button
                onClick={() => setShowInstall(false)}
                className="px-3 py-1 text-xs border rounded-md hover:bg-secondary"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Real-time Visitor Counter
export function VisitorCounter() {
  const [visitors, setVisitors] = useState(1247) // Mock initial count
  const [isOnline, setIsOnline] = useState(12) // Mock online users

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setVisitors(prev => prev + Math.floor(Math.random() * 3) + 1)
      }
      if (Math.random() > 0.8) {
        setIsOnline(prev => Math.max(1, prev + (Math.random() > 0.5 ? 1 : -1)))
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="liquid-glass p-3 rounded-lg border backdrop-blur-md">
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-muted-foreground">{isOnline} online</span>
        </div>
        <span className="text-muted-foreground">•</span>
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3 text-muted-foreground" />
          <span className="text-muted-foreground">{visitors.toLocaleString()} visits</span>
        </div>
      </div>
    </div>
  )
}

// GitHub Activity Feed
export function GitHubActivityFeed() {
  const [activities] = useState([
    {
      id: 1,
      type: 'push',
      repo: 'anmol.am',
      message: 'Implement Phase 4 features and Dribbble inspiration',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'pull_request',
      repo: 'LifeManager',
      message: 'Add AI-powered task scheduling',
      time: '1 day ago'
    },
    {
      id: 3,
      type: 'issue',
      repo: 'automation-suite',
      message: 'Optimize N8N workflow performance',
      time: '2 days ago'
    }
  ])

  const getIcon = (type: string) => {
    switch (type) {
      case 'push': return <GitBranch className="w-3 h-3 text-blue-500" />
      case 'pull_request': return <Activity className="w-3 h-3 text-green-500" />
      case 'issue': return <Clock className="w-3 h-3 text-orange-500" />
      default: return <Activity className="w-3 h-3 text-gray-500" />
    }
  }

  return (
    <div className="liquid-glass p-4 rounded-lg border backdrop-blur-md">
      <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
        <Activity className="w-4 h-4" />
        Recent Activity
      </h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-2">
            {getIcon(activity.type)}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{activity.repo}</span>
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {activity.message}
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Now Playing from Spotify
export function SpotifyNowPlaying() {
  const [isPlaying] = useState(true)
  const [track, setTrack] = useState({
    name: 'Focus Flow',
    artist: 'LoFi Hip Hop',
    album: 'Coding Sessions Vol. 3',
    progress: 65
  })

  useEffect(() => {
    // Mock progress animation
    const interval = setInterval(() => {
      if (isPlaying) {
        setTrack(prev => ({
          ...prev,
          progress: prev.progress >= 100 ? 0 : prev.progress + 0.5
        }))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isPlaying])

  return (
    <div className="liquid-glass p-3 rounded-lg border backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-400 rounded-md flex items-center justify-center">
            <Music className="w-5 h-5 text-white" />
          </div>
          {isPlaying && (
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{track.name}</p>
          <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
          <div className="mt-1 w-full bg-muted rounded-full h-1">
            <div 
              className="bg-green-500 h-1 rounded-full transition-all duration-1000"
              style={{ width: `${track.progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// Analytics Dashboard Widget
export function AnalyticsDashboard() {
  const [metrics] = useState({
    pageViews: 15420,
    uniqueVisitors: 8765,
    bounceRate: 32.5,
    avgSessionTime: '3:45'
  })

  return (
    <div className="liquid-glass p-4 rounded-lg border backdrop-blur-md">
      <h3 className="font-semibold text-sm mb-3">Analytics Overview</h3>
      <div className="grid grid-cols-2 gap-3">
        <div className="text-center">
          <div className="text-lg font-bold text-primary">{metrics.pageViews.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Page Views</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-purple-500">{metrics.uniqueVisitors.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Unique Visitors</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-500">{metrics.bounceRate}%</div>
          <div className="text-xs text-muted-foreground">Bounce Rate</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-blue-500">{metrics.avgSessionTime}</div>
          <div className="text-xs text-muted-foreground">Avg. Session</div>
        </div>
      </div>
    </div>
  )
}

// Reading Progress for Blog Posts
export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const calculateProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = (window.scrollY / totalHeight) * 100
      setProgress(Math.min(100, Math.max(0, currentProgress)))
    }

    window.addEventListener('scroll', calculateProgress)
    return () => window.removeEventListener('scroll', calculateProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
      <div 
        className="h-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}