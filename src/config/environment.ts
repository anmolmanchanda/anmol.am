/**
 * Environment Configuration
 * Centralized environment variable management with type safety
 */

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue
  if (!value && !defaultValue) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value!
}

const getOptionalEnvVar = (key: string, defaultValue?: string): string | undefined => {
  return process.env[key] || defaultValue
}

export const config = {
  // Application
  app: {
    url: getEnvVar('NEXT_PUBLIC_SITE_URL', 'http://localhost:3000'),
    name: getEnvVar('NEXT_PUBLIC_APP_NAME', 'Anmol Manchanda Portfolio'),
    env: getEnvVar('NODE_ENV', 'development'),
    isDev: process.env.NODE_ENV === 'development',
    isProd: process.env.NODE_ENV === 'production',
  },

  // Email Service
  email: {
    provider: 'resend', // or 'sendgrid', 'smtp'
    resend: {
      apiKey: getOptionalEnvVar('RESEND_API_KEY'),
    },
    from: getOptionalEnvVar('EMAIL_FROM', 'noreply@anmol.am'),
    to: getOptionalEnvVar('EMAIL_TO', 'hi@anmol.am'),
  },

  // Database & Caching
  redis: {
    url: getOptionalEnvVar('REDIS_URL'),
    token: getOptionalEnvVar('REDIS_TOKEN'),
  },
  kv: {
    restApiUrl: getOptionalEnvVar('KV_REST_API_URL'),
    restApiToken: getOptionalEnvVar('KV_REST_API_TOKEN'),
  },

  // External APIs
  apis: {
    github: {
      token: getOptionalEnvVar('GITHUB_TOKEN'),
      username: getOptionalEnvVar('NEXT_PUBLIC_GITHUB_USERNAME', 'anmolmanchanda'),
    },
    strava: {
      clientId: getOptionalEnvVar('STRAVA_ClIENT_ID') || getOptionalEnvVar('STRAVA_CLIENT_ID'),
      clientSecret: getOptionalEnvVar('STRAVA_CLIENT_SECRET'),
      refreshToken: getOptionalEnvVar('STRAVA_REFRESH_TOKEN'),
      accessToken: getOptionalEnvVar('STRAVA_ACCESS_TOKEN'),
      athleteId: getOptionalEnvVar('STRAVA_ATHLETE_ID', '131445218'),
    },
    duolingo: {
      username: getOptionalEnvVar('DUOLINGO_USERNAME', 'manchandaanmol'),
    },
    letterboxd: {
      username: getOptionalEnvVar('LETTERBOXD_USERNAME', 'anmolmanchanda'),
    },
    goodreads: {
      userId: getOptionalEnvVar('GOODREADS_USER_ID', '83373769'),
    },
    wakatime: {
      apiKey: getOptionalEnvVar('WAKATIME_API_KEY'),
    },
    spotify: {
      clientId: getOptionalEnvVar('SPOTIFY_CLIENT_ID'),
      clientSecret: getOptionalEnvVar('SPOTIFY_CLIENT_SECRET'),
      refreshToken: getOptionalEnvVar('SPOTIFY_REFRESH_TOKEN'),
    },
  },

  // Analytics
  analytics: {
    vercelId: getOptionalEnvVar('NEXT_PUBLIC_VERCEL_ANALYTICS_ID'),
    gaId: getOptionalEnvVar('NEXT_PUBLIC_GA_MEASUREMENT_ID'),
  },

  // Security
  security: {
    jwtSecret: getOptionalEnvVar('JWT_SECRET'),
    encryptionKey: getOptionalEnvVar('ENCRYPTION_KEY'),
    ipSalt: getOptionalEnvVar('IP_SALT', 'default-salt-change-in-production'),
  },

  // Feature Flags
  features: {
    newsletter: getOptionalEnvVar('ENABLE_NEWSLETTER', 'true') === 'true',
    comments: getOptionalEnvVar('ENABLE_COMMENTS', 'false') === 'true',
    pwa: getOptionalEnvVar('ENABLE_PWA', 'true') === 'true',
    rss: getOptionalEnvVar('ENABLE_RSS', 'true') === 'true',
  },
} as const

export type Config = typeof config