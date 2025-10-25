export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  technologies: string[]
  image: string
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  category: 'web' | 'mobile' | 'api' | 'enterprise' | 'ai' | 'automation' | 'blockchain' | 'other'
  date: string
  type?: 'work' | 'personal' | 'mixed'
  blogArticle?: string
  metrics?: {
    [key: string]: string | number
  }
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  tags: string[]
  readingTime: number
  slug: string
  category: 'technical' | 'personal' | 'thoughts'
  image?: string
  gradient?: string
  icon?: React.ReactNode
  views?: number
  featured?: boolean
}

export interface Skill {
  name: string
  icon?: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  category: 'cloud' | 'languages' | 'ai' | 'tools'
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  description: string
  technologies: string[]
  achievements: string[]
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}