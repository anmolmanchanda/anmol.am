"use client"

import { useEffect } from "react"
import { useActivityStore } from "@/lib/store"
import { 
  BookOpen, Coffee, Code, Zap, Target, Brain, 
  TrendingUp, Activity 
} from "lucide-react"
import { motion } from "framer-motion"

interface TrackerCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  gradient: string
  delay?: number
}

function TrackerCard({ title, value, icon, gradient, delay = 0 }: TrackerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="liquid-glass rounded-xl border backdrop-blur-md p-4 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  )
}

export function LifeTrackers() {
  const { trackerData, fetchTrackerData, isLoading } = useActivityStore()
  
  useEffect(() => {
    fetchTrackerData()
  }, [fetchTrackerData])
  
  if (isLoading.trackers || !trackerData) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="liquid-glass rounded-xl border backdrop-blur-md p-4 animate-pulse">
            <div className="h-8 bg-muted/20 rounded mb-2" />
            <div className="h-6 bg-muted/20 rounded w-2/3" />
          </div>
        ))}
      </div>
    )
  }
  
  return (
    <div className="space-y-8">
      {/* Life Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <TrackerCard
          title="Books This Year"
          value={trackerData.booksReadThisYear}
          icon={<BookOpen className="w-5 h-5 text-white" />}
          gradient="from-green-500 to-emerald-600"
          delay={0.1}
        />
        <TrackerCard
          title="Poems Written"
          value={trackerData.poemsWritten}
          icon={<Zap className="w-5 h-5 text-white" />}
          gradient="from-purple-500 to-pink-600"
          delay={0.2}
        />
        <TrackerCard
          title="KM Run"
          value={trackerData.kmRun}
          icon={<Activity className="w-5 h-5 text-white" />}
          gradient="from-orange-500 to-red-600"
          delay={0.3}
        />
        <TrackerCard
          title="Coffees"
          value={trackerData.coffeesConsumed === 999 ? "∞" : trackerData.coffeesConsumed}
          icon={<Coffee className="w-5 h-5 text-white" />}
          gradient="from-amber-600 to-brown-700"
          delay={0.4}
        />
      </div>
      
      {/* Learning Progress */}
      <div className="liquid-glass rounded-xl border backdrop-blur-md p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          Currently Learning
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">French</span>
              <span className="text-sm text-muted-foreground">{trackerData.learning.french.level}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-muted/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ width: `${Math.min(trackerData.learning.french.streak, 100)}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{trackerData.learning.french.streak} days</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">AWS</span>
              <span className="text-xs text-muted-foreground">SAA</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-muted/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-500"
                  style={{ width: `${trackerData.learning.aws.progress}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{trackerData.learning.aws.progress}%</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">ML</span>
              <span className="text-xs text-muted-foreground">{trackerData.learning.ml.status}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {trackerData.learning.ml.course}
            </div>
          </div>
        </div>
      </div>
      
      {/* Creative Tracker */}
      <div className="liquid-glass rounded-xl border backdrop-blur-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Creative Output</h3>
          <span className="text-sm text-muted-foreground">
            {trackerData.daysSinceLastPoem === 0 ? "Today!" : `${trackerData.daysSinceLastPoem} days since last poem`}
          </span>
        </div>
        <div className="text-sm text-muted-foreground">
          Current Project: <span className="text-foreground font-medium">{trackerData.currentSideProject}</span>
        </div>
      </div>
    </div>
  )
}

export function WorkTrackers() {
  const { trackerData, fetchTrackerData, isLoading } = useActivityStore()
  
  useEffect(() => {
    fetchTrackerData()
  }, [fetchTrackerData])
  
  if (isLoading.trackers || !trackerData) {
    return (
      <div className="liquid-glass rounded-xl border backdrop-blur-md p-6 animate-pulse">
        <div className="h-6 bg-muted/20 rounded mb-4 w-1/3" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-4 bg-muted/20 rounded w-2/3" />
          ))}
        </div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      {/* Tech Stack */}
      <div className="liquid-glass rounded-xl border backdrop-blur-md p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Code className="w-5 h-5 text-primary" />
          Current Tech Stack
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">LLMs & AI</h4>
            <div className="flex flex-wrap gap-2">
              {trackerData.currentlyUsing.llms.map((llm) => (
                <span key={llm} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {llm}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Development</h4>
            <div className="flex flex-wrap gap-2">
              {[...trackerData.currentlyUsing.editor, ...trackerData.currentlyUsing.frameworks].map((tool) => (
                <span key={tool} className="px-3 py-1 bg-secondary/50 rounded-full text-sm">
                  {tool}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Infrastructure</h4>
            <div className="flex flex-wrap gap-2">
              {[...trackerData.currentlyUsing.databases, ...trackerData.currentlyUsing.tools].map((tool) => (
                <span key={tool} className="px-3 py-1 bg-muted rounded-full text-sm">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Learning Queue */}
      <div className="liquid-glass rounded-xl border backdrop-blur-md p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Learning Queue
        </h3>
        <div className="flex flex-wrap gap-3">
          {trackerData.learningQueue.map((item, index) => (
            <div key={item} className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary/30">{index + 1}</span>
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Certification Progress */}
      <div className="liquid-glass rounded-xl border backdrop-blur-md p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Certification Progress
        </h3>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">AWS {trackerData.learning.aws.target}</span>
              <span className="text-sm text-muted-foreground">{trackerData.learning.aws.progress}%</span>
            </div>
            <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-amber-500"
                style={{ width: `${trackerData.learning.aws.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Compact version for homepage
export function TrackerHighlights() {
  const { trackerData, fetchTrackerData } = useActivityStore()
  
  useEffect(() => {
    fetchTrackerData()
  }, [fetchTrackerData])
  
  if (!trackerData) return null
  
  return (
    <div className="flex flex-wrap gap-4 justify-center text-sm">
      <div className="flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-primary" />
        <span>{trackerData.booksReadThisYear} books</span>
      </div>
      <div className="flex items-center gap-2">
        <Code className="w-4 h-4 text-primary" />
        <span>{trackerData.currentlyUsing.frameworks[0]}</span>
      </div>
      <div className="flex items-center gap-2">
        <Brain className="w-4 h-4 text-primary" />
        <span>Learning {trackerData.learningQueue[0]}</span>
      </div>
      <div className="flex items-center gap-2">
        <Coffee className="w-4 h-4 text-primary" />
        <span>∞ coffees</span>
      </div>
    </div>
  )
}