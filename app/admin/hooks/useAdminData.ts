import { useState, useEffect, useCallback, useRef } from 'react'
import toast from 'react-hot-toast'
import type { TrackerData, AnalyticsData, RedisStats, RedisKey, HistoricalDataPoint } from '../types'
import { checkAchievements, showAchievement } from '../utils/notifications'

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  const checkSession = useCallback(async () => {
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
  }, [])

  const login = useCallback(async (password: string) => {
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      if (res.ok) {
        setIsAuthenticated(true)
        toast.success('Successfully authenticated')
        return true
      } else {
        toast.error('Invalid password')
        return false
      }
    } catch {
      toast.error('Authentication failed')
      return false
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' })
      setIsAuthenticated(false)
      toast.success('Logged out successfully')
    } catch (error) {
      toast.error('Logout failed')
    }
  }, [])

  useEffect(() => {
    checkSession()
  }, [checkSession])

  return { isAuthenticated, isChecking, login, logout }
}

export function useTrackerData(autoSaveEnabled: boolean = false) {
  const [data, setData] = useState<TrackerData | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [isAutoSaving, setIsAutoSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const initialDataRef = useRef<string | null>(null)

  const loadData = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/trackers')
      const result = await res.json()
      if (result.data) {
        setData(result.data)
        initialDataRef.current = JSON.stringify(result.data)
      }
    } catch (err) {
      console.error('Failed to load tracker data:', err)
      toast.error('Failed to load tracker data')
    }
  }, [])

  const saveData = useCallback(async (trackerData: TrackerData, silent: boolean = false) => {
    if (silent) {
      setIsAutoSaving(true)
    } else {
      setIsSaving(true)
      setSaveSuccess(false)
    }

    try {
      const res = await fetch('/api/admin/trackers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...trackerData,
          lastUpdated: new Date().toISOString()
        })
      })

      if (res.ok) {
        // Check for achievements before updating state
        const newAchievements = checkAchievements(data, trackerData)

        setLastSaved(new Date())
        initialDataRef.current = JSON.stringify(trackerData)

        if (!silent) {
          setSaveSuccess(true)
          toast.success('Data saved successfully!')
          setTimeout(() => setSaveSuccess(false), 3000)

          // Show achievement notifications
          newAchievements.forEach((achievement, index) => {
            setTimeout(() => showAchievement(achievement), index * 500)
          })
        }
        return true
      } else {
        if (!silent) {
          toast.error('Failed to save data')
        }
        return false
      }
    } catch {
      if (!silent) {
        toast.error('Error saving data')
      }
      return false
    } finally {
      if (silent) {
        setIsAutoSaving(false)
      } else {
        setIsSaving(false)
      }
    }
  }, [])

  // Auto-save with debouncing
  useEffect(() => {
    if (!autoSaveEnabled || !data || !initialDataRef.current) return

    // Check if data has changed
    const currentData = JSON.stringify(data)
    if (currentData === initialDataRef.current) return

    // Clear existing timeout
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current)
    }

    // Set new timeout for auto-save (30 seconds after last change)
    autoSaveTimeoutRef.current = setTimeout(() => {
      saveData(data, true)
    }, 30000)

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current)
      }
    }
  }, [data, autoSaveEnabled, saveData])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current)
      }
    }
  }, [])

  return {
    data,
    setData,
    isSaving,
    saveSuccess,
    isAutoSaving,
    lastSaved,
    loadData,
    saveData
  }
}

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  const loadAnalytics = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/stats')
      const result = await res.json()
      if (result.success) {
        setAnalytics(result.stats)
      }
    } catch (err) {
      console.error('Failed to load analytics:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  return { analytics, loading, loadAnalytics }
}

export function useRedis() {
  const [stats, setStats] = useState<RedisStats | null>(null)
  const [keys, setKeys] = useState<RedisKey[]>([])
  const [loading, setLoading] = useState(false)

  const loadStats = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/redis?action=stats')
      const result = await res.json()
      if (result.success) {
        setStats(result.stats)
      }
    } catch (err) {
      console.error('Failed to load Redis stats:', err)
      toast.error('Failed to load Redis stats')
    } finally {
      setLoading(false)
    }
  }, [])

  const loadKeys = useCallback(async (pattern: string = '*') => {
    try {
      setLoading(true)
      const res = await fetch(`/api/admin/redis?action=keys&pattern=${encodeURIComponent(pattern)}`)
      const result = await res.json()
      if (result.success) {
        setKeys(result.keys)
        toast.success(`Found ${result.total} keys`)
      }
    } catch (err) {
      console.error('Failed to load Redis keys:', err)
      toast.error('Failed to load Redis keys')
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteKey = useCallback(async (key: string, searchPattern: string) => {
    if (!confirm(`Are you sure you want to delete key: ${key}?`)) return false

    try {
      const res = await fetch(`/api/admin/redis?key=${encodeURIComponent(key)}`, {
        method: 'DELETE'
      })
      const result = await res.json()
      if (result.success) {
        toast.success(result.message)
        loadKeys(searchPattern)
        loadStats()
        return true
      } else {
        toast.error(result.message)
        return false
      }
    } catch (err) {
      toast.error('Failed to delete key')
      return false
    }
  }, [loadKeys, loadStats])

  const clearPattern = useCallback(async (pattern: string, shouldRefreshKeys: boolean, searchPattern: string) => {
    if (!confirm(`Are you sure you want to delete all keys matching: ${pattern}?`)) return false

    try {
      const res = await fetch(`/api/admin/redis?pattern=${encodeURIComponent(pattern)}`, {
        method: 'DELETE'
      })
      const result = await res.json()
      if (result.success) {
        toast.success(result.message)
        loadStats()
        if (shouldRefreshKeys) {
          loadKeys(searchPattern)
        }
        return true
      } else {
        toast.error(result.message)
        return false
      }
    } catch (err) {
      toast.error('Failed to clear cache')
      return false
    }
  }, [loadKeys, loadStats])

  return { stats, keys, loading, loadStats, loadKeys, deleteKey, clearPattern }
}

export function useHistoricalData() {
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([])
  const [loading, setLoading] = useState(false)

  const loadHistoricalData = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/history')
      const result = await res.json()
      if (result.success) {
        setHistoricalData(result.data)
      }
    } catch {
      toast.error('Failed to load historical data')
    } finally {
      setLoading(false)
    }
  }, [])

  const saveSnapshot = useCallback(async (data: TrackerData) => {
    try {
      const res = await fetch('/api/admin/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          booksReadThisYear: data.booksReadThisYear,
          poemsWritten: data.poemsWritten,
          kmRun: data.kmRun,
          coffeesConsumed: data.coffeesConsumed
        })
      })
      const result = await res.json()
      if (result.success) {
        toast.success('Snapshot saved to history')
        await loadHistoricalData()
        return true
      }
      return false
    } catch {
      toast.error('Failed to save snapshot')
      return false
    }
  }, [loadHistoricalData])

  return { historicalData, loading, loadHistoricalData, saveSnapshot }
}
