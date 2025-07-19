"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"
import { Project } from "@/types"
import { cn } from "@/lib/utils"

const allProjects: Project[] = [
  {
    id: "1",
    title: "Enterprise Data Pipeline (UN)",
    description: "TB-scale data processing infrastructure for 12 global cities with real-time monitoring",
    longDescription: "Built TB-scale data processing pipeline for 12 global cities serving UN global initiatives. Architected enterprise-grade AWS infrastructure handling 10+ TB monthly data volume with real-time monitoring and processing capabilities. Lead architect and developer for production system.",
    technologies: ["AWS Glue", "Lambda", "EventBridge", "Step Functions", "PySpark", "Python"],
    image: "/images/projects/un-pipeline.jpg",
    githubUrl: "",
    liveUrl: "https://qolimpact.com",
    featured: true,
    category: "enterprise",
    date: "2024-06",
    type: "work"
  },
  {
    id: "2",
    title: "AI-Powered Life Manager",
    description: "Comprehensive productivity solution built as native macOS application using AI-assisted development",
    longDescription: "Developed comprehensive productivity solution as native macOS application using AI-assisted development methodologies. Demonstrates cutting-edge AI-assisted development practices for personal productivity optimization and life management.",
    technologies: ["Swift", "AI Integration", "macOS Frameworks", "Claude AI"],
    image: "/images/projects/life-manager.jpg",
    githubUrl: "https://github.com/anmolmanchanda/LifeManager",
    featured: true,
    category: "ai",
    date: "2024-05",
    type: "personal"
  },
  {
    id: "3",
    title: "N8N Workflow Automation",
    description: "50+ N8N workflows for process optimization and enterprise automation",
    longDescription: "Created 50+ N8N workflows for enterprise process automation at UN-Habitat, providing significant efficiency improvements across organizational workflows. Covers complex multi-step processes with various API integrations for data processing and notifications.",
    technologies: ["N8N.io", "APIs", "Workflow Design", "Automation"],
    image: "/images/projects/automation.jpg",
    githubUrl: "",
    featured: true,
    category: "automation",
    date: "2024-01",
    type: "work"
  },
  {
    id: "6",
    title: "Apple Shortcuts Collection",
    description: "50+ Apple Shortcuts for iOS/macOS process optimization and personal efficiency",
    longDescription: "Developed 50+ Apple Shortcuts for iOS and macOS to automate personal productivity workflows. Includes shortcuts for file management, calendar scheduling, note-taking, and cross-device synchronization to streamline daily tasks.",
    technologies: ["Apple Shortcuts", "iOS", "macOS", "Personal Automation"],
    image: "/images/projects/automation.jpg",
    githubUrl: "https://github.com/anmolmanchanda/automation-suite",
    featured: true,
    category: "automation",
    date: "2024-01",
    type: "personal"
  },
  {
    id: "4",
    title: "Blockchain Solutions (Smart Waterloo)",
    description: "Blockchain solutions and mobile applications for regional innovation initiatives",
    longDescription: "Developed blockchain solutions and mobile applications for Smart Waterloo Region Innovation Lab. Implemented secure data management systems and collaborated with regional stakeholders on technology initiatives.",
    technologies: ["Blockchain", "Swift", "Kotlin", "JavaScript", "Mobile Development"],
    image: "/images/projects/blockchain.jpg",
    githubUrl: "https://github.com/anmolmanchanda/blockchain-solutions",
    featured: false,
    category: "blockchain",
    date: "2024-02",
    type: "work"
  },
  {
    id: "5",
    title: "AI-Assisted Development Portfolio",
    description: "Collection of projects demonstrating AI-assisted development methodologies",
    longDescription: "Portfolio showcasing various AI-assisted development approaches and techniques. Demonstrates proficiency with Claude AI, ChatGPT, Cursor AI, and other AI development tools for rapid prototyping and solution development.",
    technologies: ["Claude AI", "ChatGPT", "Cursor AI", "Python", "Swift", "JavaScript"],
    image: "/images/projects/ai-portfolio.jpg",
    githubUrl: "https://github.com/anmolmanchanda/ai-assisted-projects",
    featured: false,
    category: "ai",
    date: "2024-04",
    type: "personal"
  }
]

