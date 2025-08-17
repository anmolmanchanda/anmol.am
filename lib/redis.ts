import { Redis } from '@upstash/redis'

// Initialize Redis client
export const redis = new Redis({
  url: process.env['UPSTASH_REDIS_REST_URL'] || '',
  token: process.env['UPSTASH_REDIS_REST_TOKEN'] || '',
})

// Helper function to safely get data
export async function getRedisData(key: string) {
  try {
    const data = await redis.get(key)
    return data
  } catch (error) {
    console.error(`Redis get error for key ${key}:`, error)
    return null
  }
}

// Helper function to safely set data
export async function setRedisData(key: string, value: any, ex?: number) {
  try {
    if (ex) {
      await redis.set(key, value, { ex })
    } else {
      await redis.set(key, value)
    }
    return true
  } catch (error) {
    console.error(`Redis set error for key ${key}:`, error)
    return false
  }
}