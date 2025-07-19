import { Metadata } from "next"
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
    <div className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About Me</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              AI-Assisted Technical Solutions Architect solving complex problems in days, not weeks
            </p>
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

            <section>
              <h2 className="text-2xl font-bold tracking-tight">Experience</h2>
              <div className="mt-8 space-y-8">
                {experiences.map((exp) => (
                  <div key={exp.id} className="relative pl-8 before:absolute before:left-0 before:top-2 before:h-full before:w-px before:bg-border">
                    <div className="absolute left-0 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary" />
                    <div className="space-y-2">
                      <div>
                        <h3 className="text-lg font-semibold">{exp.position}</h3>
                        <p className="text-sm text-muted-foreground">
                          {exp.company} • {new Date(exp.startDate).getFullYear()} - {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">{exp.description}</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="mr-2 text-primary">•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight">Education</h2>
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Post Graduate Diploma in Mobile Solutions Development</h3>
                  <p className="text-sm text-muted-foreground">Conestoga College, Waterloo • 2023</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Specialized in mobile application development, focusing on iOS and Android platforms with modern frameworks and technologies.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Bachelor of Computer Applications</h3>
                  <p className="text-sm text-muted-foreground">GGSIPU, India • 2017</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Comprehensive computer science education covering programming fundamentals, algorithms, and software development principles.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Android Basics Nanodegree</h3>
                  <p className="text-sm text-muted-foreground">Udacity (by Google) • 2017</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Google-certified program focusing on Android development fundamentals and best practices.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight">Career Goals & Services</h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  Targeting Technical/AI Solutions Architect roles (125-150k+ CAD) focusing on challenging projects 
                  that utilize diverse technical skills and AI-assisted development methodologies. Open to both full-time 
                  opportunities and consulting arrangements.
                </p>
                <p>
                  Available for consulting and contracting opportunities alongside current UN work, specializing in:
                  Technical problem-solving consultation, AI implementation assessment and strategy, rapid prototype development, 
                  data pipeline architecture and development, and AI-assisted automation solutions.
                </p>
                <p>
                  <strong>Consulting Rate:</strong> $90-150/hour for specialized technical projects and AI implementation consulting.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}