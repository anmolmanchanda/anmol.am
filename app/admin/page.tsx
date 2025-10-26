"use client"

import { useState, useEffect } from "react"
import { BarChart, TrendingUp, Database, Server, Activity, LogOut } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Toaster } from 'react-hot-toast'

import { useAdminAuth, useTrackerData, useAnalytics, useRedis, useHistoricalData } from './hooks/useAdminData'
import { LoginForm } from './components/LoginForm'
import { AnalyticsTab } from './components/AnalyticsTab'
import { TrackersTab } from './components/TrackersTab'
import { RedisTab } from './components/RedisTab'
import { SettingsTab } from './components/SettingsTab'
import type { Tab } from './types'

export default function AdminPage() {
  const { isAuthenticated, isChecking, login, logout } = useAdminAuth()
  const { data, setData, isSaving, saveSuccess, isAutoSaving, lastSaved, loadData, saveData } = useTrackerData(true)
  const { analytics, loading: analyticsLoading, loadAnalytics } = useAnalytics()
  const { stats, keys, loading: redisLoading, loadStats, loadKeys, deleteKey, clearPattern } = useRedis()
  const { historicalData, loading: historyLoading, loadHistoricalData, saveSnapshot } = useHistoricalData()

  const [activeTab, setActiveTab] = useState<Tab>('analytics')
  const [searchPattern, setSearchPattern] = useState('*')

  // Load data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadData()
      loadAnalytics()
      loadStats()
      loadHistoricalData()
    }
  }, [isAuthenticated, loadData, loadAnalytics, loadStats, loadHistoricalData])

  // Auto-refresh analytics
  useEffect(() => {
    if (isAuthenticated && activeTab === 'analytics') {
      const interval = setInterval(loadAnalytics, 30000)
      return () => clearInterval(interval)
    }
    return undefined
  }, [isAuthenticated, activeTab, loadAnalytics])

  // Keyboard shortcuts
  useEffect(() => {
    if (!isAuthenticated) return

    const handleKeyPress = (e: KeyboardEvent) => {
      const isMod = e.metaKey || e.ctrlKey

      // Save (Cmd+S) - only on trackers tab
      if (isMod && e.key === 's' && !e.shiftKey && activeTab === 'trackers' && data) {
        e.preventDefault()
        saveData(data, false)
      }

      // Save Snapshot (Cmd+Shift+S) - only on trackers tab
      if (isMod && e.key === 's' && e.shiftKey && activeTab === 'trackers' && data) {
        e.preventDefault()
        saveSnapshot(data)
      }

      // Tab navigation (Cmd+1, Cmd+2, Cmd+3, Cmd+4)
      if (isMod && e.key >= '1' && e.key <= '4') {
        e.preventDefault()
        const tabs: Tab[] = ['analytics', 'trackers', 'redis', 'settings']
        const tabIndex = parseInt(e.key) - 1
        const selectedTab = tabs[tabIndex]
        if (selectedTab) {
          setActiveTab(selectedTab)
        }
      }

      // Refresh analytics (Cmd+R) - only on analytics tab
      if (isMod && e.key === 'r' && activeTab === 'analytics') {
        e.preventDefault()
        loadAnalytics()
      }

      // Focus search in Redis tab (Cmd+K)
      if (isMod && e.key === 'k' && activeTab === 'redis') {
        e.preventDefault()
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement
        if (searchInput) searchInput.focus()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isAuthenticated, activeTab, data, saveData, loadAnalytics, saveSnapshot])

  // Handlers for Redis operations
  const handleDeleteKey = (key: string) => {
    deleteKey(key, searchPattern)
  }

  const handleClearPattern = (pattern: string) => {
    clearPattern(pattern, keys.length > 0, searchPattern)
  }

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
        <LoginForm onLogin={login} />
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
                onClick={logout}
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
                    trackerData={data}
                  />
                )}

                {activeTab === 'trackers' && data && (
                  <TrackersTab
                    data={data}
                    setData={setData}
                    onSave={() => saveData(data, false)}
                    isSaving={isSaving}
                    saveSuccess={saveSuccess}
                    isAutoSaving={isAutoSaving}
                    lastSaved={lastSaved}
                    historicalData={historicalData}
                    historyLoading={historyLoading}
                    onSaveSnapshot={() => saveSnapshot(data)}
                  />
                )}

                {activeTab === 'redis' && (
                  <RedisTab
                    stats={stats}
                    keys={keys}
                    loading={redisLoading}
                    searchPattern={searchPattern}
                    setSearchPattern={setSearchPattern}
                    onRefreshStats={loadStats}
                    onSearchKeys={loadKeys}
                    onDeleteKey={handleDeleteKey}
                    onClearPattern={handleClearPattern}
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
