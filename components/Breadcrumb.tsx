"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

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
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center space-x-2 text-sm text-muted-foreground py-4", className)}
    >
      <Link
        href="/"
        className="flex items-center hover:text-foreground transition-colors"
        aria-label="Home"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {breadcrumbs.map((crumb) => (
        <div key={crumb.path} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4" />
          {crumb.isLast ? (
            <span className="text-foreground font-medium" aria-current="page">
              {crumb.label}
            </span>
          ) : (
            <Link
              href={crumb.path}
              className="hover:text-foreground transition-colors"
            >
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
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