// Content Stream Configuration
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

// Newsletter subscription preferences
export interface SubscriptionPreference {
  email: string
  streams: ContentStream[]
  frequency: 'immediate' | 'weekly' | 'monthly'
  createdAt: string
  confirmed: boolean
}

// Content filtering
export function filterContentByStream<T extends { stream?: ContentStream }>(
  content: T[],
  stream: ContentStream
): T[] {
  if (stream === 'all') return content
  return content.filter(item => item.stream === stream)
}

// Buttondown API integration
export class NewsletterService {
  private apiKey: string
  private baseUrl = 'https://api.buttondown.email/v1'
  
  constructor(apiKey: string = process.env.BUTTONDOWN_API_KEY || '') {
    this.apiKey = apiKey
  }
  
  async subscribeToStream(
    email: string,
    stream: ContentStream
  ): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/subscribers`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          tags: [stream],
          referrer_url: 'https://anmol.am'
        })
      })
      
      return response.ok
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      return false
    }
  }
  
  async sendToStream(
    stream: ContentStream,
    subject: string,
    content: string
  ): Promise<boolean> {
    try {
      const tag = stream === 'all' ? undefined : stream
      
      const response = await fetch(`${this.baseUrl}/emails`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subject,
          body: content,
          tag: tag // Only send to subscribers of this stream
        })
      })
      
      return response.ok
    } catch (error) {
      console.error('Newsletter send error:', error)
      return false
    }
  }
}

// Usage in your components
export function useContentStream() {
  // This would be a React hook
  const [currentStream, setCurrentStream] = useState<ContentStream>('work')
  
  return {
    currentStream,
    setCurrentStream,
    streams: CONTENT_STREAMS,
    filterContent: <T extends { stream?: ContentStream }>(content: T[]) => 
      filterContentByStream(content, currentStream)
  }
}