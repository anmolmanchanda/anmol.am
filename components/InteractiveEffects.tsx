"use client"

import { useEffect, useState } from 'react'

export function CursorTrail() {
  const [trails, setTrails] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    let trailId = 0

    function handleMouseMove(e: MouseEvent) {
      const newTrail = {
        id: trailId++,
        x: e.clientX,
        y: e.clientY
      }

      setTrails(prev => [...prev, newTrail])

      // Remove trail after animation
      setTimeout(() => {
        setTrails(prev => prev.filter(trail => trail.id !== newTrail.id))
      }, 800)
    }

    // Only add trail on interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .interactive-element')
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.addEventListener('mousemove', handleMouseMove)
      })
      el.addEventListener('mouseleave', () => {
        document.removeEventListener('mousemove', handleMouseMove)
      })
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      {trails.map(trail => (
        <div
          key={trail.id}
          className="cursor-trail active"
          style={{
            left: trail.x - 4,
            top: trail.y - 4,
          }}
        />
      ))}
    </>
  )
}

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    function updateScrollProgress() {
      const scrollPx = document.documentElement.scrollTop
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = scrollPx / winHeightPx
      setScrollProgress(scrolled)
    }

    window.addEventListener('scroll', updateScrollProgress)
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return (
    <div 
      className="scroll-progress" 
      style={{ transform: `scaleX(${scrollProgress})` }}
    />
  )
}

export function ParallaxElement({ 
  children, 
  speed = 'medium',
  className = ''
}: { 
  children: React.ReactNode
  speed?: 'slow' | 'medium' | 'fast'
  className?: string
}) {
  useEffect(() => {
    function updateParallax() {
      const scrolled = window.pageYOffset
      const parallaxElements = document.querySelectorAll(`.parallax-${speed}`)
      
      parallaxElements.forEach(el => {
        const element = el as HTMLElement
        element.style.setProperty('--scroll-offset', `${scrolled * 0.2}px`)
      })
    }

    window.addEventListener('scroll', updateParallax)
    return () => window.removeEventListener('scroll', updateParallax)
  }, [speed])

  return (
    <div className={`parallax-${speed} ${className}`}>
      {children}
    </div>
  )
}

export function SoundEffectButton({ 
  children, 
  onClick,
  className = '',
  ...props 
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const playSound = () => {
    // Subtle click sound using Web Audio API
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const audioContext = new AudioContextClass()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.1)
  }

  const handleClick = () => {
    playSound()
    onClick?.()
  }

  return (
    <button 
      onClick={handleClick}
      className={`sound-effect interactive-element ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// Enhanced Timeline Item with hover details
export function TimelineItem({ 
  children, 
  details,
  className = '' 
}: { 
  children: React.ReactNode
  details?: string
  className?: string
}) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div 
      className={`timeline-item ${className} relative`}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      {children}
      {details && showDetails && (
        <div className="absolute left-full ml-4 top-0 w-64 p-3 bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg z-10">
          <p className="text-sm text-muted-foreground">{details}</p>
        </div>
      )}
    </div>
  )
}