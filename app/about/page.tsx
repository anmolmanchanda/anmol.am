import { Metadata } from "next"
import Image from "next/image"
import { Building2, Smartphone, ChefHat, Users, GraduationCap, Code2, Database, Zap } from "lucide-react"
import { Experience } from "@/types"
import { TimelineItem } from "@/components/InteractiveEffects"

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Anmol Manchanda - AI-Assisted Technical Solutions Architect at United Nations",
}

const experiences: Experience[] = [
  {
    id: "1",
    company: "United Nations (UN-Habitat/UNOPS)",
    position: "Software Engineer (Integration)",
    startDate: "2024-06",
    description: "Building TB-scale data processing pipeline for 12 global cities, pioneering AI-assisted development approach within UN technical teams",
    technologies: ["AWS", "Glue", "Lambda", "EventBridge", "Step Functions", "PySpark", "Python"],
    achievements: [
      "Built TB-scale data processing pipeline for 12 global cities",
      "Pioneered AI-assisted development approach within UN technical teams",
      "Architected enterprise-grade AWS infrastructure handling 10+ TB monthly data volume"
    ]
  },
  {
    id: "2",
    company: "Smart Waterloo Region Innovation Lab",
    position: "Blockchain Engineer & Mobile App Developer",
    startDate: "2024-02",
    endDate: "2024-06",
    description: "Developed blockchain solutions and mobile applications for regional innovation initiatives",
    technologies: ["Blockchain", "Swift", "Kotlin", "JavaScript", "Mobile Development"],
    achievements: [
      "Built mobile applications for regional innovation projects",
      "Implemented blockchain solutions for secure data management",
      "Collaborated with regional stakeholders on technology initiatives"
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
      {/* Aurora background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
      <div className="absolute inset-0 bg-gradient-to-tl from-violet-500/10 via-transparent to-cyan-500/10 animate-pulse" />
      <div className="absolute inset-0 ai-grid" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          {/* Header with photo */}
          <div className="text-center relative z-10">
            <div className="flex flex-col items-center mb-8">
              <div className="relative group mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all duration-700 group-hover:shadow-[0_0_60px_rgba(0,0,0,0.15)] neural-glow">
                  <Image
                    src="/images/professional_headshot_avatar.JPG"
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
                AI-Assisted Technical Solutions Architect solving complex problems in days, not weeks
              </p>
            </div>
          </div>

          <div className="mt-16 space-y-16">
            <section className="relative z-10">
              <h2 className="text-2xl font-bold tracking-tight">Who I Am</h2>
              <div className="mt-6 space-y-4 text-foreground">
                <p>
                  Technical Solutions Architect with expertise in AI-assisted development, data engineering, and rapid prototyping. 
                  Proven ability to solve complex technical challenges across multiple domains using modern AI tools and cloud infrastructure, 
                  with experience managing TB-scale data pipelines for global initiatives.
                </p>
                <p>
                  Started with mobile development education, gained diverse experience through hospitality work and volunteer leadership, 
                  then transitioned into technical roles combining data engineering, AI-assisted development, and solutions architecture. 
                  Known for pioneering AI-assisted development approaches and creating efficient automation solutions.
                </p>
                <p>
                  Core values include continuous learning and adaptation, creative problem-solving with AI assistance, 
                  efficiency through intelligent automation, and maintaining work-life balance. Possess unique abilities 
                  including hyperphantasia and eidetic memory for rapid problem-solving.
                </p>
              </div>
            </section>

            <section className="relative z-10">
              <h2 className="text-2xl font-bold tracking-tight">Experience</h2>
              <div className="mt-8 space-y-8">
                {experiences.map((exp) => {
                  const getIcon = () => {
                    if (exp.id === "1") return <Building2 className="w-5 h-5 text-blue-500 icon-float" />
                    if (exp.id === "2") return <Code2 className="w-5 h-5 text-purple-500 icon-pulse" />
                    if (exp.id === "3") return <ChefHat className="w-5 h-5 text-orange-500 icon-float" />
                    if (exp.id === "4") return <Users className="w-5 h-5 text-green-500 icon-pulse" />
                    return <Building2 className="w-5 h-5 text-primary icon-float" />
                  }
                  
                  const getDetails = () => {
                    if (exp.id === "1") return "Leading technical innovation at UN-Habitat, building scalable data infrastructure for global urban development initiatives."
                    if (exp.id === "2") return "Pioneered blockchain solutions for regional innovation, collaborating with government stakeholders and tech startups."
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

                  return (
                    <TimelineItem
                      key={exp.id}
                      details={getDetails()}
                      className="relative pl-12 before:absolute before:left-3 before:top-6 before:h-full before:w-px before:bg-gradient-to-b before:from-primary before:to-transparent"
                    >
                      <div className="absolute left-0 top-4 w-6 h-6 -translate-x-1/2 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        {getIcon()}
                      </div>
                      <div className="flex items-start gap-4">
                        <div className={`w-20 h-20 rounded-lg overflow-hidden shadow-md flex items-center justify-center ${getLogoStyle()}`}>
                          {getLogo()}
                        </div>
                        <div className="liquid-glass p-6 rounded-lg border backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 cyber-border group interactive-element flex-1">
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

            <section className="relative z-10">
              <h2 className="text-2xl font-bold tracking-tight">Education</h2>
              <div className="mt-8 space-y-8">
                <TimelineItem
                  details="Comprehensive mobile development program covering iOS, Android, and cross-platform frameworks with hands-on industry projects."
                  className="relative pl-12 before:absolute before:left-3 before:top-6 before:h-full before:w-px before:bg-gradient-to-b before:from-primary before:to-transparent"
                >
                  <div className="absolute left-0 top-4 w-6 h-6 -translate-x-1/2 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-5 h-5 text-primary icon-pulse" />
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center">
                      <Image
                        src="/images/Conestoga_College.png"
                        alt="Conestoga College"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-md object-cover bg-white p-1"
                      />
                    </div>
                    <div className="liquid-glass p-6 rounded-lg border backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 cyber-border group interactive-element flex-1">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">Post Graduate Diploma in Mobile Solutions Development</h3>
                          <p className="text-sm text-muted-foreground">
                            Conestoga College, Waterloo • 2023
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
                    <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-blue-500/20 to-blue-400/10 border border-blue-500/20 flex items-center justify-center">
                      <Image
                        src="/images/GGSIPU.png"
                        alt="GGSIPU"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-md object-cover bg-white p-1"
                      />
                    </div>
                    <div className="liquid-glass p-6 rounded-lg border backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 cyber-border group interactive-element flex-1">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">Bachelor of Computer Applications</h3>
                          <p className="text-sm text-muted-foreground">
                            GGSIPU, India • 2017
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
                  details="Google-certified Android development program focusing on modern development practices and Material Design principles."
                  className="relative pl-12 before:absolute before:left-3 before:top-6 before:h-full before:w-px before:bg-gradient-to-b before:from-primary before:to-transparent"
                >
                  <div className="absolute left-0 top-4 w-6 h-6 -translate-x-1/2 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Smartphone className="w-5 h-5 text-green-500 icon-pulse" />
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-green-500/20 to-green-400/10 border border-green-500/20 flex items-center justify-center">
                      <Image
                        src="/images/Google_1.png"
                        alt="Google"
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-md object-cover bg-white p-1"
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
              <h2 className="text-2xl font-bold tracking-tight">Career Goals & Services</h2>
              <div className="mt-8 space-y-8">
                <TimelineItem
                  details="Seeking challenging Technical/AI Solutions Architect roles that leverage AI-assisted development methodologies and diverse technical skills."
                  className="relative pl-12 before:absolute before:left-3 before:top-6 before:h-full before:w-px before:bg-gradient-to-b before:from-primary before:to-transparent"
                >
                  <div className="absolute left-0 top-4 w-6 h-6 -translate-x-1/2 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Zap className="w-5 h-5 text-purple-500 icon-float" />
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-purple-500/20 to-purple-400/10 border border-purple-500/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-purple-500">CF</span>
                    </div>
                    <div className="liquid-glass p-6 rounded-lg border backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 cyber-border group interactive-element flex-1">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">Career Focus</h3>
                          <p className="text-sm text-muted-foreground">
                            Technical/AI Solutions Architect • 125-150k+ CAD
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Targeting Technical/AI Solutions Architect roles focusing on challenging projects 
                          that utilize diverse technical skills and AI-assisted development methodologies. Open to both full-time 
                          opportunities and consulting arrangements.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                          <span className="inline-flex items-center rounded-md bg-secondary/50 hover:bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground transition-colors">AI-Assisted Development</span>
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
                    <div className="w-12 h-12 rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-cyan-500/20 to-cyan-400/10 border border-cyan-500/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-cyan-500">CS</span>
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
                            <span>AI-assisted automation solutions</span>
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