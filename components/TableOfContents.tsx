"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BookOpen, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
  className?: string
}

export function TableOfContents({ content, className }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    // Parse headings from content and ensure they have IDs
    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = content
    
    const elements = tempDiv.querySelectorAll("h2, h3, h4")
    const headingData: Heading[] = []
    
    elements.forEach((element, index) => {
      const text = element.textContent || ""
      // Create a consistent ID from the text
      const id = `heading-${index}-${text.toLowerCase().replace(/[^\w]+/g, "-")}`
      headingData.push({
        id,
        text,
        level: parseInt(element.tagName.charAt(1))
      })
    })
    
    setHeadings(headingData)

    // Add IDs to actual headings in the article
    setTimeout(() => {
      const articleElement = document.getElementById("article-content")
      if (articleElement) {
        const articleHeadings = articleElement.querySelectorAll("h2, h3, h4")
        articleHeadings.forEach((heading, index) => {
          if (headingData[index]) {
            heading.id = headingData[index].id
          }
        })
      }
    }, 100)
  }, [content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-100px 0px -70% 0px",
        threshold: 0
      }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [headings])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100 // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  if (headings.length === 0) return null

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        "sticky top-24 max-h-[calc(100vh-6rem)] w-full",
        className
      )}
    >
      <div className="liquid-glass rounded-2xl border backdrop-blur-md p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="glass-morphism cyber-border p-2 rounded-full border backdrop-blur-md quantum-glow">
            <BookOpen className="w-4 h-4 text-primary icon-pulse" />
          </div>
          <h3 className="font-semibold bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            Table of Contents
          </h3>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 max-h-[500px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
          {headings.map((heading) => {
            const isActive = activeId === heading.id

            return (
              <motion.button
                key={heading.id}
                onClick={() => scrollToHeading(heading.id)}
                className={cn(
                  "block w-full text-left py-2 px-3 rounded-lg text-sm transition-all duration-200 relative group",
                  isActive 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
                style={{ paddingLeft: `${12 + (heading.level - 2) * 16}px` }}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-2">
                  {isActive && (
                    <motion.div
                      layoutId="toc-active-indicator"
                      className="absolute left-0 w-1 h-6 bg-gradient-to-b from-primary to-purple-500 rounded-full"
                      transition={{ duration: 0.3, type: "spring" }}
                    />
                  )}
                  <ChevronRight 
                    className={cn(
                      "h-3 w-3 transition-transform duration-200",
                      isActive && "rotate-90 text-primary",
                      "group-hover:text-primary"
                    )}
                  />
                  <span className="line-clamp-2 group-hover:text-primary transition-colors">
                    {heading.text}
                  </span>
                </div>
              </motion.button>
            )
          })}
        </nav>

        {/* Section Progress */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="text-xs text-muted-foreground">
            Section {headings.findIndex(h => h.id === activeId) + 1} of {headings.length}
          </div>
        </div>
      </div>
    </motion.aside>
  )
}