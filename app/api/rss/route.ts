import { NextResponse } from 'next/server'
import { siteConfig } from '@/lib/config'

// Import your blog posts data
const blogPosts = [
  {
    id: "1",
    title: "Building Scalable Web Applications with Next.js",
    excerpt: "Learn how to build performant and scalable web applications using Next.js 15 and modern best practices.",
    date: "2025-07-19",
    slug: "building-scalable-web-apps-nextjs",
    tags: ["Next.js", "React", "Web Development"],
  },
  {
    id: "2",
    title: "The Power of TypeScript in Modern Development",
    excerpt: "Discover how TypeScript can improve your development workflow and help you write more maintainable code.",
    date: "2025-07-19",
    slug: "power-of-typescript",
    tags: ["TypeScript", "JavaScript", "Best Practices"],
  },
  {
    id: "3",
    title: "Mastering State Management in React Applications",
    excerpt: "A comprehensive guide to managing state in React applications, from local state to global state solutions.",
    date: "2025-07-19",
    slug: "mastering-state-management-react",
    tags: ["React", "State Management", "Frontend"],
  },
  {
    id: "4",
    title: "Building Real-time Applications with WebSockets",
    excerpt: "Learn how to implement real-time features in your applications using WebSockets and Socket.io.",
    date: "2025-07-19",
    slug: "building-realtime-apps-websockets",
    tags: ["WebSockets", "Real-time", "Node.js"],
  },
  {
    id: "5",
    title: "Performance Optimization Techniques for Web Apps",
    excerpt: "Essential techniques and strategies to optimize the performance of your web applications.",
    date: "2025-07-19",
    slug: "performance-optimization-techniques",
    tags: ["Performance", "Optimization", "Web Development"],
  },
]

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case "'": return '&apos;'
      case '"': return '&quot;'
      default: return c
    }
  })
}

export async function GET() {
  const baseUrl = process.env['NEXT_PUBLIC_SITE_URL'] || siteConfig.url

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(siteConfig.name)} - Blog</title>
    <description>${escapeXml(siteConfig.description)}</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/api/rss" rel="self" type="application/rss+xml" />
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Next.js RSS Generator</generator>
    <webMaster>${siteConfig.email} (${escapeXml(siteConfig.name)})</webMaster>
    <copyright>Copyright ${new Date().getFullYear()} ${escapeXml(siteConfig.name)}</copyright>
    <ttl>60</ttl>
    ${blogPosts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map(post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.excerpt)}</description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <dc:creator>${escapeXml(siteConfig.name)}</dc:creator>
      ${post.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join('\n      ')}
    </item>`).join('')}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}