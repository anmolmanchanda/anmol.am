"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Heart, Activity, Globe, PenTool, Film, BookOpen, Music, Brain, MapPin, Languages, Utensils, Coffee, ExternalLink, Clock, Loader2, Camera, Headphones, UtensilsCrossed, MapPinned } from "lucide-react"
import { SearchFilter } from "@/components/SearchFilter"
import { WidgetGrid } from "@/components/CompactWidgets"
import { fetchAllStats } from "@/lib/external-apis"
import { useActivityStore } from "@/lib/store"
import { formatDate } from "@/lib/utils"

export default function LifePage() {
  const [stats, setStats] = useState<any>(null)
  const [timeline, setTimeline] = useState<any[]>([])
  const [filteredTimeline, setFilteredTimeline] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { trackerData, fetchTrackerData } = useActivityStore()

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      // Fetch all stats
      const allStats = await fetchAllStats()
      setStats(allStats.life)
      
      // Fetch tracker data
      await fetchTrackerData()
      
      // Build timeline
      const timelineItems: any[] = []
      
      // Add Strava activity
      timelineItems.push({
        id: 'strava-1',
        title: 'Morning Run - 5.2km',
        type: 'fitness',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        url: 'https://strava.com/activities/latest',
        tags: ['Fitness', 'Running']
      })
      
      // Add recent activities with realistic entries
      timelineItems.push({
        id: 'meditation-1',
        title: 'Morning Meditation Session',
        description: '20 minutes mindfulness practice',
        type: 'wellness',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        tags: ['Wellness', 'Meditation']
      })
      
      // Add movie
      timelineItems.push({
        id: 'movie-1',
        title: 'Watched "Oppenheimer"',
        description: 'Rating: ★★★★★ | Christopher Nolan masterpiece',
        type: 'entertainment',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        url: 'https://letterboxd.com/anmolmanchanda',
        tags: ['Movies', 'Entertainment']
      })
      
      // Add cooking
      timelineItems.push({
        id: 'cooking-1',
        title: 'Mastered Thai Green Curry',
        description: 'Authentic recipe with homemade paste',
        type: 'cooking',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        tags: ['Cooking', 'Thai Cuisine']
      })
      
      // Add travel planning
      timelineItems.push({
        id: 'travel-1',
        title: 'Planning Europe Trip',
        description: 'Researching cities: Paris, Berlin, Amsterdam',
        type: 'travel',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        tags: ['Travel', 'Planning']
      })
      
      // Add photography
      timelineItems.push({
        id: 'photo-1',
        title: 'Urban Photography Walk',
        description: 'Captured 50+ shots downtown',
        type: 'creative',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        tags: ['Photography', 'Creative']
      })
      
      // Add podcast listening
      timelineItems.push({
        id: 'podcast-1',
        title: 'Listened: Lex Fridman #387',
        description: 'AI and consciousness discussion',
        type: 'learning',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        tags: ['Podcast', 'Learning']
      })
      
      // Add language learning
      if (stats?.duolingoStreak) {
        timelineItems.push({
          id: 'duolingo-1',
          title: `French practice - ${stats.duolingoStreak} day streak`,
          type: 'learning',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          tags: ['Language', 'Learning']
        })
      }
      
      // Add reading
      timelineItems.push({
        id: 'book-1',
        title: `Currently Reading: ${stats?.currentlyReading || 'Atomic Habits'}`,
        description: 'Chapter 4: The Man Who Didn\'t Look Right',
        type: 'reading',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        url: 'https://www.goodreads.com/user/show/83373769-anmol-manchanda',
        tags: ['Books', 'Reading']
      })
      
      // Add music discovery
      timelineItems.push({
        id: 'music-1',
        title: 'Discovered: Glass Animals',
        description: 'New favorite band - Heat Waves on repeat',
        type: 'music',
        timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        url: 'https://open.spotify.com/user/8yxq6bc2x81yri8o7yqi1fuup',
        tags: ['Music', 'Discovery']
      })
      
      // Sort by timestamp
      timelineItems.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      
      setTimeline(timelineItems)
      setFilteredTimeline(timelineItems)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }, [fetchTrackerData])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSearch = (query: string) => {
    if (!query) {
      setFilteredTimeline(timeline)
      return
    }
    
    const filtered = timeline.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.tags?.some((tag: string) => tag.toLowerCase().includes(query.toLowerCase()))
    )
    setFilteredTimeline(filtered)
  }

  const handleTagFilter = (tag: string) => {
    const filtered = timeline.filter(item => 
      item.tags?.includes(tag)
    )
    setFilteredTimeline(filtered)
  }

  const lifeWidgets = [
    {
      title: "Strava",
      value: `${stats?.kmRun || 523} km`,
      subtitle: "total run",
      url: "https://strava.com/athletes/131445218",
      icon: <Activity className="w-4 h-4 text-white" />,
      color: "bg-orange-600"
    },
    {
      title: "Duolingo",
      value: `${stats?.duolingoStreak || 45} days`,
      subtitle: "streak 🔥",
      url: "https://www.duolingo.com/profile/manchandaanmol",
      icon: <Globe className="w-4 h-4 text-white" />,
      color: "bg-green-600"
    },
    {
      title: "Goodreads",
      value: stats?.booksThisYear || 24,
      subtitle: "books/year",
      url: "https://www.goodreads.com/user/show/83373769-anmol-manchanda",
      icon: <BookOpen className="w-4 h-4 text-white" />,
      color: "bg-green-700"
    },
    {
      title: "Letterboxd",
      value: stats?.filmsWatched || 47,
      subtitle: "films/year",
      url: "https://letterboxd.com/anmolmanchanda/",
      icon: <Film className="w-4 h-4 text-white" />,
      color: "bg-blue-600"
    },
    {
      title: "Poetry",
      value: stats?.poemsWritten || 37,
      subtitle: "poems",
      url: "https://poetify.blogspot.com/",
      icon: <PenTool className="w-4 h-4 text-white" />,
      color: "bg-purple-600"
    },
    {
      title: "Spotify",
      value: "Playlists",
      subtitle: "curated",
      url: "https://open.spotify.com/user/8yxq6bc2x81yri8o7yqi1fuup",
      icon: <Music className="w-4 h-4 text-white" />,
      color: "bg-green-500"
    },
    {
      title: "Notion",
      value: "AI Library",
      subtitle: "resources",
      url: "https://ai-resource-library.notion.site/AI-LLM-Resource-Library-2212a9c0cb8e80f9bf46d9a3971475bc",
      icon: <Brain className="w-4 h-4 text-white" />,
      color: "bg-gray-800"
    },
    {
      title: "Countries",
      value: trackerData?.countriesVisited || 12,
      subtitle: "visited",
      icon: <MapPin className="w-4 h-4 text-white" />,
      color: "bg-blue-700"
    },
    {
      title: "Languages",
      value: trackerData?.languagesSpoken || 3,
      subtitle: "spoken",
      icon: <Languages className="w-4 h-4 text-white" />,
      color: "bg-purple-700"
    },
    {
      title: "Cuisines",
      value: trackerData?.cuisinesMastered || 15,
      subtitle: "mastered",
      icon: <Utensils className="w-4 h-4 text-white" />,
      color: "bg-red-600"
    },
    {
      title: "Meditation",
      value: trackerData?.daysMeditated || 156,
      subtitle: "days",
      icon: <Brain className="w-4 h-4 text-white" />,
      color: "bg-indigo-600"
    },
    {
      title: "Coffee",
      value: "∞",
      subtitle: "consumed",
      icon: <Coffee className="w-4 h-4 text-white" />,
      color: "bg-amber-700"
    }
  ]

  const allTags = ['Fitness', 'Running', 'Poetry', 'Writing', 'Movies', 'Entertainment', 'Language', 'Learning', 'Books', 'Reading', 'Music']

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen py-24 sm:py-32 overflow-hidden aurora-bg-life">
      {/* Joyful, bright animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 via-purple-400/25 to-indigo-500/20" />
      <div className="absolute inset-0 bg-gradient-to-tl from-yellow-400/20 via-transparent to-cyan-400/20 animate-pulse" />
      <div className="absolute inset-0 ai-grid opacity-20" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg">
                  <Image
                    src="/images/life_avatar.jpeg"
                    alt="Anmol Manchanda"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-1 -right-1">
                  <div className="w-5 h-5 rounded-full bg-purple-500 border-2 border-background shadow-lg flex items-center justify-center">
                    <Heart className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="mb-8">
            <SearchFilter
              onSearch={handleSearch}
              onTagSelect={handleTagFilter}
              availableTags={allTags}
              placeholder="Search activities, books, movies..."
            />
          </div>

          {/* Life Stats */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Life Stats</h2>
            <WidgetGrid widgets={lifeWidgets} />
          </div>

          {/* Life Timeline */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Life Timeline</h2>
            <div className="space-y-4">
              {filteredTimeline.map((item) => {
                const getItemColor = () => {
                  switch(item.type) {
                    case 'fitness': return 'border-orange-500/30 bg-orange-500/5'
                    case 'creative': return 'border-purple-500/30 bg-purple-500/5'
                    case 'entertainment': return 'border-blue-500/30 bg-blue-500/5'
                    case 'learning': return 'border-green-500/30 bg-green-500/5'
                    case 'reading': return 'border-emerald-500/30 bg-emerald-500/5'
                    case 'wellness': return 'border-indigo-500/30 bg-indigo-500/5'
                    case 'cooking': return 'border-amber-500/30 bg-amber-500/5'
                    case 'travel': return 'border-cyan-500/30 bg-cyan-500/5'
                    case 'music': return 'border-pink-500/30 bg-pink-500/5'
                    default: return ''
                  }
                }
                
                const getIcon = () => {
                  switch(item.type) {
                    case 'fitness': return <Activity className="w-5 h-5 text-orange-400" />
                    case 'creative': return <Camera className="w-5 h-5 text-purple-400" />
                    case 'entertainment': return <Film className="w-5 h-5 text-blue-400" />
                    case 'learning': return <Headphones className="w-5 h-5 text-green-400" />
                    case 'reading': return <BookOpen className="w-5 h-5 text-emerald-400" />
                    case 'wellness': return <Brain className="w-5 h-5 text-indigo-400" />
                    case 'cooking': return <UtensilsCrossed className="w-5 h-5 text-amber-400" />
                    case 'travel': return <MapPinned className="w-5 h-5 text-cyan-400" />
                    case 'music': return <Music className="w-5 h-5 text-pink-400" />
                    default: return <Heart className="w-5 h-5 text-gray-400" />
                  }
                }
                
                return (
                  <div 
                    key={item.id} 
                    className={`liquid-glass rounded-lg border backdrop-blur-md p-4 hover:shadow-lg transition-all ${getItemColor()}`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Larger icon with background */}
                      <div className={`p-2 rounded-lg ${
                        item.type === 'fitness' ? 'bg-orange-500/20' :
                        item.type === 'creative' ? 'bg-purple-500/20' :
                        item.type === 'entertainment' ? 'bg-blue-500/20' :
                        item.type === 'learning' ? 'bg-green-500/20' :
                        item.type === 'reading' ? 'bg-emerald-500/20' :
                        item.type === 'wellness' ? 'bg-indigo-500/20' :
                        item.type === 'cooking' ? 'bg-amber-500/20' :
                        item.type === 'travel' ? 'bg-cyan-500/20' :
                        item.type === 'music' ? 'bg-pink-500/20' :
                        'bg-secondary'
                      }`}>
                        {getIcon()}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                        {item.description && (
                          <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatDate(item.timestamp)}
                          </span>
                          {item.tags && (
                            <div className="flex gap-1">
                              {item.tags.map((tag: string) => (
                                <span 
                                  key={tag} 
                                  className={`px-2 py-0.5 rounded-full ${
                                    tag === 'Fitness' ? 'bg-orange-500/20 text-orange-300' :
                                    tag === 'Creative' || tag === 'Photography' ? 'bg-purple-500/20 text-purple-300' :
                                    tag === 'Movies' || tag === 'Entertainment' ? 'bg-blue-500/20 text-blue-300' :
                                    tag === 'Learning' || tag === 'Podcast' ? 'bg-green-500/20 text-green-300' :
                                    tag === 'Books' || tag === 'Reading' ? 'bg-emerald-500/20 text-emerald-300' :
                                    tag === 'Wellness' || tag === 'Meditation' ? 'bg-indigo-500/20 text-indigo-300' :
                                    tag === 'Cooking' ? 'bg-amber-500/20 text-amber-300' :
                                    tag === 'Travel' ? 'bg-cyan-500/20 text-cyan-300' :
                                    tag === 'Music' ? 'bg-pink-500/20 text-pink-300' :
                                    'bg-secondary'
                                  }`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {item.url && (
                        <a href={item.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary" />
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}