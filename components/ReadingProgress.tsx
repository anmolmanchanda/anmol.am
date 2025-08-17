"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(scrollProgress)
    }

    window.addEventListener("scroll", updateProgress)
    updateProgress()

    return () => window.removeEventListener("scroll", updateProgress)
  }, [])

  return (
    <>
      {/* Top progress bar - More prominent */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-primary/30 z-50 shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-accent to-primary shadow-glow"
          style={{ 
            width: `${progress}%`,
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.5), 0 0 20px rgba(6, 182, 212, 0.3)'
          }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      {/* Circular progress indicator - More prominent */}
      <motion.div
        className="fixed bottom-8 right-8 w-16 h-16 z-40 bg-background/90 backdrop-blur-md rounded-full shadow-2xl border border-primary/20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
      >
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="32"
            cy="32"
            r="26"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            className="text-muted/30"
          />
          <circle
            cx="32"
            cy="32"
            r="26"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 26}`}
            strokeDashoffset={`${2 * Math.PI * 26 * (1 - progress / 100)}`}
            className="text-primary transition-all duration-100"
            style={{
              filter: 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.5))'
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {Math.round(progress)}%
          </span>
        </div>
      </motion.div>
    </>
  )
}