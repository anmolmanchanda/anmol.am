import { Metadata } from "next"
import Image from "next/image"
import { Building2, ChefHat, Users, GraduationCap, Code2, Database, Zap, Award } from "lucide-react"
import { Experience } from "@/types"
import { TimelineItem } from "@/components/InteractiveEffects"
import { FullStackEngineerSection } from "@/components/FullStackEngineerSection"

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Anmol Manchanda - Cloud Architect & AI Engineer specializing in scalable AWS infrastructure and AI-driven innovation",
}

const experiences: Experience[] = [
  {
    id: "1",
    company: "United Nations-Habitat",
    position: "Full Stack Software Engineer",
    startDate: "2024-06",
    endDate: "2025-08",
    description: "Led multidisciplinary data team designing and deploying 500TB+ scalable, secure geospatial mobile-ping analytics solution for global cities",
    technologies: ["AWS Glue", "PySpark", "Python", "Lambda", "EventBridge", "Step Functions", "Claude AI", "Cursor AI"],
    achievements: [
      "Contributed to a $20M project with projected expansion to $30–40M annually by 2026/2027",
      "Spearheading global scale-up: 50 cities in 2025, 300+ in 2026, and thousands beyond 2027",
      "Cloud Architect & Data Engineer (32.5%): Led a multidisciplinary data team in designing and deploying a 500TB+ scalable, secure geospatial mobile-ping analytics solution; built dashboards (Pandas, QuickSight) and AWS Glue–based PySpark pipelines",
      "FinOps: Reduced infrastructure costs by 80% ($10 to $2 per indicator/city/day) and Improved processing time by 85% from 6 hours to under 1 hour through resource optimization, parallel processing, reusability, and modularization for AWS Glue code",
      "Designed and deployed automated and scalable AWS infrastructure processing 500TB+ monthly using AWS Glue and PySpark",
      "Security: Implemented least-privilege IAM policies, users & roles through AWS CLI and Console, improving security posture and audit readiness for permissions like S3 buckets and other AWS services",
      "Built serverless event-driven architectures using Lambda functions with python and added zip layers of libraries like Pandas, Step Functions with JSON, and EventBridge for automated Event-driven architecture",
      "Established infrastructure monitoring and alerting using CloudWatch and cost optimization strategies",
      "Used advanced prompt engineering and Claude Code CLI for development with latest MCPs",
      "Used GitHub actions for CI/CD",
      "Deployed S3 buckets, created S3 Inventory and added lifecycle policies",
      "AI/LLM: Leveraged state-of-the-art LLMs (Claude Opus 4.1, GPT-5 Thinking, Gemini 2.5 Pro) and code editors (Cursor.AI, WindSurf, Zed, Claude Code CLI) to prototype rapidly accelerating PoC turnaround significantly",
      "MCP: Sequential Thinking for structured problem-solving, Task Master AI for task management & organization, Brave Search for searching information",
      "Document & Technical Writer (22.5%): Developed comprehensive technical documentation, including API endpoints, deployment prerequisites, and integration guidelines to align stakeholders on project milestones",
      "Contributed to technical diagrams, and maintained deliverables, enhancing the project's architecture and deployment planning",
      "Translated & communicated project specifications to non-technical team members & stakeholders",
      "Develop & Rapid Prototype (15%): Drove rapid prototyping initiatives—leveraged AI development to accelerate major project delivery from idea to implementation in hours",
      "Reduced development cycles greatly through intelligent prompt engineering",
      "Developed many web apps: Geospatial product - visualized citizen movement patterns, built a web-based online tool for managing 100s of GBs of location data",
      "Integration (10%): Orchestrated platform integrations (Cinchy.com) to expand service capabilities",
      "Worked with a B2B company, Cinchy to use their product as our centralized data network",
      "Completed Cinchy University and learned about their product",
      "Designed & maintained scalable database schemas for 12 cities ensuring real-time data synchronization for our QoL Impact website",
      "Developed & maintained Cinchy CQL queries, and tested them in the Cinchy Platform",
      "Scrum & Agile (7.5%): Tracked tasks in daily stand-ups for all team members",
      "Created biweekly sprints reports and helped with sprint planning",
      "Created and maintained the financial budget of the project",
      "Test (7.5%): Implemented GitHub Action workflows with automated testing using Cursor.AI and LLM model, Claude Sonnet 3.7",
      "Design (5%): Design a wireframe and high fidelity prototype in Figma for my novel Indicator Science idea to showcase the science and process behind Quality of Life Initiative Indicators"
    ]
  },
  {
    id: "2",
    company: "Region of Waterloo - Smart Waterloo Region Innovation Lab",
    position: "Hyperledger Fabric Architect & Mobile Developer",
    startDate: "2024-02",
    endDate: "2024-06",
    description: "Designed architecture for custom blockchain network using Hyperledger Fabric and Smart Contracts for municipal applications",
    technologies: ["Hyperledger Fabric", "Smart Contracts", "Docker", "Swift", "Node.js", "Go", "YAML", "XML", "Figma"],
    achievements: [
      "Designed architecture for custom Blockchain network using Hyperledger Fabric architecture and Smart Contracts for municipal applications",
      "Built proof-of-concept implementation using Docker containerization for Organizations",
      "Explored consensus mechanisms",
      "Used Node.js, Go, YAML and XML",
      "Wireframed & designed the iOS app in Figma",
      "Developed the iOS app in Xcode using Swift"
    ]
  },
  {
    id: "3",
    company: "Williams Fresh Cafe",
    position: "Line Cook",
    startDate: "2022-01",
    endDate: "2024-01",
    description: "Gained diverse experience in hospitality while transitioning into technical roles",
    technologies: ["Operations", "Team Collaboration", "Customer Service"],
    achievements: [
      "Developed strong work ethic and team collaboration skills",
      "Maintained high-quality standards in fast-paced environment",
      "Balanced hospitality work with technical skill development"
    ]
  },
  {
    id: "4",
    company: "AIESEC Delhi IIT",
    position: "Manager",
    startDate: "2016-01",
    endDate: "2017-01",
    description: "Volunteer leadership role managing international exchange programs and team coordination",
    technologies: ["Leadership", "Project Management", "International Coordination"],
    achievements: [
      "Led international exchange programs",
      "Managed cross-cultural teams and initiatives",
      "Developed leadership and organizational skills"
    ]
  }
]

