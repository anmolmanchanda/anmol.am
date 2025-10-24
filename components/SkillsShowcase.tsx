"use client"

import { Skill } from "@/types"
import { useEffect, useRef, useState } from "react"

const skills: Skill[] = [
  { name: "Python", level: "expert", category: "programming" },
  { name: "JavaScript", level: "advanced", category: "programming" },
  { name: "Java", level: "intermediate", category: "programming" },
  { name: "Swift", level: "advanced", category: "programming" },
  { name: "Kotlin", level: "advanced", category: "programming" },
  { name: "Go", level: "intermediate", category: "programming" },
  { name: "HTML/CSS", level: "advanced", category: "programming" },
  { name: "Node.js", level: "advanced", category: "programming" },
  { name: "AWS Glue", level: "expert", category: "cloud" },
  { name: "AWS Lambda", level: "expert", category: "cloud" },
  { name: "AWS EventBridge", level: "advanced", category: "cloud" },
  { name: "AWS Step Functions", level: "advanced", category: "cloud" },
  { name: "PySpark", level: "expert", category: "cloud" },
  { name: "GitHub Actions", level: "advanced", category: "cloud" },
  { name: "Claude AI", level: "expert", category: "ai" },
  { name: "ChatGPT", level: "expert", category: "ai" },
  { name: "Cursor AI", level: "expert", category: "ai" },
  { name: "Claude Code CLI", level: "expert", category: "ai" },
  { name: "Prompt Engineering", level: "expert", category: "ai" },
  { name: "Figma", level: "advanced", category: "design" },
  { name: "Apple Shortcuts", level: "expert", category: "automation" },
  { name: "N8N.io", level: "advanced", category: "automation" }
]

const categories = {
  programming: "Programming Languages",
  cloud: "Cloud & Infrastructure", 
  ai: "AI & Development Tools",
  design: "Design & Automation",
  automation: "Workflow Automation"
}

export function SkillsShowcase() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category]?.push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const getLevelWidth = (level: string) => {
    switch (level) {
      case 'expert': return 75
      case 'advanced': return 60
      case 'intermediate': return 45
      default: return 25
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return 'bg-gradient-to-r from-green-500 to-emerald-500'
      case 'advanced': return 'bg-gradient-to-r from-blue-500 to-cyan-500'
      case 'intermediate': return 'bg-gradient-to-r from-yellow-500 to-orange-500'
      default: return 'bg-gradient-to-r from-gray-400 to-gray-500'
    }
  }

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Technical Skills</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Real technologies I use for AI-powered development and enterprise solutions
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
              <div 
                key={category} 
                className={`rounded-lg border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300 animate-on-scroll ${isVisible ? 'visible' : ''}`}
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                <h3 className="text-lg font-semibold mb-6 text-primary">{categories[category as keyof typeof categories]}</h3>
                <div className="space-y-4">
                  {categorySkills.map((skill, skillIndex) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium flex items-center gap-2">
                          {skill.name}
                          {skill.level === 'expert' && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              Expert
                            </span>
                          )}
                        </span>
                        <span className="text-xs text-muted-foreground capitalize">{skill.level}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getLevelColor(skill.level)} skill-bar rounded-full`}
                          style={{
                            width: isVisible ? `${getLevelWidth(skill.level)}%` : '0%',
                            transitionDelay: `${(categoryIndex * 0.1) + (skillIndex * 0.05)}s`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}