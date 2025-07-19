import Link from "next/link"
import { ArrowRight, Download, CheckCircle, Globe } from "lucide-react"
import { siteConfig } from "@/lib/config"

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5" />
      
      {/* Floating tech badges */}
      <div className="absolute inset-0 -z-5 pointer-events-none">
        <div className="absolute top-20 left-10 animate-float">
          <div className="bg-blue-100 dark:bg-blue-900/20 px-3 py-1 rounded-full text-xs font-medium text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            AWS Expert
          </div>
        </div>
        <div className="absolute top-32 right-16 animate-float-delay">
          <div className="bg-purple-100 dark:bg-purple-900/20 px-3 py-1 rounded-full text-xs font-medium text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            Claude AI
          </div>
        </div>
        <div className="absolute bottom-40 left-20 animate-float-delay-2">
          <div className="bg-green-100 dark:bg-green-900/20 px-3 py-1 rounded-full text-xs font-medium text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800">
            UN Certified
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Avatar Section */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-4 border-primary/10 shadow-2xl flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary">AM</span>
                  </div>
                </div>
                {/* Status indicator */}
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 shadow-lg animate-pulse">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                {/* Availability badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-100 dark:bg-green-900/20 px-4 py-1 rounded-full text-xs font-medium text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 shadow-sm">
                    Available for Consulting
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="animate-in text-4xl font-bold tracking-tight sm:text-6xl">
                Hi, I&apos;m <span className="text-primary">Anmol Manchanda</span>
              </h1>
              
              {/* UN Credential Badge */}
              <div className="animate-in mt-4 flex justify-center lg:justify-start" style={{ animationDelay: "0.05s" }}>
                <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg border border-blue-200 dark:border-blue-800">
                  <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Technical Solutions Engineer at United Nations</span>
                </div>
              </div>

              <p className="animate-in mt-6 text-lg leading-8 text-muted-foreground" style={{ animationDelay: "0.1s" }}>
                {siteConfig.title}. I solve complex technical problems in days, not weeks, using AI-assisted development.
              </p>
              
              {/* Key metrics */}
              <div className="animate-in mt-6 flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-muted-foreground" style={{ animationDelay: "0.12s" }}>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-primary">10+ TB</span>
                  <span>data processed monthly</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-primary">12</span>
                  <span>global cities served</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-primary">100+</span>
                  <span>automations created</span>
                </div>
              </div>

              <p className="animate-in mt-4 text-sm text-muted-foreground flex items-center justify-center lg:justify-start gap-1" style={{ animationDelay: "0.15s" }}>
                📍 Waterloo, Ontario, Canada
              </p>
              {/* Enhanced CTAs */}
              <div className="animate-in mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4" style={{ animationDelay: "0.2s" }}>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 group"
                >
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-4 text-base font-medium text-foreground shadow-sm transition-all hover:bg-secondary hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  View Case Studies
                </Link>
                <Link
                  href="/resume.pdf"
                  className="inline-flex items-center justify-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Link>
              </div>
            </div>
          </div>
        
        {/* Social Links */}
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