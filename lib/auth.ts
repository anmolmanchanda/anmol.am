import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env['JWT_SECRET'] || 'your-secret-key-change-in-production'
)

export interface SessionPayload {
  userId: string
  role: string
  exp: number
}

export async function createSession(userId: string, role: string = 'admin'): Promise<string> {
  const token = await new SignJWT({ userId, role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // Session expires in 7 days
    .sign(JWT_SECRET)

  return token
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)

    // Validate the payload has required fields
    if (
      typeof payload['userId'] === 'string' &&
      typeof payload['role'] === 'string' &&
      typeof payload['exp'] === 'number'
    ) {
      return payload as unknown as SessionPayload
    }

    return null
  } catch {
    return null
  }
}

export function getSessionFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null

  const cookies = cookieHeader.split(';').map(c => c.trim())
  const sessionCookie = cookies.find(c => c.startsWith('admin_session='))

  if (!sessionCookie) return null

  const token = sessionCookie.split('=')[1]
  return token || null
}
