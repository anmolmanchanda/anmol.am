import { Metadata } from "next"
import Image from "next/image"
import { BookOpen, Music, Film, ExternalLink, Heart, Star, Activity, Globe, PenTool, Camera } from "lucide-react"
import { LifeTrackers } from "@/components/CustomTrackers"
import { NotionCard } from "@/components/NotionCard"

export const metadata: Metadata = {
  title: "Personal",
  description: "Personal interests, hobbies, and creative pursuits of Anmol Manchanda",
}

// Only show links for platforms without good API access
const personalLinks = [
  {
    id: "goodreads",
    title: "Goodreads Profile",
    description: "Books I'm reading, reviews, and literary recommendations",
    url: "https://www.goodreads.com/user/show/83373769-anmol-manchanda",
    icon: <BookOpen className="w-8 h-8 text-green-500" />,
    category: "Reading",
    color: "from-green-600 to-green-400",
  },
  {
    id: "spotify",
    title: "Spotify Profile",
    description: "My music taste and playlists",
    url: "https://open.spotify.com/user/8yxq6bc2x81yri8o7yqi1fuup?si=3MSB-YfUQUS_nI8O3D7g2A",
    icon: <Music className="w-8 h-8 text-green-400" />,
    category: "Music",
    color: "from-green-500 to-emerald-400",
  }
]

