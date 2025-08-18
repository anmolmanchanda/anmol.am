"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Mail, MapPin, Send } from "lucide-react"
import { ContactFormData } from "@/types"
import { siteConfig } from "@/lib/config"
import { cn } from "@/lib/utils"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>()

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="py-24 sm:py-32 aurora-bg relative overflow-hidden">
      {/* Aurora background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
      <div className="absolute inset-0 bg-gradient-to-tl from-violet-500/10 via-transparent to-cyan-500/10 animate-pulse" />
      <div className="absolute inset-0 ai-grid" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Get in Touch</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Interested in Technical Solutions Architecture roles or AI consulting projects? Let&apos;s connect.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">Contact Information</h2>
              <p className="mt-4 text-muted-foreground">
                Open to Technical/AI Solutions Architect roles (125-150k+ CAD) and consulting opportunities. 
                I typically respond within 24-48 hours.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <div className="mt-1 space-y-1">
                      <p className="text-muted-foreground">
                        Opportunities: <a href={`mailto:${siteConfig.emailAliases.hire}`} className="text-primary hover:underline font-medium">{siteConfig.emailAliases.hire}</a>
                      </p>
                      <p className="text-muted-foreground">
                        General: <a href={`mailto:${siteConfig.emailAliases.general}`} className="text-primary hover:underline font-medium">{siteConfig.emailAliases.general}</a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-muted-foreground font-medium mt-2">
                      {siteConfig.location}
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">
                      Available for remote work worldwide
                    </p>
                  </div>
                </div>
                
                {/* Embedded map */}
                <div className="mt-6 rounded-xl overflow-hidden border-2 border-border shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92566.89442206342!2d-80.55484!3d43.42643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf48c03ee5105%3A0x9525f8e6df5f9d9e!2sKitchener%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold">Connect on Social</h3>
                <div className="mt-4 flex gap-4">
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={siteConfig.links.fiverr}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Fiverr
                  </a>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-semibold">Services & Consulting</h3>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p>• Technical problem-solving consultation</p>
                  <p>• AI implementation assessment and strategy</p>
                  <p>• Rapid prototype development</p>
                  <p>• Data pipeline architecture and development</p>
                  <p>• AI-assisted automation solutions</p>
                  <p className="font-medium text-foreground">Rate: $90-150/hour</p>
                </div>
              </div>
            </div>

            <div className="liquid-glass rounded-2xl border backdrop-blur-md p-8 shadow-xl">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    id="name"
                    className={cn(
                      "mt-2 block w-full rounded-lg border bg-background/50 backdrop-blur px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 hover:bg-background/70",
                      errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                    )}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                    type="email"
                    id="email"
                    className={cn(
                      "mt-2 block w-full rounded-lg border bg-background/50 backdrop-blur px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 hover:bg-background/70",
                      errors.email && "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                    )}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium">
                    Subject
                  </label>
                  <input
                    {...register("subject", { required: "Subject is required" })}
                    type="text"
                    id="subject"
                    className={cn(
                      "mt-2 block w-full rounded-lg border bg-background/50 backdrop-blur px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 hover:bg-background/70",
                      errors.subject && "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                    )}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    {...register("message", { required: "Message is required" })}
                    id="message"
                    rows={6}
                    className={cn(
                      "mt-2 block w-full rounded-lg border bg-background/50 backdrop-blur px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 hover:bg-background/70 resize-none",
                      errors.message && "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                    )}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-primary to-purple-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <p className="text-sm text-green-600">
                    Thank you for your message! I&apos;ll get back to you soon.
                  </p>
                )}

                {submitStatus === 'error' && (
                  <p className="text-sm text-red-600">
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}