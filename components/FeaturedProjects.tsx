import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
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
          {featuredProjects.map((project) => (
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
                  <h3 className="text-xl font-semibold">
                    <Link href={`/projects/${project.id}`} className="hover:text-primary transition-colors">
                      {project.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      GitHub
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
                      <ArrowUpRight className="ml-1 h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </article>
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