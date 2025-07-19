import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Share2, BookOpen } from "lucide-react"
import { ViewTracker } from "@/components/ViewTracker"
import { BlogPost } from "@/types"
import { formatDate } from "@/lib/utils"
import fs from 'fs'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'

// Blog post metadata and reading time calculation
const blogPostsMetadata: Record<string, Omit<BlogPost, 'content'>> = {
  "building-scalable-web-apps-nextjs": {
    id: "1",
    title: "Building Scalable Web Applications with Next.js",
    excerpt: "Learn how to build performant and scalable web applications using Next.js 15 and modern best practices. Explore advanced patterns for enterprise-grade applications.",
    date: "2025-07-19",
    tags: ["Next.js", "React", "Web Development", "Scalability", "Enterprise"],
    readingTime: 12,
    slug: "building-scalable-web-apps-nextjs",
    image: "/images/blog/nextjs-scalable.svg",
    gradient: "from-blue-600 via-purple-600 to-blue-800",
    views: 0,
    featured: true
  },
  "power-of-typescript": {
    id: "2",
    title: "The Power of TypeScript in Modern Development",
    excerpt: "Discover how TypeScript can improve your development workflow and help you write more maintainable code. Deep dive into advanced type patterns and best practices.",
    date: "2025-07-19",
    tags: ["TypeScript", "JavaScript", "Best Practices", "Developer Experience", "Type Safety"],
    readingTime: 15,
    slug: "power-of-typescript",
    image: "/images/blog/typescript-power.svg",
    gradient: "from-blue-500 via-cyan-500 to-teal-600",
    views: 0,
    featured: true
  },
  "mastering-state-management-react": {
    id: "3",
    title: "Mastering State Management in React Applications",
    excerpt: "A comprehensive guide to managing state in React applications, from local state to global state solutions. Compare Redux, Zustand, and modern patterns with real examples.",
    date: "2025-07-19",
    tags: ["React", "State Management", "Frontend", "Redux", "Zustand", "React Query"],
    readingTime: 18,
    slug: "mastering-state-management-react",
    image: "/images/blog/react-state.svg",
    gradient: "from-purple-600 via-pink-600 to-red-600",
    views: 0,
    featured: true
  },
  "building-realtime-apps-websockets": {
    id: "4",
    title: "Building Real-time Applications with WebSockets",
    excerpt: "Learn how to implement real-time features in your applications using WebSockets and Socket.io. Build collaborative tools and live data dashboards for enterprise use.",
    date: "2025-07-19",
    tags: ["WebSockets", "Real-time", "Node.js", "Socket.io", "Enterprise"],
    readingTime: 18,
    slug: "building-realtime-apps-websockets",
    image: "/images/blog/websockets-realtime.svg",
    gradient: "from-green-500 via-emerald-500 to-teal-600",
    views: 0,
    featured: false
  },
  "performance-optimization-techniques": {
    id: "5",
    title: "Performance Optimization Techniques for Web Apps",
    excerpt: "Essential techniques and strategies to optimize the performance of your web applications. Core Web Vitals, bundle optimization, and real-world performance wins.",
    date: "2025-07-19",
    tags: ["Performance", "Optimization", "Web Development", "Core Web Vitals", "Enterprise"],
    readingTime: 22,
    slug: "performance-optimization-techniques",
    image: "/images/blog/performance-optimization.svg",
    gradient: "from-orange-500 via-red-500 to-pink-600",
    views: 0,
    featured: true
  },
  "getting-started-docker": {
    id: "6",
    title: "Getting Started with Docker for Web Developers",
    excerpt: "A comprehensive guide to containerizing your web applications with Docker. Development workflows, production deployment, and enterprise best practices.",
    date: "2025-07-19",
    tags: ["Docker", "DevOps", "Containers", "Deployment", "Infrastructure"],
    readingTime: 12,
    slug: "getting-started-docker",
    image: "/images/blog/docker-containers.svg",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    views: 0,
    featured: false
  },
  "ai-assisted-macos-life-manager": {
    id: "7",
    title: "AI-Assisted Development: Building a Native macOS Life Manager",
    excerpt: "The future of software development isn't replacing developers with AI—it's about augmenting human creativity. Building a comprehensive life management application for macOS using Claude AI as development partner.",
    date: "2025-07-19",
    tags: ["AI", "Swift", "macOS", "Native Development", "Life Management", "Claude AI"],
    readingTime: 25,
    slug: "ai-assisted-macos-life-manager",
    image: "/images/blog/ai-macos-app.svg",
    gradient: "from-violet-600 via-purple-600 to-indigo-600",
    views: 0,
    featured: true
  },
  "building-tb-scale-data-infrastructure-un": {
    id: "8",
    title: "Building TB-Scale Data Infrastructure at UN-Habitat",
    excerpt: "When the United Nations Human Settlements Programme needed to process terabytes of urban data from 12 global cities, they needed comprehensive infrastructure for real-time processing, complex analytics, and reliable monitoring at enterprise scale.",
    date: "2025-07-19",
    tags: ["AWS", "Big Data", "Infrastructure", "UN-Habitat", "Data Pipeline", "Enterprise"],
    readingTime: 30,
    slug: "building-tb-scale-data-infrastructure-un",
    image: "/images/blog/aws-infrastructure.svg",
    gradient: "from-orange-500 via-red-500 to-pink-600",
    views: 0,
    featured: true
  }
}

