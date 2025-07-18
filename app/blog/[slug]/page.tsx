import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { BlogPost } from "@/types"
import { formatDate } from "@/lib/utils"

const blogPosts: Record<string, BlogPost> = {
  "building-scalable-web-apps-nextjs": {
    id: "1",
    title: "Building Scalable Web Applications with Next.js",
    excerpt: "Learn how to build performant and scalable web applications using Next.js 14 and modern best practices.",
    content: `
## Introduction

Next.js has become one of the most popular React frameworks for building production-ready web applications. In this post, we'll explore how to leverage Next.js 14's features to build scalable applications.

## Key Features

### Server Components

Server Components allow you to render components on the server, reducing the amount of JavaScript sent to the client. This results in faster page loads and better performance.

### App Router

The new App Router in Next.js 14 provides a more intuitive way to handle routing with support for layouts, error handling, and loading states.

### Performance Optimizations

Next.js includes built-in optimizations like:
- Automatic code splitting
- Image optimization
- Font optimization
- Script optimization

## Best Practices

1. **Use Server Components by default** - Only use Client Components when necessary
2. **Implement proper caching strategies** - Leverage Next.js caching capabilities
3. **Optimize images** - Use the Next.js Image component
4. **Monitor performance** - Use tools like Vercel Analytics

## Conclusion

Next.js 14 provides all the tools needed to build fast, scalable web applications. By following best practices and leveraging its features, you can create exceptional user experiences.
    `,
    date: "2024-03-15",
    tags: ["Next.js", "React", "Web Development"],
    readingTime: 5,
    slug: "building-scalable-web-apps-nextjs"
  },
  "power-of-typescript": {
    id: "2",
    title: "The Power of TypeScript in Modern Development",
    excerpt: "Discover how TypeScript can improve your development workflow and help you write more maintainable code.",
    content: `
## Why TypeScript?

TypeScript has revolutionized the way we write JavaScript applications. By adding static types to JavaScript, it helps catch errors early and improves code maintainability.

## Key Benefits

### Type Safety

TypeScript's type system helps prevent common errors like:
- Accessing properties that don't exist
- Passing wrong arguments to functions
- Typos in property names

### Better IDE Support

With TypeScript, you get:
- Intelligent code completion
- Accurate refactoring
- Real-time error detection

### Self-Documenting Code

Types serve as inline documentation, making it easier for other developers (including future you) to understand the code.

## Getting Started

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function greetUser(user: User): string {
  return \`Hello, \${user.name}!\`;
}
\`\`\`

## Conclusion

TypeScript is an invaluable tool for modern web development. While it adds a small learning curve, the benefits far outweigh the initial investment.
    `,
    date: "2024-03-01",
    tags: ["TypeScript", "JavaScript", "Best Practices"],
    readingTime: 8,
    slug: "power-of-typescript"
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts[slug]
  
  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = blogPosts[slug]

  if (!post) {
    notFound()
  }

  return (
    <article className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>

          <header>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>
            <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
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
          </header>

          <div className="prose prose-lg mt-12 max-w-none dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
          </div>
        </div>
      </div>
    </article>
  )
}