export default function AboutPage() {
  return (
    <div className="py-24 sm:py-32 aurora-bg relative overflow-hidden">
      <div className="absolute inset-0 ai-grid" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Header with photo */}
          <div className="text-center relative z-10">
            <div className="flex flex-col items-center mb-8">
              <div className="relative group mb-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all duration-700 group-hover:shadow-[0_0_60px_rgba(0,0,0,0.15)] neural-glow">
                  <Image
                    src="/images/about_avatar.JPG"
                    alt="Anmol Manchanda - Technical Solutions Architect"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover scale-110 transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </div>
                {/* Status indicator */}
                <div className="absolute -bottom-1 -right-1">
                  <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-background shadow-lg flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  </div>
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About Me</h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl">
                Cloud Architect & AI Engineer specializing in scalable AWS infrastructure and AI-driven innovation
              </p>
            </div>
          </div>

          <div className="mt-12 sm:mt-16 space-y-12 sm:space-y-16">
            <section className="relative z-10">
              <h2 className="text-2xl font-bold tracking-tight">Who I Am</h2>
              <div className="mt-6 space-y-4 text-foreground">
                <p>
                  Proficient cloud, data and technical solutions architect specializing in building scalable AWS infrastructure as well as rapid 
                  prototyping. Proven ability to solve complex technical challenges across multiple domains using cloud infrastructure and cloud 
                  infrastructure. Reduced infrastructure costs by 80% while processing 500TB+ monthly for UN global initiative through 
                  automation, reusability, optimization, and modularization.
                </p>
                <p>
                  Experienced in technical and non technical communication, presentation skills, AWS services, ETL optimization, and technical 
                  leadership. Extraordinarily quick learner and backed up with excellent references.
                </p>
                <p>
                  Core values include continuous learning and adaptation, creative problem-solving with AI tools, 
                  efficiency through intelligent automation, and maintaining work-life balance.
                </p>
              </div>
            </section>

            <section className="relative z-10 overflow-visible">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Experience</h2>
              <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8 overflow-visible">
                {experiences.map((exp) => {
                  const getIcon = () => {
                    if (exp.id === "1") return <Database className="w-5 h-5 text-blue-500 icon-float" />
                    if (exp.id === "2") return <Code2 className="w-5 h-5 text-purple-500 icon-pulse" />
                    if (exp.id === "3") return <ChefHat className="w-5 h-5 text-orange-500 icon-float" />
                    if (exp.id === "4") return <Users className="w-5 h-5 text-green-500 icon-pulse" />
                    return <Building2 className="w-5 h-5 text-primary icon-float" />
                  }
                  
                  const getDetails = () => {
                    if (exp.id === "1") return "Led multidisciplinary data team in designing and deploying 500TB+ scalable, secure geospatial mobile-ping analytics solution."
                    if (exp.id === "2") return "Designed architecture for custom blockchain network using Hyperledger Fabric and Smart Contracts for municipal applications."
                    if (exp.id === "3") return "Developed strong work ethic and customer service skills while transitioning to technical career."
                    if (exp.id === "4") return "International leadership experience managing cross-cultural teams and exchange programs."
                    return ""
                  }

                  const getLogo = () => {
                    if (exp.id === "1") return (
                      <Image
                        src="/images/UN_1.jpg"
                        alt="United Nations"
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                    )
                    if (exp.id === "2") return (
                      <Image
                        src="/images/SWRIL.png"
                        alt="Smart Waterloo Region Innovation Lab"
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-md object-cover bg-white p-1"
                      />
                    )
                    if (exp.id === "3") return (
                      <Image
                        src="/images/WFC.jpg"
                        alt="Williams Fresh Cafe"
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                    )
                    if (exp.id === "4") return (
                      <Image
                        src="/images/AIESEC.png"
                        alt="AIESEC"
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-md object-cover bg-white p-1"
                      />
                    )
                    return (
                      <div className="w-16 h-16 rounded-md bg-primary flex items-center justify-center text-white font-bold text-xs">
                        ORG
                      </div>
                    )
                  }

                  const getLogoStyle = () => {
                    if (exp.id === "1") return "bg-gradient-to-br from-blue-500/20 to-blue-400/10 border border-blue-500/20"
                    if (exp.id === "2") return "bg-gradient-to-br from-purple-500/20 to-purple-400/10 border border-purple-500/20"
                    if (exp.id === "3") return "bg-gradient-to-br from-orange-500/20 to-orange-400/10 border border-orange-500/20"
                    if (exp.id === "4") return "bg-gradient-to-br from-green-500/20 to-green-400/10 border border-green-500/20"
                    return "bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20"
                  }

                  // Special layout for Full Stack Software Engineer position - rendered separately
                  if (exp.id === "1") {
                    return null
                  }

                  // Regular layout for other positions
                  return (
                    <TimelineItem
                      key={exp.id}
                      details={getDetails()}
                      className="relative pl-12 before:absolute before:left-3 before:top-6 before:h-full before:w-px before:bg-gradient-to-b before:from-primary before:to-transparent"
                    >
                      <div className="absolute left-0 top-4 w-6 h-6 -translate-x-1/2 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        {getIcon()}
                      </div>
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className={`w-20 h-20 rounded-lg overflow-hidden shadow-md flex items-center justify-center ${getLogoStyle()}`}>
                          {getLogo()}
                        </div>
                        <div className="liquid-glass p-4 sm:p-5 lg:p-6 rounded-lg border backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 cyber-border group interactive-element flex-1">
                          <div className="space-y-3">
                            <div>
                              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{exp.position}</h3>
                              <p className="text-sm text-muted-foreground">
                                {exp.company} • {new Date(exp.startDate).getFullYear()} - {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
                              </p>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                            <div className="flex flex-wrap gap-2 pt-2">
                              {exp.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="inline-flex items-center rounded-md bg-secondary/50 hover:bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                              {exp.achievements.map((achievement, idx) => (
                                <li key={idx} className="flex items-start">
                                  <span className="mr-2 text-primary font-bold">•</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </TimelineItem>
                  )
                })}
              </div>
            </section>
          </div>
        </div>
        
        {/* Full Stack Software Engineer - Full Width Section */}
        <FullStackEngineerSection />
        
        {/* Resume container for remaining content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <section className="relative z-10">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Education</h2>
              <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
                <TimelineItem
                  details="Comprehensive mobile development program covering iOS, Android, and cross-platform frameworks with hands-on industry projects."
                  className="relative pl-12 before:absolute before:left-3 before:top-6 before:h-full before:w-px before:bg-gradient-to-b before:from-primary before:to-transparent"
                >
                  <div className="absolute left-0 top-4 w-6 h-6 -translate-x-1/2 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-5 h-5 text-primary icon-pulse" />
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center">
                      <Image
                        src="/images/Conestoga_College.png"
                        alt="Conestoga College"
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-md object-cover bg-white p-1"
                      />
                    </div>
                    <div className="liquid-glass p-6 rounded-lg border backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 cyber-border group interactive-element flex-1">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">Post Graduate Diploma in Mobile Solutions Development</h3>
                          <p className="text-sm text-muted-foreground">
                            Conestoga College, Waterloo • 2021 - 2023
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Specialized in mobile application development, focusing on iOS and Android platforms with modern frameworks and technologies.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          <span className="inline-flex items-center rounded-md bg-secondary/50 hover:bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors">iOS Development</span>
                          <span className="inline-flex items-center rounded-md bg-secondary/50 hover:bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors">Android Development</span>
                          <span className="inline-flex items-center rounded-md bg-secondary/50 hover:bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors">Cross-Platform</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TimelineItem>

                <TimelineItem
                  details="Computer science foundation with strong emphasis on algorithms, data structures, and software engineering principles."
                  className="relative pl-12 before:absolute before:left-3 before:top-6 before:h-full before:w-px before:bg-gradient-to-b before:from-primary before:to-transparent"
                >
                  <div className="absolute left-0 top-4 w-6 h-6 -translate-x-1/2 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Database className="w-5 h-5 text-blue-500 icon-float" />
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-blue-500/20 to-blue-400/10 border border-blue-500/20 flex items-center justify-center">
                      <Image
                        src="/images/GGSIPU.png"
                        alt="GGSIPU"
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-md object-cover bg-white p-1"
                      />
                    </div>
                    <div className="liquid-glass p-6 rounded-lg border backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 cyber-border group interactive-element flex-1">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">Bachelor of Computer Applications</h3>
                          <p className="text-sm text-muted-foreground">
                            GGSIPU, India • 2014 - 2019
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Comprehensive computer science education covering programming fundamentals, algorithms, and software development principles.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          <span className="inline-flex items-center rounded-md bg-secondary/50 hover:bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors">Programming</span>
                          <span className="inline-flex items-center rounded-md bg-secondary/50 hover:bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors">Algorithms</span>
                          <span className="inline-flex items-center rounded-md bg-secondary/50 hover:bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors">Software Engineering</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TimelineItem>

                <TimelineItem
                  details="Comprehensive Python programming course covering fundamentals, data structures, algorithms, and practical applications."
                  className="relative pl-12 before:absolute before:left-3 before:top-6 before:h-full before:w-px before:bg-gradient-to-b before:from-primary before:to-transparent"
                >
                  <div className="absolute left-0 top-4 w-6 h-6 -translate-x-1/2 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Code2 className="w-5 h-5 text-purple-500 icon-pulse" />
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-purple-500/20 to-purple-400/10 border border-purple-500/20 flex items-center justify-center">
                      <div className="w-16 h-16 bg-purple-600 rounded-md flex items-center justify-center text-white font-bold text-xl">
                        fCC
                      </div>
                    </div>
                    <div className="liquid-glass p-6 rounded-lg border backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 cyber-border group interactive-element flex-1">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">Python for Beginners</h3>
                          <p className="text-sm text-muted-foreground">
                            FreeCodeCamp • October 2025
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Completed comprehensive Python programming course covering fundamentals, OOP, data structures, and practical projects.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          <span className="inline-flex items-center rounded-md bg-secondary/50 hover:bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors">Python</span>
                          <span className="inline-flex items-center rounded-md bg-secondary/50 hover:bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors">Programming Fundamentals</span>
                          <span className="inline-flex items-center rounded-md bg-secondary/50 hover:bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors">Data Structures</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TimelineItem>

                <TimelineItem
                  details="Google-certified Android development program focusing on modern development practices and Material Design principles."
                  className="relative pl-12 before:absolute before:left-3 before:top-6 before:h-full before:w-px before:bg-gradient-to-b before:from-primary before:to-transparent"
                >
                  <div className="absolute left-0 top-4 w-6 h-6 -translate-x-1/2 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Award className="w-5 h-5 text-green-500 icon-pulse" />
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-green-500/20 to-green-400/10 border border-green-500/20 flex items-center justify-center">
                      <Image
                        src="/images/Google_1.png"
                        alt="Google"
                        width={64}
                        height={64}
                        className="w-16 h-16 rounded-md object-cover bg-white p-1"
                      />
                    </div>
                    <div className="liquid-glass p-6 rounded-lg border backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 cyber-border group interactive-element flex-1">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">Android Basics Nanodegree</h3>
                          <p className="text-sm text-muted-foreground">
                            Udacity (by Google) • 2017
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Google-certified program focusing on Android development fundamentals and best practices.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          <span className="inline-flex items-center rounded-md bg-secondary/50 hover:bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors">Android SDK</span>
                          <span className="inline-flex items-center rounded-md bg-secondary/50 hover:bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors">Material Design</span>
                          <span className="inline-flex items-center rounded-md bg-secondary/50 hover:bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors">Google Certified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TimelineItem>

              </div>
            </section>

            <section className="relative z-10">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Career Goals & Services</h2>
              <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
                <TimelineItem
                  details="Seeking challenging Technical/AI Solutions Architect roles that leverage AI-powered development methodologies and diverse technical skills."
                  className="relative pl-12 before:absolute before:left-3 before:top-6 before:h-full before:w-px before:bg-gradient-to-b before:from-primary before:to-transparent"
                >
                  <div className="absolute left-0 top-4 w-6 h-6 -translate-x-1/2 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Zap className="w-5 h-5 text-purple-500 icon-float" />
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-purple-500/20 to-purple-400/10 border border-purple-500/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-purple-500">CF</span>
                    </div>
                    <div className="liquid-glass p-6 rounded-lg border backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 cyber-border group interactive-element flex-1">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">Career Focus</h3>
                          <p className="text-sm text-muted-foreground">
                            Cloud Architect & AI Engineer • Open to new opportunities
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Seeking cloud architect and AI engineering roles where I can leverage my expertise in 
                          building scalable AWS infrastructure, AI-driven development, and rapid prototyping to 
                          solve complex technical challenges.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          <span className="inline-flex items-center rounded-md bg-secondary/50 hover:bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors">AI-Driven Development</span>
                          <span className="inline-flex items-center rounded-md bg-secondary/50 hover:bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors">Solutions Architecture</span>
                          <span className="inline-flex items-center rounded-md bg-secondary/50 hover:bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors">Technical Leadership</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TimelineItem>

                <TimelineItem
                  details="Available for consulting and contracting opportunities alongside current UN work, specializing in AI implementation and rapid prototyping."
                  className="relative pl-12 before:absolute before:left-3 before:top-6 before:h-full before:w-px before:bg-gradient-to-b before:from-primary before:to-transparent"
                >
                  <div className="absolute left-0 top-4 w-6 h-6 -translate-x-1/2 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Code2 className="w-5 h-5 text-cyan-500 icon-pulse" />
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-cyan-500/20 to-cyan-400/10 border border-cyan-500/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-cyan-500">CS</span>
                    </div>
                    <div className="liquid-glass p-6 rounded-lg border backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 cyber-border group interactive-element flex-1">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">Consulting Services</h3>
                          <p className="text-sm text-muted-foreground">
                            Available for technical consulting • $90-150/hour
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Available for consulting and contracting opportunities alongside current UN work, specializing in technical problem-solving and AI implementation.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          <span className="inline-flex items-center rounded-md bg-secondary/50 hover:bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors">Technical Consulting</span>
                          <span className="inline-flex items-center rounded-md bg-secondary/50 hover:bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors">AI Strategy</span>
                          <span className="inline-flex items-center rounded-md bg-secondary/50 hover:bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors">Rapid Prototyping</span>
                          <span className="inline-flex items-center rounded-md bg-secondary/50 hover:bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors">Data Pipelines</span>
                          <span className="inline-flex items-center rounded-md bg-secondary/50 hover:bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors">Automation</span>
                        </div>
                        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                          <li className="flex items-start">
                            <span className="mr-2 text-primary font-bold">•</span>
                            <span>Technical problem-solving consultation</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2 text-primary font-bold">•</span>
                            <span>AI implementation assessment and strategy</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2 text-primary font-bold">•</span>
                            <span>Rapid prototype development</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2 text-primary font-bold">•</span>
                            <span>Data pipeline architecture and development</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2 text-primary font-bold">•</span>
                            <span>AI-powered automation solutions</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TimelineItem>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}