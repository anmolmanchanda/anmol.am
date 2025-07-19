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
    liveUrl: "",
    featured: true,
    category: "enterprise",
    date: "2024-06"
  },
  {
    id: "2",
    title: "AI-Powered Life Manager",
    description: "Comprehensive productivity solution built as native macOS application using AI-assisted development",
    longDescription: "Developed comprehensive productivity solution as native macOS application using AI-assisted development methodologies. Demonstrates cutting-edge AI-assisted development practices for personal productivity optimization and life management.",
    technologies: ["Swift", "AI Integration", "macOS Frameworks", "Claude AI"],
    image: "/images/projects/life-manager.jpg",
    githubUrl: "https://github.com/anmolmanchanda/ai-life-manager",
    featured: true,
    category: "ai",
    date: "2024-05"
  },
  {
    id: "3",
    title: "Automation Solutions Suite",
    description: "100+ Apple Shortcuts and N8N workflows for process optimization and efficiency",
    longDescription: "Created 100+ Apple Shortcuts and N8N workflows for process automation, providing significant efficiency improvements across daily workflows. Covers both personal and professional process automation with various API integrations.",
    technologies: ["Apple Shortcuts", "N8N.io", "APIs", "Automation", "Workflow Design"],
    image: "/images/projects/automation.jpg",
    githubUrl: "https://github.com/anmolmanchanda/automation-suite",
    featured: true,
    category: "automation",
    date: "2024-01"
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
    date: "2024-02"
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
    date: "2024-04"
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
    <div className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
              <div className="aspect-[16/9] w-full overflow-hidden bg-muted">
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <span>Project Image</span>
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