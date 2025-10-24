import Link from "next/link"
import { ArrowUpRight, Database, Zap, TrendingUp } from "lucide-react"
import { Project } from "@/types"

const featuredProjects: Project[] = [
  {
    id: "1",
    title: "Chatbot & AI Agent using AWS Bedrock",
    description: "Built intelligent Q&A system using Python, AWS Bedrock with RAG, vector embeddings, and PGVector",
    technologies: ["Python", "AWS Bedrock", "RAG", "Vector Embeddings", "PGVector"],
    image: "/images/projects/ai-chatbot.jpg",
    githubUrl: "",
    featured: true,
    category: "ai",
    date: "2024",
    type: "personal"
  },
  {
    id: "2",
    title: "Resource Management System",
    description: "Built task management platform with Next.js, React, TypeScript supporting 17 users with real-time updates",
    technologies: ["Next.js", "React", "TypeScript", "Airtable", "LLMs", "MCPs"],
    image: "/images/projects/resource-management.jpg",
    githubUrl: "",
    featured: true,
    category: "enterprise",
    date: "2024",
    type: "work"
  },
  {
    id: "3",
    title: "Personal Website",
    description: "LLM-driven and AI-powered development using MCPs like TaskMaster with Sequential thinking for effective planning",
    technologies: ["Next.js", "React", "TypeScript", "Claude AI", "MCP Servers", "TaskMaster"],
    image: "/images/projects/personal-website.jpg",
    githubUrl: "https://github.com/anmolmanchanda/anmol.am",
    liveUrl: "https://anmol.am",
    featured: true,
    category: "ai",
    date: "2025",
    type: "personal"
  }
]

export function FeaturedProjects() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Projects</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Real projects demonstrating AI-powered development and enterprise-scale solutions
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {featuredProjects.slice(0, 3).map((project) => {
            const getProjectIcon = () => {
              if (project.id === "1") return <Zap className="w-8 h-8 text-purple-500" />
              if (project.id === "2") return <Database className="w-8 h-8 text-blue-500" />
              return <TrendingUp className="w-8 h-8 text-green-500" />
            }

            const getProjectMetrics = () => {
              if (project.id === "1") return { metric: "AWS Bedrock", label: "RAG & Embeddings" }
              if (project.id === "2") return { metric: "17 Users", label: "Real-time Platform" }
              if (project.id === "3") return { metric: "MCP-Driven", label: "AI-Powered Dev" }
              return { metric: "100+", label: "Features Built" }
            }

            const metrics = getProjectMetrics()

            return (
              <article
                key={project.id}
                className="group relative flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-xl hover:scale-[1.02] duration-300"
              >
                {/* Enhanced project visual */}
                <div className="aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-muted relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Enhanced animated data visualization backgrounds */}
                  <div className="absolute inset-0 opacity-50">
                    {project.id === "1" && (
                      <div className="w-full h-full bg-gradient-to-br from-blue-600/60 via-cyan-500/50 to-teal-400/40 flex items-center justify-center overflow-hidden">
                        <div className="grid grid-cols-12 gap-1 opacity-80 rotate-3 animate-pulse">
                          {[...Array(60)].map((_, i) => (
                            <div key={i} className={`w-1.5 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-sm animate-bounce`} 
                                 style={{
                                   height: `${Math.floor(Math.random() * 50) + 15}px`,
                                   animationDelay: `${(i * 0.1) % 3}s`,
                                   animationDuration: `${1 + (i % 3) * 0.5}s`
                                 }} />
                          ))}
                        </div>
                        {/* Moving data streams */}
                        <div className="absolute inset-0">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="absolute h-0.5 w-full bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
                                 style={{
                                   top: `${20 + i * 15}%`,
                                   animation: `data-stream ${2 + i * 0.5}s linear infinite`,
                                   animationDelay: `${i * 0.4}s`
                                 }} />
                          ))}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-pulse" />
                      </div>
                    )}
                    {project.id === "2" && (
                      <div className="w-full h-full bg-gradient-to-br from-purple-600/60 via-pink-500/50 to-violet-400/40 flex items-center justify-center">
                        <div className="relative">
                          <div className="w-32 h-32 border-4 border-purple-300 rounded-2xl opacity-70 rotate-12 animate-pulse" />
                          <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg opacity-90 animate-bounce" />
                          <div className="absolute bottom-4 right-4 w-6 h-6 bg-gradient-to-r from-pink-400 to-violet-400 rounded-full opacity-90 animate-bounce" style={{animationDelay: '0.5s'}} />
                          <div className="absolute top-8 right-8 w-4 h-4 bg-gradient-to-r from-violet-400 to-purple-400 rounded opacity-80 animate-ping" />
                        </div>
                      </div>
                    )}
                    {(project.id === "3" || project.id === "4") && (
                      <div className="w-full h-full bg-gradient-to-br from-green-600/60 via-emerald-500/50 to-teal-400/40 flex items-center justify-center overflow-hidden">
                        <div className="grid grid-cols-8 gap-3 opacity-70 -rotate-6">
                          {[...Array(32)].map((_, i) => (
                            <div key={i} className="w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full animate-bounce" 
                                 style={{
                                   animationDelay: `${i * 0.1}s`,
                                   animationDuration: `${1.5 + (i % 4) * 0.3}s`
                                 }} />
                          ))}
                        </div>
                        {/* Flowing automation lines */}
                        <div className="absolute inset-0">
                          {[...Array(6)].map((_, i) => (
                            <div key={i} className="absolute w-0.5 h-full bg-gradient-to-b from-transparent via-emerald-400/50 to-transparent"
                                 style={{
                                   left: `${15 + i * 12}%`,
                                   animation: `matrix-rain ${3 + i * 0.5}s linear infinite`,
                                   animationDelay: `${i * 0.3}s`
                                 }} />
                          ))}
                        </div>
                        <div className="absolute inset-0">
                          <div className="w-full h-full bg-gradient-to-r from-green-500/20 via-transparent to-emerald-500/20 animate-pulse" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="relative z-10 flex h-full items-center justify-center">
                    {getProjectIcon()}
                  </div>
                  
                  {/* Impact metric overlay */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 dark:bg-black/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="text-xs font-semibold text-center">
                        <div className="text-primary font-bold">{metrics.metric}</div>
                        <div className="text-muted-foreground text-[10px]">{metrics.label}</div>
                      </div>
                    </div>
                  </div>

                  {/* Category and Type badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/90 text-primary-foreground backdrop-blur-sm">
                      {project.category === 'enterprise' ? 'Enterprise' : 
                       project.category === 'ai' ? 'AI-Powered' : 'Automation'}
                    </span>
                    {project.type && (
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium backdrop-blur-sm ${
                        project.type === 'work' ? 'bg-blue-500/90 text-white' :
                        project.type === 'personal' ? 'bg-green-500/90 text-white' :
                        'bg-orange-500/90 text-white'
                      }`}>
                        {project.type === 'work' ? 'Work' : 
                         project.type === 'personal' ? 'Personal' : 'Mixed'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        <Link href={`/projects/${project.id}`} className="hover:text-primary transition-colors">
                          {project.title}
                        </Link>
                      </h3>
                      {project.featured && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                    
                    {/* Enhanced technology tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="inline-flex items-center rounded-md bg-secondary/50 hover:bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="inline-flex items-center text-xs text-muted-foreground">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Enhanced action buttons */}
                  <div className="mt-6 flex items-center gap-4">
                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
                    >
                      View Project
                      <ArrowUpRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>
                    
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Code
                      </a>
                    )}
                    
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View All Projects
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}