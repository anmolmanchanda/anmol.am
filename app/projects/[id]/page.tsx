import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react"
import { Project } from "@/types"

const projects: Record<string, Project> = {
  "1": {
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
  "2": {
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
  "3": {
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
  "4": {
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
  "5": {
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
  "6": {
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
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
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