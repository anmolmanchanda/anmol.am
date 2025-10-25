"use client"

import { useState } from "react"
import { Project } from "@/types"
import { cn } from "@/lib/utils"
import { ProjectCard } from "@/components/ProjectCard"

const allProjects: Project[] = [
  {
    id: "7",
    title: "Chatbot & AI Agent using AWS Bedrock",
    description: "Built intelligent Q&A system using Python, AWS Bedrock with RAG, vector embeddings, and PGVector",
    longDescription: "Developed an intelligent chatbot and AI agent system leveraging AWS Bedrock for natural language processing. Implemented RAG (Retrieval Augmented Generation) architecture with vector embeddings stored in PGVector for efficient similarity search and contextual responses.",
    technologies: ["Python", "AWS Bedrock", "RAG", "Vector Embeddings", "PGVector"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&q=80",
    githubUrl: "https://github.com/anmolmanchanda/ai-chatbot-bedrock",
    liveUrl: "",
    showDisabledLiveDemo: true,
    featured: true,
    category: "ai",
    date: "2024",
    type: "personal",
    blogArticle: "/work/building-intelligent-chatbot-aws-bedrock",
    metrics: {
      responseTime: "<200ms",
      accuracy: "95%",
      vectorDimensions: "1536",
      ragDocuments: "10,000+"
    }
  },
  {
    id: "8",
    title: "Resource Management System",
    description: "Built task management platform with Next.js, React, TypeScript supporting 17 users with real-time updates",
    longDescription: "Created a comprehensive resource management system for UN-Habitat to streamline task allocation and project tracking. The platform supports real-time collaboration for 17 team members with features like task assignment, progress tracking, and automated notifications.",
    technologies: ["Next.js", "React", "TypeScript", "Airtable", "LLMs", "MCPs"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1920&q=80",
    githubUrl: "https://github.com/anmolmanchanda/resource-management",
    liveUrl: "",
    featured: true,
    category: "enterprise",
    date: "2024",
    type: "work",
    blogArticle: "/work/enterprise-resource-management-system",
    metrics: {
      activeUsers: "17",
      tasksManaged: "500+/month",
      efficiency: "40% improvement",
      uptime: "99.9%"
    }
  },
  {
    id: "1",
    title: "Enterprise Data Pipeline (UN)",
    description: "TB-scale data processing infrastructure for 12 global cities with real-time monitoring",
    longDescription: "Built TB-scale data processing pipeline for 12 global cities serving UN global initiatives. Architected enterprise-grade AWS infrastructure handling 10+ TB monthly data volume with real-time monitoring and processing capabilities. Lead architect and developer for production system.",
    technologies: ["AWS Glue", "Lambda", "EventBridge", "Step Functions", "PySpark", "Python"],
    image: "https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?w=1920&q=80",
    githubUrl: "",
    liveUrl: "https://qolimpact.com",
    featured: true,
    category: "enterprise",
    date: "June 2024 - Present",
    type: "work",
    blogArticle: "/work/building-tb-scale-data-infrastructure-un",
    metrics: {
      dataProcessed: "10+ TB/month",
      cities: "12 global cities",
      uptime: "99.9%",
      performanceGain: "60% faster processing"
    }
  },
  {
    id: "2",
    title: "AI-Powered Life Manager",
    description: "Comprehensive productivity solution built as native macOS application using AI-powered development",
    longDescription: "Developed comprehensive productivity solution as native macOS application using AI-powered development methodologies. Demonstrates cutting-edge AI-powered development practices for personal productivity optimization and life management.",
    technologies: ["Swift", "AI Integration", "macOS Frameworks", "Claude AI"],
    image: "https://images.unsplash.com/photo-1554306274-f23873d9a26c?w=1920&q=80",
    githubUrl: "https://github.com/anmolmanchanda/LifeManager",
    featured: true,
    category: "ai",
    date: "May 2025 - Present",
    type: "personal",
    blogArticle: "/work/ai-powered-macos-life-manager",
    metrics: {
      productivity: "40% increase",
      aiCalls: "1000+ daily",
      activeUsers: "500+",
      codeGenerated: "50K+ lines"
    }
  },
  {
    id: "3",
    title: "N8N Workflow Automation",
    description: "50+ N8N workflows for process optimization and enterprise automation",
    longDescription: "Created 50+ N8N workflows for enterprise process automation at UN-Habitat, providing significant efficiency improvements across organizational workflows. Covers complex multi-step processes with various API integrations for data processing and notifications.",
    technologies: ["N8N.io", "APIs", "Workflow Design", "Automation"],
    image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=1920&q=80",
    githubUrl: "",
    liveUrl: "",
    featured: true,
    category: "automation",
    date: "January 2025",
    type: "work",
    blogArticle: "/work/enterprise-automation-n8n-workflows",
    metrics: {
      workflows: "50+ automated",
      timeSaved: "200+ hours/month",
      apiIntegrations: "30+",
      efficiency: "85% improvement"
    }
  },
  {
    id: "6",
    title: "Apple Shortcuts Collection",
    description: "716+ Apple Shortcuts for iOS/macOS process optimization and personal efficiency",
    longDescription: "Developed 716+ Apple Shortcuts for iOS and macOS to automate personal productivity workflows. Started with iOS 13 public beta release in July 2019. Includes shortcuts for file management, calendar scheduling, note-taking, and cross-device synchronization to streamline daily tasks.",
    technologies: ["Apple Shortcuts", "iOS", "macOS", "Personal Automation"],
    image: "/images/projects/automation.jpg",
    githubUrl: "",
    liveUrl: "/shortcuts",
    featured: true,
    category: "automation",
    date: "July 2019 - Present",
    type: "personal",
    blogArticle: "/work/apple-shortcuts-automation-collection"
  },
  {
    id: "4",
    title: "Blockchain Solutions (Smart Waterloo)",
    description: "Blockchain solutions and mobile applications for regional innovation initiatives",
    longDescription: "Developed blockchain solutions and mobile applications for Smart Waterloo Region Innovation Lab. Implemented secure data management systems and collaborated with regional stakeholders on technology initiatives.",
    technologies: ["Blockchain", "Swift", "Kotlin", "JavaScript", "Mobile Development"],
    image: "/images/projects/blockchain.jpg",
    githubUrl: "",
    liveUrl: "",
    featured: false,
    category: "blockchain",
    date: "February 2024 - June 2024",
    type: "work",
    blogArticle: "/work/blockchain-solutions-smart-waterloo"
  },
  {
    id: "5",
    title: "Personal Website",
    description: "LLM-driven and AI-powered development",
    longDescription: "Effectively used MCPs to optimize token usage and looking up documentation. Used MCPs like TaskMaster in conjunction with Sequential thinking for effective planning.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Claude AI", "MCP Servers", "TaskMaster", "Sequential Thinking"],
    image: "/images/projects/ai-portfolio.jpg",
    githubUrl: "https://github.com/anmolmanchanda/anmol.am",
    liveUrl: "https://anmol.am",
    featured: false,
    category: "ai",
    date: "January 2025 - Present",
    type: "personal",
    blogArticle: "/work/ai-powered-portfolio-development"
  }
]

const categories = [
  { value: "all", label: "All Projects" },
  { value: "enterprise", label: "Enterprise" },
  { value: "ai", label: "AI-Powered" },
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
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">Projects</h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-muted-foreground">
            Real portfolio projects demonstrating AI-powered development, enterprise solutions, and technical innovation
          </p>
        </div>

        <div className="mt-8 sm:mt-12 flex justify-center">
          <div className="inline-flex rounded-lg border p-1 overflow-x-auto max-w-full">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={cn(
                  "rounded-md px-3 py-2 sm:px-4 text-xs sm:text-sm font-medium transition-colors min-h-[44px] flex items-center whitespace-nowrap",
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

        <div className="mx-auto mt-8 sm:mt-12 lg:mt-16 grid max-w-2xl grid-cols-1 gap-4 sm:gap-6 lg:gap-8 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="mt-8 sm:mt-12 lg:mt-16 text-center">
            <p className="text-muted-foreground">No projects found in this category.</p>
          </div>
        )}

      </div>
    </div>
  )
}