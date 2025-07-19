import { Metadata } from "next"
import Image from "next/image"
import { BookOpen, Music, Film, Dumbbell, ExternalLink, Heart, Star } from "lucide-react"

export const metadata: Metadata = {
  title: "Personal",
  description: "Personal interests, hobbies, and creative pursuits of Anmol Manchanda",
}

const personalLinks = [
  {
    id: "poems",
    title: "Poetify - Poetry Blog",
    description: "My collection of poems and creative writing on Blogger",
    url: "https://poetify.blogspot.com",
    icon: <BookOpen className="w-8 h-8 text-purple-500 icon-float" />,
    category: "Creative Writing",
    color: "from-purple-600 to-purple-400"
  },
  {
    id: "goodreads",
    title: "Goodreads Profile",
    description: "Books I'm reading, reviews, and literary recommendations",
    url: "https://www.goodreads.com/user/show/83373769-anmol-manchanda",
    icon: <BookOpen className="w-8 h-8 text-green-500 icon-pulse" />,
    category: "Reading",
    color: "from-green-600 to-green-400"
  },
  {
    id: "spotify",
    title: "Spotify Profile",
    description: "My music taste, playlists, and what I'm currently listening to",
    url: "https://open.spotify.com/user/8yxq6bc2x81yri8o7yqi1fuup?si=3MSB-YfUQUS_nI8O3D7g2A",
    icon: <Music className="w-8 h-8 text-green-400 icon-pulse" />,
    category: "Music",
    color: "from-green-500 to-emerald-400"
  },
  {
    id: "letterboxd",
    title: "Letterboxd Profile",
    description: "Movie reviews, watchlists, and cinematic preferences",
    url: "https://letterboxd.com/anmolmanchanda/",
    icon: <Film className="w-8 h-8 text-blue-500 icon-float" />,
    category: "Movies",
    color: "from-blue-600 to-blue-400"
  },
  {
    id: "strava",
    title: "Strava Profile",
    description: "Fitness tracking, workout logs, and athletic achievements",
    url: "https://www.strava.com/athletes/131445218",
    icon: <Dumbbell className="w-8 h-8 text-orange-500 icon-pulse" />,
    category: "Fitness",
    color: "from-orange-600 to-orange-400"
  }
]

export default function PersonalPage() {
  return (
    <div className="py-24 sm:py-32 aurora-bg relative overflow-hidden">
      {/* Aurora background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
      <div className="absolute inset-0 bg-gradient-to-tl from-violet-500/10 via-transparent to-cyan-500/10 animate-pulse" />
      <div className="absolute inset-0 ai-grid" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl">
          {/* Header with photo */}
          <div className="text-center relative z-10">
            <div className="flex flex-col items-center mb-8">
              <div className="relative group mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all duration-700 group-hover:shadow-[0_0_60px_rgba(0,0,0,0.15)] neural-glow">
                  <Image
                    src="/professional_headshot_avatar.JPG"
                    alt="Anmol Manchanda - Personal Side"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover scale-110 transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </div>
                {/* Creative indicator */}
                <div className="absolute -bottom-1 -right-1">
                  <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-background shadow-lg flex items-center justify-center">
                    <Heart className="w-3 h-3 text-white animate-pulse" />
                  </div>
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Personal Life</h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl">
                Beyond code and architecture—exploring creativity, literature, music, cinema, and fitness
              </p>
            </div>
          </div>

          {/* Personal Interests Grid */}
          <div className="mt-16 space-y-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {personalLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <div className="liquid-glass p-6 rounded-2xl border backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 cyber-border h-full card-3d">
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
            <div className="liquid-glass p-8 rounded-2xl border backdrop-blur-md shadow-lg card-3d">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 bg-opacity-10">
                    <Star className="w-8 h-8 text-purple-500 icon-pulse" />
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

          {/* Fun Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center liquid-glass p-4 rounded-xl card-3d">
              <div className="text-2xl font-bold text-primary">📚</div>
              <div className="text-sm text-muted-foreground mt-1">Bookworm</div>
            </div>
            <div className="text-center liquid-glass p-4 rounded-xl card-3d">
              <div className="text-2xl font-bold text-primary">🎵</div>
              <div className="text-sm text-muted-foreground mt-1">Music Lover</div>
            </div>
            <div className="text-center liquid-glass p-4 rounded-xl card-3d">
              <div className="text-2xl font-bold text-primary">🎬</div>
              <div className="text-sm text-muted-foreground mt-1">Film Enthusiast</div>
            </div>
            <div className="text-center liquid-glass p-4 rounded-xl card-3d">
              <div className="text-2xl font-bold text-primary">💪</div>
              <div className="text-sm text-muted-foreground mt-1">Fitness Focused</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}