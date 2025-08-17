"use client"

import { useState, useEffect, useCallback } from "react"
import { Search, X, Tag } from "lucide-react"
import { motion } from "framer-motion"
import { BlogPost } from "@/types"
import { cn } from "@/lib/utils"

interface BlogSearchProps {
  posts: BlogPost[]
  onResultsChange?: (results: BlogPost[]) => void
}

export function BlogSearch({ posts, onResultsChange }: BlogSearchProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<BlogPost[]>(posts)
  const [isSearching, setIsSearching] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Extract all unique tags
  const allTags = Array.from(
    new Set(posts.flatMap(post => post.tags))
  ).sort()

  const performSearch = useCallback((searchQuery: string, tags: string[]) => {
    if (!searchQuery && tags.length === 0) {
      setResults(posts)
      onResultsChange?.(posts)
      return
    }

    const lowercaseQuery = searchQuery.toLowerCase()
    
    const filtered = posts.filter(post => {
      // Tag filter
      const matchesTags = tags.length === 0 || 
        tags.some(tag => post.tags.includes(tag))
      
      // Text search
      const matchesSearch = !searchQuery || 
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.excerpt.toLowerCase().includes(lowercaseQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
      
      return matchesTags && matchesSearch
    })
    
    setResults(filtered)
    onResultsChange?.(filtered)
  }, [posts, onResultsChange])

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      performSearch(query, selectedTags)
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [query, selectedTags, performSearch])

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setIsSearching(true)
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearSearch = () => {
    setQuery("")
    setSelectedTags([])
    setResults(posts)
    onResultsChange?.(posts)
  }

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search articles by title, content, or tags..."
            className="w-full pl-12 pr-12 py-3 rounded-lg border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          {(query || selectedTags.length > 0) && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-md transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {/* Loading indicator */}
        {isSearching && (
          <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/20 overflow-hidden">
            <div className="h-full bg-primary animate-pulse" />
          </div>
        )}
      </div>

      {/* Tag filters */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Filter by tags:</p>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={cn(
                "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-all",
                selectedTags.includes(tag)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              <Tag className="w-3 h-3" />
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {results.length === posts.length
            ? `Showing all ${posts.length} articles`
            : `Found ${results.length} of ${posts.length} articles`}
        </p>
        
        {(query || selectedTags.length > 0) && (
          <button
            onClick={clearSearch}
            className="text-sm text-primary hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Search suggestions */}
      {results.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <Search className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No articles found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search terms or filters
          </p>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Popular searches:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["React", "TypeScript", "Performance", "AWS"].map(suggestion => (
                <button
                  key={suggestion}
                  onClick={() => setQuery(suggestion)}
                  className="px-3 py-1 rounded-full bg-muted hover:bg-muted/80 text-sm transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}