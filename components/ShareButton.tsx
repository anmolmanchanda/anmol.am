"use client"

import { Share2 } from "lucide-react"

interface ShareButtonProps {
  title: string
  excerpt: string
  className?: string
}

export function ShareButton({ title, excerpt, className = "" }: ShareButtonProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: excerpt,
        url: window.location.href
      }).catch(() => {
        // User cancelled sharing, do nothing
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      // You could add a toast notification here instead of alert
      alert('Link copied to clipboard!')
    }
  }

  return (
    <button 
      onClick={handleShare}
      className={`flex items-center gap-2 hover:text-primary transition-colors cursor-pointer ${className}`}
    >
      <Share2 className="h-4 w-4" />
      <span>Share</span>
    </button>
  )
}