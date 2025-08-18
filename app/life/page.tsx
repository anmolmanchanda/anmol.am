"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Heart, Activity, Globe, PenTool, Film, BookOpen, Music, Brain, MapPin, Languages, Utensils, Coffee, ExternalLink, Clock, Loader2 } from "lucide-react"
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
      
      // Build timeline spanning last 1-2 years
      const timelineItems: any[] = []
      
      // Recent entries (last week)
      timelineItems.push({
        id: 'strava-recent',
        title: 'Morning Run - 8.3km',
        description: 'Personal best pace: 5:12/km',
        type: 'fitness',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        url: 'https://strava.com/activities/latest',
        tags: ['Fitness', 'Running']
      })
      
      timelineItems.push({
        id: 'instagram-1',
        title: 'New Photo: Golden Hour in Manhattan',
        description: '📍 Brooklyn Bridge Park',
        type: 'creative',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        url: 'https://instagram.com/anmolmanchanda',
        tags: ['Photography', 'Instagram']
      })
      
      // Last month entries
      timelineItems.push({
        id: 'movie-recent',
        title: 'Watched "Dune: Part Two"',
        description: 'Rating: ★★★★★ | Villeneuve masterpiece',
        type: 'entertainment',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        url: 'https://letterboxd.com/anmolmanchanda',
        tags: ['Movies', 'Entertainment']
      })
      
      timelineItems.push({
        id: 'meditation-recent',
        title: '30-Day Meditation Streak',
        description: 'Completed mindfulness challenge',
        type: 'wellness',
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        tags: ['Wellness', 'Meditation']
      })
      
      // Last 3 months
      timelineItems.push({
        id: 'travel-japan',
        title: 'Trip to Tokyo, Japan',
        description: 'Explored Shibuya, Harajuku, Mount Fuji',
        type: 'travel',
        timestamp: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
        tags: ['Travel', 'Adventure']
      })
      
      timelineItems.push({
        id: 'cooking-thai',
        title: 'Mastered Thai Cuisine',
        description: 'Perfected Pad Thai and Tom Yum soup',
        type: 'cooking',
        timestamp: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        tags: ['Cooking', 'Thai']
      })
      
      // Last 6 months
      timelineItems.push({
        id: 'poetry-collection',
        title: 'Published "Echoes of Silicon"',
        description: 'Collection of 25 tech-inspired poems',
        type: 'creative',
        timestamp: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
        url: 'https://poetify.blogspot.com',
        tags: ['Poetry', 'Writing']
      })
      
      timelineItems.push({
        id: 'marathon-1',
        title: 'Completed NYC Half Marathon',
        description: 'Finish time: 1:58:42',
        type: 'fitness',
        timestamp: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000),
        url: 'https://strava.com/athletes/131445218',
        tags: ['Fitness', 'Achievement']
      })
      
      // Last year
      timelineItems.push({
        id: 'language-milestone',
        title: 'French B2 Certification',
        description: 'DELF B2 exam passed',
        type: 'learning',
        timestamp: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000),
        tags: ['Language', 'Achievement']
      })
      
      timelineItems.push({
        id: 'book-favorite',
        title: 'Read "Project Hail Mary"',
        description: 'Andy Weir\'s masterpiece - couldn\'t put it down',
        type: 'reading',
        timestamp: new Date(Date.now() - 250 * 24 * 60 * 60 * 1000),
        url: 'https://www.goodreads.com/user/show/83373769-anmol-manchanda',
        tags: ['Books', 'SciFi']
      })
      
      // Poetry from blog (older entries)
      timelineItems.push({
        id: 'poem-dreams',
        title: 'Wrote "Digital Dreams"',
        description: 'Exploring AI consciousness through verse',
        type: 'creative',
        timestamp: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000),
        url: 'https://poetify.blogspot.com',
        tags: ['Poetry', 'AI']
      })
      
      timelineItems.push({
        id: 'poem-dawn',
        title: 'Published "Code at Dawn"',
        description: 'A programmer\'s morning meditation',
        type: 'creative',
        timestamp: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
        url: 'https://poetify.blogspot.com',
        tags: ['Poetry', 'Tech']
      })
      
      // Add current language streak
      if (stats?.duolingoStreak) {
        timelineItems.push({
          id: 'duolingo-current',
          title: `French practice - ${stats.duolingoStreak} day streak`,
          description: 'Current streak milestone',
          type: 'learning',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          url: 'https://www.duolingo.com/profile/manchandaanmol',
          tags: ['Language', 'Learning']
        })
      }
      
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
      url: "https://www.duolingo.com/profile/anmolmanchanda",
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
              {filteredTimeline.map((item) => (
                <div key={item.id} className="liquid-glass rounded-lg border backdrop-blur-md p-4 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {item.type === 'fitness' && <Activity className="w-4 h-4 text-orange-500" />}
                        {item.type === 'creative' && <PenTool className="w-4 h-4 text-purple-500" />}
                        {item.type === 'entertainment' && <Film className="w-4 h-4 text-blue-500" />}
                        {item.type === 'learning' && <Globe className="w-4 h-4 text-green-500" />}
                        {item.type === 'reading' && <BookOpen className="w-4 h-4 text-green-600" />}
                        <h3 className="font-semibold text-sm">{item.title}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(item.timestamp)}
                        </span>
                        {item.tags && (
                          <div className="flex gap-1">
                            {item.tags.map((tag: string) => (
                              <span key={tag} className="px-2 py-0.5 bg-secondary rounded-full">
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}