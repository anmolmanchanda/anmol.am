"use client"

import { ExternalLink, BookOpen, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface NotionCardProps {
  title?: string
  description?: string
  url: string
  className?: string
}

export function NotionCard({ 
  title = "AI Resource Library", 
  description = "Curated collection of AI/LLM resources, prompts, tools, and best practices",
  url,
  className = ""
}: NotionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="liquid-glass rounded-xl border backdrop-blur-md p-6 hover:shadow-xl transition-all duration-300 cyber-border">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
              <BookOpen className="w-6 h-6 text-purple-500" />
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4">
            {description}
          </p>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="w-3 h-3" />
            <span>Notion Public Page</span>
          </div>
        </div>
      </a>
    </motion.div>
  )
}

export function NotionEmbed({ url, height = "600px" }: { url: string; height?: string }) {
  // Convert Notion share URL to embed URL
  const embedUrl = url.replace('notion.site', 'notion.site/embed')
    .replace('?source=copy_link', '')
  
  return (
    <div className="w-full rounded-xl overflow-hidden border">
      <iframe
        src={embedUrl}
        style={{ width: '100%', height, border: 0 }}
        allowFullScreen
        className="w-full"
      />
    </div>
  )
}