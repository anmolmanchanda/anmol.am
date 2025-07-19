"use client"

import { useTheme } from "next-themes"
import { Moon, Sun, Palette } from "lucide-react"
import { useEffect, useState, useRef } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  if (!mounted) {
    return null
  }

  const themes = [
    { name: "Light", value: "light", icon: Sun },
    { name: "Dark", value: "dark", icon: Moon },
    { name: "System", value: "system", icon: Palette }
  ]

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-all duration-300 hover:bg-secondary hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5 transition-transform duration-300 rotate-0 hover:rotate-12" />
        ) : (
          <Moon className="h-5 w-5 transition-transform duration-300 rotate-0 hover:-rotate-12" />
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-36 rounded-lg border bg-background/95 backdrop-blur-sm p-1 shadow-lg liquid-glass z-50">
          {themes.map((themeOption) => (
            <button
              key={themeOption.value}
              onClick={() => {
                setTheme(themeOption.value)
                setIsOpen(false)
              }}
              className={`flex w-full items-center gap-2 rounded px-3 py-2 text-sm transition-all duration-200 hover:bg-accent hover:scale-105 ${
                theme === themeOption.value ? 'bg-accent text-accent-foreground' : ''
              }`}
            >
              <themeOption.icon className="h-4 w-4" />
              {themeOption.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}