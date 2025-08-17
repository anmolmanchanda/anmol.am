"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Send, CheckCircle, AlertCircle, Briefcase, Star, Grid3x3 } from "lucide-react"
import { cn } from "@/lib/utils"

type ContentStream = 'work' | 'personal' | 'all'

const STREAM_CONFIG = {
  work: {
    name: 'Technical',
    icon: Briefcase,
    description: 'Technical articles & tutorials',
    color: 'text-blue-500'
  },
  personal: {
    name: 'Personal', 
    icon: Star,
    description: 'Life updates & thoughts',
    color: 'text-green-500'
  },
  all: {
    name: 'Everything',
    icon: Grid3x3,
    description: 'All content',
    color: 'text-purple-500'
  }
}

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [selectedStreams, setSelectedStreams] = useState<ContentStream[]>(['work'])
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const toggleStream = (stream: ContentStream) => {
    if (stream === 'all') {
      setSelectedStreams(['all'])
    } else {
      const newStreams = selectedStreams.includes(stream)
        ? selectedStreams.filter(s => s !== stream && s !== 'all')
        : [...selectedStreams.filter(s => s !== 'all'), stream]
      
      // If both work and personal selected, switch to 'all'
      if (newStreams.includes('work') && newStreams.includes('personal')) {
        setSelectedStreams(['all'])
      } else if (newStreams.length === 0) {
        setSelectedStreams(['work']) // Default to work if nothing selected
      } else {
        setSelectedStreams(newStreams)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) return
    
    setStatus("loading")
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, streams: selectedStreams })
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to subscribe')
      }
      
      setStatus("success")
      setMessage(data.message || "Thanks for subscribing! Check your email for confirmation.")
      setEmail("")
      setSelectedStreams(['work'])
      
      // Reset after 5 seconds
      setTimeout(() => {
        setStatus("idle")
        setMessage("")
      }, 5000)
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.")
      
      setTimeout(() => {
        setStatus("idle")
        setMessage("")
      }, 5000)
    }
  }

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Stay Updated
          </h2>
          
          <p className="text-lg text-muted-foreground mb-6">
            Get the latest insights delivered to your inbox. Choose your interests:
          </p>
          
          {/* Stream Selection */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Object.entries(STREAM_CONFIG).map(([key, config]) => {
              const Icon = config.icon
              const isSelected = selectedStreams.includes(key as ContentStream)
              
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleStream(key as ContentStream)}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
                      : "bg-background/50 backdrop-blur-sm border hover:bg-background/80"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isSelected ? "" : config.color)} />
                  {config.name}
                </button>
              )
            })}
          </div>
          
          {/* Selected stream description */}
          <div className="text-sm text-muted-foreground mb-6 min-h-[20px]">
            {selectedStreams.includes('all') 
              ? "You'll receive all content updates"
              : selectedStreams.includes('work') && selectedStreams.includes('personal')
              ? "You'll receive technical and personal content"
              : selectedStreams.includes('work')
              ? "You'll receive technical articles and tutorials"
              : selectedStreams.includes('personal')
              ? "You'll receive personal updates and thoughts"
              : "Select at least one content stream"}
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border bg-background/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                disabled={status === "loading" || status === "success"}
                required
              />
              
              <button
                type="submit"
                disabled={status === "loading" || status === "success" || selectedStreams.length === 0}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all min-w-[120px]"
              >
                {status === "loading" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Sending...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Subscribed
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Subscribe
                  </>
                )}
              </button>
            </div>
            
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center justify-center gap-2 text-sm ${
                  status === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {status === "success" ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                {message}
              </motion.div>
            )}
            
            <p className="text-xs text-muted-foreground mt-4">
              No spam, unsubscribe at any time. Powered by Buttondown.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}