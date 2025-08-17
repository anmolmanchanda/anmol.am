"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface BreadcrumbProps {
  className?: string
  customLabels?: Record<string, string>
}

export function Breadcrumb({ className, customLabels = {} }: BreadcrumbProps) {
  const pathname = usePathname()
  
  // Don't show breadcrumb on homepage
  if (pathname === "/") return null
  
  const segments = pathname.split("/").filter(Boolean)
  
  const breadcrumbs = segments.map((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join("/")}`
    const label = customLabels[path] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
    
    return {
      label,
      path,
      isLast: index === segments.length - 1
    }
  })
  
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      aria-label="Breadcrumb"
      className={cn("inline-block", className)}
    >
      <div className="glass-morphism cyber-border px-5 py-3 rounded-full border backdrop-blur-md flex items-center space-x-3 text-base">
        <Link
          href="/"
          className="flex items-center hover:text-primary transition-colors group"
          aria-label="Home"
        >
          <Home className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </Link>
        
        {breadcrumbs.map((crumb, index) => (
          <motion.div 
            key={crumb.path} 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
            {crumb.isLast ? (
              <span className="font-semibold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.path}
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {crumb.label}
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </motion.nav>
  )
}

// JSON-LD structured data for breadcrumbs
export function BreadcrumbJsonLd() {
  const pathname = usePathname()
  
  if (pathname === "/") return null
  
  const segments = pathname.split("/").filter(Boolean)
  const baseUrl = process.env['NEXT_PUBLIC_SITE_URL'] || "https://anmol.am"
  
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: baseUrl
    }
  ]
  
  segments.forEach((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join("/")}`
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
    
    items.push({
      "@type": "ListItem",
      position: index + 2,
      name: label,
      item: `${baseUrl}${path}`
    })
  })
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}