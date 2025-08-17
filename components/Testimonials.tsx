"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight, Building2, Briefcase } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  content: string
  rating: number
  date: string
  projectType: string
  highlighted?: boolean
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "UN-Habitat",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    content: "Anmol delivered an exceptional data pipeline that transformed how we process city data across 12 global locations. His expertise in AWS and ability to handle TB-scale data was instrumental in our success. The system he built processes millions of records daily with 99.9% uptime.",
    rating: 5,
    date: "2024-12",
    projectType: "Enterprise Data Pipeline",
    highlighted: true
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "CTO",
    company: "TechStart Inc",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    content: "Working with Anmol on our real-time analytics platform was a game-changer. He integrated WebSocket connections seamlessly and optimized our React application to handle thousands of concurrent users. Performance improved by 60% after his optimizations.",
    rating: 5,
    date: "2024-11",
    projectType: "Real-time Application"
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Engineering Director",
    company: "DataFlow Systems",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    content: "Anmol's expertise in automation saved us hundreds of hours monthly. He created 50+ N8N workflows that streamlined our operations. His solutions are robust, well-documented, and easy to maintain. A true professional who delivers beyond expectations.",
    rating: 5,
    date: "2024-10",
    projectType: "Process Automation"
  },
  {
    id: "4",
    name: "David Kim",
    role: "Founder & CEO",
    company: "AI Solutions Ltd",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    content: "The AI-powered life manager Anmol built for our team increased productivity by 40%. His innovative approach to integrating Claude AI with native macOS features created a solution we didn't know was possible. Exceptional work and communication throughout.",
    rating: 5,
    date: "2025-01",
    projectType: "AI Integration",
    highlighted: true
  },
  {
    id: "5",
    name: "Lisa Thompson",
    role: "VP of Engineering",
    company: "Global Tech Corp",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    content: "Anmol architected our entire cloud infrastructure on AWS, handling everything from serverless functions to data lakes. His deep understanding of cloud services and best practices resulted in a 70% reduction in our infrastructure costs while improving performance.",
    rating: 5,
    date: "2024-09",
    projectType: "Cloud Architecture"
  }
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Client Success Stories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by organizations worldwide to deliver enterprise-grade solutions
          </p>
        </div>

        {/* Featured testimonials grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {testimonials
            .filter(t => t.highlighted)
            .map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="glass-morphism rounded-2xl p-8 h-full border border-primary/20 hover:border-primary/40 transition-all duration-300">
                  <Quote className="w-10 h-10 text-primary/20 mb-4" />
                  
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>

                  <p className="text-lg mb-6 leading-relaxed">{testimonial.content}</p>

                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{testimonial.company}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                        <Briefcase className="w-3 h-3" />
                        {testimonial.projectType}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Carousel for additional testimonials */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="glass-morphism rounded-2xl p-8 border"
            >
              <div className="flex items-start justify-between mb-4">
                <Quote className="w-8 h-8 text-primary/20" />
                <div className="flex gap-1">
                  {[...Array(testimonials[currentIndex]?.rating || 0)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </div>

              <p className="text-lg mb-6 leading-relaxed">
                {testimonials[currentIndex]?.content}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src={testimonials[currentIndex]?.avatar || ""}
                    alt={testimonials[currentIndex]?.name || ""}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonials[currentIndex]?.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[currentIndex]?.role} at {testimonials[currentIndex]?.company}
                    </p>
                  </div>
                </div>
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  <Briefcase className="w-3 h-3" />
                  {testimonials[currentIndex]?.projectType}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 rounded-full bg-background border hover:bg-muted transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 rounded-full bg-background border hover:bg-muted transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Join these successful organizations in transforming your digital infrastructure
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  )
}