import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Download, Cloud, Linkedin, Github } from "lucide-react"
import { ParallaxElement } from "@/components/InteractiveEffects"
import { Card3D, MagneticButton, AnimatedText } from "@/components/DrribbleInspiredFeatures"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced futuristic gradient background with animated mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
      <div className="absolute inset-0 bg-gradient-to-tl from-violet-500/10 via-transparent to-cyan-500/10 animate-pulse" />
      <div className="absolute inset-0 ai-grid" />
      
      {/* Floating geometric elements for depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-2 h-2 bg-blue-500 rounded-full animate-pulse opacity-60" />
        <div className="absolute top-[20%] right-[15%] w-1 h-1 bg-purple-500 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-[15%] left-[10%] w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse opacity-50" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[60%] right-[5%] w-1 h-1 bg-violet-500 rounded-full animate-pulse opacity-30" style={{ animationDelay: '0.5s' }} />
      </div>
      
      {/* Enhanced floating tech bubbles - responsive and mobile-optimized */}
      <ParallaxElement speed="slow" className="absolute inset-0 pointer-events-none hidden sm:block">
        <div className="absolute top-[8%] left-[3%] animate-float-faster">
          <div className="glass-morphism cyber-border px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-medium border backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow quantum-glow">
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent font-semibold">AWS Expert</span>
          </div>
        </div>
        <div className="absolute top-[12%] right-[8%] animate-float-faster-delay">
          <div className="glass-morphism cyber-border px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-medium border backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow quantum-glow">
            <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 bg-clip-text text-transparent font-semibold">Claude AI</span>
          </div>
        </div>
        <div className="absolute top-[25%] left-[2%] animate-float-faster-delay-2 hidden md:block">
          <div className="glass-morphism cyber-border px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-medium border backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow quantum-glow">
            <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent font-semibold">UN-Habitat</span>
          </div>
        </div>
        <div className="absolute top-[35%] right-[5%] animate-float-faster-delay-3 hidden lg:block">
          <div className="glass-morphism cyber-border px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-medium border backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow quantum-glow">
            <span className="bg-gradient-to-r from-indigo-600 via-violet-500 to-purple-500 bg-clip-text text-transparent font-semibold">AI-Powered</span>
          </div>
        </div>
        <div className="absolute top-[45%] left-[8%] animate-float-faster-delay-4 hidden lg:block">
          <div className="glass-morphism cyber-border px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs font-medium border backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow quantum-glow">
            <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-blue-500 bg-clip-text text-transparent font-semibold">Data Pipeline</span>
          </div>
        </div>
        <div className="absolute top-[55%] right-[12%] animate-float-faster-delay-5">
          <div className="glass-morphism cyber-border px-4 py-2 rounded-full text-xs font-medium border backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow quantum-glow">
            <span className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent font-semibold">10+ TB Data</span>
          </div>
        </div>
        <div className="absolute top-[18%] left-[25%] animate-float-faster-delay-6">
          <div className="glass-morphism cyber-border px-4 py-2 rounded-full text-xs font-medium border backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow quantum-glow">
            <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 bg-clip-text text-transparent font-semibold">Automation</span>
          </div>
        </div>
        <div className="absolute top-[40%] right-[25%] animate-float-faster-delay-7">
          <div className="glass-morphism cyber-border px-4 py-2 rounded-full text-xs font-medium border backdrop-blur-md shadow-lg hover:shadow-xl transition-shadow quantum-glow">
            <span className="bg-gradient-to-r from-teal-600 via-cyan-500 to-blue-500 bg-clip-text text-transparent font-semibold">Enterprise</span>
          </div>
        </div>
      </ParallaxElement>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16 xl:gap-20">
            
            {/* Avatar Section - Enhanced with 3D effect */}
            <div className="flex-shrink-0 order-2 lg:order-1 lg:-mt-8">
              <Card3D className="relative group" glowColor="primary">
                <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.1)] dark:shadow-[0_0_60px_rgba(255,255,255,0.05)] transition-all duration-700 group-hover:shadow-[0_0_80px_rgba(0,0,0,0.15)] neural-glow">
                  <Image
                    src="/images/home_avatar.png"
                    alt="Anmol Manchanda - Technical Solutions Architect"
                    width={256}
                    height={256}
                    className="w-full h-full object-cover scale-110 transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </div>
                
              </Card3D>
            </div>

            {/* Content Section - Pure minimalism */}
            <div className="flex-1 text-center lg:text-left space-y-8 order-1 lg:order-2">
              
              {/* Typography hierarchy - Jony Ive style */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-none">
                    <AnimatedText text="Hi, I'm" className="block text-foreground" delay={0} />
                    <span className="block">
                      <AnimatedText text="Anmol" className="text-foreground" delay={0.3} />
                    </span>
                    <AnimatedText text="Manchanda" className="block text-foreground/70 font-extralight" delay={0.6} />
                  </h1>
                </div>

                {/* Clean credential badge */}
                <div className="inline-flex items-center gap-3 glass-morphism px-6 py-3 rounded-full border-2 border-primary/20 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300">
                  <Cloud className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Cloud Architect & AI Engineer</span>
                </div>
              </div>

              {/* Essential description */}
              <p className="text-lg sm:text-xl lg:text-2xl font-light leading-relaxed text-muted-foreground max-w-2xl">
                From 500TB+ cloud architectures to AI-driven innovation - Engineering at scale
              </p>


              {/* Enhanced CTAs with magnetic effect */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 lg:-ml-48">
                <MagneticButton className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-foreground text-background font-medium transition-all duration-300 hover:bg-foreground/90 hover:shadow-lg group w-full sm:w-auto sm:min-w-[200px] min-h-[44px] cyber-border futuristic-gradient">
                  <Link href="/projects" className="flex items-center">
                    View Portfolio
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </MagneticButton>
                
                <MagneticButton className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-foreground text-background font-medium transition-all duration-300 hover:bg-foreground/90 hover:shadow-lg group w-full sm:w-auto sm:min-w-[200px] min-h-[44px] cyber-border futuristic-gradient">
                  <Link href="/Resume_24.10.25.pdf" className="flex items-center">
                    <Download className="mr-2 w-4 h-4" />
                    Resume
                  </Link>
                </MagneticButton>
                
                <MagneticButton className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-foreground text-background font-medium transition-all duration-300 hover:bg-foreground/90 hover:shadow-lg group w-full sm:w-auto sm:min-w-[200px] min-h-[44px] cyber-border futuristic-gradient">
                  <Link href="https://www.linkedin.com/in/anmolmanchanda/" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Linkedin className="mr-2 w-4 h-4" />
                    LinkedIn
                  </Link>
                </MagneticButton>
                
                <MagneticButton className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-foreground text-background font-medium transition-all duration-300 hover:bg-foreground/90 hover:shadow-lg group w-full sm:w-auto sm:min-w-[200px] min-h-[44px] cyber-border futuristic-gradient">
                  <Link href="https://github.com/anmolmanchanda" target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Github className="mr-2 w-4 h-4" />
                    GitHub
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}