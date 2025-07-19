"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, Clock, Search, Filter, Eye, BookOpen, Zap, Code, Database, Globe, Container, Gauge } from "lucide-react"
import { useBatchViewCounts } from "@/components/ViewTracker"
import { motion, AnimatePresence } from "framer-motion"
import { BlogPost } from "@/types"
import { formatDate, cn } from "@/lib/utils"
import { Card3D, MagneticButton } from "@/components/DrribbleInspiredFeatures"
import { ParallaxElement } from "@/components/InteractiveEffects"

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Scalable Web Applications with Next.js",
    excerpt: "Learn how to build performant and scalable web applications using Next.js 15 and modern best practices. Real-world experience from building TB-scale enterprise infrastructure.",
    content: "",
    date: "2025-07-19",
    tags: ["Next.js", "React", "Web Development", "Scalability", "Enterprise"],
    readingTime: 12,
    slug: "building-scalable-web-apps-nextjs",
    image: "/images/blog/nextjs-scalable.svg",
    gradient: "from-blue-600 via-purple-600 to-blue-800",
    icon: <Globe className="w-6 h-6" />,
    views: 0,
    featured: true
  },
  {
    id: "2",
    title: "The Power of TypeScript in Modern Development",
    excerpt: "Discover how TypeScript can improve your development workflow and help you write more maintainable code. Advanced patterns from real enterprise applications.",
    content: "",
    date: "2025-07-19",
    tags: ["TypeScript", "JavaScript", "Best Practices", "Developer Experience", "Type Safety"],
    readingTime: 15,
    slug: "power-of-typescript",
    image: "/images/blog/typescript-power.svg",
    gradient: "from-blue-500 via-cyan-500 to-teal-600",
    icon: <Code className="w-6 h-6" />,
    views: 0,
    featured: true
  },
  {
    id: "3",
    title: "Mastering State Management in React Applications",
    excerpt: "A comprehensive guide to managing state in React applications, from local state to global state solutions. Compare Redux, Zustand, and modern patterns with real examples.",
    content: "",
    date: "2025-07-19",
    tags: ["React", "State Management", "Frontend", "Redux", "Zustand", "React Query"],
    readingTime: 18,
    slug: "mastering-state-management-react",
    image: "/images/blog/react-state.svg",
    gradient: "from-purple-600 via-pink-600 to-red-600",
    icon: <Database className="w-6 h-6" />,
    views: 0,
    featured: true
  },
  {
    id: "4",
    title: "Building Real-time Applications with WebSockets",
    excerpt: "Learn how to implement real-time features in your applications using WebSockets and Socket.io. Build collaborative tools and live data dashboards for enterprise use.",
    content: "",
    date: "2025-07-19",
    tags: ["WebSockets", "Real-time", "Node.js", "Socket.io", "Enterprise"],
    readingTime: 18,
    slug: "building-realtime-apps-websockets",
    image: "/images/blog/websockets-realtime.svg",
    gradient: "from-green-500 via-emerald-500 to-teal-600",
    icon: <Zap className="w-6 h-6" />,
    views: 0,
    featured: false
  },
  {
    id: "5",
    title: "Performance Optimization Techniques for Web Apps",
    excerpt: "Essential techniques and strategies to optimize the performance of your web applications. Core Web Vitals, bundle optimization, and real-world performance wins.",
    content: "",
    date: "2025-07-19",
    tags: ["Performance", "Optimization", "Web Development", "Core Web Vitals", "Enterprise"],
    readingTime: 22,
    slug: "performance-optimization-techniques",
    image: "/images/blog/performance-optimization.svg",
    gradient: "from-orange-500 via-red-500 to-pink-600",
    icon: <Gauge className="w-6 h-6" />,
    views: 0,
    featured: true
  },
  {
    id: "6",
    title: "Getting Started with Docker for Web Developers",
    excerpt: "A comprehensive guide to containerizing your web applications with Docker. Development workflows, production deployment, and enterprise best practices.",
    content: "",
    date: "2025-07-19",
    tags: ["Docker", "DevOps", "Containers", "Deployment", "Infrastructure"],
    readingTime: 12,
    slug: "getting-started-docker",
    image: "/images/blog/docker-containers.svg",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    icon: <Container className="w-6 h-6" />,
    views: 0,
    featured: false
  },
  {
    id: "7",
    title: "Building TB-Scale Data Infrastructure at UN-Habitat",
    excerpt: "How we built a TB-scale data processing infrastructure for 12 global cities using AWS Glue, Lambda, and real-time monitoring. Enterprise architecture lessons learned.",
    content: "",
    date: "2025-07-19",
    tags: ["AWS", "Data Engineering", "Enterprise", "Python", "Infrastructure", "UN"],
    readingTime: 30,
    slug: "building-tb-scale-data-infrastructure-un",
    image: "/images/blog/nextjs-scalable.svg",
    gradient: "from-emerald-600 via-blue-600 to-purple-800",
    icon: <Database className="w-6 h-6" />,
    views: 0,
    featured: true
  },
  {
    id: "8",
    title: "AI-Assisted Development: Building a Native macOS Life Manager",
    excerpt: "How I built a comprehensive productivity solution as a native macOS application using AI-assisted development methodologies with Claude AI and Swift.",
    content: "",
    date: "2025-07-19",
    tags: ["AI-Assisted", "macOS", "Swift", "Productivity", "Claude AI", "Native Apps"],
    readingTime: 25,
    slug: "ai-assisted-macos-life-manager",
    image: "/images/blog/typescript-power.svg",
    gradient: "from-purple-600 via-pink-600 to-orange-600",
    icon: <Zap className="w-6 h-6" />,
    views: 0,
    featured: true
  },
  {
    id: "9",
    title: "Enterprise Automation with N8N: 50+ Workflows at Scale",
    excerpt: "How we created 50+ N8N workflows for enterprise process automation at UN-Habitat, achieving significant efficiency improvements across organizational workflows.",
    content: "",
    date: "2025-07-19",
    tags: ["N8N", "Automation", "Enterprise", "Workflows", "APIs", "Process Optimization"],
    readingTime: 10,
    slug: "enterprise-automation-n8n-workflows",
    image: "/images/blog/websockets-realtime.svg",
    gradient: "from-green-600 via-teal-600 to-blue-600",
    icon: <Gauge className="w-6 h-6" />,
    views: 0,
    featured: false
  }
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Get real-time view counts for all blog posts
  const { viewCounts, loading: viewsLoading } = useBatchViewCounts(
    blogPosts.map(post => post.slug)
  )

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)))
  const featuredPosts = blogPosts.filter(post => post.featured)
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = !selectedTag || post.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  return (
    <div className="py-24 sm:py-32 aurora-bg relative overflow-hidden">
      {/* Enhanced Aurora background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
      <div className="absolute inset-0 bg-gradient-to-tl from-violet-500/10 via-transparent to-cyan-500/10 animate-pulse" />
      <div className="absolute inset-0 ai-grid" />
      
      {/* Floating knowledge particles */}
      <ParallaxElement speed="slow" className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-faster"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <div className="glass-morphism cyber-border p-2 rounded-full border backdrop-blur-md quantum-glow">
              <BookOpen className="w-3 h-3 text-primary/60" />
            </div>
          </div>
        ))}
      </ParallaxElement>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <div className="glass-morphism cyber-border p-4 rounded-full border backdrop-blur-md quantum-glow">
              <BookOpen className="w-8 h-8 text-primary icon-pulse" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Knowledge
            </span>{' '}
            <span className="text-foreground">Hub</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl leading-8 text-muted-foreground max-w-3xl mx-auto">
            Deep dives into cutting-edge web technologies, AI-assisted development patterns, and the future of software engineering
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div 
          className="mx-auto max-w-4xl mt-12 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="glass-morphism cyber-border p-6 rounded-2xl border backdrop-blur-md">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              
              {/* Tag Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <button
                  onClick={() => setSelectedTag(null)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm transition-all",
                    !selectedTag 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary/50 hover:bg-secondary text-secondary-foreground"
                  )}
                >
                  All
                </button>
                {allTags.slice(0, 6).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm transition-all",
                      selectedTag === tag 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-secondary/50 hover:bg-secondary text-secondary-foreground"
                    )}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Posts Section */}
        {!searchQuery && !selectedTag && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <div className="w-1 h-6 bg-gradient-to-b from-primary to-purple-500 rounded-full" />
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <Card3D className="h-full group" glowColor="primary">
                    <Link href={`/blog/${post.slug}`} className="block h-full">
                      <div className="liquid-glass rounded-2xl border backdrop-blur-md overflow-hidden h-full cyber-border group-hover:scale-[1.02] transition-all duration-500">
                        {/* Image Header with Gradient Overlay */}
                        <div className="relative h-48 overflow-hidden">
                          <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-90`} />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          <div className="absolute top-4 right-4 z-10">
                            <div className="glass-morphism p-2 rounded-full border border-white/20">
                              {post.icon}
                            </div>
                          </div>
                          <div className="absolute bottom-4 left-4 z-10">
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                              Featured
                            </span>
                          </div>
                          {/* Animated pattern overlay */}
                          <div className="absolute inset-0 opacity-30">
                            {[...Array(8)].map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                                style={{
                                  top: `${Math.random() * 100}%`,
                                  left: `${Math.random() * 100}%`,
                                  animationDelay: `${i * 0.3}s`,
                                  animationDuration: `${2 + Math.random()}s`
                                }}
                              />
                            ))}
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-6">
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <time dateTime={post.date}>{formatDate(post.date)}</time>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{post.readingTime} min</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-primary">
                              <Eye className="h-4 w-4" />
                              <span className="font-medium">
                                {viewsLoading ? '...' : (viewCounts[post.slug] || 0).toLocaleString()}
                              </span>
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors mb-3 line-clamp-2">
                            {post.title}
                          </h3>
                          
                          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center rounded-md bg-primary/10 text-primary px-2 py-1 text-xs font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 3 && (
                              <span className="text-xs text-muted-foreground">+{post.tags.length - 3}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Card3D>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Articles Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <div className="w-1 h-6 bg-gradient-to-b from-primary to-purple-500 rounded-full" />
              {searchQuery || selectedTag ? 'Search Results' : 'All Articles'}
              <span className="text-sm font-normal text-muted-foreground ml-2">
                ({filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'})
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <MagneticButton className="h-full block">
                    <Link href={`/blog/${post.slug}`} className="block h-full">
                      <div className="liquid-glass rounded-xl border backdrop-blur-md overflow-hidden h-full hover:shadow-xl transition-all duration-300 cyber-border group">
                        {/* Compact Image Header */}
                        <div className="relative h-32 overflow-hidden">
                          <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-80`} />
                          <div className="absolute top-2 right-2">
                            <div className="glass-morphism p-1.5 rounded-full border border-white/20">
                              {post.icon}
                            </div>
                          </div>
                          {post.featured && (
                            <div className="absolute top-2 left-2">
                              <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                                Featured
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {/* Compact Content */}
                        <div className="p-4">
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3 w-3" />
                              <time dateTime={post.date}>{formatDate(post.date)}</time>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 w-3" />
                              <span>{post.readingTime}m</span>
                              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                              <Eye className="h-3 w-3" />
                              <span>{viewsLoading ? '...' : (viewCounts[post.slug] || 0).toLocaleString()}</span>
                            </div>
                          </div>
                          
                          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors mb-2 line-clamp-2">
                            {post.title}
                          </h3>
                          
                          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-3">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center rounded-md bg-secondary/50 text-secondary-foreground px-2 py-0.5 text-xs font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 2 && (
                              <span className="text-xs text-muted-foreground">+{post.tags.length - 2}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </MagneticButton>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="glass-morphism cyber-border p-8 rounded-2xl border backdrop-blur-md max-w-md mx-auto">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedTag(null)
                  }}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}