"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface TagFilterProps {
  tags: string[]
  selectedTags: string[]
  onTagSelect: (tag: string) => void
  onTagRemove: (tag: string) => void
  onClearAll: () => void
  className?: string
}

export function TagFilter({
  tags,
  selectedTags,
  onTagSelect,
  onTagRemove,
  onClearAll,
  className
}: TagFilterProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  const displayTags = isExpanded ? tags : tags.slice(0, 8)
  
  return (
    <div className={cn("space-y-3", className)}>
      {/* Selected tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-muted-foreground">Filtering by:</span>
          {selectedTags.map(tag => (
            <button
              key={tag}
              onClick={() => onTagRemove(tag)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm hover:bg-primary/20 transition-colors"
            >
              {tag}
              <X className="w-3 h-3" />
            </button>
          ))}
          <button
            onClick={onClearAll}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear all
          </button>
        </div>
      )}
      
      {/* Available tags */}
      <div className="flex flex-wrap gap-2">
        {displayTags.map(tag => {
          const isSelected = selectedTags.includes(tag)
          return (
            <button
              key={tag}
              onClick={() => isSelected ? onTagRemove(tag) : onTagSelect(tag)}
              className={cn(
                "px-3 py-1 rounded-full text-sm transition-all",
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80"
              )}
            >
              {tag}
            </button>
          )
        })}
        
        {tags.length > 8 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-1 rounded-full text-sm bg-secondary hover:bg-secondary/80 transition-colors"
          >
            {isExpanded ? "Show less" : `+${tags.length - 8} more`}
          </button>
        )}
      </div>
    </div>
  )
}

// Hook for managing tag filtering
export function useTagFilter<T extends { tags?: string[] }>(items: T[]) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  
  const availableTags = Array.from(
    new Set(items.flatMap(item => item.tags || []))
  ).sort()
  
  const filteredItems = selectedTags.length === 0
    ? items
    : items.filter(item =>
        selectedTags.every(tag => item.tags?.includes(tag))
      )
  
  const handleTagSelect = (tag: string) => {
    setSelectedTags(prev => [...prev, tag])
  }
  
  const handleTagRemove = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag))
  }
  
  const handleClearAll = () => {
    setSelectedTags([])
  }
  
  return {
    selectedTags,
    availableTags,
    filteredItems,
    handleTagSelect,
    handleTagRemove,
    handleClearAll
  }
}