import { Skill } from "@/types"

const skills: Skill[] = [
  { name: "TypeScript", level: "expert", category: "frontend" },
  { name: "React", level: "expert", category: "frontend" },
  { name: "Next.js", level: "expert", category: "frontend" },
  { name: "Tailwind CSS", level: "advanced", category: "frontend" },
  { name: "Node.js", level: "advanced", category: "backend" },
  { name: "Python", level: "advanced", category: "backend" },
  { name: "PostgreSQL", level: "advanced", category: "database" },
  { name: "MongoDB", level: "intermediate", category: "database" },
  { name: "Docker", level: "intermediate", category: "devops" },
  { name: "AWS", level: "intermediate", category: "devops" },
  { name: "GraphQL", level: "intermediate", category: "backend" },
  { name: "Git", level: "expert", category: "other" }
]

const categories = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  devops: "DevOps",
  other: "Other"
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
            Technologies and tools I work with to build modern applications
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