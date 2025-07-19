import Link from "next/link"
import { Github, Linkedin, Mail, Star } from "lucide-react"
import { siteConfig } from "@/lib/config"
import { SpotifyNowPlaying, GitHubActivityFeed, VisitorCounter } from "@/components/Phase4Features"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          {/* Phase 4 Dashboard Section */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold mb-6 text-center">Live Dashboard</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <VisitorCounter />
              <SpotifyNowPlaying />
              <GitHubActivityFeed />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold">{siteConfig.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {siteConfig.title}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="mt-2 space-y-2 text-sm">
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
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/personal" className="text-muted-foreground hover:text-foreground transition-colors">
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

            <div>
              <h3 className="text-lg font-semibold">Connect</h3>
              <div className="mt-4 flex space-x-4">
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
                  <Star className="h-5 w-5" />
                </a>
                <a
                  href={siteConfig.links.email}
                  className="text-muted-foreground hover:text-foreground transition-colors"
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

          <div className="mt-8 border-t pt-8">
            <p className="text-center text-sm text-muted-foreground">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}