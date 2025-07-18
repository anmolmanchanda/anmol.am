"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"
import { Project } from "@/types"
import { cn } from "@/lib/utils"

const allProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A modern full-stack e-commerce solution with real-time inventory management",
    longDescription: "Built a comprehensive e-commerce platform featuring user authentication, product catalog, shopping cart, payment integration, and admin dashboard. The platform handles real-time inventory updates and supports multiple payment methods.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Redis"],
    image: "/images/projects/ecommerce.jpg",
    githubUrl: "https://github.com/anmolmanchanda/ecommerce-platform",
    liveUrl: "https://demo-ecommerce.example.com",
    featured: true,
    category: "web",
    date: "2024-01"
  },
  {
    id: "2",
    title: "Task Management App",
    description: "Collaborative task management tool with real-time updates and team features",
    longDescription: "Developed a real-time collaborative task management application that allows teams to create, assign, and track tasks. Features include drag-and-drop functionality, real-time notifications, and team collaboration tools.",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express", "JWT"],
    image: "/images/projects/taskmanager.jpg",
    githubUrl: "https://github.com/anmolmanchanda/task-manager",
    featured: true,
    category: "web",
    date: "2024-02"
  },
  {
    id: "3",
    title: "Analytics Dashboard",
    description: "Data visualization dashboard with interactive charts and real-time metrics",
    longDescription: "Created an analytics dashboard that visualizes complex data sets with interactive charts and graphs. The dashboard provides real-time insights and supports custom report generation.",
    technologies: ["React", "D3.js", "Python", "FastAPI", "PostgreSQL", "Docker"],
    image: "/images/projects/analytics.jpg",
    githubUrl: "https://github.com/anmolmanchanda/analytics-dashboard",
    featured: true,
    category: "web",
    date: "2024-03"
  },
  {
    id: "4",
    title: "Mobile Weather App",
    description: "Cross-platform weather application with location-based forecasts",
    longDescription: "Built a cross-platform mobile weather application that provides accurate weather forecasts based on user location. Features include hourly and weekly forecasts, weather alerts, and interactive maps.",
    technologies: ["React Native", "TypeScript", "Expo", "Weather API"],
    image: "/images/projects/weather.jpg",
    githubUrl: "https://github.com/anmolmanchanda/weather-app",
    featured: false,
    category: "mobile",
    date: "2023-11"
  },
  {
    id: "5",
    title: "REST API Service",
    description: "Scalable RESTful API service with authentication and rate limiting",
    longDescription: "Designed and implemented a scalable REST API service with JWT authentication, rate limiting, and comprehensive documentation. The API serves as a backend for multiple client applications.",
    technologies: ["Node.js", "Express", "MongoDB", "Redis", "Swagger"],
    image: "/images/projects/api.jpg",
    githubUrl: "https://github.com/anmolmanchanda/api-service",
    featured: false,
    category: "api",
    date: "2023-09"
  },
  {
    id: "6",
    title: "Blog Platform",
    description: "Modern blog platform with markdown support and SEO optimization",
    longDescription: "Created a blog platform with markdown editing, SEO optimization, and social media integration. Features include comment system, search functionality, and content management.",
    technologies: ["Next.js", "MDX", "Tailwind CSS", "PostgreSQL"],
    image: "/images/projects/blog.jpg",
    githubUrl: "https://github.com/anmolmanchanda/blog-platform",
    liveUrl: "https://blog.example.com",
    featured: false,
    category: "web",
    date: "2023-07"
  }
]

const categories = [
  { value: "all", label: "All Projects" },
  { value: "web", label: "Web Apps" },
  { value: "mobile", label: "Mobile Apps" },
  { value: "api", label: "APIs" },
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
            A collection of projects that showcase my skills and experience in building modern applications
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