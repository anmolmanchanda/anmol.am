import { Metadata } from "next"
import Link from "next/link"
import { Shield, Eye, Lock, Database, Users, Globe } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn about how anmol.am collects, uses, and protects your data",
}

export default function PrivacyPage() {
  return (
    <div className="py-24 sm:py-32 aurora-bg relative overflow-hidden">
      <div className="absolute inset-0 ai-grid" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl relative z-10">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <Shield className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          <div className="liquid-glass p-8 rounded-lg border backdrop-blur-md space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Our Commitment to Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                At anmol.am, I take your privacy seriously. This website is designed with privacy-first principles.
                I collect minimal data, use no invasive tracking, and never sell your information to third parties.
              </p>
            </section>

            {/* What We Collect */}
            <section>
              <div className="flex items-start gap-3 mb-4">
                <Database className="w-6 h-6 text-primary mt-1" />
                <h2 className="text-2xl font-bold">What Information We Collect</h2>
              </div>

              <div className="space-y-4 ml-9">
                <div>
                  <h3 className="font-semibold text-lg mb-2">1. Anonymous Page Views</h3>
                  <p className="text-muted-foreground leading-relaxed mb-2">
                    When you visit a page, we count the view to understand which content is popular. This includes:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Page URL and view count</li>
                    <li>Hashed IP address (SHA-256 encrypted, not reversible)</li>
                    <li>Browser user agent (truncated for privacy)</li>
                    <li>Timestamp of visit</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2 italic">
                    Note: Your IP address is never stored in plain text. We hash it with a salt to prevent
                    duplicate counting while protecting your identity.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">2. Performance Analytics (Vercel)</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We use <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Vercel Analytics</a> and
                    Speed Insights to monitor website performance. This collects:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Anonymous page views and navigation patterns</li>
                    <li>Performance metrics (load time, Core Web Vitals)</li>
                    <li>Country-level geographic data (not city or precise location)</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2 italic">
                    Vercel Analytics is GDPR-compliant and uses no cookies or personal identifiers.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">3. Contact Form Data</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    When you submit the contact form, we collect:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Your name and email address (provided by you)</li>
                    <li>Your message content</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2 italic">
                    This information is sent directly to my email and is not stored on our servers.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2">4. Local Browser Storage</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We use your browser&apos;s local storage to remember:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Your theme preference (light/dark mode)</li>
                    <li>Basic visit counter (stays in your browser only)</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-2 italic">
                    This data never leaves your device and can be cleared anytime via browser settings.
                  </p>
                </div>
              </div>
            </section>

            {/* What We Don't Collect */}
            <section>
              <div className="flex items-start gap-3 mb-4">
                <Lock className="w-6 h-6 text-green-500 mt-1" />
                <h2 className="text-2xl font-bold">What We DON&apos;T Collect</h2>
              </div>

              <div className="ml-9">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-muted-foreground">No Google Analytics or advertising trackers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-muted-foreground">No Facebook Pixel or social media tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-muted-foreground">No browser fingerprinting or device tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-muted-foreground">No cross-site tracking or retargeting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-muted-foreground">No session recording (Hotjar, FullStory, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-muted-foreground">No personal data sold to third parties</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* How We Use Data */}
            <section>
              <div className="flex items-start gap-3 mb-4">
                <Eye className="w-6 h-6 text-primary mt-1" />
                <h2 className="text-2xl font-bold">How We Use Your Information</h2>
              </div>

              <div className="ml-9 space-y-3 text-muted-foreground">
                <p>The minimal data we collect is used only to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Display view counts on articles (anonymous)</li>
                  <li>Improve website performance and user experience</li>
                  <li>Respond to your contact form inquiries</li>
                  <li>Prevent spam and abuse (via IP rate limiting)</li>
                </ul>
                <p className="font-semibold mt-4">
                  We never use your data for advertising, profiling, or selling to third parties.
                </p>
              </div>
            </section>

            {/* Data Retention */}
            <section>
              <div className="flex items-start gap-3 mb-4">
                <Database className="w-6 h-6 text-primary mt-1" />
                <h2 className="text-2xl font-bold">Data Retention</h2>
              </div>

              <div className="ml-9 space-y-3 text-muted-foreground">
                <ul className="space-y-2">
                  <li>
                    <span className="font-semibold">Page view analytics:</span> Detailed visit data expires after 24 hours.
                    Only aggregated view counts are kept.
                  </li>
                  <li>
                    <span className="font-semibold">View counts:</span> Stored indefinitely (contains no personal information)
                  </li>
                  <li>
                    <span className="font-semibold">Contact form submissions:</span> Stored in my email inbox only
                  </li>
                  <li>
                    <span className="font-semibold">Vercel Analytics:</span> Retained according to their privacy policy
                    (typically 30 days for raw data)
                  </li>
                </ul>
              </div>
            </section>

            {/* Cookies */}
            <section>
              <div className="flex items-start gap-3 mb-4">
                <Globe className="w-6 h-6 text-primary mt-1" />
                <h2 className="text-2xl font-bold">Cookies</h2>
              </div>

              <div className="ml-9 text-muted-foreground">
                <p className="mb-3">
                  This website uses minimal essential cookies required for basic functionality:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Theme preference (light/dark mode)</li>
                  <li>Vercel&apos;s essential hosting cookies</li>
                </ul>
                <p className="mt-3 font-semibold">
                  We do not use advertising or tracking cookies.
                </p>
              </div>
            </section>

            {/* Security */}
            <section>
              <div className="flex items-start gap-3 mb-4">
                <Lock className="w-6 h-6 text-primary mt-1" />
                <h2 className="text-2xl font-bold">Data Security</h2>
              </div>

              <div className="ml-9 text-muted-foreground space-y-3">
                <p>We protect your data with industry-standard security measures:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>HTTPS encryption for all connections</li>
                  <li>IP addresses hashed with SHA-256 before storage</li>
                  <li>Secure headers to prevent XSS and clickjacking</li>
                  <li>Regular security audits and updates</li>
                  <li>Hosted on Vercel&apos;s secure infrastructure</li>
                </ul>
              </div>
            </section>

            {/* Third-Party Services */}
            <section>
              <div className="flex items-start gap-3 mb-4">
                <Users className="w-6 h-6 text-primary mt-1" />
                <h2 className="text-2xl font-bold">Third-Party Services</h2>
              </div>

              <div className="ml-9 text-muted-foreground">
                <p className="mb-3">This website uses the following third-party services:</p>
                <ul className="space-y-2">
                  <li>
                    <span className="font-semibold">Vercel:</span> Hosting and analytics
                    (<a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a>)
                  </li>
                  <li>
                    <span className="font-semibold">Upstash Redis:</span> Database for view counts
                    (<a href="https://upstash.com/trust/privacy.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a>)
                  </li>
                  <li>
                    <span className="font-semibold">Resend:</span> Email delivery for contact form
                    (<a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Privacy Policy</a>)
                  </li>
                </ul>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <div className="flex items-start gap-3 mb-4">
                <Shield className="w-6 h-6 text-primary mt-1" />
                <h2 className="text-2xl font-bold">Your Rights (GDPR/CCPA)</h2>
              </div>

              <div className="ml-9 text-muted-foreground space-y-3">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Access any personal data we hold about you</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of analytics (use browser &quot;Do Not Track&quot;)</li>
                  <li>Clear local storage via your browser settings</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact me at:{" "}
                  <a href="mailto:work@anmol.am" className="text-primary hover:underline">
                    work@anmol.am
                  </a>
                </p>
              </div>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Children&apos;s Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                This website does not knowingly collect information from children under 13.
                If you believe we have collected data from a child, please contact me immediately.
              </p>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                I may update this privacy policy from time to time. Any changes will be posted on this page
                with an updated revision date. Continued use of the website constitutes acceptance of any changes.
              </p>
            </section>

            {/* Contact */}
            <section className="pt-6 border-t">
              <h2 className="text-2xl font-bold mb-4">Contact</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have questions about this privacy policy or how your data is handled, please contact:
              </p>
              <div className="ml-4 text-muted-foreground">
                <p className="font-semibold">Anmol Manchanda</p>
                <p>Email: <a href="mailto:work@anmol.am" className="text-primary hover:underline">work@anmol.am</a></p>
                <p>Website: <a href="https://anmol.am" className="text-primary hover:underline">https://anmol.am</a></p>
              </div>
            </section>

            {/* Summary Box */}
            <section className="bg-primary/10 border border-primary/20 rounded-lg p-6 mt-8">
              <h3 className="font-bold text-lg mb-3">Privacy Summary</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Minimal data collection (anonymous page views only)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>IPs hashed, never stored in plain text</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>No advertising or invasive tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>GDPR & CCPA compliant</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Your data is never sold to third parties</span>
                </li>
              </ul>
            </section>

            <div className="text-center pt-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
