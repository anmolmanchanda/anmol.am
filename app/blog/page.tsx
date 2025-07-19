import { Metadata } from "next"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"
import { BlogPost } from "@/types"
import { formatDate } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software development, web technologies, and more",
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Scalable Web Applications with Next.js",
    excerpt: "Learn how to build performant and scalable web applications using Next.js 14 and modern best practices.",
    content: "",
    date: "2024-03-15",
    tags: ["Next.js", "React", "Web Development"],
    readingTime: 5,
    slug: "building-scalable-web-apps-nextjs"
  },
  {
    id: "2",
    title: "The Power of TypeScript in Modern Development",
    excerpt: "Discover how TypeScript can improve your development workflow and help you write more maintainable code.",
    content: "",
    date: "2024-03-01",
    tags: ["TypeScript", "JavaScript", "Best Practices"],
    readingTime: 8,
    slug: "power-of-typescript"
  },
  {
    id: "3",
    title: "Mastering State Management in React Applications",
    excerpt: "A comprehensive guide to managing state in React applications, from local state to global state solutions.",
    content: "",
    date: "2024-02-20",
    tags: ["React", "State Management", "Frontend"],
    readingTime: 10,
    slug: "mastering-state-management-react"
  },
  {
    id: "4",
    title: "Building Real-time Applications with WebSockets",
    excerpt: "Learn how to implement real-time features in your applications using WebSockets and Socket.io.",
    content: "",
    date: "2024-02-10",
    tags: ["WebSockets", "Real-time", "Node.js"],
    readingTime: 7,
    slug: "building-realtime-apps-websockets"
  },
  {
    id: "5",
    title: "Performance Optimization Techniques for Web Apps",
    excerpt: "Essential techniques and strategies to optimize the performance of your web applications.",
    content: "",
    date: "2024-01-25",
    tags: ["Performance", "Optimization", "Web Development"],
    readingTime: 12,
    slug: "performance-optimization-techniques"
  },
  {
    id: "6",
    title: "Getting Started with Docker for Web Developers",
    excerpt: "A beginner-friendly guide to containerizing your web applications with Docker.",
    content: "",
    date: "2024-01-15",
    tags: ["Docker", "DevOps", "Containers"],
    readingTime: 6,
    slug: "getting-started-docker"
  }
]

export default function BlogPage() {
  return (
    <div className="py-24 sm:py-32 aurora-bg relative overflow-hidden">
      {/* Aurora background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
      <div className="absolute inset-0 bg-gradient-to-tl from-violet-500/10 via-transparent to-cyan-500/10 animate-pulse" />
      <div className="absolute inset-0 ai-grid" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Blog</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Thoughts on software development, web technologies, and everything in between
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="rounded-lg border bg-card p-6 transition-all hover:shadow-lg">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readingTime} min read</span>
                      </div>
                    </div>
                    <h2 className="mt-3 text-2xl font-semibold group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}