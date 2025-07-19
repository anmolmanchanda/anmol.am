import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import { siteConfig } from "@/lib/config"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="animate-in text-4xl font-bold tracking-tight sm:text-6xl">
            Hi, I&apos;m <span className="text-primary">Anmol Manchanda</span>
          </h1>
          <p className="animate-in mt-6 text-lg leading-8 text-muted-foreground" style={{ animationDelay: "0.1s" }}>
            {siteConfig.title} at United Nations. I solve complex technical problems in days, not weeks, using AI-assisted development.
          </p>
          <p className="animate-in mt-4 text-sm text-muted-foreground" style={{ animationDelay: "0.15s" }}>
            📍 Waterloo, Ontario, Canada
          </p>
          <div className="animate-in mt-10 flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: "0.2s" }}>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              View My Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/resume.pdf"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Link>
          </div>
          <div className="animate-in mt-16 flex items-center justify-center gap-x-6" style={{ animationDelay: "0.3s" }}>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <span className="text-muted-foreground">•</span>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-muted-foreground">•</span>
            <a
              href={siteConfig.links.email}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}