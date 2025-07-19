import Link from "next/link"
import { ArrowUpRight, Database, Zap, TrendingUp } from "lucide-react"
import { Project } from "@/types"

const featuredProjects: Project[] = [
  {
    id: "1",
    title: "Enterprise Data Pipeline (UN)",
    description: "TB-scale data processing infrastructure for 12 global cities with real-time monitoring",
    technologies: ["AWS Glue", "Lambda", "EventBridge", "Step Functions", "PySpark"],
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
    technologies: ["Swift", "AI Integration", "macOS Frameworks"],
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
    technologies: ["Apple Shortcuts", "N8N.io", "APIs", "Automation"],
    image: "/images/projects/automation.jpg",
    githubUrl: "https://github.com/anmolmanchanda/automation-suite",
    featured: true,
    category: "automation",
    date: "2024-01"
  }
]

export function FeaturedProjects() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Projects</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Real projects demonstrating AI-assisted development and enterprise-scale solutions
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {featuredProjects.map((project) => {
            const getProjectIcon = () => {
              if (project.id === "1") return <Database className="w-8 h-8 text-blue-500" />
              if (project.id === "2") return <Zap className="w-8 h-8 text-purple-500" />
              return <TrendingUp className="w-8 h-8 text-green-500" />
            }

            const getProjectMetrics = () => {
              if (project.id === "1") return { metric: "10+ TB", label: "Data Processed Monthly" }
              if (project.id === "2") return { metric: "AI-Powered", label: "Native macOS App" }
              return { metric: "100+", label: "Automations Created" }
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
                  <div className="flex h-full items-center justify-center">
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

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/90 text-primary-foreground backdrop-blur-sm">
                      {project.category === 'enterprise' ? 'Enterprise' : 
                       project.category === 'ai' ? 'AI-Powered' : 'Automation'}
                    </span>
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
                      View Case Study
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