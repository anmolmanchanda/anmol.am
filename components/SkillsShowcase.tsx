"use client"

import { Skill } from "@/types"
import { useEffect, useRef, useState } from "react"

const skills: Skill[] = [
  // Cloud & Infrastructure
  { name: "AWS S3", level: "expert", category: "cloud" },
  { name: "AWS Glue", level: "expert", category: "cloud" },
  { name: "AWS EventBridge", level: "advanced", category: "cloud" },
  { name: "AWS Athena", level: "intermediate", category: "cloud" },
  { name: "AWS QuickSight", level: "intermediate", category: "cloud" },
  { name: "AWS Lambda", level: "advanced", category: "cloud" },
  { name: "AWS Step Functions", level: "advanced", category: "cloud" },
  { name: "CloudWatch", level: "intermediate", category: "cloud" },
  { name: "Terraform", level: "intermediate", category: "cloud" },
  { name: "Docker", level: "intermediate", category: "cloud" },
  
  // Languages & Libraries
  { name: "Python", level: "intermediate", category: "languages" },
  { name: "PySpark", level: "intermediate", category: "languages" },
  { name: "JSON", level: "advanced", category: "languages" },
  { name: "Pandas", level: "intermediate", category: "languages" },
  { name: "Boto3", level: "intermediate", category: "languages" },
  { name: "SQL/PostgreSQL", level: "expert", category: "languages" },
  { name: "HTML/CSS", level: "expert", category: "languages" },
  { name: "Java", level: "intermediate", category: "languages" },
  
  // AI & Development Tools
  { name: "Claude AI/Claude Code", level: "expert", category: "ai" },
  { name: "Cursor AI", level: "expert", category: "ai" },
  { name: "Windsurf AI", level: "expert", category: "ai" },
  { name: "Zed AI", level: "expert", category: "ai" },
  { name: "AWS Bedrock", level: "intermediate", category: "ai" },
  { name: "RAG/Embeddings", level: "intermediate", category: "ai" },
  { name: "MCP (Model Context Protocol)", level: "expert", category: "ai" },
  { name: "ChatGPT/OpenAI API", level: "expert", category: "ai" },
  { name: "Prompt Engineering", level: "expert", category: "ai" },
  { name: "LangChain", level: "intermediate", category: "ai" },
  { name: "Streamlit", level: "intermediate", category: "ai" },
  { name: "PyTorch", level: "intermediate", category: "ai" },
  { name: "Transformers", level: "intermediate", category: "ai" },
  
  // Other Tools
  { name: "GitHub/GitHub Actions", level: "expert", category: "tools" },
  { name: "Git", level: "advanced", category: "tools" },
  { name: "N8N.io", level: "advanced", category: "tools" },
  { name: "Postman", level: "advanced", category: "tools" },
  { name: "Figma", level: "advanced", category: "tools" },
  { name: "IAM Security", level: "expert", category: "tools" },
  { name: "Airtable", level: "expert", category: "tools" },
  { name: "Vercel", level: "advanced", category: "tools" },
  { name: "MongoDB", level: "intermediate", category: "tools" },
  
  // Mobile & Automation
  { name: "Apple Shortcuts", level: "expert", category: "mobile" },
  { name: "iOS Development", level: "advanced", category: "mobile" },
  { name: "Android Development", level: "advanced", category: "mobile" },
  { name: "Swift", level: "intermediate", category: "mobile" },
  { name: "Kotlin", level: "intermediate", category: "mobile" },
  
  // Web Development
  { name: "JavaScript", level: "advanced", category: "web" },
  { name: "TypeScript", level: "advanced", category: "web" },
  { name: "React", level: "advanced", category: "web" },
  { name: "Next.js", level: "advanced", category: "web" },
  { name: "Node.js", level: "advanced", category: "web" },
  { name: "Tailwind CSS", level: "advanced", category: "web" }
]

const categories = {
  cloud: "Cloud & Infrastructure",
  languages: "Languages & Libraries",
  ai: "AI & Development Tools",
  tools: "Other Tools",
  mobile: "Mobile & Automation",
  web: "Web Development"
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
      case 'expert': return 100  // Score 4
      case 'advanced': return 75  // Score 3
      case 'intermediate': return 50  // Score 2
      case 'beginner': return 25  // Score 1
      default: return 0
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return 'bg-gradient-to-r from-green-500 to-emerald-500'
      case 'advanced': return 'bg-gradient-to-r from-blue-500 to-cyan-500'
      case 'intermediate': return 'bg-gradient-to-r from-yellow-500 to-orange-500'
      case 'beginner': return 'bg-gradient-to-r from-gray-400 to-gray-500'
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