export default function PersonalPage() {
  return (
    <div className="py-24 sm:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl">
          {/* Header with photo */}
          <div className="text-center relative z-10">
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
                {/* Creative indicator */}
                <div className="absolute -bottom-1 -right-1">
                  <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-background shadow-lg flex items-center justify-center">
                    <Heart className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Personal Life</h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl">
                Beyond code and architecture—exploring creativity, literature, music, cinema, and fitness
              </p>
            </div>
          </div>

          {/* Life Trackers */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Life Stats & Progress</h2>
            <LifeTrackers />
          </div>

          {/* Embedded Content Section */}
          <div className="mt-16 space-y-16">
            {/* Strava Activities */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Activity className="w-6 h-6 text-orange-500" />
                Recent Runs & Workouts
              </h2>
              <div className="liquid-glass rounded-xl border backdrop-blur-md p-6">
                <div className="mb-4 text-sm text-muted-foreground">
                  Connect with me on Strava to see my running progress
                </div>
                <iframe 
                  height="454" 
                  width="100%" 
                  frameBorder="0" 
                  allowTransparency={true}
                  scrolling="no" 
                  src="https://www.strava.com/athletes/123456789/latest-rides/YOUR_STRAVA_ID_HERE"
                  className="rounded-lg"
                />
                <div className="mt-4 flex justify-center">
                  <a 
                    href="https://www.strava.com/athletes/anmolmanchanda" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    View Full Profile <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Poetry from Blogspot */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <PenTool className="w-6 h-6 text-purple-500" />
                Recent Poetry
              </h2>
              <div className="liquid-glass rounded-xl border backdrop-blur-md p-6">
                <div className="mb-4 text-sm text-muted-foreground">
                  My creative expressions and poetic musings
                </div>
                <iframe 
                  src="https://anmolmanchanda.blogspot.com/" 
                  width="100%" 
                  height="600" 
                  frameBorder="0"
                  className="rounded-lg bg-white dark:bg-gray-900"
                />
                <div className="mt-4 flex justify-center">
                  <a 
                    href="https://anmolmanchanda.blogspot.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    Read All Poems <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Letterboxd Reviews */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Film className="w-6 h-6 text-blue-500" />
                Film Reviews & Watchlist
              </h2>
              <div className="liquid-glass rounded-xl border backdrop-blur-md p-6">
                <div className="mb-4 text-sm text-muted-foreground">
                  My movie reviews and film diary on Letterboxd
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Recent Reviews */}
                  <div className="p-4 bg-secondary/20 rounded-lg">
                    <h3 className="font-semibold mb-3">Recent Reviews</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-16 bg-muted rounded flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Oppenheimer</p>
                          <p className="text-xs text-muted-foreground">★★★★★</p>
                          <p className="text-xs text-muted-foreground mt-1">A masterpiece of cinema...</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-16 bg-muted rounded flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">The Zone of Interest</p>
                          <p className="text-xs text-muted-foreground">★★★★</p>
                          <p className="text-xs text-muted-foreground mt-1">Haunting and unforgettable...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Watchlist */}
                  <div className="p-4 bg-secondary/20 rounded-lg">
                    <h3 className="font-semibold mb-3">Watchlist</h3>
                    <div className="grid grid-cols-4 gap-2">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-full aspect-[2/3] bg-muted rounded" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <a 
                    href="https://letterboxd.com/anmolmanchanda/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    View Letterboxd Profile <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Instagram Grid */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Camera className="w-6 h-6 text-pink-500" />
                Visual Stories
              </h2>
              <div className="liquid-glass rounded-xl border backdrop-blur-md p-6">
                <div className="mb-4 text-sm text-muted-foreground">
                  Moments captured through my lens
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="aspect-square bg-muted rounded-lg" />
                  ))}
                </div>
                <div className="mt-4 flex justify-center">
                  <a 
                    href="https://instagram.com/anmolmanchanda" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                  >
                    Follow on Instagram <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Duolingo Progress */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Globe className="w-6 h-6 text-green-500" />
                Language Learning Journey
              </h2>
              <div className="liquid-glass rounded-xl border backdrop-blur-md p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-3">French Progress</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Current Level</span>
                        <span className="font-bold text-primary">A2</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Streak</span>
                        <span className="font-bold text-orange-500">45 days 🔥</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>XP This Week</span>
                        <span className="font-bold">1,250</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>League</span>
                        <span className="font-bold text-yellow-500">Gold</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Skills Learned</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Basics", "Greetings", "Family", "Food", "Travel", "Work", "Shopping", "Time"].map(skill => (
                        <span key={skill} className="px-2 py-1 bg-green-500/20 text-green-600 dark:text-green-400 rounded-full text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* More Life Stats */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Additional Life Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="liquid-glass rounded-xl border backdrop-blur-md p-4">
                <div className="text-2xl font-bold text-primary">156</div>
                <div className="text-sm text-muted-foreground">Days Meditated</div>
              </div>
              <div className="liquid-glass rounded-xl border backdrop-blur-md p-4">
                <div className="text-2xl font-bold text-blue-500">8.2</div>
                <div className="text-sm text-muted-foreground">Avg Sleep Hours</div>
              </div>
              <div className="liquid-glass rounded-xl border backdrop-blur-md p-4">
                <div className="text-2xl font-bold text-green-500">12</div>
                <div className="text-sm text-muted-foreground">Countries Visited</div>
              </div>
              <div className="liquid-glass rounded-xl border backdrop-blur-md p-4">
                <div className="text-2xl font-bold text-purple-500">3</div>
                <div className="text-sm text-muted-foreground">Languages Spoken</div>
              </div>
              <div className="liquid-glass rounded-xl border backdrop-blur-md p-4">
                <div className="text-2xl font-bold text-orange-500">47</div>
                <div className="text-sm text-muted-foreground">Recipes Mastered</div>
              </div>
              <div className="liquid-glass rounded-xl border backdrop-blur-md p-4">
                <div className="text-2xl font-bold text-pink-500">92</div>
                <div className="text-sm text-muted-foreground">Plants Grown</div>
              </div>
              <div className="liquid-glass rounded-xl border backdrop-blur-md p-4">
                <div className="text-2xl font-bold text-yellow-500">5</div>
                <div className="text-sm text-muted-foreground">Musical Instruments</div>
              </div>
              <div className="liquid-glass rounded-xl border backdrop-blur-md p-4">
                <div className="text-2xl font-bold text-cyan-500">238</div>
                <div className="text-sm text-muted-foreground">Photos Taken</div>
              </div>
            </div>
          </div>

          {/* Notion Resource Library */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Resource Library</h2>
            <NotionCard 
              url="https://ai-resource-library.notion.site/AI-LLM-Resource-Library-2212a9c0cb8e80f9bf46d9a3971475bc"
            />
          </div>

          {/* Connect Links */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Connect & Follow</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {personalLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="liquid-glass p-6 rounded-2xl border backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <div className="flex flex-col h-full">
                      {/* Icon and Category */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${link.color} bg-opacity-10`}>
                          {link.icon}
                        </div>
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                          {link.category}
                        </span>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors mb-2">
                          {link.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {link.description}
                        </p>
                      </div>
                      
                      {/* Visit Link */}
                      <div className="mt-4 flex items-center text-primary group-hover:text-primary/80 transition-colors">
                        <span className="text-sm font-medium">Visit</span>
                        <ExternalLink className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Personal Philosophy */}
          <div className="mt-16">
            <div className="liquid-glass p-8 rounded-2xl border backdrop-blur-md shadow-lg">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 bg-opacity-10">
                    <Star className="w-8 h-8 text-purple-500" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold tracking-tight mb-4">Life Beyond Code</h2>
                <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  While I architect technical solutions by day, I find balance through creative expression, 
                  continuous learning, and physical wellness. Poetry allows me to explore emotions and ideas, 
                  books expand my perspectives, music fuels my creativity, films inspire storytelling, 
                  and fitness keeps me grounded and energized for both technical and personal challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}