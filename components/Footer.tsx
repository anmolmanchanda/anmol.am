import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { siteConfig } from "@/lib/config"
import { VisitorCounter } from "@/components/Phase4Features"
import { FiverrIcon } from "@/components/icons/FiverrIcon"
import { Newsletter } from "@/components/Newsletter"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="flex justify-between items-start">
            {/* Analytics - far left */}
            <div>
              <VisitorCounter />
            </div>

            {/* Quick Links - center */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold">Quick Links</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/work" className="text-muted-foreground hover:text-foreground transition-colors">
                    Work
                  </Link>
                </li>
                <li>
                  <Link href="/life" className="text-muted-foreground hover:text-foreground transition-colors">
                    Life
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect - center */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold">Connect</h3>
              <div className="mt-2 flex space-x-3 sm:space-x-4">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={siteConfig.links.fiverr}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Fiverr"
                >
                  <FiverrIcon className="h-5 w-5" />
                </a>
                <a
                  href={siteConfig.links.email}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {siteConfig.email}
              </p>
            </div>
            
            {/* Newsletter - far right */}
            <div>
              <Newsletter compact />
            </div>
          </div>

          <div className="mt-4 sm:mt-6 border-t pt-4 sm:pt-6">
            <p className="text-center text-sm text-muted-foreground">
              © {currentYear} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}