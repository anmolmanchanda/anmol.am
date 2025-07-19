import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Download, MapPin, Globe2 } from "lucide-react"
import { siteConfig } from "@/lib/config"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Jony Ive inspired minimal background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background/90" />
      
      {/* Refined floating elements - 5 total */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[15%] left-[8%] animate-float-faster">
          <div className="glass-morphism px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md">
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">AWS Expert</span>
          </div>
        </div>
        <div className="absolute top-[25%] right-[12%] animate-float-faster-delay">
          <div className="glass-morphism px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md">
            <span className="bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">Claude AI</span>
          </div>
        </div>
        <div className="absolute top-[45%] left-[5%] animate-float-faster-delay-2">
          <div className="glass-morphism px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md">
            <span className="bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">UN-Habitat</span>
          </div>
        </div>
        <div className="absolute bottom-[30%] right-[8%] animate-float-faster-delay-3">
          <div className="glass-morphism px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md">
            <span className="bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">AI-Assisted</span>
          </div>
        </div>
        <div className="absolute bottom-[45%] left-[15%] animate-float-faster-delay-4">
          <div className="glass-morphism px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md">
            <span className="bg-gradient-to-r from-cyan-600 to-cyan-500 bg-clip-text text-transparent">Data Pipeline</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
            
            {/* Avatar Section - Jony Ive minimalism */}
            <div className="flex-shrink-0 order-2 lg:order-1">
              <div className="relative group">
                <div className="w-64 h-64 rounded-full overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.1)] dark:shadow-[0_0_60px_rgba(255,255,255,0.05)] transition-all duration-700 group-hover:shadow-[0_0_80px_rgba(0,0,0,0.15)]">
                  <Image
                    src="/professional_headshot_avatar.JPG"
                    alt="Anmol Manchanda - Technical Solutions Architect"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover scale-110 transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </div>
                
                {/* Minimal status indicator */}
                <div className="absolute -bottom-3 -right-3">
                  <div className="w-8 h-8 rounded-full bg-green-500 border-4 border-background shadow-lg flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section - Pure minimalism */}
            <div className="flex-1 text-center lg:text-left space-y-8 order-1 lg:order-2">
              
              {/* Typography hierarchy - Jony Ive style */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-none">
                    <span className="block text-foreground">Hi, I&apos;m</span>
                    <span className="block">
                      <span className="text-foreground">Anmol</span>
                    </span>
                    <span className="block text-foreground/70 font-extralight">
                      Manchanda
                    </span>
                  </h1>
                </div>

                {/* Clean credential badge */}
                <div className="inline-flex items-center gap-3 glass-morphism px-6 py-3 rounded-full border backdrop-blur-md">
                  <Globe2 className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Technical Solutions Architect at UN-Habitat</span>
                </div>
              </div>

              {/* Essential description */}
              <p className="text-xl lg:text-2xl font-light leading-relaxed text-muted-foreground max-w-2xl">
                I solve complex technical problems in days, not weeks, using AI-assisted development.
              </p>

              {/* Location - minimal */}
              <div className="flex items-center justify-center lg:justify-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">{siteConfig.location}</span>
              </div>

              {/* Simplified CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-foreground text-background font-medium transition-all duration-300 hover:bg-foreground/90 hover:shadow-lg group min-w-[200px]"
                >
                  View Portfolio
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                
                <Link
                  href="/Anmol's Resume.pdf"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-border bg-background/50 backdrop-blur-sm font-medium transition-all duration-300 hover:bg-background hover:shadow-md min-w-[200px]"
                >
                  <Download className="mr-2 w-4 h-4" />
                  Resume
                </Link>
              </div>
            </div>
          </div>

          {/* Enhanced social links */}
          <div className="flex items-center justify-center gap-8 mt-20 pt-8 border-t border-border/30">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-medium text-foreground/70 hover:text-foreground transition-colors duration-300"
            >
              GitHub
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-medium text-foreground/70 hover:text-foreground transition-colors duration-300"
            >
              LinkedIn
            </a>
            <a
              href={siteConfig.links.email}
              className="text-base font-medium text-foreground/70 hover:text-foreground transition-colors duration-300"
            >
              Contact
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="text-base font-medium text-foreground/70 hover:text-foreground transition-colors duration-300"
            >
              Phone
            </a>
            <a
              href="/contact"
              className="text-base font-medium text-foreground/70 hover:text-foreground transition-colors duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}