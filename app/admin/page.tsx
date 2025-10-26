"use client"

import { useState, useEffect } from "react"
import { Save, Lock, Check, AlertCircle, Activity, Database, Trash2, RefreshCw, Eye, Clock, TrendingUp, LogOut, Server, BarChart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import toast, { Toaster } from 'react-hot-toast'

interface TrackerData {
  // Custom Trackers
  daysSinceLastPoem: number
  currentSideProject: string
  learningQueue: string[]

  // Life Stats
  booksReadThisYear: number
  poemsWritten: number
  kmRun: number
  coffeesConsumed: number

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

interface AnalyticsData {
  totalViews: number
  uniquePages: number
  pages: Array<{ slug: string; views: number }>
  keepAliveActive: boolean
  lastKeepAlive: string | null
}

interface RedisStats {
  totalKeys: number
  categories: {
    views: number
    cooldowns: number
    analytics: number
    system: number
    other: number
  }
  approximateSize: number
  sizeFormatted: string
}

interface RedisKey {
  key: string
  type: string
  size: number
  ttl: string
  preview: string
}

const DEFAULT_DATA: TrackerData = {
  daysSinceLastPoem: 0,
  currentSideProject: "Portfolio Website v2",
  learningQueue: ["Rust", "WebAssembly", "Kubernetes"],
  booksReadThisYear: 24,
  poemsWritten: 37,
  kmRun: 523,
  coffeesConsumed: 999,
  currentlyUsing: {
    llms: ["Claude 3.5 Sonnet", "GPT-4"],
    editor: ["Cursor", "VS Code"],
    frameworks: ["Next.js 15", "React 19"],
    databases: ["PostgreSQL", "Redis"],
    tools: ["Docker", "Git", "Vercel"]
  },
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
}

type Tab = 'analytics' | 'trackers' | 'redis' | 'settings'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState<Tab>('analytics')

  // Tracker state
  const [data, setData] = useState<TrackerData>(DEFAULT_DATA)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Analytics state
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [analyticsLoading, setAnalyticsLoading] = useState(true)

  // Redis state
  const [redisStats, setRedisStats] = useState<RedisStats | null>(null)
  const [redisKeys, setRedisKeys] = useState<RedisKey[]>([])
  const [redisLoading, setRedisLoading] = useState(false)
  const [searchPattern, setSearchPattern] = useState('*')

  // Check if already authenticated on mount
  useEffect(() => {
    checkSession()
  }, [])

  // Load data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadTrackerData()
      loadAnalytics()
      loadRedisStats()
    }
  }, [isAuthenticated])

  // Auto-refresh analytics
  useEffect(() => {
    if (isAuthenticated && activeTab === 'analytics') {
      const interval = setInterval(loadAnalytics, 30000) // Refresh every 30s
      return () => clearInterval(interval)
    }
    return undefined
  }, [isAuthenticated, activeTab])

  const checkSession = async () => {
    try {
      const res = await fetch('/api/admin/auth')
      if (res.ok) {
        const data = await res.json()
        if (data.authenticated) {
          setIsAuthenticated(true)
        }
      }
    } catch (error) {
      console.error('Session check failed:', error)
    } finally {
      setIsChecking(false)
    }
  }

  const loadTrackerData = async () => {
    try {
      const res = await fetch('/api/admin/trackers')
      const result = await res.json()
      if (result.data) {
        setData(result.data)
      }
    } catch (err) {
      console.error('Failed to load tracker data:', err)
      toast.error('Failed to load tracker data')
    }
  }

  const loadAnalytics = async () => {
    try {
      setAnalyticsLoading(true)
      const res = await fetch('/api/stats')
      const result = await res.json()
      if (result.success) {
        setAnalytics(result.stats)
      }
    } catch (err) {
      console.error('Failed to load analytics:', err)
    } finally {
      setAnalyticsLoading(false)
    }
  }

  const loadRedisStats = async () => {
    try {
      setRedisLoading(true)
      const res = await fetch('/api/admin/redis?action=stats')
      const result = await res.json()
      if (result.success) {
        setRedisStats(result.stats)
      }
    } catch (err) {
      console.error('Failed to load Redis stats:', err)
      toast.error('Failed to load Redis stats')
    } finally {
      setRedisLoading(false)
    }
  }

  const loadRedisKeys = async (pattern: string = '*') => {
    try {
      setRedisLoading(true)
      const res = await fetch(`/api/admin/redis?action=keys&pattern=${encodeURIComponent(pattern)}`)
      const result = await res.json()
      if (result.success) {
        setRedisKeys(result.keys)
        toast.success(`Found ${result.total} keys`)
      }
    } catch (err) {
      console.error('Failed to load Redis keys:', err)
      toast.error('Failed to load Redis keys')
    } finally {
      setRedisLoading(false)
    }
  }

  const deleteRedisKey = async (key: string) => {
    if (!confirm(`Are you sure you want to delete key: ${key}?`)) return

    try {
      const res = await fetch(`/api/admin/redis?key=${encodeURIComponent(key)}`, {
        method: 'DELETE'
      })
      const result = await res.json()
      if (result.success) {
        toast.success(result.message)
        loadRedisKeys(searchPattern)
        loadRedisStats()
      } else {
        toast.error(result.message)
      }
    } catch (err) {
      toast.error('Failed to delete key')
    }
  }

  const clearRedisPattern = async (pattern: string) => {
    if (!confirm(`Are you sure you want to delete all keys matching: ${pattern}?`)) return

    try {
      const res = await fetch(`/api/admin/redis?pattern=${encodeURIComponent(pattern)}`, {
        method: 'DELETE'
      })
      const result = await res.json()
      if (result.success) {
        toast.success(result.message)
        loadRedisStats()
        if (redisKeys.length > 0) {
          loadRedisKeys(searchPattern)
        }
      } else {
        toast.error(result.message)
      }
    } catch (err) {
      toast.error('Failed to clear cache')
    }
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      if (res.ok) {
        setIsAuthenticated(true)
        setError("")
        toast.success('Successfully authenticated')
      } else {
        setError("Invalid password")
        toast.error('Invalid password')
      }
    } catch {
      setError("Authentication failed")
      toast.error('Authentication failed')
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' })
      setIsAuthenticated(false)
      setActiveTab('analytics')
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error('Logout failed')
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveSuccess(false)

    try {
      const res = await fetch('/api/admin/trackers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          lastUpdated: new Date().toISOString()
        })
      })

      if (res.ok) {
        setSaveSuccess(true)
        toast.success('Data saved successfully!')
        setTimeout(() => setSaveSuccess(false), 3000)
      } else {
        toast.error('Failed to save data')
      }
    } catch {
      toast.error('Error saving data')
    } finally {
      setIsSaving(false)
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    if (!isAuthenticated) return

    const handleKeyPress = (e: KeyboardEvent) => {
      // Cmd/Ctrl + S to save
      if ((e.metaKey || e.ctrlKey) && e.key === 's' && activeTab === 'trackers') {
        e.preventDefault()
        handleSave()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isAuthenticated, activeTab, data])

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center aurora-bg">
        <Activity className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <>
        <Toaster position="top-right" />
        <div className="min-h-screen flex items-center justify-center aurora-bg">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 w-full max-w-md"
          >
            <div className="glass-morphism rounded-2xl border backdrop-blur-md p-8 shadow-xl">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-primary/10">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-center mb-6">Admin Access</h1>

              <form onSubmit={handleAuth} className="space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 rounded-lg bg-background/50 backdrop-blur-sm border focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  autoFocus
                />

                {error && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-medium"
                >
                  Authenticate
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </>
    )
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="py-24 sm:py-32 aurora-bg min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                <p className="text-muted-foreground text-sm">Manage your portfolio data and analytics</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-secondary transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="glass-morphism rounded-xl border backdrop-blur-md mb-6 p-1">
              <div className="flex gap-1">
                {[
                  { id: 'analytics' as Tab, label: 'Analytics', icon: BarChart },
                  { id: 'trackers' as Tab, label: 'Trackers', icon: TrendingUp },
                  { id: 'redis' as Tab, label: 'Redis', icon: Database },
                  { id: 'settings' as Tab, label: 'Settings', icon: Server }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'hover:bg-secondary/50'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'analytics' && (
                  <AnalyticsTab
                    analytics={analytics}
                    loading={analyticsLoading}
                    onRefresh={loadAnalytics}
                  />
                )}

                {activeTab === 'trackers' && (
                  <TrackersTab
                    data={data}
                    setData={setData}
                    onSave={handleSave}
                    isSaving={isSaving}
                    saveSuccess={saveSuccess}
                  />
                )}

                {activeTab === 'redis' && (
                  <RedisTab
                    stats={redisStats}
                    keys={redisKeys}
                    loading={redisLoading}
                    searchPattern={searchPattern}
                    setSearchPattern={setSearchPattern}
                    onRefreshStats={loadRedisStats}
                    onSearchKeys={loadRedisKeys}
                    onDeleteKey={deleteRedisKey}
                    onClearPattern={clearRedisPattern}
                  />
                )}

                {activeTab === 'settings' && (
                  <SettingsTab />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  )
}

// Analytics Tab Component
function AnalyticsTab({ analytics, loading, onRefresh }: {
  analytics: AnalyticsData | null
  loading: boolean
  onRefresh: () => void
}) {
  if (loading) {
    return (
      <div className="glass-morphism rounded-xl border backdrop-blur-md p-12 text-center">
        <Activity className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-muted-foreground">Loading analytics...</p>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="glass-morphism rounded-xl border backdrop-blur-md p-12 text-center">
        <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">No analytics data available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-morphism rounded-xl border backdrop-blur-md p-6">
          <div className="flex items-center gap-3 mb-3">
            <Eye className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-sm">Total Views</h3>
          </div>
          <p className="text-4xl font-bold">{analytics.totalViews.toLocaleString()}</p>
        </div>

        <div className="glass-morphism rounded-xl border backdrop-blur-md p-6">
          <div className="flex items-center gap-3 mb-3">
            <Database className="w-5 h-5 text-purple-500" />
            <h3 className="font-semibold text-sm">Pages Tracked</h3>
          </div>
          <p className="text-4xl font-bold">{analytics.uniquePages}</p>
        </div>

        <div className="glass-morphism rounded-xl border backdrop-blur-md p-6">
          <div className="flex items-center gap-3 mb-3">
            <Activity className={`w-5 h-5 ${analytics.keepAliveActive ? 'text-green-500' : 'text-red-500'}`} />
            <h3 className="font-semibold text-sm">Redis Status</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${analytics.keepAliveActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <p className="text-2xl font-bold">{analytics.keepAliveActive ? 'Active' : 'Inactive'}</p>
          </div>
        </div>
      </div>

      {/* Last Keep-Alive */}
      {analytics.lastKeepAlive && (
        <div className="glass-morphism rounded-xl border backdrop-blur-md p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <h3 className="font-semibold">Last Keep-Alive Ping</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(analytics.lastKeepAlive).toLocaleString()}
                </p>
              </div>
            </div>
            <button
              onClick={onRefresh}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      )}

      {/* Page Views Table */}
      <div className="glass-morphism rounded-xl border backdrop-blur-md p-6">
        <h2 className="text-xl font-bold mb-4">Page Views</h2>

        {analytics.pages.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No page views tracked yet
          </p>
        ) : (
          <div className="space-y-2">
            {analytics.pages.map((page, index) => (
              <div
                key={page.slug}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-muted-foreground w-8">
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
    </div>
  )
}

// Trackers Tab Component
function TrackersTab({ data, setData, onSave, isSaving, saveSuccess }: {
  data: TrackerData
  setData: (data: TrackerData) => void
  onSave: () => void
  isSaving: boolean
  saveSuccess: boolean
}) {
  return (
    <div className="space-y-6">
      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-all font-medium"
        >
          {isSaving ? (
            <>
              <Activity className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : saveSuccess ? (
            <>
              <Check className="w-4 h-4" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
              <span className="text-xs opacity-70 ml-1">(Cmd+S)</span>
            </>
          )}
        </button>
      </div>

      {/* Custom Trackers */}
      <section className="glass-morphism rounded-xl border backdrop-blur-md p-6">
        <h2 className="text-xl font-semibold mb-4">Custom Trackers</h2>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Days Since Last Poem</label>
            <input
              type="number"
              value={data.daysSinceLastPoem}
              onChange={(e) => setData({...data, daysSinceLastPoem: parseInt(e.target.value) || 0})}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Current Side Project</label>
            <input
              type="text"
              value={data.currentSideProject}
              onChange={(e) => setData({...data, currentSideProject: e.target.value})}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Learning Queue (comma-separated)</label>
            <input
              type="text"
              value={data.learningQueue.join(", ")}
              onChange={(e) => setData({...data, learningQueue: e.target.value.split(", ").filter(Boolean)})}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      {/* Life Stats */}
      <section className="glass-morphism rounded-xl border backdrop-blur-md p-6">
        <h2 className="text-xl font-semibold mb-4">Life Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Books Read This Year</label>
            <input
              type="number"
              value={data.booksReadThisYear}
              onChange={(e) => setData({...data, booksReadThisYear: parseInt(e.target.value) || 0})}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Poems Written</label>
            <input
              type="number"
              value={data.poemsWritten}
              onChange={(e) => setData({...data, poemsWritten: parseInt(e.target.value) || 0})}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">KM Run</label>
            <input
              type="number"
              value={data.kmRun}
              onChange={(e) => setData({...data, kmRun: parseInt(e.target.value) || 0})}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Coffees Consumed</label>
            <input
              type="number"
              value={data.coffeesConsumed}
              onChange={(e) => setData({...data, coffeesConsumed: parseInt(e.target.value) || 0})}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="glass-morphism rounded-xl border backdrop-blur-md p-6">
        <h2 className="text-xl font-semibold mb-4">Tech Stack</h2>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">LLMs (comma-separated)</label>
            <input
              type="text"
              value={data.currentlyUsing.llms.join(", ")}
              onChange={(e) => setData({
                ...data,
                currentlyUsing: {...data.currentlyUsing, llms: e.target.value.split(", ").filter(Boolean)}
              })}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Editors (comma-separated)</label>
            <input
              type="text"
              value={data.currentlyUsing.editor.join(", ")}
              onChange={(e) => setData({
                ...data,
                currentlyUsing: {...data.currentlyUsing, editor: e.target.value.split(", ").filter(Boolean)}
              })}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Frameworks (comma-separated)</label>
            <input
              type="text"
              value={data.currentlyUsing.frameworks.join(", ")}
              onChange={(e) => setData({
                ...data,
                currentlyUsing: {...data.currentlyUsing, frameworks: e.target.value.split(", ").filter(Boolean)}
              })}
              className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </section>

      {/* Learning Progress */}
      <section className="glass-morphism rounded-xl border backdrop-blur-md p-6">
        <h2 className="text-xl font-semibold mb-4">Learning Progress</h2>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">French Level</label>
              <input
                type="text"
                value={data.learning.french.level}
                onChange={(e) => setData({
                  ...data,
                  learning: {...data.learning, french: {...data.learning.french, level: e.target.value}}
                })}
                className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">French Streak (days)</label>
              <input
                type="number"
                value={data.learning.french.streak}
                onChange={(e) => setData({
                  ...data,
                  learning: {...data.learning, french: {...data.learning.french, streak: parseInt(e.target.value) || 0}}
                })}
                className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">AWS Progress (%)</label>
              <input
                type="number"
                value={data.learning.aws.progress}
                onChange={(e) => setData({
                  ...data,
                  learning: {...data.learning, aws: {...data.learning.aws, progress: parseInt(e.target.value) || 0}}
                })}
                className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
                min="0"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">AWS Target</label>
              <input
                type="text"
                value={data.learning.aws.target}
                onChange={(e) => setData({
                  ...data,
                  learning: {...data.learning, aws: {...data.learning.aws, target: e.target.value}}
                })}
                className="w-full px-3 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Redis Tab Component
function RedisTab({ stats, keys, loading, searchPattern, setSearchPattern, onRefreshStats, onSearchKeys, onDeleteKey, onClearPattern }: {
  stats: RedisStats | null
  keys: RedisKey[]
  loading: boolean
  searchPattern: string
  setSearchPattern: (pattern: string) => void
  onRefreshStats: () => void
  onSearchKeys: (pattern: string) => void
  onDeleteKey: (key: string) => void
  onClearPattern: (pattern: string) => void
}) {
  return (
    <div className="space-y-6">
      {/* Redis Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-morphism rounded-xl border backdrop-blur-md p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Keys</h3>
            <p className="text-3xl font-bold">{stats.totalKeys}</p>
          </div>

          <div className="glass-morphism rounded-xl border backdrop-blur-md p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Views</h3>
            <p className="text-3xl font-bold text-blue-500">{stats.categories.views}</p>
          </div>

          <div className="glass-morphism rounded-xl border backdrop-blur-md p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Analytics</h3>
            <p className="text-3xl font-bold text-purple-500">{stats.categories.analytics}</p>
          </div>

          <div className="glass-morphism rounded-xl border backdrop-blur-md p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Storage</h3>
            <p className="text-2xl font-bold text-green-500">{stats.sizeFormatted}</p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="glass-morphism rounded-xl border backdrop-blur-md p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => onClearPattern('view_cooldown:*')}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border hover:bg-red-500/10 hover:border-red-500 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Clear Cooldowns
          </button>

          <button
            onClick={() => onClearPattern('analytics:*')}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border hover:bg-red-500/10 hover:border-red-500 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Clear Analytics
          </button>

          <button
            onClick={() => onClearPattern('views:*')}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border hover:bg-red-500/10 hover:border-red-500 transition-all text-sm"
          >
            <Trash2 className="w-4 h-4" />
            Reset View Counts
          </button>

          <button
            onClick={onRefreshStats}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Stats
          </button>
        </div>
      </div>

      {/* Key Browser */}
      <div className="glass-morphism rounded-xl border backdrop-blur-md p-6">
        <h2 className="text-xl font-semibold mb-4">Browse Keys</h2>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            value={searchPattern}
            onChange={(e) => setSearchPattern(e.target.value)}
            placeholder="Pattern (e.g., views:* or *)"
            className="flex-1 px-4 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
            onKeyDown={(e) => e.key === 'Enter' && onSearchKeys(searchPattern)}
          />
          <button
            onClick={() => onSearchKeys(searchPattern)}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-all"
          >
            {loading ? <Activity className="w-4 h-4 animate-spin" /> : <Database className="w-4 h-4" />}
            Search
          </button>
        </div>

        {keys.length > 0 && (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {keys.map((key) => (
              <div
                key={key.key}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex-1 min-w-0 mr-4">
                  <p className="font-mono text-sm font-medium truncate">{key.key}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-muted-foreground">
                      Type: {key.type}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Size: {key.size} bytes
                    </span>
                    <span className="text-xs text-muted-foreground">
                      TTL: {key.ttl}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {key.preview}
                  </p>
                </div>
                <button
                  onClick={() => onDeleteKey(key.key)}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-all"
                  title="Delete key"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {keys.length === 0 && !loading && (
          <p className="text-center text-muted-foreground py-8">
            No keys found. Try searching with a pattern.
          </p>
        )}
      </div>
    </div>
  )
}

// Settings Tab Component
function SettingsTab() {
  return (
    <div className="space-y-6">
      <div className="glass-morphism rounded-xl border backdrop-blur-md p-6">
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <p className="text-muted-foreground">
          Session-based authentication with JWT tokens.
          Session expires after 7 days of inactivity.
        </p>
      </div>

      <div className="glass-morphism rounded-xl border backdrop-blur-md p-6">
        <h2 className="text-xl font-semibold mb-4">Security</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
            <span className="text-sm">Password hash algorithm</span>
            <span className="text-sm font-mono text-muted-foreground">SHA-256</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
            <span className="text-sm">Session token algorithm</span>
            <span className="text-sm font-mono text-muted-foreground">HS256 (JWT)</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
            <span className="text-sm">Session duration</span>
            <span className="text-sm font-mono text-muted-foreground">7 days</span>
          </div>
        </div>
      </div>

      <div className="glass-morphism rounded-xl border backdrop-blur-md p-6">
        <h2 className="text-xl font-semibold mb-4">Keyboard Shortcuts</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
            <span className="text-sm">Save changes (Trackers tab)</span>
            <kbd className="px-2 py-1 text-xs font-mono rounded bg-background border">Cmd + S</kbd>
          </div>
        </div>
      </div>
    </div>
  )
}
