import { Activity, AlertCircle, Eye, Database, Clock, RefreshCw } from 'lucide-react'
import type { AnalyticsData } from '../types'

interface AnalyticsTabProps {
  analytics: AnalyticsData | null
  loading: boolean
  onRefresh: () => void
}

export function AnalyticsTab({ analytics, loading, onRefresh }: AnalyticsTabProps) {
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
