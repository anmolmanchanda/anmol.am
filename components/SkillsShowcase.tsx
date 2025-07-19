import { Skill } from "@/types"

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
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <section className="py-24 sm:py-32 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Technical Skills</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Real technologies I use for AI-assisted development and enterprise solutions
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category} className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold mb-4">{categories[category as keyof typeof categories]}</h3>
                <div className="space-y-3">
                  {categorySkills.map((skill) => (
                    <div key={skill.name} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <div className="flex gap-1">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 w-8 rounded-full ${
                              i < (skill.level === 'expert' ? 4 : skill.level === 'advanced' ? 3 : skill.level === 'intermediate' ? 2 : 1)
                                ? 'bg-primary'
                                : 'bg-muted'
                            }`}
                          />
                        ))}
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