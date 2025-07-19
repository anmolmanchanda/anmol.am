"use client"

import { useState } from "react"
import { Check, Zap, Brain, Rocket, ArrowRight, Calendar, Clock } from "lucide-react"
import Link from "next/link"

interface ServicePackage {
  id: string
  name: string
  price: string
  duration: string
  description: string
  features: string[]
  highlighted?: boolean
  icon: React.ReactNode
  gradient: string
  popular?: boolean
}

const servicePackages: ServicePackage[] = [
  {
    id: "assessment",
    name: "AI Implementation Assessment",
    price: "$90/hour",
    duration: "1-2 weeks",
    description: "Comprehensive evaluation of your current systems and AI implementation strategy",
    icon: <Brain className="w-6 h-6" />,
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "Current system analysis",
      "AI readiness assessment", 
      "Technology stack evaluation",
      "Implementation roadmap",
      "ROI projections",
      "Risk assessment"
    ]
  },
  {
    id: "rapid-prototype",
    name: "Rapid Prototype Development", 
    price: "$120/hour",
    duration: "1-3 weeks",
    description: "Fast-track development using AI-assisted methodologies for proof-of-concept solutions",
    icon: <Zap className="w-6 h-6" />,
    gradient: "from-purple-500 to-pink-500",
    popular: true,
    highlighted: true,
    features: [
      "AI-assisted development",
      "Rapid prototyping",
      "Cloud infrastructure setup",
      "Data pipeline creation",
      "Performance optimization",
      "Documentation included"
    ]
  },
  {
    id: "full-implementation",
    name: "Full Implementation & Architecture",
    price: "$150/hour", 
    duration: "1-3 months",
    description: "Complete enterprise-grade solution development with ongoing support and optimization",
    icon: <Rocket className="w-6 h-6" />,
    gradient: "from-green-500 to-emerald-500",
    features: [
      "Enterprise architecture design",
      "Full-scale implementation",
      "TB-scale data processing",
      "Team training & handover",
      "6-month support included",
      "Performance guarantees"
    ]
  }
]

export function ServicesSection() {
  const [selectedPackage, setSelectedPackage] = useState<string>("rapid-prototype")

  return (
    <section className="py-24 sm:py-32 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 quantum-border opacity-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="holographic">Consulting Services</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Expert AI-assisted technical solutions for your most complex challenges
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Available for new projects</span>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Service Packages */}
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {servicePackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`
                  relative rounded-2xl p-8 transition-all duration-300 cursor-pointer modern-card
                  ${selectedPackage === pkg.id 
                    ? 'glass-morphism neural-glow border-2 border-primary/50 scale-105' 
                    : 'bg-card/60 border border-border/50 hover:bg-card/80'
                  }
                  ${pkg.highlighted ? 'ring-2 ring-primary/30' : ''}
                `}
                onClick={() => setSelectedPackage(pkg.id)}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className={`
                  w-16 h-16 rounded-xl bg-gradient-to-r ${pkg.gradient} 
                  flex items-center justify-center text-white mb-6
                `}>
                  {pkg.icon}
                </div>

                {/* Package Info */}
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-primary">{pkg.price}</span>
                  <span className="text-sm text-muted-foreground">• {pkg.duration}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {pkg.description}
                </p>

                {/* Features */}
                <ul className="space-y-3">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${pkg.gradient} flex items-center justify-center flex-shrink-0`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="glass-morphism rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Technical Challenges?</h3>
              <p className="text-muted-foreground mb-6">
                Get started with a free 30-minute consultation to discuss your project requirements and timeline.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white font-semibold transition-all hover:scale-105 neural-glow group"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Free Consultation
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
                
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl border border-border bg-background/80 font-medium transition-all hover:bg-background micro-bounce"
                >
                  View Case Studies
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 pt-6 border-t border-border/50">
                <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>24h Response Time</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span>Days, Not Weeks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Satisfaction Guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}