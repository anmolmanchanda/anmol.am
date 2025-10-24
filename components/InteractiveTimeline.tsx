"use client"

import { useState } from "react"
import { GraduationCap, Rocket, Database, Zap, Award } from "lucide-react"

interface TimelineEvent {
  id: string
  year: string
  title: string
  company: string
  description: string
  icon: React.ReactNode
  color: string
  achievements: string[]
  technologies?: string[]
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "1",
    year: "2024-2025",
    title: "Full Stack Software Engineer",
    company: "United Nations-Habitat",
    description: "Led multidisciplinary data team designing and deploying 500TB+ scalable, secure geospatial mobile-ping analytics solution for global cities",
    icon: <Database className="w-5 h-5" />,
    color: "bg-blue-500",
    achievements: [
      "Contributed to $20M project with projected expansion to $30-40M annually by 2026/2027",
      "Spearheaded global scale-up: 50 cities in 2025, 300+ in 2026, and thousands beyond 2027",
      "Reduced infrastructure costs by 80% ($10 to $2 per indicator/city/day) through optimization",
      "Designed and deployed scalable AWS infrastructure processing 500TB+ monthly using AWS Glue and PySpark",
      "Leveraged LLMs (Claude Opus 4.1, GPT-5) and code editors (Cursor AI, WindSurf, Zed) for rapid prototyping",
      "Drove AI development initiatives to accelerate project delivery from idea to implementation",
      "Developed comprehensive technical documentation and maintained scalable database schemas",
      "Orchestrated platform integrations (Cinchy.com) and implemented GitHub Action workflows with automated testing"
    ],
    technologies: ["AWS Glue", "PySpark", "Python", "Lambda", "EventBridge", "Step Functions", "Claude AI", "Cursor AI", "GitHub Actions"]
  },
  {
    id: "2", 
    year: "Feb 2024 - Jun 2024",
    title: "Hyperledger Fabric Architect & Mobile Developer",
    company: "Region of Waterloo - Smart Waterloo Region Innovation Lab",
    description: "Designed architecture for custom blockchain network using Hyperledger Fabric and Smart Contracts for municipal applications",
    icon: <Rocket className="w-5 h-5" />,
    color: "bg-purple-500",
    achievements: [
      "Designed architecture for custom blockchain network using Hyperledger Fabric and Smart Contracts",
      "Built proof-of-concept implementation using Docker containerization",
      "Explored consensus mechanisms and developed the iOS app in Xcode using Swift",
      "Wireframed & designed the iOS app in Figma",
      "Used Node.js, Go, YAML and XML"
    ],
    technologies: ["Hyperledger Fabric", "Smart Contracts", "Docker", "Swift", "Node.js", "Go", "YAML", "XML", "Figma"]
  },
  {
    id: "3",
    year: "2021 - 2023",
    title: "Post Graduate Diploma",
    company: "Conestoga College, Waterloo",
    description: "Mobile Solutions Development with focus on iOS and Android platforms",
    icon: <GraduationCap className="w-5 h-5" />,
    color: "bg-green-500",
    achievements: [
      "Specialized in mobile application development",
      "Mastered iOS and Android frameworks",
      "Built foundation for AI-assisted development"
    ]
  },
  {
    id: "4",
    year: "2014 - 2019",
    title: "Bachelors in Computer Applications",
    company: "Guru Gobind Singh Indraprastha University, India",
    description: "Comprehensive computer science education with focus on programming fundamentals and software development",
    icon: <GraduationCap className="w-5 h-5" />,
    color: "bg-orange-500",
    achievements: [
      "Strong foundation in computer science principles",
      "Programming fundamentals and algorithms", 
      "Software development best practices"
    ]
  },
  {
    id: "5",
    year: "2017",
    title: "Android Basics Nanodegree",
    company: "Udacity by Google",
    description: "Google-certified Android development fundamentals and best practices",
    icon: <Award className="w-5 h-5" />,
    color: "bg-green-500",
    achievements: [
      "Completed Android development fundamentals",
      "Built multiple Android applications",
      "Learned Material Design principles",
      "Mastered Android Studio and development tools"
    ]
  }
]

export function InteractiveTimeline() {
  const [selectedEvent, setSelectedEvent] = useState<string>(timelineEvents[0]?.id || '')

  const selectedEventData = timelineEvents.find(event => event.id === selectedEvent)

  return (
    <section className="py-24 sm:py-32 relative">
      {/* AI Grid Background */}
      <div className="absolute inset-0 ai-grid opacity-30" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="holographic">Career Journey</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From foundations to AI-assisted innovation at the United Nations
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500" />
              
              <div className="space-y-8">
                {timelineEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`relative flex items-center cursor-pointer transition-all duration-300 ${
                      selectedEvent === event.id ? 'scale-105' : 'hover:scale-102'
                    }`}
                    onClick={() => setSelectedEvent(event.id)}
                  >
                    {/* Timeline dot */}
                    <div className={`
                      relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 border-background
                      ${event.color} ${selectedEvent === event.id ? 'neural-glow' : ''}
                      transition-all duration-300
                    `}>
                      <div className="text-white">
                        {event.icon}
                      </div>
                    </div>

                    {/* Timeline content */}
                    <div className={`
                      ml-6 p-4 rounded-xl border transition-all duration-300
                      ${selectedEvent === event.id 
                        ? 'bg-card/80 glass-morphism border-primary/50 shadow-lg' 
                        : 'bg-card/60 border-border/50 hover:bg-card/80'
                      }
                    `}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-primary">{event.year}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{event.company}</span>
                      </div>
                      <h3 className="font-semibold text-sm">{event.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Event Details */}
            {selectedEventData && (
              <div className="sticky top-8">
                <div className="glass-morphism rounded-2xl p-8 modern-card">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`
                      flex items-center justify-center w-12 h-12 rounded-xl 
                      ${selectedEventData.color} text-white
                    `}>
                      {selectedEventData.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{selectedEventData.title}</h3>
                      <p className="text-muted-foreground">{selectedEventData.company}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {selectedEventData.description}
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-2">
                        {selectedEventData.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {selectedEventData.technologies && (
                      <div>
                        <h4 className="font-semibold mb-3">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedEventData.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}