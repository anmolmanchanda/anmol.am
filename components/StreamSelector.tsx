"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Briefcase, Star, Grid3x3 } from "lucide-react"
import { cn } from "@/lib/utils"
import { ContentStream, CONTENT_STREAMS } from "@/lib/content-streams"

interface StreamSelectorProps {
  currentStream: ContentStream
  onStreamChange: (stream: ContentStream) => void
  className?: string
}

export function StreamSelector({ 
  currentStream, 
  onStreamChange, 
  className 
}: StreamSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const getIcon = (stream: ContentStream) => {
    switch(stream) {
      case 'work': return <Briefcase className="w-4 h-4" />
      case 'personal': return <Star className="w-4 h-4" />
      case 'all': return <Grid3x3 className="w-4 h-4" />
    }
  }
  
  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism cyber-border border backdrop-blur-md hover:bg-primary/10 transition-all"
      >
        {getIcon(currentStream)}
        <span className="text-sm font-medium">
          {CONTENT_STREAMS[currentStream].name}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </button>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full mt-2 w-64 rounded-xl glass-morphism border backdrop-blur-md shadow-xl z-50"
        >
          {Object.entries(CONTENT_STREAMS).map(([key, config]) => (
            <button
              key={key}
              onClick={() => {
                onStreamChange(key as ContentStream)
                setIsOpen(false)
              }}
              className={cn(
                "w-full text-left px-4 py-3 hover:bg-primary/10 transition-all first:rounded-t-xl last:rounded-b-xl",
                currentStream === key && "bg-primary/20"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getIcon(key as ContentStream)}</div>
                <div>
                  <div className="font-medium">{config.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {config.description}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  )
}

// Newsletter subscription component with stream selection
export function StreamSubscription() {
  const [selectedStreams, setSelectedStreams] = useState<ContentStream[]>(['work'])
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  const toggleStream = (stream: ContentStream) => {
    if (stream === 'all') {
      setSelectedStreams(['all'])
    } else {
      const newStreams = selectedStreams.includes(stream)
        ? selectedStreams.filter(s => s !== stream)
        : [...selectedStreams.filter(s => s !== 'all'), stream]
      setSelectedStreams(newStreams.length ? newStreams : ['work'])
    }
  }
  
  const handleSubscribe = async () => {
    if (!email) return
    
    setLoading(true)
    try {
      const response = await fetch('/api/newsletter/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          streams: selectedStreams 
        })
      })
      
      if (response.ok) {
        setMessage('Successfully subscribed!')
        setEmail('')
      } else {
        setMessage('Subscription failed. Please try again.')
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="liquid-glass rounded-2xl border backdrop-blur-md p-6">
      <h3 className="text-lg font-semibold mb-4">Subscribe to Updates</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm text-muted-foreground mb-2 block">
            Choose your content streams:
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(CONTENT_STREAMS).map(([key, config]) => (
              <button
                key={key}
                onClick={() => toggleStream(key as ContentStream)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                  selectedStreams.includes(key as ContentStream)
                    ? "bg-primary text-primary-foreground"
                    : "glass-morphism border hover:bg-primary/10"
                )}
              >
                {config.icon} {config.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-4 py-2 rounded-lg bg-background/50 border focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleSubscribe}
            disabled={loading || !email}
            className="px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-all"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
        
        {message && (
          <p className={cn(
            "text-sm",
            message.includes('Success') ? "text-green-500" : "text-red-500"
          )}>
            {message}
          </p>
        )}
      </div>
    </div>
  )
}