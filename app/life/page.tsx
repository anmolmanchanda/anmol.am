import { Metadata } from "next"
import Image from "next/image"
import { Heart, Star, ExternalLink, Activity, Globe, PenTool, Film, BookOpen, Music } from "lucide-react"
import { NotionCard } from "@/components/NotionCard"
import { UnifiedLifeFeed, LifeMetrics } from "@/components/UnifiedLifeFeed"

export const metadata: Metadata = {
  title: "Life",
  description: "Personal interests, hobbies, and creative pursuits of Anmol Manchanda",
}

export default function LifePage() {
  return (
    <div className="py-24 sm:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex flex-col items-center mb-8">
              <div className="relative group mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg">
                  <Image
                    src="/images/life_avatar.jpeg"
                    alt="Anmol Manchanda - Personal Side"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover scale-110"
                    priority
                  />
                </div>
                <div className="absolute -bottom-1 -right-1">
                  <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-background shadow-lg flex items-center justify-center">
                    <Heart className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Life Beyond Code</h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl">
                Exploring creativity, literature, music, cinema, fitness, and continuous learning
              </p>
            </div>
          </div>

          {/* Life Metrics */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Life Stats & Progress</h2>
            <LifeMetrics />
          </div>

          {/* Unified Activity Feed */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Life Timeline</h2>
            <div className="max-w-3xl mx-auto">
              <UnifiedLifeFeed />
            </div>
          </div>

          {/* Platform Embeds Section */}
          <div className="space-y-12 mb-16">
            {/* Strava Widget */}
            <div className="liquid-glass rounded-xl border backdrop-blur-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-orange-500" />
                Running & Fitness
              </h3>
              <div className="mb-4">
                <iframe 
                  height="160" 
                  width="100%" 
                  frameBorder="0" 
                  allowTransparency={true}
                  scrolling="no" 
                  src="https://www.strava.com/athletes/131445218/activity-summary/c8e7d9f8c5f3b0f3c5f3b0f3c5f3b0f3c5f3b0f3"
                  className="rounded-lg"
                />
              </div>
              <a 
                href="https://strava.com/athletes/131445218" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-orange-500 hover:text-orange-600"
              >
                View Full Strava Profile <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Duolingo Progress */}
            <div className="liquid-glass rounded-xl border backdrop-blur-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-green-500" />
                Language Learning
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>French</span>
                    <span className="font-bold">Level A2</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Current Streak</span>
                    <span className="font-bold text-orange-500">45 days 🔥</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Total XP</span>
                    <span className="font-bold">12,450</span>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-500">45</div>
                    <div className="text-xs text-muted-foreground">Day Streak</div>
                  </div>
                </div>
              </div>
              <a 
                href="https://www.duolingo.com/profile/anmolmanchanda" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-green-500 hover:text-green-600 mt-4"
              >
                View Duolingo Profile <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Poetry Blog */}
            <div className="liquid-glass rounded-xl border backdrop-blur-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <PenTool className="w-5 h-5 text-purple-500" />
                Poetry & Creative Writing
              </h3>
              <div className="prose prose-sm dark:prose-invert max-w-none mb-4">
                <p className="text-sm text-muted-foreground">
                  My creative expressions through poetry, exploring themes of technology, humanity, and existence.
                </p>
              </div>
              <a 
                href="https://poetify.blogspot.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-purple-500 hover:text-purple-600"
              >
                Read Poetry on Poetify <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Letterboxd */}
            <div className="liquid-glass rounded-xl border backdrop-blur-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Film className="w-5 h-5 text-blue-500" />
                Film Diary
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                {/* Mock film posters */}
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-[2/3] bg-muted rounded" />
                ))}
              </div>
              <a 
                href="https://letterboxd.com/anmolmanchanda/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600"
              >
                View Letterboxd Profile <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Reading List */}
            <div className="liquid-glass rounded-xl border backdrop-blur-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-500" />
                Currently Reading
              </h3>
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-16 bg-muted rounded flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Atomic Habits</p>
                    <p className="text-xs text-muted-foreground">by James Clear</p>
                    <p className="text-xs text-muted-foreground mt-1">65% complete</p>
                  </div>
                </div>
              </div>
              <a 
                href="https://www.goodreads.com/user/show/83373769-anmol-manchanda" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-green-500 hover:text-green-600"
              >
                View Goodreads Profile <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Music */}
            <div className="liquid-glass rounded-xl border backdrop-blur-md p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Music className="w-5 h-5 text-green-400" />
                Music & Playlists
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Curated playlists for coding, running, and relaxation
              </p>
              <a 
                href="https://open.spotify.com/user/8yxq6bc2x81yri8o7yqi1fuup" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-green-400 hover:text-green-500"
              >
                Follow on Spotify <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Notion Resource Library */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Resource Library</h2>
            <NotionCard 
              url="https://ai-resource-library.notion.site/AI-LLM-Resource-Library-2212a9c0cb8e80f9bf46d9a3971475bc"
            />
          </div>

          {/* Personal Philosophy */}
          <div className="liquid-glass p-8 rounded-2xl border backdrop-blur-md shadow-lg">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 bg-opacity-10">
                  <Star className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              <h2 className="text-2xl font-bold tracking-tight mb-4">Philosophy</h2>
              <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Balance through creative expression, continuous learning, and physical wellness. 
                Poetry for exploring emotions, books for expanding perspectives, music for creativity, 
                films for storytelling inspiration, and fitness for grounding energy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}