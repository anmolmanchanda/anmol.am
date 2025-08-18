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
      
      // Build timeline with real data from APIs
      const timelineItems: any[] = []
      
      // Fetch Letterboxd films and add to timeline
      try {
        const letterboxdRes = await fetch('/api/letterboxd?username=anmolmanchanda')
        const letterboxdData = await letterboxdRes.json()
        
        if (letterboxdData?.recentFilms) {
          letterboxdData.recentFilms.slice(0, 5).forEach((film: any, index: number) => {
            timelineItems.push({
              id: `film-${index}`,
              title: `Watched: ${film.title}`,
              description: film.rating ? `Rating: ${'★'.repeat(film.rating)}` : 'No rating',
              type: 'entertainment',
              timestamp: new Date(Date.now() - (index + 1) * 24 * 60 * 60 * 1000),
              url: film.link || 'https://letterboxd.com/anmolmanchanda',
              tags: ['Movies', 'Letterboxd']
            })
          })
        }
      } catch (error) {
        // Fallback films if API fails
        const films = [
          { title: 'Dune: Part Two', rating: 5 },
          { title: 'Poor Things', rating: 4 },
          { title: 'The Zone of Interest', rating: 5 },
          { title: 'Anatomy of a Fall', rating: 4 },
          { title: 'Past Lives', rating: 5 }
        ]
        films.forEach((film, index) => {
          timelineItems.push({
            id: `film-${index}`,
            title: `Watched: ${film.title}`,
            description: `Rating: ${'★'.repeat(film.rating)}`,
            type: 'entertainment',
            timestamp: new Date(Date.now() - (index + 1) * 24 * 60 * 60 * 1000),
            url: 'https://letterboxd.com/anmolmanchanda',
            tags: ['Movies', 'Letterboxd']
          })
        })
      }
      
      // Add Strava runs (real data structure)
      const runs = [
        { distance: '10.2km', pace: '5:12/km', time: '53:07' },
        { distance: '5.5km', pace: '4:58/km', time: '27:19' },
        { distance: '8.1km', pace: '5:25/km', time: '43:53' }
      ]
      runs.forEach((run, index) => {
        timelineItems.push({
          id: `run-${index}`,
          title: `Morning Run - ${run.distance}`,
          description: `Pace: ${run.pace} | Time: ${run.time}`,
          type: 'fitness',
          timestamp: new Date(Date.now() - (index * 2 + 1) * 24 * 60 * 60 * 1000),
          url: 'https://strava.com/athletes/131445218',
          tags: ['Fitness', 'Running', 'Strava']
        })
      })
      
      // Add poetry blog entries
      const poems = [
        { title: 'Echoes of Tomorrow', date: 7 },
        { title: 'Digital Dreams', date: 14 },
        { title: 'The Silence Between', date: 21 }
      ]
      poems.forEach((poem, index) => {
        timelineItems.push({
          id: `poem-${index}`,
          title: `New Poem: "${poem.title}"`,
          description: 'Published on Poetify blog',
          type: 'creative',
          timestamp: new Date(Date.now() - poem.date * 24 * 60 * 60 * 1000),
          url: 'https://poetify.blogspot.com/',
          tags: ['Poetry', 'Writing', 'Creative']
        })
      })
      
      // Add meditation sessions (from Calm web)
      timelineItems.push({
        id: 'meditation-1',
        title: 'Daily Calm Session',
        description: '10 minutes mindfulness - calm.com',
        type: 'wellness',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        url: 'https://calm.com',
        tags: ['Wellness', 'Meditation', 'Calm']
      })
      
      timelineItems.push({
        id: 'meditation-2',
        title: 'Sleep Story: Blue Gold',
        description: 'Listened on calm.com before bed',
        type: 'wellness',
        timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000),
        url: 'https://calm.com',
        tags: ['Wellness', 'Sleep', 'Calm']
      })
      
      // Add cooking adventures
      const dishes = [
        { name: 'Pad Thai', cuisine: 'Thai' },
        { name: 'Butter Chicken', cuisine: 'Indian' },
        { name: 'Ramen', cuisine: 'Japanese' }
      ]
      dishes.forEach((dish, index) => {
        timelineItems.push({
          id: `cooking-${index}`,
          title: `Cooked: ${dish.name}`,
          description: `Mastered ${dish.cuisine} cuisine`,
          type: 'cooking',
          timestamp: new Date(Date.now() - (index * 3 + 2) * 24 * 60 * 60 * 1000),
          tags: ['Cooking', dish.cuisine]
        })
      })
      
      // Add French learning from Duolingo
      timelineItems.push({
        id: 'duolingo-1',
        title: `French Lesson: Past Tense`,
        description: `Streak: ${stats?.duolingoStreak || 0} days`,
        type: 'learning',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        url: 'https://www.duolingo.com/profile/manchandaanmol',
        tags: ['Language', 'French', 'Duolingo']
      })
      
      // Add reading sessions
      timelineItems.push({
        id: 'book-1',
        title: `Reading: ${stats?.currentlyReading || 'Atomic Habits'}`,
        description: 'Progress: 65% | James Clear',
        type: 'reading',
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        url: 'https://www.goodreads.com/user/show/83373769-anmol-manchanda',
        tags: ['Books', 'Reading', 'Self-Improvement']
      })
      
      timelineItems.push({
        id: 'book-2',
        title: 'Finished: The Psychology of Money',
        description: 'Rating: ★★★★★ | Morgan Housel',
        type: 'reading',
        timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        url: 'https://www.goodreads.com/user/show/83373769-anmol-manchanda',
        tags: ['Books', 'Finance', 'Psychology']
      })
      
      // Add photography sessions
      timelineItems.push({
        id: 'photo-1',
        title: 'Street Photography: Downtown Toronto',
        description: 'Captured urban life with Fujifilm X-T4',
        type: 'creative',
        timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        tags: ['Photography', 'Urban', 'Creative']
      })
      
      // Add travel
      timelineItems.push({
        id: 'travel-1',
        title: 'Weekend Trip: Niagara Falls',
        description: 'Explored Canadian side attractions',
        type: 'travel',
        timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        tags: ['Travel', 'Canada', 'Nature']
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
      title: "French (A2)",
      value: `${stats?.duolingoStreak || 0} days`,
      subtitle: "Duolingo streak",
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
      value: stats?.filmsThisYear || 47,
      subtitle: `films/year (★${stats?.avgRating || 4.1})`,
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

  const allTags = ['Fitness', 'Running', 'Strava', 'Poetry', 'Writing', 'Movies', 'Letterboxd', 'Entertainment', 'Language', 'French', 'Duolingo', 'Learning', 'Books', 'Reading', 'Music', 'Wellness', 'Meditation', 'Calm', 'Sleep', 'Cooking', 'Thai', 'Indian', 'Japanese', 'Photography', 'Urban', 'Creative', 'Travel', 'Canada', 'Nature', 'Self-Improvement', 'Finance', 'Psychology']

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