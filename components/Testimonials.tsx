"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote, ChevronLeft, ChevronRight, Briefcase } from "lucide-react"
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
    name: "Grayson Bass",
    role: "Innovation Advisor & Project Manager",
    company: "Direct Manager",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grayson",
    content: "I have worked with Anmol in two different roles. He was one of the last hires I made in one role and one of the first hires I made in the other. Anmol is a consistently reliable, honorable, and effective team member. He jumps in and tackles any challenge. In less than 2 months, he built a data pipeline and scaled up to data engineering. His work powered incredible insights and a plug and play tool for analyzing large mobile ping data sets. If I move to a third role, he would definitely be on my list to recruit.",
    rating: 5,
    date: "2024",
    projectType: "Data Engineering & Leadership",
    highlighted: true
  },
  {
    id: "2",
    name: "Salman Naqvi",
    role: "Senior Infrastructure Security and Backend Engineer",
    company: "UN-Habitat Team",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Salman",
    content: "Over the 12 months that I worked with Anmol, I was consistently amazed by his ability to leverage emerging technologies, especially AI, to accomplish tasks I didn't think were possible in such short timeframes. In particular, over a three-month period, he built a 500 TB data processing pipeline in AWS using AWS Glue, a project that would typically take an experienced data scientist 12 to 18 months to complete. He did this without any previous AWS or data science experience! He also produced rapid prototypes that were nothing short of jaw-dropping. Anmol has an exceptional ability to quickly learn and implement entirely new technologies, even in areas where he has no prior experience. Whenever I'm hiring again, he'll be the first person I reach out to before considering any other candidates.",
    rating: 5,
    date: "2024",
    projectType: "AWS Infrastructure & Data Pipeline",
    highlighted: true
  },
  {
    id: "3",
    name: "Ishu Trivedi",
    role: "Senior Full Stack AI Engineer",
    company: "UN-Habitat Team",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ishu",
    content: "Anmol's deep domain expertise stood out from day one, especially when he helped me get onboarded and understand the project's technical nuances. He is the deepest domain expert of our team, always bringing fresh perspectives and staying ahead of the curve with emerging technologies. He has made remarkable contributions in building and optimizing our data processing workflows, particularly through his expertise in AWS-based data pipelines capable of handling large and complex datasets efficiently. Anmol's enthusiasm for exploring new tools and techniques consistently pushes our work to the next level. It's been a privilege working alongside him, and I highly recommend Anmol for any role that values innovation, technical excellence, and collaborative excellence.",
    rating: 5,
    date: "2024",
    projectType: "Data Processing & AWS Architecture",
    highlighted: false
  },
  {
    id: "4",
    name: "Guruprasanna Rajukannan Suresh",
    role: "AI Software Engineer",
    company: "UN-Habitat Team",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Guruprasanna",
    content: "I've worked with Anmol for over a year, and he has consistently shown strong technical and problem-solving skills. He independently built a scalable, cloud-native data pipeline on AWS capable of handling big and real-time data efficiently. He also contributed significantly to our QoL Impactor platform project with his advanced SQL expertise. During brainstorming and problem-solving sessions, his analytical thinking and decision-making stood out and often guided management direction. Anmol constantly explores new AI tools to enhance project performance and has developed several internal AI solutions to improve team operations. He's a creative, reliable, and forward-thinking engineer who delivers results.",
    rating: 5,
    date: "2024",
    projectType: "Cloud Architecture & AI Solutions",
    highlighted: false
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
            LinkedIn Recommendations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            What colleagues and managers say about working with me
          </p>
        </div>

        {/* Carousel for all testimonials */}
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
                <div>
                  <div>
                    <h4 className="font-semibold">{testimonials[currentIndex]?.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonials[currentIndex]?.role} - {testimonials[currentIndex]?.company}
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
            Contact Anmol
          </a>
        </div>
      </div>
    </section>
  )
}