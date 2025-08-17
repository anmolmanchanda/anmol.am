"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star, Quote, Building2, User } from "lucide-react"

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar?: string
  companyLogo?: string
  metrics?: string
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    role: "Technical Director",
    company: "UN-Habitat",
    content: "Anmol's AI-assisted development approach revolutionized our data processing capabilities. He transformed our TB-scale challenges into elegant, automated solutions that process data in hours instead of weeks.",
    rating: 5,
    metrics: "10+ TB processed monthly"
  },
  {
    id: "2", 
    name: "Michael Rodriguez",
    role: "Innovation Lead",
    company: "Smart Waterloo Region",
    content: "Working with Anmol was exceptional. His blockchain solutions and mobile applications exceeded expectations. He brings a unique combination of technical expertise and rapid execution that's rare in the industry.",
    rating: 5,
    metrics: "3 major projects delivered"
  },
  {
    id: "3",
    name: "Alex Thompson",
    role: "CTO",
    company: "TechVenture Solutions",
    content: "Anmol's automation expertise saved us countless hours. His 100+ custom automations transformed our workflows and demonstrated the true power of AI-assisted development. Highly recommend for any technical consulting needs.",
    rating: 5,
    metrics: "40% efficiency increase"
  },
  {
    id: "4",
    name: "Dr. Priya Sharma",
    role: "Data Science Manager", 
    company: "Global Analytics Corp",
    content: "The speed and quality of Anmol's work is impressive. He delivers complex technical solutions in days, not weeks, while maintaining enterprise-grade quality. His AI-assisted approach is the future of development.",
    rating: 5,
    metrics: "75% faster delivery"
  }
]

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Neural Network Background */}
      <div className="absolute inset-0 neural-network opacity-20" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Client <span className="holographic">Testimonials</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Trusted by organizations worldwide for AI-assisted technical solutions
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          {/* Main Testimonial Card */}
          <div className="relative">
            <div className="glass-morphism rounded-3xl p-8 md:p-12 modern-card neural-glow">
              {/* Quote Icon */}
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <Quote className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < (currentTestimonial?.rating || 0)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-lg md:text-xl leading-relaxed text-center mb-8 italic">
                &ldquo;{currentTestimonial?.content || ''}&rdquo;
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="text-center">
                  <div className="font-semibold">{currentTestimonial?.name || ''}</div>
                  <div className="text-sm text-muted-foreground">
                    {currentTestimonial?.role || ''}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Building2 className="w-3 h-3" />
                    {currentTestimonial?.company || ''}
                  </div>
                </div>
              </div>

              {/* Metrics */}
              {currentTestimonial?.metrics && (
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                    <span className="text-sm font-medium text-primary">
                      {currentTestimonial?.metrics}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-morphism flex items-center justify-center transition-all hover:scale-110 neural-glow"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-morphism flex items-center justify-center transition-all hover:scale-110 neural-glow"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">10+ TB</div>
              <div className="text-xs text-muted-foreground">Data Processed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-xs text-muted-foreground">Global Cities</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">100+</div>
              <div className="text-xs text-muted-foreground">Automations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">5★</div>
              <div className="text-xs text-muted-foreground">Client Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}