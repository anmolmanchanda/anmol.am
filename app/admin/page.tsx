"use client"

import { useState, useEffect } from "react"
import { Save, Lock, Check, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

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

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [data, setData] = useState<TrackerData>(DEFAULT_DATA)
  const [isSaving, setIsSaving] = useState(false)

  // Load existing data on mount
  useEffect(() => {
    if (isAuthenticated) {
      fetch('/api/admin/trackers')
        .then(res => res.json())
        .then(result => {
          if (result.data) {
            setData(result.data)
          }
        })
        .catch(err => console.error('Failed to load tracker data:', err))
    }
  }, [isAuthenticated])

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
      } else {
        setError("Invalid password")
      }
    } catch {
      setError("Authentication failed")
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError("")
    setSuccess("")
    
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
        setSuccess("Data saved successfully!")
        setTimeout(() => setSuccess(""), 3000)
      } else {
        setError("Failed to save data")
      }
    } catch {
      setError("Error saving data")
    } finally {
      setIsSaving(false)
    }
  }

  if (!isAuthenticated) {
    return (
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
    )
  }

  return (
    <div className="py-24 sm:py-32 aurora-bg min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Tracker Admin</h1>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-all font-medium"
            >
              {isSaving ? (
                <>Saving...</>
              ) : success ? (
                <>
                  <Check className="w-4 h-4" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
              {error}
            </div>
          )}

          <div className="space-y-8">
            {/* Custom Trackers */}
            <section className="glass-morphism rounded-xl border backdrop-blur-md p-6">
              <h2 className="text-xl font-semibold mb-4">Custom Trackers</h2>
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Days Since Last Poem</label>
                  <input
                    type="number"
                    value={data.daysSinceLastPoem}
                    onChange={(e) => setData({...data, daysSinceLastPoem: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 rounded-lg bg-background/50 border"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Current Side Project</label>
                  <input
                    type="text"
                    value={data.currentSideProject}
                    onChange={(e) => setData({...data, currentSideProject: e.target.value})}
                    className="w-full px-3 py-2 rounded-lg bg-background/50 border"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Learning Queue (comma-separated)</label>
                  <input
                    type="text"
                    value={data.learningQueue.join(", ")}
                    onChange={(e) => setData({...data, learningQueue: e.target.value.split(", ").filter(Boolean)})}
                    className="w-full px-3 py-2 rounded-lg bg-background/50 border"
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
                    onChange={(e) => setData({...data, booksReadThisYear: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 rounded-lg bg-background/50 border"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Poems Written</label>
                  <input
                    type="number"
                    value={data.poemsWritten}
                    onChange={(e) => setData({...data, poemsWritten: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 rounded-lg bg-background/50 border"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">KM Run</label>
                  <input
                    type="number"
                    value={data.kmRun}
                    onChange={(e) => setData({...data, kmRun: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 rounded-lg bg-background/50 border"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Coffees Consumed</label>
                  <input
                    type="number"
                    value={data.coffeesConsumed}
                    onChange={(e) => setData({...data, coffeesConsumed: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 rounded-lg bg-background/50 border"
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
                    className="w-full px-3 py-2 rounded-lg bg-background/50 border"
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
                    className="w-full px-3 py-2 rounded-lg bg-background/50 border"
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
                    className="w-full px-3 py-2 rounded-lg bg-background/50 border"
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
                      className="w-full px-3 py-2 rounded-lg bg-background/50 border"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">French Streak (days)</label>
                    <input
                      type="number"
                      value={data.learning.french.streak}
                      onChange={(e) => setData({
                        ...data,
                        learning: {...data.learning, french: {...data.learning.french, streak: parseInt(e.target.value)}}
                      })}
                      className="w-full px-3 py-2 rounded-lg bg-background/50 border"
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
                        learning: {...data.learning, aws: {...data.learning.aws, progress: parseInt(e.target.value)}}
                      })}
                      className="w-full px-3 py-2 rounded-lg bg-background/50 border"
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
                      className="w-full px-3 py-2 rounded-lg bg-background/50 border"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}