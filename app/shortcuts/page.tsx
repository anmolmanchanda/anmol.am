"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Search, Smartphone, Laptop, Clock, Calendar, FileText, Music, Camera, Map } from "lucide-react"

const shortcutCategories = [
  { id: "all", label: "All Shortcuts", icon: null },
  { id: "productivity", label: "Productivity", icon: Clock },
  { id: "calendar", label: "Calendar & Events", icon: Calendar },
  { id: "files", label: "File Management", icon: FileText },
  { id: "media", label: "Media & Entertainment", icon: Music },
  { id: "photography", label: "Photography", icon: Camera },
  { id: "location", label: "Location & Travel", icon: Map },
]

// Sample shortcuts data - you can expand this with your 100 best shortcuts
const shortcuts = [
  {
    id: "1",
    name: "Daily Standup",
    description: "Automatically create daily standup notes with tasks from calendar and reminders",
    category: "productivity",
    platform: ["ios", "macos"],
    downloadUrl: "/shortcuts/daily-standup.shortcut",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "2",
    name: "Quick Meeting Notes",
    description: "Create meeting notes with attendees, agenda, and action items from calendar event",
    category: "calendar",
    platform: ["ios", "macos"],
    downloadUrl: "/shortcuts/quick-meeting-notes.shortcut",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "3",
    name: "Smart File Organizer",
    description: "Organize downloads folder by file type and date automatically",
    category: "files",
    platform: ["macos"],
    downloadUrl: "/shortcuts/smart-file-organizer.shortcut",
    color: "from-green-500 to-emerald-500"
  },
  // Add more shortcuts here...
]

export default function ShortcutsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredShortcuts = shortcuts.filter(shortcut => {
    const matchesCategory = selectedCategory === "all" || shortcut.category === selectedCategory
    const matchesSearch = shortcut.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shortcut.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen aurora-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
      <div className="absolute inset-0 bg-gradient-to-tl from-violet-500/10 via-transparent to-cyan-500/10 animate-pulse" />
      <div className="absolute inset-0 ai-grid" />
      
      <div className="py-24 sm:py-32 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/projects"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>

            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <span className="bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  Apple Shortcuts Collection
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                A curated collection of 100+ Apple Shortcuts I&apos;ve created since iOS 13 beta (July 2019). 
                Automate your daily tasks and boost productivity on iPhone, iPad, and Mac.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <div className="relative w-full sm:w-96">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search shortcuts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-card border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {shortcutCategories.map((category) => {
                const Icon = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-card hover:bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {category.label}
                  </button>
                )
              })}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredShortcuts.map((shortcut) => (
                <div
                  key={shortcut.id}
                  className="glass-morphism rounded-lg border p-6 hover:shadow-lg transition-all hover:scale-[1.02]"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${shortcut.color} mb-4 flex items-center justify-center`}>
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{shortcut.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{shortcut.description}</p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    {shortcut.platform.includes("ios") && (
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-secondary rounded text-xs">
                        <Smartphone className="h-3 w-3" />
                        iOS
                      </div>
                    )}
                    {shortcut.platform.includes("macos") && (
                      <div className="inline-flex items-center gap-1 px-2 py-1 bg-secondary rounded text-xs">
                        <Laptop className="h-3 w-3" />
                        macOS
                      </div>
                    )}
                  </div>

                  <a
                    href={shortcut.downloadUrl}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    Download Shortcut
                  </a>
                </div>
              ))}
            </div>

            {filteredShortcuts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No shortcuts found matching your criteria.</p>
              </div>
            )}

            <div className="mt-12 glass-morphism rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-3">How to Install Shortcuts</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                <li>Download the shortcut file on your iPhone, iPad, or Mac</li>
                <li>The Shortcuts app will open automatically</li>
                <li>Review the shortcut actions and tap &quot;Add Shortcut&quot;</li>
                <li>Configure any required permissions or settings</li>
                <li>Run the shortcut from the Shortcuts app, widget, or Siri</li>
              </ol>
              
              <div className="mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> Some shortcuts may require additional apps or services to function properly. 
                  Each shortcut includes a description of its requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}