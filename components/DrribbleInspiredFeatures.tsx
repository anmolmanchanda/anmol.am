"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'

// Animated Background Grid inspired by modern portfolios
export function AnimatedGrid() {
  return (
    <div className="absolute inset-0 opacity-30">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path 
              d="M 60 0 L 0 0 0 60" 
              fill="none" 
              stroke="url(#gridGradient)" 
              strokeWidth="1"
              className="animate-pulse"
            />
          </pattern>
          <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}

// 3D Card Effect inspired by top portfolios
export function Card3D({ 
  children, 
  className = '',
  glowColor = 'primary'
}: { 
  children: React.ReactNode
  className?: string
  glowColor?: string
}) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX
    const mouseY = e.clientY

    const rotateXValue = ((mouseY - centerY) / rect.height) * -10
    const rotateYValue = ((mouseX - centerX) / rect.width) * 10

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      className={`card-3d-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
        transformStyle: 'preserve-3d'
      }}
    >
      <div 
        className="card-3d-inner relative transform-gpu"
        style={{
          transform: 'translateZ(20px)',
          boxShadow: `0 25px 50px -12px rgba(var(--${glowColor}), 0.25)`,
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}

// Interactive Loading Animation
export function LoadingAnimation() {
  return (
    <div className="flex items-center justify-center space-x-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 bg-primary rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  )
}

// Magnetic Button Effect
export function MagneticButton({ 
  children, 
  className = '',
  onClick
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX
    const mouseY = e.clientY

    const deltaX = (mouseX - centerX) * 0.2
    const deltaY = (mouseY - centerY) * 0.2

    setPosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      className={`magnetic-button ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  )
}

// Text Animation Effect
export function AnimatedText({ 
  text, 
  className = '',
  delay = 0 
}: { 
  text: string
  className?: string
  delay?: number
}) {
  const letters = text.split('')

  return (
    <motion.span className={className}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.05,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="inline-block"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  )
}

// Floating Elements
export function FloatingElements() {
  const elements = [
    { size: 'w-4 h-4', color: 'bg-blue-500', delay: 0 },
    { size: 'w-3 h-3', color: 'bg-purple-500', delay: 2 },
    { size: 'w-5 h-5', color: 'bg-cyan-500', delay: 4 },
    { size: 'w-2 h-2', color: 'bg-pink-500', delay: 1 },
    { size: 'w-6 h-6', color: 'bg-orange-500', delay: 3 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {elements.map((element, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${element.size} ${element.color} opacity-20`}
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100
          }}
          animate={{
            y: -100,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: element.delay,
            ease: 'linear'
          }}
          style={{
            left: `${Math.random() * 100}%`,
            filter: 'blur(1px)'
          }}
        />
      ))}
    </div>
  )
}