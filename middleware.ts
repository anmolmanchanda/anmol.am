import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Redirect /blog to /work
  if (pathname.startsWith('/blog')) {
    const newPath = pathname.replace('/blog', '/work')
    return NextResponse.redirect(new URL(newPath, request.url), 301)
  }
  
  // Redirect /personal to /life
  if (pathname === '/personal') {
    return NextResponse.redirect(new URL('/life', request.url), 301)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/blog/:path*', '/personal']
}