"use client"

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'

interface ViewTrackerProps {
  slug: string
  initialViews?: number
  showIcon?: boolean
  className?: string
}

export function ViewTracker({ slug, initialViews = 0, showIcon = true, className = "" }: ViewTrackerProps) {
  const [views, setViews] = useState(initialViews)
  const [isTracking, setIsTracking] = useState(false)
  const [hasTracked, setHasTracked] = useState(false)
  const [justUpdated, setJustUpdated] = useState(false)
  const [previousViews, setPreviousViews] = useState(initialViews)

  useEffect(() => {
    let mounted = true
    
    const fetchAndTrackView = async () => {
      if (hasTracked || isTracking) return
      
      setIsTracking(true)
      
      try {
        // First fetch current views to establish baseline
        const getResponse = await fetch(`/api/views/${slug}`)
        if (getResponse.ok) {
          const getCurrentData = await getResponse.json()
          if (mounted && getCurrentData.success) {
            const currentViews = getCurrentData.views
            setViews(currentViews)
            setPreviousViews(currentViews)
          }
        }

        // Then track the new view
        const trackResponse = await fetch('/api/views/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slug }),
        })
        
        if (!trackResponse.ok) {
          throw new Error(`HTTP error! status: ${trackResponse.status}`)
        }
        
        const trackData = await trackResponse.json()
        
        if (mounted && trackData.success) {
          const newViews = trackData.views
          console.log(`ViewTracker: Previous: ${previousViews}, New: ${newViews}, Will animate: ${newViews > previousViews}`)
          
          if (newViews > previousViews) {
            setJustUpdated(true)
            console.log('ViewTracker: Animation triggered!')
            setTimeout(() => {
              setJustUpdated(false)
              console.log('ViewTracker: Animation ended')
            }, 2000)
          }
          setViews(newViews)
          setHasTracked(true)
        }
      } catch (error) {
        console.error('Error tracking view:', error)
        // Fallback to initial views on error
        if (mounted) {
          setViews(initialViews)
        }
      } finally {
        if (mounted) {
          setIsTracking(false)
        }
      }
    }

    // Track view after a short delay to ensure page is loaded
    const timer = setTimeout(fetchAndTrackView, 1000)
    
    return () => {
      mounted = false
      clearTimeout(timer)
    }
  }, [slug, initialViews, hasTracked, isTracking, previousViews])

  return (
    <div className={`flex items-center gap-1 ${className} ${justUpdated ? 'animate-pulse' : ''}`}>
      {showIcon && (
        <Eye className={`h-4 w-4 ${justUpdated ? 'text-green-500 animate-bounce' : ''}`} />
      )}
      <span className={`${justUpdated ? 'text-green-500 font-semibold scale-110 transition-all duration-500' : 'transition-all duration-500'}`}>
        {views.toLocaleString()}
        {justUpdated && <span className="ml-1 text-green-500 animate-ping">+1</span>}
      </span>
    </div>
  )
}

// Hook for tracking views in components
export function useViewCount(slug: string) {
  const [views, setViews] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    
    const fetchViews = async () => {
      try {
        const response = await fetch(`/api/views/${slug}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (mounted && data.success) {
          setViews(data.views)
        } else if (mounted) {
          throw new Error(data.message || 'Failed to fetch views')
        }
      } catch (err) {
        console.error('Error fetching views:', err)
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Unknown error')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchViews()
    
    return () => {
      mounted = false
    }
  }, [slug])

  return { views, loading, error }
}

// Hook for batch view counts (for blog listing pages)
export function useBatchViewCounts(slugs: string[]) {
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    
    if (slugs.length === 0) {
      setLoading(false)
      return
    }
    
    const fetchBatchViews = async () => {
      try {
        const response = await fetch('/api/views/batch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ slugs }),
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        if (mounted && data.success) {
          setViewCounts(data.views)
        } else if (mounted) {
          throw new Error(data.message || 'Failed to fetch batch views')
        }
      } catch (err) {
        console.error('Error fetching batch views:', err)
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Unknown error')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchBatchViews()
    
    return () => {
      mounted = false
    }
  }, [slugs])

  return { viewCounts, loading, error }
}