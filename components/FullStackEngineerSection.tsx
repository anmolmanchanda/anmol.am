import Image from "next/image"

interface Achievement {
  category: string
  percentage?: string
  items: string[]
}

export function FullStackEngineerSection() {
  const achievements: Achievement[] = [
    {
      category: "Cloud Architect & Data Engineer",
      percentage: "32.5%",
      items: [
        "Led a multidisciplinary data team in designing and deploying a 500TB+ scalable, secure geospatial mobile-ping analytics solution; built dashboards (Pandas, QuickSight) and AWS Glue–based PySpark pipelines"
      ]
    },
    {
      category: "Document & Technical Writer",
      percentage: "22.5%",
      items: [
        "Developed comprehensive technical documentation, including API endpoints, deployment prerequisites, and integration guidelines to align stakeholders on project milestones",
        "Contributed to technical diagrams, and maintained deliverables, enhancing the project's architecture and deployment planning",
        "Translated & communicated project specifications to non-technical team members & stakeholders"
      ]
    },
    {
      category: "Develop & Rapid Prototype",
      percentage: "15%",
      items: [
        "Drove rapid prototyping initiatives—leveraged AI development to accelerate major project delivery from idea to implementation in hours",
        "Reduced development cycles greatly through intelligent prompt engineering",
        "Developed many web apps: Geospatial product - visualized citizen movement patterns, built a web-based online tool for managing 100s of GBs of location data"
      ]
    },
    {
      category: "Integration",
      percentage: "10%",
      items: [
        "Orchestrated platform integrations (Cinchy.com) to expand service capabilities",
        "Worked with a B2B company, Cinchy to use their product as our centralized data network",
        "Completed Cinchy University and learned about their product",
        "Designed & maintained scalable database schemas for 12 cities ensuring real-time data synchronization for our QoL Impact website",
        "Developed & maintained Cinchy CQL queries, and tested them in the Cinchy Platform"
      ]
    },
    {
      category: "Scrum & Agile",
      percentage: "7.5%",
      items: [
        "Tracked tasks in daily stand-ups for all team members",
        "Created biweekly sprints reports and helped with sprint planning",
        "Created and maintained the financial budget of the project"
      ]
    },
    {
      category: "Test",
      percentage: "7.5%",
      items: [
        "Implemented GitHub Action workflows with automated testing using Cursor.AI and LLM model, Claude Sonnet 3.7"
      ]
    },
    {
      category: "Design",
      percentage: "5%",
      items: [
        "Design a wireframe and high fidelity prototype in Figma for my novel Indicator Science idea to showcase the science and process behind Quality of Life Initiative Indicators"
      ]
    }
  ]

  const keyAchievements = [
    "Contributed to a $20M project with projected expansion to $30–40M annually by 2026/2027",
    "Spearheading global scale-up: 50 cities in 2025, 300+ in 2026, and thousands beyond 2027",
    "Designed and deployed automated and scalable AWS infrastructure processing 500TB+ monthly using AWS Glue and PySpark",
    "Used advanced prompt engineering and Claude Code CLI for development with latest MCPs",
    "Used GitHub actions for CI/CD",
    "Deployed S3 buckets, created S3 Inventory and added lifecycle policies"
  ]

  // Additional achievements to include in the key achievements
  const additionalKeyAchievements = [
    "Reduced infrastructure costs by 80% ($10 to $2 per indicator/city/day) and Improved processing time by 85% from 6 hours to under 1 hour through resource optimization, parallel processing, reusability, and modularization for AWS Glue code",
    "Implemented least-privilege IAM policies, users & roles through AWS CLI and Console, improving security posture and audit readiness for permissions like S3 buckets and other AWS services",
    "Built serverless event-driven architectures using Lambda functions with python and added zip layers of libraries like Pandas, Step Functions with JSON, and EventBridge for automated Event-driven architecture",
    "Established infrastructure monitoring and alerting using CloudWatch and cost optimization strategies",
    "Leveraged state-of-the-art LLMs (Claude Opus 4.1, GPT-5 Thinking, Gemini 2.5 Pro) and code editors (Cursor.AI, WindSurf, Zed, Claude Code CLI) to prototype rapidly accelerating PoC turnaround significantly",
    "Sequential Thinking for structured problem-solving, Task Master AI for task management & organization, Brave Search for searching information"
  ]

  const technologies = ["AWS Glue", "PySpark", "Python", "Lambda", "EventBridge", "Step Functions", "Claude AI", "Cursor AI"]

  return (
    <div className="relative bg-gradient-to-b from-muted/30 via-muted/10 to-muted/30 py-16 my-12 -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start gap-8 mb-12">
          <div className="w-28 h-28 rounded-xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-500/20 to-blue-400/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
            <Image
              src="/images/UN_1.jpg"
              alt="United Nations"
              width={80}
              height={80}
              className="w-20 h-20 rounded-md object-cover"
            />
          </div>
          
          <div className="flex-1">
            <h3 className="text-3xl font-bold mb-2">Full Stack Software Engineer</h3>
            <p className="text-xl text-muted-foreground mb-4">
              United Nations-Habitat • 2024 - 2025
            </p>
            <p className="text-lg text-muted-foreground mb-6 max-w-4xl">
              Led multidisciplinary data team designing and deploying 500TB+ scalable, secure geospatial mobile-ping analytics solution for global cities
            </p>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-md bg-primary/10 hover:bg-primary/20 px-3 py-1.5 text-sm font-medium transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Key Achievements */}
        <div className="glass-morphism p-8 rounded-xl border backdrop-blur-md mb-8">
          <h4 className="text-2xl font-bold text-primary mb-6">Key Project Achievements</h4>
          <div className="grid md:grid-cols-2 gap-4">
            {[...keyAchievements, ...additionalKeyAchievements].map((achievement, idx) => (
              <div key={idx} className="flex items-start">
                <span className="mr-3 text-primary font-bold text-lg">•</span>
                <p className="text-base">{achievement}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Role Distribution */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {achievements.map((achievement) => (
            <div key={achievement.category} className="glass-morphism p-6 rounded-xl border backdrop-blur-md hover:shadow-lg transition-all">
              <div className="flex items-baseline justify-between mb-4">
                <h4 className="text-lg font-bold text-primary">{achievement.category}</h4>
                {achievement.percentage && (
                  <span className="text-2xl font-bold text-primary/80">{achievement.percentage}</span>
                )}
              </div>
              <div className="space-y-2">
                {achievement.items.map((item, idx) => (
                  <p key={idx} className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}