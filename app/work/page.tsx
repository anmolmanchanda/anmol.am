"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Clock, Code, ExternalLink, Briefcase } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { SearchFilter } from "@/components/SearchFilter"
import { WidgetGrid } from "@/components/CompactWidgets"
import { fetchAllStats } from "@/src/services/external-apis"
import { useActivityStore } from "@/lib/store"
import { Loader2, Github, FileText, Trophy, TrendingUp, Calendar, GitCommit, GitPullRequest } from "lucide-react"

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
      
      // Fetch more GitHub activity - get ALL recent activity
      const [githubRes, reposRes] = await Promise.all([
        fetch('https://api.github.com/users/anmolmanchanda/events/public?per_page=100'),
        fetch('https://api.github.com/users/anmolmanchanda/repos?per_page=100&sort=pushed')
      ])
      const githubData = await githubRes.json()
      const reposData = await reposRes.json()
      
      // Fetch tracker data
      await fetchTrackerData()
      
      // Build timeline with GitHub events and blog posts
      const timelineItems: any[] = []
      
      // Add GitHub events - show ALL activity from all repos
      githubData.forEach((event: any) => {
        const repoName = event.repo.name.replace('anmolmanchanda/', '')
        let title = ''
        const type = 'github'
        
        let description = ''
        
        switch(event.type) {
          case 'PushEvent':
            const commitCount = event.payload.commits?.length || 0
            const commitMessages = event.payload.commits?.slice(0, 2).map((c: any) => c.message).join(', ') || ''
            title = `Pushed ${commitCount} commit${commitCount !== 1 ? 's' : ''} to ${repoName}`
            description = commitMessages.length > 60 ? commitMessages.substring(0, 60) + '...' : commitMessages
            break
          case 'CreateEvent':
            title = `Created ${event.payload.ref_type} in ${repoName}`
            description = event.payload.ref || 'New ' + event.payload.ref_type
            break
          case 'PullRequestEvent':
            title = `${event.payload.action} PR in ${repoName}`
            description = event.payload.pull_request?.title || 'Pull request update'
            break
          case 'IssuesEvent':
            title = `${event.payload.action} issue in ${repoName}`
            description = event.payload.issue?.title || 'Issue update'
            break
          default:
            title = `${event.type.replace('Event', '')} in ${repoName}`
            description = 'Repository activity'
        }
        
        timelineItems.push({
          id: event.id,
          title,
          description,
          type,
          timestamp: new Date(event.created_at),
          url: `https://github.com/${event.repo.name}`,
          tags: ['GitHub', 'Code']
        })
      })
      
      // Add blog posts with descriptions
      const blogPosts = [
        {
          id: 'blog-1',
          title: 'Building TB-Scale Infrastructure at UN-Habitat',
          description: 'How we process 10+ TB of urban data monthly for 12 global cities',
          type: 'article',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          url: '/work/building-tb-scale-data-infrastructure-un',
          tags: ['Article', 'AWS', 'Data', 'Enterprise']
        },
        {
          id: 'blog-2',
          title: 'AI-Assisted macOS Development',
          description: 'Creating a personal life management system with Claude AI',
          type: 'article',
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          url: '/work/ai-assisted-macos-life-manager',
          tags: ['Article', 'AI', 'macOS', 'Swift']
        },
        {
          id: 'blog-3',
          title: 'Automating Workflows with N8N',
          description: 'Building intelligent automation pipelines for productivity',
          type: 'article',
          timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
          url: '/work/n8n-automation',
          tags: ['Article', 'Automation', 'N8N']
        },
        {
          id: 'blog-4',
          title: 'Enterprise AWS Architecture Patterns',
          description: 'Best practices from UN-Habitat implementation',
          type: 'article',
          timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
          url: '/work/aws-patterns',
          tags: ['Article', 'AWS', 'Architecture']
        }
      ]
      
      timelineItems.push(...blogPosts)
      
      // Add repository summaries for active repos (last 5 pushed)
      reposData.slice(0, 5).forEach((repo: any) => {
        if (repo.pushed_at) {
          timelineItems.push({
            id: `repo-${repo.id}`,
            title: `Active Repository: ${repo.name}`,
            description: repo.description || `${repo.language || 'Multiple languages'} • ${repo.size} KB • ${repo.stargazers_count} stars`,
            type: 'github',
            timestamp: new Date(repo.pushed_at),
            url: repo.html_url,
            tags: ['GitHub', 'Repository', repo.language || 'Code'].filter(Boolean)
          })
        }
      })
      
      // Sort by timestamp and deduplicate
      const uniqueItems = Array.from(new Map(timelineItems.map(item => [item.id, item])).values())
      uniqueItems.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      
      setTimeline(uniqueItems)
      setFilteredTimeline(uniqueItems)
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
      value: stats?.publicRepos ? `${stats.publicRepos}+` : "25+",
      subtitle: "public repos",
      url: "https://github.com/anmolmanchanda",
      icon: <Github className="w-4 h-4 text-white" />,
      color: "bg-gray-800"
    },
    {
      title: "Lines of Code",
      value: stats?.linesOfCode ? `~${(stats.linesOfCode / 1000000).toFixed(1)}M` : "~1.2M",
      subtitle: "estimated",
      icon: <Code className="w-4 h-4 text-white" />,
      color: "bg-green-600"
    },
    {
      title: "UN-Habitat",
      value: "Current",
      subtitle: "Software Engineer",
      url: "https://www.qolimpact.com",
      icon: <Briefcase className="w-4 h-4 text-white" />,
      color: "bg-blue-600"
    },
    {
      title: "Experience",
      value: "4 roles",
      subtitle: "UN, SWRIL, WFC, AIESEC",
      icon: <TrendingUp className="w-4 h-4 text-white" />,
      color: "bg-orange-600"
    },
    {
      title: "GitHub Stars",
      value: stats?.totalStars || "234",
      subtitle: "earned",
      icon: <Trophy className="w-4 h-4 text-white" />,
      color: "bg-yellow-600"
    },
    {
      title: "AWS Progress",
      value: `${trackerData?.learning?.aws?.progress || 35}%`,
      subtitle: "certification",
      icon: <Calendar className="w-4 h-4 text-white" />,
      color: "bg-amber-600"
    }
  ]

  const allTags = ['GitHub', 'Code', 'Article', 'AWS', 'AI', 'Data', 'Enterprise', 'Swift', 'macOS', 'Commits', 'Pull Request']

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen py-24 sm:py-32 overflow-hidden aurora-bg-work">
      {/* Strong professional gradient overlay like Life page */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/85 via-primary/10 to-accent/10" />
      <div className="absolute inset-0 ai-grid opacity-30" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl">
          {/* Header with Profile */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg ring-4 ring-indigo-500/30">
                  <Image
                    src="/images/work_avatar.JPG"
                    alt="Professional Avatar"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
                <div className="absolute -bottom-1 -right-1">
                  <div className="w-5 h-5 rounded-full bg-indigo-500 border-2 border-background shadow-lg flex items-center justify-center">
                    <Briefcase className="w-3 h-3 text-white" />
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
              placeholder="Search projects, code, articles..."
            />
            {/* Display popular tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">Popular tags:</span>
              {['GitHub', 'Article', 'AWS', 'AI'].map(tag => (
                <button
                  key={tag}
                  onClick={() => handleTagFilter(tag)}
                  className="px-2 py-1 text-xs rounded-full bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
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
              {filteredTimeline.map((item) => {
                const isGitHub = item.type === 'github'
                const isArticle = item.type === 'article'
                
                return (
                  <div 
                    key={item.id} 
                    className={`liquid-glass rounded-lg border backdrop-blur-md p-4 hover:shadow-lg transition-all ${
                      isArticle ? 'border-blue-500/30 bg-blue-500/5' : 
                      isGitHub ? 'border-gray-500/30 bg-gray-500/5' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Larger, more prominent icon */}
                      <div className={`p-2 rounded-lg ${
                        isArticle ? 'bg-blue-500/20' : 
                        isGitHub ? 'bg-gray-700/40' : 'bg-secondary'
                      }`}>
                        {item.type === 'github' && (
                          item.title.includes('Pushed') ? <GitCommit className="w-5 h-5 text-gray-300" /> :
                          item.title.includes('PR') ? <GitPullRequest className="w-5 h-5 text-gray-300" /> :
                          <Github className="w-5 h-5 text-gray-300" />
                        )}
                        {item.type === 'article' && <FileText className="w-5 h-5 text-blue-400" />}
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
                                    tag === 'Article' ? 'bg-blue-500/20 text-blue-300' :
                                    tag === 'GitHub' ? 'bg-gray-500/20 text-gray-300' :
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