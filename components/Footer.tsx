import Link from "next/link"
import { Github, Linkedin, Mail, Star } from "lucide-react"
import { siteConfig } from "@/lib/config"
import { VisitorCounter } from "@/components/Phase4Features"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          {/* Website Analytics Section */}
          <div className="mb-6 text-center">
            <div className="inline-block">
              <VisitorCounter />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-base sm:text-lg font-semibold">{siteConfig.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {siteConfig.title}
              </p>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold">Quick Links</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/personal" className="text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center">
                    Life
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-semibold">Connect</h3>
              <div className="mt-4 flex space-x-3 sm:space-x-4">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={siteConfig.links.fiverr}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Fiverr"
                >
                  <Star className="h-5 w-5" />
                </a>
                <a
                  href={siteConfig.links.email}
                  className="text-muted-foreground hover:text-foreground transition-colors p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {siteConfig.email}
              </p>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 border-t pt-6 sm:pt-8">
            <p className="text-center text-sm text-muted-foreground">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}