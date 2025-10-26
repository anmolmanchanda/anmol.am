import { Activity, Database, Trash2, RefreshCw } from 'lucide-react'
import type { RedisStats, RedisKey } from '../types'

interface RedisTabProps {
  stats: RedisStats | null
  keys: RedisKey[]
  loading: boolean
  searchPattern: string
  setSearchPattern: (pattern: string) => void
  onRefreshStats: () => void
  onSearchKeys: (pattern: string) => void
  onDeleteKey: (key: string) => void
  onClearPattern: (pattern: string) => void
}

export function RedisTab({
  stats,
  keys,
  loading,
  searchPattern,
  setSearchPattern,
  onRefreshStats,
  onSearchKeys,
  onDeleteKey,
  onClearPattern
}: RedisTabProps) {
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
