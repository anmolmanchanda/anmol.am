// Content Stream Configuration (Simplified)
export type ContentStream = 'work' | 'personal' | 'all'

export interface StreamConfig {
  id: ContentStream
  name: string
  description: string
  icon: string
  color: string
  defaultVisible: boolean
}

export const CONTENT_STREAMS: Record<ContentStream, StreamConfig> = {
  work: {
    id: 'work',
    name: 'Technical & Professional',
    description: 'Enterprise projects, technical deep-dives, and professional insights',
    icon: '💼',
    color: 'from-blue-500 to-purple-600',
    defaultVisible: true
  },
  personal: {
    id: 'personal',
    name: 'Personal & Life',
    description: 'Personal projects, life updates, and thoughts',
    icon: '🌟',
    color: 'from-green-500 to-teal-600',
    defaultVisible: false
  },
  all: {
    id: 'all',
    name: 'Everything',
    description: 'All content from both streams',
    icon: '🎯',
    color: 'from-purple-500 to-pink-600',
    defaultVisible: false
  }
}

// Content filtering helper
export function filterContentByStream<T extends { stream?: ContentStream }>(
  content: T[],
  stream: ContentStream
): T[] {
  if (stream === 'all') return content
  return content.filter(item => item.stream === stream)
}