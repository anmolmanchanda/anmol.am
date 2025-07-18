import { Metadata } from "next"
import { Experience } from "@/types"

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Anmol Manchanda - Full Stack Developer and Software Engineer",
}

const experiences: Experience[] = [
  {
    id: "1",
    company: "Tech Solutions Inc.",
    position: "Senior Full Stack Developer",
    startDate: "2022-01",
    description: "Lead developer for multiple client projects, focusing on modern web applications using React and Node.js",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    achievements: [
      "Led a team of 5 developers to deliver 3 major projects on time",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
      "Mentored junior developers and conducted code reviews"
    ]
  },
  {
    id: "2",
    company: "Digital Agency Co.",
    position: "Full Stack Developer",
    startDate: "2020-06",
    endDate: "2021-12",
    description: "Developed and maintained web applications for various clients in e-commerce and SaaS industries",
    technologies: ["Vue.js", "Python", "Django", "MySQL", "Docker"],
    achievements: [
      "Built a scalable e-commerce platform handling 100k+ daily users",
      "Optimized database queries improving performance by 40%",
      "Integrated third-party APIs for payment processing"
    ]
  },
  {
    id: "3",
    company: "StartUp Labs",
    position: "Junior Developer",
    startDate: "2019-01",
    endDate: "2020-05",
    description: "Worked on frontend and backend development for early-stage startup products",
    technologies: ["JavaScript", "React", "Express.js", "MongoDB"],
    achievements: [
      "Developed responsive user interfaces for web applications",
      "Participated in agile development processes",
      "Contributed to open-source projects"
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
              Passionate about building exceptional digital experiences
            </p>
          </div>

          <div className="mt-16 space-y-16">
            <section>
              <h2 className="text-2xl font-bold tracking-tight">Who I Am</h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  I&apos;m a Full Stack Developer with a passion for creating elegant solutions to complex problems. 
                  With over 5 years of experience in web development, I specialize in building modern, 
                  scalable applications using cutting-edge technologies.
                </p>
                <p>
                  My journey in tech began with a curiosity about how things work on the internet. 
                  This curiosity evolved into a career where I get to build the very experiences that 
                  sparked my interest. I believe in writing clean, maintainable code and creating 
                  user interfaces that are both beautiful and functional.
                </p>
                <p>
                  When I&apos;m not coding, you can find me exploring new technologies, contributing to 
                  open-source projects, or sharing my knowledge through blog posts and mentoring.
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
                  <h3 className="text-lg font-semibold">Bachelor of Science in Computer Science</h3>
                  <p className="text-sm text-muted-foreground">University Name • 2015 - 2019</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Focused on software engineering, algorithms, and web technologies. 
                    Graduated with honors and participated in various hackathons and coding competitions.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold tracking-tight">What I&apos;m Looking For</h2>
              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  I&apos;m interested in opportunities where I can work on challenging projects that make a real impact. 
                  I thrive in collaborative environments where innovation is encouraged and learning is continuous.
                </p>
                <p>
                  Whether it&apos;s building scalable architectures, creating intuitive user experiences, or solving 
                  complex technical challenges, I&apos;m always eager to take on projects that push the boundaries of 
                  what&apos;s possible with technology.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}