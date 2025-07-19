"use client"

import { useState, useEffect, useRef } from 'react'
import { Search, Command, ArrowRight, FileText, User, Briefcase, Heart, MessageCircle, Home } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface CommandItem {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  action: () => void
  keywords: string[]
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const commands: CommandItem[] = [
    {
      id: 'home',
      title: 'Home',
      description: 'Go to homepage',
      icon: <Home className="w-4 h-4" />,
      action: () => router.push('/'),
      keywords: ['home', 'main', 'index']
    },
    {
      id: 'about',
      title: 'About Me',
      description: 'Learn more about my background',
      icon: <User className="w-4 h-4" />,
      action: () => router.push('/about'),
      keywords: ['about', 'bio', 'background', 'experience', 'education']
    },
    {
      id: 'projects',
      title: 'Projects',
      description: 'View my portfolio projects',
      icon: <Briefcase className="w-4 h-4" />,
      action: () => router.push('/projects'),
      keywords: ['projects', 'portfolio', 'work', 'code', 'development']
    },
    {
      id: 'personal',
      title: 'Life',
      description: 'Personal interests and hobbies',
      icon: <Heart className="w-4 h-4" />,
      action: () => router.push('/personal'),
      keywords: ['personal', 'life', 'hobbies', 'interests', 'books', 'music', 'fitness']
    },
    {
      id: 'blog',
      title: 'Blog',
      description: 'Read my thoughts and articles',
      icon: <FileText className="w-4 h-4" />,
      action: () => router.push('/blog'),
      keywords: ['blog', 'articles', 'writing', 'thoughts', 'posts']
    },
    {
      id: 'contact',
      title: 'Contact',
      description: 'Get in touch with me',
      icon: <MessageCircle className="w-4 h-4" />,
      action: () => router.push('/contact'),
      keywords: ['contact', 'email', 'message', 'hire', 'work', 'consulting']
    },
    {
      id: 'un-project',
      title: 'UN Enterprise Pipeline',
      description: 'TB-scale data processing for global cities',
      icon: <Briefcase className="w-4 h-4" />,
      action: () => router.push('/projects/1'),
      keywords: ['un', 'enterprise', 'data', 'pipeline', 'aws', 'cities']
    },
    {
      id: 'ai-manager',
      title: 'AI Life Manager',
      description: 'AI-powered productivity macOS app',
      icon: <Briefcase className="w-4 h-4" />,
      action: () => router.push('/projects/2'),
      keywords: ['ai', 'life', 'manager', 'macos', 'productivity', 'claude']
    },
    {
      id: 'automation',
      title: 'Automation Suite',
      description: '100+ shortcuts and workflows',
      icon: <Briefcase className="w-4 h-4" />,
      action: () => router.push('/projects/3'),
      keywords: ['automation', 'shortcuts', 'workflows', 'n8n', 'efficiency']
    }
  ]

  const filteredCommands = commands.filter(command =>
    command.title.toLowerCase().includes(query.toLowerCase()) ||
    command.description.toLowerCase().includes(query.toLowerCase()) ||
    command.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase()))
  )

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      
      if (e.key === 'Escape') {
        setIsOpen(false)
        setQuery('')
        setSelectedIndex(0)
      }

      if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setSelectedIndex(prev => {
            const newIndex = (prev + 1) % filteredCommands.length
            // Scroll the selected item into view with better logic
            setTimeout(() => {
              const selectedElement = document.querySelector(`[data-command-index="${newIndex}"]`)
              const commandList = document.getElementById('command-list')
              
              if (selectedElement && commandList) {
                const elementRect = selectedElement.getBoundingClientRect()
                const containerRect = commandList.getBoundingClientRect()
                
                // Check if element is below visible area
                if (elementRect.bottom > containerRect.bottom) {
                  selectedElement.scrollIntoView({ behavior: 'smooth', block: 'end' })
                }
                // Check if element is above visible area
                else if (elementRect.top < containerRect.top) {
                  selectedElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }
            }, 0)
            return newIndex
          })
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          setSelectedIndex(prev => {
            const newIndex = (prev - 1 + filteredCommands.length) % filteredCommands.length
            // Scroll the selected item into view with better logic
            setTimeout(() => {
              const selectedElement = document.querySelector(`[data-command-index="${newIndex}"]`)
              const commandList = document.getElementById('command-list')
              
              if (selectedElement && commandList) {
                const elementRect = selectedElement.getBoundingClientRect()
                const containerRect = commandList.getBoundingClientRect()
                
                // Check if element is above visible area
                if (elementRect.top < containerRect.top) {
                  selectedElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
                // Check if element is below visible area
                else if (elementRect.bottom > containerRect.bottom) {
                  selectedElement.scrollIntoView({ behavior: 'smooth', block: 'end' })
                }
              }
            }, 0)
            return newIndex
          })
        }
        if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
          e.preventDefault()
          filteredCommands[selectedIndex].action()
          setIsOpen(false)
          setQuery('')
          setSelectedIndex(0)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, filteredCommands])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-16 lg:pt-20">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      
      <div className="relative w-full max-w-lg mx-3 sm:mx-4">
        <div className="liquid-glass rounded-2xl border shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 p-4 border-b border-border/50">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search or jump to..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
          </div>

          {/* Command List */}
          <div className="max-h-60 sm:max-h-80 overflow-y-auto" id="command-list">
            {filteredCommands.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No results found for &quot;{query}&quot;
              </div>
            ) : (
              <div className="p-2">
                {filteredCommands.map((command, index) => (
                  <button
                    key={command.id}
                    data-command-index={index}
                    onClick={() => {
                      command.action()
                      setIsOpen(false)
                      setQuery('')
                      setSelectedIndex(0)
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all min-h-[44px] ${
                      index === selectedIndex 
                        ? 'bg-accent text-accent-foreground' 
                        : 'hover:bg-accent/50'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {command.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate text-sm sm:text-base">{command.title}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground truncate">{command.description}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border/50 px-4 py-2 text-xs text-muted-foreground hidden sm:block">
            Use ↑↓ to navigate, Enter to select, Esc to close
          </div>
        </div>
      </div>
    </div>
  )
}

// Trigger component for header
export function CommandPaletteTrigger() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={() => {
        const event = new KeyboardEvent('keydown', {
          key: 'k',
          metaKey: true,
          bubbles: true
        })
        document.dispatchEvent(event)
      }}
      className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md border border-border/50 hover:border-border"
    >
      <Search className="w-4 h-4" />
      <span>Search...</span>
      <div className="flex items-center gap-0.5 ml-auto">
        <kbd className="text-xs bg-muted px-1 rounded">⌘</kbd>
        <kbd className="text-xs bg-muted px-1 rounded">K</kbd>
      </div>
    </button>
  )
}