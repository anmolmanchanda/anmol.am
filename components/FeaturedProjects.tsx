import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Project } from "@/types"
import { ProjectCard } from "@/components/ProjectCard"

const featuredProjects: Project[] = [
  {
    id: "7",
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
    id: "8",
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
    id: "5",
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
          {featuredProjects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
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