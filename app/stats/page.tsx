"use client"

import { useEffect, useState } from "react"
import { Activity, Eye, Database, Clock } from "lucide-react"

interface StatsData {
  success: boolean
  stats: {
    totalViews: number
    uniquePages: number
    pages: Array<{ slug: string; views: number }>
    keepAliveActive: boolean
    lastKeepAlive: string | null
  }
  timestamp: string
}

export default function StatsPage() {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/stats')
        const data = await response.json()

        if (data.success) {
          setStats(data)
        } else {
          setError(data.message || 'Failed to load stats')
        }
      } catch (err) {
        setError('Error fetching stats')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()

    // Refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading stats...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-24 sm:py-32 aurora-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Website Statistics</h1>
            <p className="text-muted-foreground">Real-time analytics from Redis</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="liquid-glass p-6 rounded-lg border backdrop-blur-md">
              <div className="flex items-center gap-3 mb-2">
                <Eye className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Total Views</h3>
              </div>
              <p className="text-3xl font-bold">{stats?.stats.totalViews.toLocaleString()}</p>
            </div>

            <div className="liquid-glass p-6 rounded-lg border backdrop-blur-md">
              <div className="flex items-center gap-3 mb-2">
                <Database className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Pages Tracked</h3>
              </div>
              <p className="text-3xl font-bold">{stats?.stats.uniquePages}</p>
            </div>

            <div className="liquid-glass p-6 rounded-lg border backdrop-blur-md">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-5 h-5 text-green-500" />
                <h3 className="font-semibold">Redis Status</h3>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${stats?.stats.keepAliveActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                <p className="text-lg font-semibold">
                  {stats?.stats.keepAliveActive ? 'Active' : 'Inactive'}
                </p>
              </div>
            </div>
          </div>

          {/* Keep-Alive Status */}
          {stats?.stats.lastKeepAlive && (
            <div className="liquid-glass p-6 rounded-lg border backdrop-blur-md mb-12">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Last Keep-Alive Ping</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                {new Date(stats.stats.lastKeepAlive).toLocaleString()}
              </p>
            </div>
          )}

          {/* Page Views Table */}
          <div className="liquid-glass p-6 rounded-lg border backdrop-blur-md">
            <h2 className="text-2xl font-bold mb-6">Page Views</h2>

            {stats?.stats.pages.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No page views tracked yet. Visit some pages to see data here!
              </p>
            ) : (
              <div className="space-y-3">
                {stats?.stats.pages.map((page, index) => (
                  <div
                    key={page.slug}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono text-muted-foreground">
                        #{index + 1}
                      </span>
                      <div>
                        <p className="font-medium">{page.slug}</p>
                        <a
                          href={`/work/${page.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline"
                        >
                          View page →
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                      <span className="text-lg font-bold">{page.views.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Refresh Info */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Last updated: {new Date(stats?.timestamp || '').toLocaleString()}</p>
            <p className="mt-1">Auto-refreshes every 30 seconds</p>
          </div>
        </div>
      </div>
    </div>
  )
}
