import { Metadata } from "next"
import Image from "next/image"
import { Building2, Smartphone, ChefHat, Users, GraduationCap, Code2, Database, Zap } from "lucide-react"
import { Experience } from "@/types"

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
                    src="/professional_headshot_avatar.JPG"
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
            <section>
              <h2 className="text-2xl font-bold tracking-tight">Who I Am</h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
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
                    if (exp.id === "1") return <Building2 className="w-5 h-5 text-blue-500" />
                    if (exp.id === "2") return <Code2 className="w-5 h-5 text-purple-500" />
                    if (exp.id === "3") return <ChefHat className="w-5 h-5 text-orange-500" />
                    if (exp.id === "4") return <Users className="w-5 h-5 text-green-500" />
                    return <Building2 className="w-5 h-5 text-primary" />
                  }
                  
                  return (
                    <div key={exp.id} className="relative pl-12 before:absolute before:left-3 before:top-6 before:h-full before:w-px before:bg-gradient-to-b before:from-primary before:to-transparent">
                      <div className="absolute left-0 top-4 w-6 h-6 -translate-x-1/2 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        {getIcon()}
                      </div>
                      <div className="glass-morphism p-6 rounded-lg border backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 cyber-border group">
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
                  )
                })}
              </div>
            </section>

            <section className="relative z-10">
              <h2 className="text-2xl font-bold tracking-tight">Education</h2>
              <div className="mt-6 space-y-6">
                <div className="glass-morphism p-6 rounded-lg border backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">Post Graduate Diploma in Mobile Solutions Development</h3>
                      <p className="text-sm text-muted-foreground font-medium">Conestoga College, Waterloo • 2023</p>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        Specialized in mobile application development, focusing on iOS and Android platforms with modern frameworks and technologies.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="glass-morphism p-6 rounded-lg border backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-2 rounded-lg bg-blue-500/10">
                      <Database className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">Bachelor of Computer Applications</h3>
                      <p className="text-sm text-muted-foreground font-medium">GGSIPU, India • 2017</p>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        Comprehensive computer science education covering programming fundamentals, algorithms, and software development principles.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="glass-morphism p-6 rounded-lg border backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-2 rounded-lg bg-green-500/10">
                      <Smartphone className="w-6 h-6 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">Android Basics Nanodegree</h3>
                      <p className="text-sm text-muted-foreground font-medium">Udacity (by Google) • 2017</p>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        Google-certified program focusing on Android development fundamentals and best practices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="relative z-10">
              <h2 className="text-2xl font-bold tracking-tight">Career Goals & Services</h2>
              <div className="mt-6 glass-morphism p-6 rounded-lg border backdrop-blur-md shadow-lg">
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-2 rounded-lg bg-purple-500/10">
                      <Zap className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Career Focus</h3>
                      <p className="leading-relaxed">
                        Targeting Technical/AI Solutions Architect roles (125-150k+ CAD) focusing on challenging projects 
                        that utilize diverse technical skills and AI-assisted development methodologies. Open to both full-time 
                        opportunities and consulting arrangements.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-2 rounded-lg bg-cyan-500/10">
                      <Code2 className="w-6 h-6 text-cyan-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Consulting Services</h3>
                      <p className="leading-relaxed mb-3">
                        Available for consulting and contracting opportunities alongside current UN work, specializing in:
                      </p>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center gap-2"><span className="text-primary">•</span> Technical problem-solving consultation</li>
                        <li className="flex items-center gap-2"><span className="text-primary">•</span> AI implementation assessment and strategy</li>
                        <li className="flex items-center gap-2"><span className="text-primary">•</span> Rapid prototype development</li>
                        <li className="flex items-center gap-2"><span className="text-primary">•</span> Data pipeline architecture and development</li>
                        <li className="flex items-center gap-2"><span className="text-primary">•</span> AI-assisted automation solutions</li>
                      </ul>
                      <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                        <p className="font-semibold text-foreground">Consulting Rate: $90-150/hour</p>
                        <p className="text-sm">For specialized technical projects and AI implementation consulting</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}