"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ListOrdered, ChevronRight } from "lucide-react"
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
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    // Parse headings from content
    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = content
    
    const elements = tempDiv.querySelectorAll("h2, h3, h4")
    const headingData: Heading[] = []
    
    elements.forEach((element) => {
      const id = element.id || element.textContent?.toLowerCase().replace(/\s+/g, "-") || ""
      headingData.push({
        id,
        text: element.textContent || "",
        level: parseInt(element.tagName.charAt(1))
      })
    })
    
    setHeadings(headingData)
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
      const offset = 80
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
        "sticky top-24 max-h-[calc(100vh-6rem)] overflow-auto",
        className
      )}
    >
      <div className="rounded-xl border bg-card p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full text-left mb-4"
        >
          <div className="flex items-center gap-2">
            <ListOrdered className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Table of Contents</h3>
          </div>
          <ChevronRight
            className={cn(
              "w-4 h-4 transition-transform",
              isOpen && "rotate-90"
            )}
          />
        </button>

        {isOpen && (
          <nav className="space-y-1">
            {headings.map((heading) => {
              const isActive = activeId === heading.id

              return (
                <motion.button
                  key={heading.id}
                  onClick={() => scrollToHeading(heading.id)}
                  className={cn(
                    "block w-full text-left py-2 px-3 rounded-md text-sm transition-all hover:bg-muted",
                    isActive && "bg-primary/10 text-primary font-medium",
                    !isActive && "text-muted-foreground hover:text-foreground"
                  )}
                  style={{ paddingLeft: `${12 + (heading.level - 2) * 12}px` }}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-2">
                    {isActive && (
                      <motion.div
                        layoutId="active-indicator"
                        className="w-1 h-4 bg-primary rounded-full"
                      />
                    )}
                    <span className="line-clamp-2">{heading.text}</span>
                  </div>
                </motion.button>
              )
            })}
          </nav>
        )}
      </div>

      {/* Progress indicator */}
      <div className="mt-4 p-4 rounded-xl border bg-card">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Reading Progress</span>
          <span className="font-medium text-foreground">
            {Math.round((headings.findIndex(h => h.id === activeId) + 1) / headings.length * 100)}%
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${((headings.findIndex(h => h.id === activeId) + 1) / headings.length) * 100}%`
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.aside>
  )
}