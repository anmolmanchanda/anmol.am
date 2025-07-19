import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Github, BookOpen } from "lucide-react"
import { Project } from "@/types"

const projects: Record<string, Project> = {
  "1": {
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
    startDate: "2024-06",
    blogArticle: "/blog/building-tb-scale-data-infrastructure-un"
  },
  "2": {
    id: "2",
    title: "AI-Powered Life Manager",
    description: "Comprehensive productivity solution built as native macOS application using AI-assisted development",
    longDescription: "Developed comprehensive productivity solution as native macOS application using AI-assisted development methodologies. Demonstrates cutting-edge AI-assisted development practices for personal productivity optimization and life management.",
    technologies: ["Swift", "AI Integration", "macOS Frameworks", "Claude AI"],
    image: "/images/projects/life-manager.jpg",
    githubUrl: "https://github.com/anmolmanchanda/LifeManager",
    featured: true,
    category: "ai",
    startDate: "2024-05",
    blogArticle: "/blog/ai-assisted-macos-life-manager"
  },
  "3": {
    id: "3",
    title: "N8N Workflow Automation",
    description: "50+ N8N workflows for process optimization and enterprise automation",
    longDescription: "Created 50+ N8N workflows for enterprise process automation at UN-Habitat, providing significant efficiency improvements across organizational workflows. Covers complex multi-step processes with various API integrations for data processing and notifications.",
    technologies: ["N8N.io", "APIs", "Workflow Design", "Automation"],
    image: "/images/projects/automation.jpg",
    githubUrl: "",
    liveUrl: "https://n8n.io",
    featured: true,
    category: "automation",
    startDate: "2024-01",
    endDate: "2024-06"
  },
  "4": {
    id: "4",
    title: "Blockchain Solutions (Smart Waterloo)",
    description: "Blockchain solutions and mobile applications for regional innovation initiatives",
    longDescription: "Developed blockchain solutions and mobile applications for Smart Waterloo Region Innovation Lab. Implemented secure data management systems and collaborated with regional stakeholders on technology initiatives.",
    technologies: ["Blockchain", "Swift", "Kotlin", "JavaScript", "Mobile Development"],
    image: "/images/projects/blockchain.jpg",
    githubUrl: "https://github.com/anmolmanchanda/blockchain-solutions",
    featured: false,
    category: "blockchain",
    startDate: "2024-02",
    endDate: "2024-06"
  },
  "5": {
    id: "5",
    title: "AI-Assisted Development Portfolio",
    description: "Collection of projects demonstrating AI-assisted development methodologies",
    longDescription: "Portfolio showcasing various AI-assisted development approaches and techniques. Demonstrates proficiency with Claude AI, ChatGPT, Cursor AI, and other AI development tools for rapid prototyping and solution development.",
    technologies: ["Claude AI", "ChatGPT", "Cursor AI", "Python", "Swift", "JavaScript"],
    image: "/images/projects/ai-portfolio.jpg",
    githubUrl: "https://github.com/anmolmanchanda/ai-assisted-projects",
    featured: false,
    category: "ai",
    startDate: "2024-04"
  },
  "6": {
    id: "6",
    title: "Apple Shortcuts Collection",
    description: "50+ Apple Shortcuts for iOS/macOS process optimization and personal efficiency",
    longDescription: "Developed 50+ Apple Shortcuts for iOS and macOS to automate personal productivity workflows. Includes shortcuts for file management, calendar scheduling, note-taking, and cross-device synchronization to streamline daily tasks.",
    technologies: ["Apple Shortcuts", "iOS", "macOS", "Personal Automation"],
    image: "/images/projects/automation.jpg",
    githubUrl: "https://github.com/anmolmanchanda/automation-suite",
    featured: true,
    category: "automation",
    startDate: "2024-01"
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const project = projects[id]
  
  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: project.title,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = projects[id]

  if (!project) {
    notFound()
  }

  return (
    <div className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/projects"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
              <p className="mt-4 text-lg text-muted-foreground">{project.description}</p>
              <div className="mt-6 flex items-center gap-4">
                {(project as any).blogArticle && (
                  <Link
                    href={(project as any).blogArticle}
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    <BookOpen className="mr-1.5 h-4 w-4" />
                    Read Technical Article
                  </Link>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="mr-1.5 h-4 w-4" />
                    View Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Live Demo
                    <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>

            <div className="aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted">
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <span>Project Screenshot</span>
              </div>
            </div>

            <section>
              <h2 className="text-2xl font-bold">Overview</h2>
              <p className="mt-4 text-muted-foreground">{project.longDescription}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">Technologies Used</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-md bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold">Key Features</h2>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Responsive design that works seamlessly across all devices</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Modern UI/UX with intuitive navigation and user flows</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Optimized performance with fast load times and smooth interactions</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Secure authentication and authorization mechanisms</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-primary">•</span>
                  <span>Comprehensive testing ensuring reliability and stability</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold">Development Process</h2>
              <p className="mt-4 text-muted-foreground">
                This project was developed using agile methodologies with a focus on iterative development 
                and continuous improvement. The development process included requirements gathering, 
                design mockups, implementation, testing, and deployment.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}