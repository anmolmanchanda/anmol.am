import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Download, Monitor, Cpu, HardDrive, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Download Life Manager | Anmol Manchanda",
  description: "Download the AI-Powered Life Manager for macOS. A comprehensive productivity solution built as a native macOS application.",
  keywords: ["life manager", "macOS app", "productivity", "AI", "download"],
}

export default function LifeManagerDownloadPage() {
  return (
    <div className="min-h-screen aurora-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
      <div className="absolute inset-0 bg-gradient-to-tl from-violet-500/10 via-transparent to-cyan-500/10 animate-pulse" />
      <div className="absolute inset-0 ai-grid" />
      
      <div className="py-24 sm:py-32 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/projects/2"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Project
            </Link>

            <div className="liquid-glass rounded-2xl border backdrop-blur-md p-8 mb-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <span className="bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  Life Manager for macOS
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                A comprehensive productivity solution built as a native macOS application. 
                Powered by AI to help you manage tasks, schedules, and optimize your daily workflow.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mb-8">
                <div className="glass-morphism p-6 rounded-lg border">
                  <h3 className="text-xl font-semibold mb-4">System Requirements</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <Monitor className="h-5 w-5 text-primary" />
                      <span className="text-sm">macOS 13.0 (Ventura) or later</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Cpu className="h-5 w-5 text-primary" />
                      <span className="text-sm">Apple Silicon (M1/M2/M3) ARM processor</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <HardDrive className="h-5 w-5 text-primary" />
                      <span className="text-sm">200 MB available disk space</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-primary" />
                      <span className="text-sm">Gatekeeper approval required on first launch</span>
                    </li>
                  </ul>
                </div>

                <div className="glass-morphism p-6 rounded-lg border">
                  <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    <li className="text-sm">• AI-powered task management and prioritization</li>
                    <li className="text-sm">• Smart calendar integration with intelligent scheduling</li>
                    <li className="text-sm">• Natural language processing for quick entries</li>
                    <li className="text-sm">• Focus mode with Pomodoro timer</li>
                    <li className="text-sm">• Daily/weekly/monthly analytics</li>
                    <li className="text-sm">• Native macOS design with Dark Mode support</li>
                  </ul>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold mb-2">Installation Instructions</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Download the DMG file using the button below</li>
                  <li>Double-click the downloaded DMG file to mount it</li>
                  <li>Drag the Life Manager app to your Applications folder</li>
                  <li>Eject the DMG and launch Life Manager from Applications</li>
                  <li>If prompted, go to System Preferences → Security & Privacy to allow the app</li>
                </ol>
              </div>

              <div className="text-center">
                <a
                  href="/downloads/LifeManager-1.0.0-arm64.dmg"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-lg"
                >
                  <Download className="h-5 w-5" />
                  <span className="font-semibold">Download Life Manager v1.0.0</span>
                  <span className="text-sm opacity-80">(ARM64 • 45 MB)</span>
                </a>
                
                <p className="mt-4 text-sm text-muted-foreground">
                  Compatible with Apple Silicon Macs only
                </p>
              </div>
            </div>

            <div className="glass-morphism rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-3">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you encounter any issues or have questions about Life Manager:
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="https://github.com/anmolmanchanda/LifeManager/issues"
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Report an Issue
                </Link>
                <Link
                  href="https://github.com/anmolmanchanda/LifeManager/wiki"
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Documentation
                </Link>
                <Link
                  href="/contact"
                  className="text-sm text-primary hover:text-primary/80"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}