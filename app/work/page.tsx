"use client"

import { useState, useEffect, useCallback } from "react"
import { Clock, Code, Globe, ExternalLink } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { SearchFilter } from "@/components/SearchFilter"
import { WidgetGrid } from "@/components/CompactWidgets"
import { fetchAllStats } from "@/lib/external-apis"
import { useActivityStore } from "@/lib/store"
import { Loader2, Github, FileText, Trophy, TrendingUp, Brain, Database } from "lucide-react"

export default function WorkPage() {
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
      setStats(allStats.work)
      
      // Fetch GitHub activity
      const githubRes = await fetch('https://api.github.com/users/anmolmanchanda/events/public?per_page=20')
      const githubData = await githubRes.json()
      
      // Fetch tracker data
      await fetchTrackerData()
      
      // Build timeline with GitHub events and blog posts
      const timelineItems: any[] = []
      
      // Add GitHub events
      githubData.slice(0, 10).forEach((event: any) => {
        const repoName = event.repo.name.replace('anmolmanchanda/', '')
        let title = ''
        const type = 'github'
        
        switch(event.type) {
          case 'PushEvent':
            title = `Pushed ${event.payload.commits?.length || 0} commits to ${repoName}`
            break
          case 'CreateEvent':
            title = `Created ${event.payload.ref_type} in ${repoName}`
            break
          case 'PullRequestEvent':
            title = `${event.payload.action} PR in ${repoName}`
            break
          default:
            title = `${event.type.replace('Event', '')} in ${repoName}`
        }
        
        timelineItems.push({
          id: event.id,
          title,
          type,
          timestamp: new Date(event.created_at),
          url: `https://github.com/${event.repo.name}`,
          tags: ['GitHub', 'Code']
        })
      })
      
      // Add blog posts
      const blogPosts = [
        {
          id: 'blog-1',
          title: 'Building TB-Scale Infrastructure at UN-Habitat',
          type: 'article',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          url: '/work/building-tb-scale-data-infrastructure-un',
          tags: ['AWS', 'Data', 'Enterprise']
        },
        {
          id: 'blog-2',
          title: 'AI-Assisted macOS Development',
          type: 'article',
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          url: '/work/ai-assisted-macos-life-manager',
          tags: ['AI', 'macOS', 'Swift']
        }
      ]
      
      timelineItems.push(...blogPosts)
      
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

  const workWidgets = [
    {
      title: "GitHub",
      value: stats?.publicRepos || "50+",
      subtitle: "repositories",
      url: "https://github.com/anmolmanchanda",
      icon: <Github className="w-4 h-4 text-white" />,
      color: "bg-gray-800"
    },
    {
      title: "Lines of Code",
      value: stats?.linesOfCode ? `${(stats.linesOfCode / 1000000).toFixed(1)}M` : "1.2M",
      subtitle: "written",
      icon: <Code className="w-4 h-4 text-white" />,
      color: "bg-green-600"
    },
    {
      title: "Projects",
      value: trackerData?.projectsCompleted || 50,
      subtitle: "completed",
      icon: <Trophy className="w-4 h-4 text-white" />,
      color: "bg-yellow-600"
    },
    {
      title: "Cities Impacted",
      value: trackerData?.citiesImpacted || 12,
      subtitle: "globally",
      icon: <Globe className="w-4 h-4 text-white" />,
      color: "bg-blue-600"
    },
    {
      title: "Data Processed",
      value: trackerData?.dataProcessed || "3TB",
      subtitle: "at scale",
      icon: <Database className="w-4 h-4 text-white" />,
      color: "bg-purple-600"
    },
    {
      title: "Experience",
      value: `${trackerData?.yearsExperience || 8} years`,
      subtitle: "professional",
      icon: <TrendingUp className="w-4 h-4 text-white" />,
      color: "bg-orange-600"
    },
    {
      title: "This Week",
      value: stats?.codingThisWeek || "31 hrs",
      subtitle: "coding time",
      icon: <Clock className="w-4 h-4 text-white" />,
      color: "bg-pink-600"
    },
    {
      title: "AWS Progress",
      value: `${trackerData?.learning?.aws?.progress || 35}%`,
      subtitle: "certification",
      icon: <Brain className="w-4 h-4 text-white" />,
      color: "bg-amber-600"
    }
  ]

  const allTags = ['GitHub', 'Code', 'Article', 'AWS', 'AI', 'Data', 'Enterprise', 'Swift', 'macOS']

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Search & Filter */}
          <div className="mb-8">
            <SearchFilter
              onSearch={handleSearch}
              onTagSelect={handleTagFilter}
              availableTags={allTags}
              placeholder="Search projects, code, articles..."
            />
          </div>

          {/* Work Stats */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Work Stats</h2>
            <WidgetGrid widgets={workWidgets} />
          </div>

          {/* Work Timeline */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Work Timeline</h2>
            <div className="space-y-4">
              {filteredTimeline.map((item) => (
                <div key={item.id} className="liquid-glass rounded-lg border backdrop-blur-md p-4 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {item.type === 'github' && <Github className="w-4 h-4 text-gray-500" />}
                        {item.type === 'article' && <FileText className="w-4 h-4 text-blue-500" />}
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