const categories = [
  { value: "all", label: "All Projects" },
  { value: "enterprise", label: "Enterprise" },
  { value: "ai", label: "AI-Assisted" },
  { value: "automation", label: "Automation" },
  { value: "blockchain", label: "Blockchain" },
  { value: "other", label: "Other" }
]

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredProjects = selectedCategory === "all" 
    ? allProjects 
    : allProjects.filter(project => project.category === selectedCategory)

  return (
    <div className="py-24 sm:py-32 aurora-bg relative overflow-hidden">
      {/* Aurora background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
      <div className="absolute inset-0 bg-gradient-to-tl from-violet-500/10 via-transparent to-cyan-500/10 animate-pulse" />
      <div className="absolute inset-0 ai-grid" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Projects</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Real portfolio projects demonstrating AI-assisted development, enterprise solutions, and technical innovation
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="inline-flex rounded-lg border p-1">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  selectedCategory === category.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group relative flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-lg"
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-muted relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Animated project visualizations matching FeaturedProjects */}
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
                  {(project.id === "3" || project.id === "6" || project.category === "automation") && (
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
                    </div>
                  )}
                  {project.category === "blockchain" && (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-600/60 via-purple-500/50 to-blue-400/40 flex items-center justify-center overflow-hidden">
                      {/* Blockchain network visualization */}
                      <div className="relative w-full h-full">
                        {/* Network nodes */}
                        {[...Array(12)].map((_, i) => (
                          <div key={i} className="absolute w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-pulse"
                               style={{
                                 top: `${Math.random() * 80 + 10}%`,
                                 left: `${Math.random() * 80 + 10}%`,
                                 animationDelay: `${i * 0.2}s`,
                                 animationDuration: `${2 + Math.random()}s`
                               }} />
                        ))}
                        {/* Connecting lines */}
                        {[...Array(8)].map((_, i) => (
                          <div key={i} className="absolute h-0.5 bg-gradient-to-r from-transparent via-purple-400/60 to-transparent animate-pulse"
                               style={{
                                 top: `${20 + i * 8}%`,
                                 left: `${10 + (i % 3) * 25}%`,
                                 width: `${30 + Math.random() * 20}%`,
                                 transform: `rotate(${Math.random() * 60 - 30}deg)`,
                                 animationDelay: `${i * 0.3}s`
                               }} />
                        ))}
                        {/* Central blockchain icon */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-8 h-8 border-2 border-indigo-300 rounded opacity-80 animate-bounce">
                            <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-400 rounded animate-pulse" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {project.category === "ai" && project.id !== "2" && (
                    <div className="w-full h-full bg-gradient-to-br from-violet-600/60 via-fuchsia-500/50 to-purple-400/40 flex items-center justify-center overflow-hidden">
                      {/* AI neural network pattern */}
                      <div className="relative w-full h-full">
                        {/* Neural connections */}
                        <div className="absolute inset-0 opacity-60">
                          {[...Array(20)].map((_, i) => (
                            <div key={i} className="absolute w-1 h-1 bg-violet-400 rounded-full animate-ping"
                                 style={{
                                   top: `${Math.random() * 100}%`,
                                   left: `${Math.random() * 100}%`,
                                   animationDelay: `${i * 0.1}s`,
                                   animationDuration: `${1 + Math.random()}s`
                                 }} />
                          ))}
                        </div>
                        {/* Brain-like structure */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="relative">
                            <div className="w-16 h-12 border-2 border-violet-300 rounded-full opacity-70 animate-pulse" />
                            <div className="absolute top-1 left-2 w-3 h-3 bg-violet-400 rounded-full animate-bounce" />
                            <div className="absolute top-2 right-3 w-2 h-2 bg-fuchsia-400 rounded-full animate-bounce" style={{animationDelay: '0.3s'}} />
                            <div className="absolute bottom-1 left-4 w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.6s'}} />
                          </div>
                        </div>
                        {/* Flowing data streams */}
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-violet-400/50 to-transparent"
                               style={{
                                 top: `${25 + i * 15}%`,
                                 animation: `data-stream ${2.5 + i * 0.3}s ease-in-out infinite`,
                                 animationDelay: `${i * 0.4}s`
                               }} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Category badge moved to corner */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="text-white/90 text-xs font-medium px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/20">
                    {project.category === 'enterprise' ? 'Enterprise' : 
                     project.category === 'ai' ? 'AI-Powered' : 
                     project.category === 'automation' ? 'Automation' :
                     project.category === 'blockchain' ? 'Blockchain' : 'Project'}
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {new Date(project.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                    {project.featured && (
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 text-xl font-semibold">
                    <Link href={`/projects/${project.id}`} className="hover:text-primary transition-colors">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
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
                <div className="mt-6 flex items-center gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="mr-1.5 h-4 w-4" />
                      Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Live Demo
                      <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-muted-foreground">No projects found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}