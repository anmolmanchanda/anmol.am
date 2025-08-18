"use client"

import { useState } from "react"
import { Search, X, Filter } from "lucide-react"

interface SearchFilterProps {
  onSearch: (query: string) => void
  onTagSelect: (tag: string) => void
  availableTags: string[]
  placeholder?: string
}

export function SearchFilter({ 
  onSearch, 
  onTagSelect, 
  availableTags, 
  placeholder = "Search activities..." 
}: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(true)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    onSearch(query)
  }

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
    onTagSelect(tag)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedTags([])
    onSearch("")
  }

  return (
    <div className="space-y-3">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {searchQuery && (
            <button
              onClick={clearFilters}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-2 border rounded-lg flex items-center gap-2 transition-colors ${
            showFilters ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-secondary'
          }`}
        >
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Tag Filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 p-3 bg-secondary/20 rounded-lg">
          {availableTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedTags.includes(tag)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}