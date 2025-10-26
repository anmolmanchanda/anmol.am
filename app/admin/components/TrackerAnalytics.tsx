'use client'

import { TrendingUp, Zap, Target, Award, AlertCircle } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { TrackerData } from '../types'

interface TrackerAnalyticsProps {
  currentData: TrackerData | null
  loading: boolean
}

export function TrackerAnalytics({ currentData, loading }: TrackerAnalyticsProps) {
  if (loading || !currentData) {
    return (
      <div className="glass-morphism rounded-xl border backdrop-blur-md p-12 text-center">
        <AlertCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">Loading tracker analytics...</p>
      </div>
    )
  }

  // Life vs Work stats comparison
  const lifeVsWorkData = [
    {
      category: 'Life',
      Books: currentData.booksReadThisYear,
      Poems: currentData.poemsWritten,
      'KM Run': Math.round(currentData.kmRun / 10), // Scale down for visualization
      Coffees: Math.round(currentData.coffeesConsumed / 10), // Scale down
      Countries: currentData.countriesVisited,
      Languages: currentData.languagesSpoken,
      Cuisines: currentData.cuisinesMastered,
      'Days Meditated': currentData.daysMeditated
    },
    {
      category: 'Work',
      Cities: currentData.citiesImpacted,
      Experience: currentData.yearsExperience,
      Projects: currentData.projectsCompleted
    }
  ]

  // Achievements and insights
  const achievements = []
  const insights = []

  // Check for achievements
  if (currentData.booksReadThisYear >= 50) {
    achievements.push({ icon: Award, title: 'Bookworm', description: `${currentData.booksReadThisYear} books read this year!`, color: 'text-yellow-500' })
  }
  if (currentData.poemsWritten >= 50) {
    achievements.push({ icon: Award, title: 'Poet', description: `${currentData.poemsWritten} poems written!`, color: 'text-purple-500' })
  }
  if (currentData.kmRun >= 500) {
    achievements.push({ icon: Award, title: 'Runner', description: `${currentData.kmRun} km run!`, color: 'text-green-500' })
  }
  if (currentData.learning.french.streak >= 100) {
    achievements.push({ icon: Award, title: 'Polyglot', description: `${currentData.learning.french.streak}-day French streak!`, color: 'text-blue-500' })
  }

  // Generate insights
  if (currentData.daysMeditated > 150) {
    insights.push({ icon: Zap, title: 'Meditation Master', description: `${currentData.daysMeditated} days of meditation - you're building a strong mindfulness practice!`, color: 'text-indigo-500' })
  }
  if (currentData.learning.aws.progress >= 80) {
    insights.push({ icon: Target, title: 'AWS Pro', description: `${currentData.learning.aws.progress}% complete on ${currentData.learning.aws.target}. You're almost there!`, color: 'text-orange-500' })
  }
  if (currentData.coffeesConsumed > 1000) {
    insights.push({ icon: TrendingUp, title: 'Coffee Enthusiast', description: `${currentData.coffeesConsumed} coffees consumed. That's a lot of caffeine!`, color: 'text-amber-500' })
  }
  if (currentData.projectsCompleted >= 50) {
    insights.push({ icon: Target, title: 'Project Pro', description: `${currentData.projectsCompleted} projects completed. You're crushing it!`, color: 'text-emerald-500' })
  }

  return (
    <div className="space-y-6">
      {/* Achievements */}
      {achievements.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="glass-morphism rounded-xl border backdrop-blur-md p-4">
                <div className="flex items-center gap-3">
                  <achievement.icon className={`w-8 h-8 ${achievement.color}`} />
                  <div>
                    <h3 className="font-semibold">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Insights */}
      {insights.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4">Insights</h2>
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div key={index} className="glass-morphism rounded-xl border backdrop-blur-md p-4">
                <div className="flex items-center gap-3">
                  <insight.icon className={`w-6 h-6 ${insight.color}`} />
                  <div>
                    <h3 className="font-semibold text-sm">{insight.title}</h3>
                    <p className="text-xs text-muted-foreground">{insight.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Life Stats Breakdown */}
      <section className="glass-morphism rounded-xl border backdrop-blur-md p-6">
        <h2 className="text-xl font-bold mb-4">Life Stats Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[lifeVsWorkData[0]]}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="category" tick={{ fontSize: 12 }} stroke="currentColor" />
            <YAxis tick={{ fontSize: 12 }} stroke="currentColor" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem'
              }}
            />
            <Legend />
            <Bar dataKey="Books" fill="#3b82f6" />
            <Bar dataKey="Poems" fill="#8b5cf6" />
            <Bar dataKey="Countries" fill="#10b981" />
            <Bar dataKey="Languages" fill="#f59e0b" />
            <Bar dataKey="Cuisines" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* Learning Progress */}
      <section className="glass-morphism rounded-xl border backdrop-blur-md p-6">
        <h2 className="text-xl font-bold mb-4">Learning Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* French Learning */}
          <div>
            <h3 className="font-semibold mb-2">French (Duolingo)</h3>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Level: {currentData.learning.french.level}</span>
                <span>{currentData.learning.french.streak} day streak</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min((currentData.learning.french.streak / 100) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* AWS Learning */}
          <div>
            <h3 className="font-semibold mb-2">AWS Certification</h3>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>{currentData.learning.aws.target}</span>
                <span>{currentData.learning.aws.progress}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${currentData.learning.aws.progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="glass-morphism rounded-xl border backdrop-blur-md p-6">
        <h2 className="text-xl font-bold mb-4">Current Tech Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold text-sm mb-2 text-blue-400">LLMs</h3>
            <div className="flex flex-wrap gap-2">
              {currentData.currentlyUsing.llms.map((llm, i) => (
                <span key={i} className="px-2 py-1 bg-blue-500/20 rounded-md text-xs">{llm}</span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2 text-green-400">Frameworks</h3>
            <div className="flex flex-wrap gap-2">
              {currentData.currentlyUsing.frameworks.map((fw, i) => (
                <span key={i} className="px-2 py-1 bg-green-500/20 rounded-md text-xs">{fw}</span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2 text-purple-400">Databases</h3>
            <div className="flex flex-wrap gap-2">
              {currentData.currentlyUsing.databases.map((db, i) => (
                <span key={i} className="px-2 py-1 bg-purple-500/20 rounded-md text-xs">{db}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
