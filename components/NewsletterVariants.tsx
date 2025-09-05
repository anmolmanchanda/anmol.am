"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, X } from "lucide-react"
import { cn } from "@/lib/utils"

type ContentStream = 'work' | 'personal' | 'all'

// Compact single-line version for blog listing
export function NewsletterCompact({ className }: { className?: string }) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setStatus("loading")
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, streams: ['all'] })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setStatus("success")
        setMessage("Subscribed!")
        setEmail("")
      } else {
        setStatus("error")
        setMessage(data.message || "Failed to subscribe")
      }
    } catch {
      setStatus("error")
      setMessage("Something went wrong")
    }
    
    setTimeout(() => {
      setStatus("idle")
      setMessage("")
    }, 3000)
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex gap-2", className)}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 px-4 py-2 rounded-lg bg-background/50 backdrop-blur-sm border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        disabled={status === "loading" || status === "success"}
        required
      />
      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className={cn(
          "px-4 py-2 rounded-lg font-medium text-sm transition-all",
          status === "success" 
            ? "bg-green-500 text-white" 
            : "bg-primary text-primary-foreground hover:bg-primary/90",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        {status === "loading" ? "..." : status === "success" ? "✓" : "Subscribe"}
      </button>
      {message && status === "error" && (
        <span className="text-red-500 text-sm ml-2">{message}</span>
      )}
    </form>
  )
}

// Hero CTA button that opens modal
export function NewsletterCTA({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-full border border-border bg-background/50 backdrop-blur-sm font-medium transition-all duration-300 hover:bg-background hover:shadow-md",
          className
        )}
      >
        <Mail className="mr-2 w-4 h-4" />
        Subscribe to Notes
      </button>
      
      {isOpen && <NewsletterModal onClose={() => setIsOpen(false)} />}
    </>
  )
}

// Modal version
export function NewsletterModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("")
  const [selectedStreams, setSelectedStreams] = useState<ContentStream[]>(['work'])
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

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
      
      if (response.ok) {
        setStatus("success")
        setMessage("Successfully subscribed!")
        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        setStatus("error")
        setMessage(data.message || "Failed to subscribe")
      }
    } catch {
      setStatus("error")
      setMessage("Something went wrong")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md glass-morphism rounded-2xl border backdrop-blur-md p-6"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Subscribe to My Notes</h3>
          <p className="text-muted-foreground">
            Get technical insights and personal updates delivered weekly
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              Choose your interests:
            </label>
            <div className="flex gap-2">
              {[
                { id: 'work' as ContentStream, label: 'Technical' },
                { id: 'personal' as ContentStream, label: 'Personal' },
                { id: 'all' as ContentStream, label: 'Everything' }
              ].map(stream => (
                <button
                  key={stream.id}
                  type="button"
                  onClick={() => setSelectedStreams([stream.id])}
                  className={cn(
                    "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
                    selectedStreams.includes(stream.id)
                      ? "bg-primary text-primary-foreground"
                      : "bg-background/50 hover:bg-background/80 border"
                  )}
                >
                  {stream.label}
                </button>
              ))}
            </div>
          </div>
          
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-lg bg-background/50 backdrop-blur-sm border focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={status === "loading" || status === "success"}
            required
          />
          
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-all font-medium"
          >
            {status === "loading" ? "Subscribing..." : 
             status === "success" ? "✓ Subscribed!" : "Subscribe"}
          </button>
          
          {message && (
            <p className={cn(
              "text-center text-sm",
              status === "success" ? "text-green-500" : "text-red-500"
            )}>
              {message}
            </p>
          )}
        </form>
      </motion.div>
    </div>
  )
}

// Sticky bottom bar for mobile
export function NewsletterSticky() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Show after scrolling 50%
  useState(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      setIsVisible(scrollPercent > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })
  
  if (!isVisible) return null
  
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden glass-morphism border-t backdrop-blur-md"
    >
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full p-4 flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Mail className="w-4 h-4" />
          Subscribe to Notes
        </button>
      ) : (
        <div className="p-4">
          <NewsletterCompact />
          <button
            onClick={() => setIsExpanded(false)}
            className="mt-2 text-xs text-muted-foreground"
          >
            Close
          </button>
        </div>
      )}
    </motion.div>
  )
}