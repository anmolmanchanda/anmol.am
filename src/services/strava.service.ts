/**
 * Strava API Service
 * Handles OAuth token refresh and activity fetching
 */

import { config } from '@/src/config/environment'

interface StravaTokens {
  access_token: string
  refresh_token: string
  expires_at: number
}

interface StravaActivity {
  id: number
  name: string
  distance: number
  moving_time: number
  elapsed_time: number
  total_elevation_gain: number
  type: string
  start_date: string
  start_date_local: string
  timezone: string
  achievement_count: number
  kudos_count: number
  comment_count: number
  athlete_count: number
  photo_count: number
  map: {
    summary_polyline: string
  }
  average_speed: number
  max_speed: number
  average_cadence?: number
  average_heartrate?: number
  max_heartrate?: number
  elev_high?: number
  elev_low?: number
}

interface StravaStats {
  recent_run_totals: {
    count: number
    distance: number
    moving_time: number
    elapsed_time: number
    elevation_gain: number
  }
  all_run_totals: {
    count: number
    distance: number
    moving_time: number
    elapsed_time: number
    elevation_gain: number
  }
  ytd_run_totals: {
    count: number
    distance: number
    moving_time: number
    elapsed_time: number
    elevation_gain: number
  }
}

class StravaService {
  private baseUrl = 'https://www.strava.com/api/v3'
  private tokenUrl = 'https://www.strava.com/oauth/token'
  private cachedTokens: StravaTokens | null = null

  /**
   * Refresh access token using refresh token
   */
  private async refreshAccessToken(): Promise<StravaTokens> {
    if (!config.apis.strava.clientId || !config.apis.strava.clientSecret || !config.apis.strava.refreshToken) {
      throw new Error('Strava OAuth credentials not configured')
    }

    try {
      const response = await fetch(this.tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: config.apis.strava.clientId,
          client_secret: config.apis.strava.clientSecret,
          grant_type: 'refresh_token',
          refresh_token: config.apis.strava.refreshToken,
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to refresh token: ${response.statusText}`)
      }

      const tokens = await response.json()
      this.cachedTokens = tokens
      
      // TODO: Save new refresh token to environment or database
      // The refresh token may change, so we need to persist it
      
      return tokens
    } catch (error) {
      console.error('Error refreshing Strava token:', error)
      throw error
    }
  }

  /**
   * Get valid access token (refresh if expired)
   */
  private async getValidToken(): Promise<string> {
    if (this.cachedTokens && this.cachedTokens.expires_at > Date.now() / 1000) {
      return this.cachedTokens.access_token
    }

    const tokens = await this.refreshAccessToken()
    return tokens.access_token
  }

  /**
   * Fetch athlete's recent activities
   */
  async getActivities(page = 1, perPage = 30): Promise<StravaActivity[]> {
    try {
      const token = await this.getValidToken()
      
      const response = await fetch(
        `${this.baseUrl}/athlete/activities?page=${page}&per_page=${perPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch activities: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching Strava activities:', error)
      return []
    }
  }

  /**
   * Get athlete stats
   */
  async getAthleteStats(): Promise<StravaStats | null> {
    try {
      const token = await this.getValidToken()
      const athleteId = config.apis.strava.athleteId

      const response = await fetch(
        `${this.baseUrl}/athletes/${athleteId}/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch stats: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error fetching Strava stats:', error)
      return null
    }
  }

  /**
   * Format distance from meters to kilometers
   */
  formatDistance(meters: number): string {
    return `${(meters / 1000).toFixed(2)} km`
  }

  /**
   * Format time from seconds to readable format
   */
  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m ${secs}s`
  }

  /**
   * Format pace (min/km)
   */
  formatPace(seconds: number, meters: number): string {
    const minutesPerKm = (seconds / 60) / (meters / 1000)
    const paceMinutes = Math.floor(minutesPerKm)
    const paceSeconds = Math.round((minutesPerKm - paceMinutes) * 60)
    return `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')} /km`
  }

  /**
   * Get formatted stats for display
   */
  async getFormattedStats() {
    const stats = await this.getAthleteStats()
    if (!stats) return null

    return {
      totalRuns: stats.all_run_totals.count,
      totalDistance: this.formatDistance(stats.all_run_totals.distance),
      totalDistanceRaw: stats.all_run_totals.distance / 1000, // in km
      thisYear: {
        runs: stats.ytd_run_totals.count,
        distance: this.formatDistance(stats.ytd_run_totals.distance),
        time: this.formatTime(stats.ytd_run_totals.moving_time),
        elevation: `${stats.ytd_run_totals.elevation_gain}m`,
      },
      recent: {
        runs: stats.recent_run_totals.count,
        distance: this.formatDistance(stats.recent_run_totals.distance),
        time: this.formatTime(stats.recent_run_totals.moving_time),
      },
    }
  }

  /**
   * Get recent activities formatted for timeline
   */
  async getTimelineActivities(limit = 10) {
    const activities = await this.getActivities(1, limit)
    
    return activities
      .filter(activity => activity.type === 'Run' || activity.type === 'Ride')
      .map(activity => ({
        id: `strava-${activity.id}`,
        title: activity.name,
        description: `${this.formatDistance(activity.distance)} in ${this.formatTime(activity.moving_time)} • Pace: ${this.formatPace(activity.moving_time, activity.distance)}`,
        type: 'fitness',
        timestamp: new Date(activity.start_date),
        url: `https://www.strava.com/activities/${activity.id}`,
        tags: [
          activity.type,
          'Strava',
          `${Math.round(activity.distance / 1000)}km`,
        ],
        metadata: {
          distance: activity.distance,
          duration: activity.moving_time,
          elevation: activity.total_elevation_gain,
          pace: this.formatPace(activity.moving_time, activity.distance),
          kudos: activity.kudos_count,
        },
      }))
  }
}

// Export singleton instance
export const stravaService = new StravaService()

// Export for use in API routes
export async function fetchStravaStats() {
  return stravaService.getFormattedStats()
}

export async function fetchStravaActivities() {
  return stravaService.getTimelineActivities()
}