// Function to load markdown content
async function getPostContent(slug: string): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.md`)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    
    // Process markdown to HTML
    const processedContent = await remark()
      .use(html)
      .process(fileContents)
    
    return processedContent.toString()
  } catch (error) {
    console.error(`Error loading post content for ${slug}:`, error)
    return '<p>Content not available</p>'
  }
}

// Function to calculate reading time from content
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = blogPostsMetadata[slug]
  
  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | Anmol Manchanda`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: "Anmol Manchanda" }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
      images: [{
        url: post.image || '/images/blog-default.svg',
        width: 1200,
        height: 630,
        alt: post.title
      }]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image || '/images/blog-default.svg']
    }
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const postMeta = blogPostsMetadata[slug]

  if (!postMeta) {
    notFound()
  }

  const content = await getPostContent(slug)
  const actualReadingTime = calculateReadingTime(content)

  return (
    <div className="min-h-screen aurora-bg relative overflow-hidden">
      {/* Enhanced Aurora background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
      <div className="absolute inset-0 bg-gradient-to-tl from-violet-500/10 via-transparent to-cyan-500/10 animate-pulse" />
      <div className="absolute inset-0 ai-grid" />
      
      <article className="py-24 sm:py-32 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Navigation */}
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 glass-morphism p-3 rounded-lg border backdrop-blur-md"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Knowledge Hub
            </Link>

            {/* Article Header */}
            <header className="liquid-glass rounded-2xl border backdrop-blur-md p-8 mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="glass-morphism cyber-border p-3 rounded-full border backdrop-blur-md quantum-glow">
                  <BookOpen className="w-6 h-6 text-primary icon-pulse" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Technical Article</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <span className="bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  {postMeta.title}
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {postMeta.excerpt}
              </p>
              
              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <time dateTime={postMeta.date}>{formatDate(postMeta.date)}</time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{actualReadingTime} min read</span>
                </div>
                <ViewTracker 
                  slug={postMeta.slug} 
                  initialViews={postMeta.views || 0}
                  className="text-primary"
                />
                <button className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {postMeta.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1.5 text-sm font-medium border border-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            {/* Article Content */}
            <div className="liquid-glass rounded-2xl border backdrop-blur-md p-8">
              <div 
                className="prose prose-sm max-w-none dark:prose-invert
                          prose-headings:bg-gradient-to-r prose-headings:from-primary prose-headings:via-purple-500 prose-headings:to-cyan-500 prose-headings:bg-clip-text prose-headings:text-transparent prose-headings:font-bold prose-headings:mb-8 prose-headings:mt-10
                          prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg
                          prose-p:text-xs prose-p:leading-relaxed prose-p:mb-6 prose-p:text-muted-foreground prose-p:break-words
                          prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-medium prose-a:text-xs
                          prose-code:bg-gradient-to-r prose-code:from-slate-900 prose-code:to-slate-800 prose-code:text-green-400 prose-code:px-3 prose-code:py-1.5 prose-code:rounded-md prose-code:text-xs prose-code:font-mono prose-code:border prose-code:border-slate-700 prose-code:shadow-lg prose-code:font-semibold
                          prose-pre:bg-gradient-to-br prose-pre:from-slate-900 prose-pre:via-slate-800 prose-pre:to-slate-900 prose-pre:border-2 prose-pre:border-slate-600 prose-pre:rounded-xl prose-pre:p-6 prose-pre:overflow-x-auto prose-pre:shadow-2xl prose-pre:backdrop-blur-sm prose-pre:relative prose-pre:before:absolute prose-pre:before:top-0 prose-pre:before:left-0 prose-pre:before:right-0 prose-pre:before:h-8 prose-pre:before:bg-slate-700 prose-pre:before:rounded-t-xl prose-pre:before:border-b prose-pre:before:border-slate-600
                          prose-pre>code:text-green-400 prose-pre>code:text-sm prose-pre>code:leading-relaxed prose-pre>code:font-mono prose-pre>code:block prose-pre>code:whitespace-pre prose-pre>code:pt-8
                          prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:rounded-r-lg prose-blockquote:my-8 prose-blockquote:text-xs prose-blockquote:italic
                          prose-strong:text-primary prose-strong:font-semibold prose-strong:text-xs
                          prose-ul:list-none prose-ul:space-y-4 prose-ul:my-8 prose-ul:text-xs
                          prose-ol:space-y-4 prose-ol:my-8 prose-ol:text-xs
                          prose-li:relative prose-li:pl-6 prose-li:text-xs prose-li:leading-relaxed prose-li:mb-2
                          prose-li:before:content-['▶'] prose-li:before:absolute prose-li:before:left-0 prose-li:before:text-primary prose-li:before:text-xs prose-li:before:font-bold
                          prose-table:border-2 prose-table:border-border prose-table:rounded-lg prose-table:overflow-hidden prose-table:shadow-lg prose-table:text-xs
                          prose-th:bg-secondary prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-xs prose-th:border-b-2 prose-th:border-border
                          prose-td:px-4 prose-td:py-3 prose-td:border-t prose-td:border-border prose-td:text-xs
                          prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8 prose-img:mx-auto prose-img:border prose-img:border-border"
                dangerouslySetInnerHTML={{ __html: content }} 
              />
            </div>

            {/* Article Footer */}
            <div className="mt-12 liquid-glass rounded-2xl border backdrop-blur-md p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    A
                  </div>
                  <div>
                    <p className="font-semibold">Anmol Manchanda</p>
                    <p className="text-sm text-muted-foreground">AI-Assisted Developer & Technical Architect</p>
                  </div>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <BookOpen className="w-4 h-4" />
                  More Articles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}