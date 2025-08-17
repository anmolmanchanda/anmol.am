import Link from "next/link"
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react"
import { BlogPost } from "@/types"
import { formatDate } from "@/lib/utils"

interface RelatedPostsProps {
  currentPost: BlogPost
  allPosts: BlogPost[]
  maxPosts?: number
}

export function RelatedPosts({ currentPost, allPosts, maxPosts = 3 }: RelatedPostsProps) {
  // Find related posts based on shared tags
  const relatedPosts = allPosts
    .filter(post => post.id !== currentPost.id)
    .map(post => {
      const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag))
      return {
        ...post,
        relevanceScore: sharedTags.length
      }
    })
    .filter(post => post.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, maxPosts)

  if (relatedPosts.length === 0) {
    // If no posts with shared tags, show recent posts
    const recentPosts = allPosts
      .filter(post => post.id !== currentPost.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, maxPosts)
    
    return (
      <section className="mt-16 pt-16 border-t">
        <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="mt-16 pt-16 border-t">
      <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group h-full flex flex-col rounded-xl border bg-card hover:shadow-lg transition-all duration-300">
        {post.image && (
          <div className="aspect-video rounded-t-xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
            <div className="w-full h-full flex items-center justify-center">
              {post.icon || <Tag className="w-12 h-12 text-primary/20" />}
            </div>
          </div>
        )}
        
        <div className="flex-1 p-6 flex flex-col">
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
          
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
            {post.excerpt}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readingTime} min read
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-xs"
              >
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
            Read more
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </article>
    </Link>
  )
}