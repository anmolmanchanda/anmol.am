import toast from 'react-hot-toast'
import type { TrackerData } from '../types'

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  threshold: number
}

// Define achievements
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'bookworm',
    title: 'Bookworm',
    description: 'Read 50+ books this year',
    icon: '📚',
    threshold: 50
  },
  {
    id: 'poet',
    title: 'Poet',
    description: 'Wrote 50+ poems',
    icon: '✍️',
    threshold: 50
  },
  {
    id: 'runner',
    title: 'Marathon Runner',
    description: 'Ran 500+ km',
    icon: '🏃',
    threshold: 500
  },
  {
    id: 'polyglot',
    title: 'Polyglot',
    description: '100+ day language streak',
    icon: '🌍',
    threshold: 100
  },
  {
    id: 'meditation-master',
    title: 'Meditation Master',
    description: 'Meditated 150+ days',
    icon: '🧘',
    threshold: 150
  },
  {
    id: 'project-pro',
    title: 'Project Pro',
    description: 'Completed 50+ projects',
    icon: '🚀',
    threshold: 50
  },
  {
    id: 'globetrotter',
    title: 'Globetrotter',
    description: 'Visited 15+ countries',
    icon: '✈️',
    threshold: 15
  }
]

// Check for new achievements
export function checkAchievements(oldData: TrackerData | null, newData: TrackerData): Achievement[] {
  if (!oldData) return []

  const newAchievements: Achievement[] = []

  // Check book reading achievement
  if (oldData.booksReadThisYear < 50 && newData.booksReadThisYear >= 50) {
    newAchievements.push(ACHIEVEMENTS.find(a => a.id === 'bookworm')!)
  }

  // Check poetry achievement
  if (oldData.poemsWritten < 50 && newData.poemsWritten >= 50) {
    newAchievements.push(ACHIEVEMENTS.find(a => a.id === 'poet')!)
  }

  // Check running achievement
  if (oldData.kmRun < 500 && newData.kmRun >= 500) {
    newAchievements.push(ACHIEVEMENTS.find(a => a.id === 'runner')!)
  }

  // Check language streak achievement
  if (oldData.learning.french.streak < 100 && newData.learning.french.streak >= 100) {
    newAchievements.push(ACHIEVEMENTS.find(a => a.id === 'polyglot')!)
  }

  // Check meditation achievement
  if (oldData.daysMeditated < 150 && newData.daysMeditated >= 150) {
    newAchievements.push(ACHIEVEMENTS.find(a => a.id === 'meditation-master')!)
  }

  // Check projects achievement
  if (oldData.projectsCompleted < 50 && newData.projectsCompleted >= 50) {
    newAchievements.push(ACHIEVEMENTS.find(a => a.id === 'project-pro')!)
  }

  // Check travel achievement
  if (oldData.countriesVisited < 15 && newData.countriesVisited >= 15) {
    newAchievements.push(ACHIEVEMENTS.find(a => a.id === 'globetrotter')!)
  }

  return newAchievements.filter(Boolean)
}

// Show achievement notification
export function showAchievement(achievement: Achievement) {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <span className="text-4xl">{achievement.icon}</span>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-white">
                Achievement Unlocked!
              </p>
              <p className="mt-1 text-sm font-bold text-white">
                {achievement.title}
              </p>
              <p className="mt-1 text-xs text-white/80">
                {achievement.description}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-white/20">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-white hover:text-white/80 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    ),
    {
      duration: 6000,
      position: 'top-right',
    }
  )
}

// Show milestone notification
export function showMilestone(field: string, value: number | string) {
  toast.success(
    `Milestone reached: ${field} = ${value}!`,
    {
      duration: 4000,
      icon: '🎯',
      style: {
        borderRadius: '10px',
        background: '#10b981',
        color: '#fff',
      },
    }
  )
}

// Show stale data warning
export function showStaleDataWarning(field: string, daysSince: number) {
  toast(
    `${field} hasn't been updated in ${daysSince} days`,
    {
      duration: 5000,
      icon: '⚠️',
      style: {
        borderRadius: '10px',
        background: '#f59e0b',
        color: '#fff',
      },
    }
  )
}

// Show success notification
export function showSuccess(message: string) {
  toast.success(message, {
    duration: 3000,
    style: {
      borderRadius: '10px',
      background: '#10b981',
      color: '#fff',
    },
  })
}

// Show error notification
export function showError(message: string) {
  toast.error(message, {
    duration: 4000,
    style: {
      borderRadius: '10px',
      background: '#ef4444',
      color: '#fff',
    },
  })
}
