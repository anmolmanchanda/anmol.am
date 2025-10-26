'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { HistoricalDataPoint } from '../types'

interface LifeStatsChartProps {
  data: HistoricalDataPoint[]
  selectedMetrics: string[]
}

const METRIC_CONFIG = {
  booksReadThisYear: { color: '#3b82f6', name: 'Books Read' },
  poemsWritten: { color: '#10b981', name: 'Poems Written' },
  kmRun: { color: '#f59e0b', name: 'KM Run' },
  coffeesConsumed: { color: '#ef4444', name: 'Coffees' }
}

export function LifeStatsChart({ data, selectedMetrics }: LifeStatsChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        No historical data available yet
      </div>
    )
  }

  const formattedData = data.map(point => ({
    ...point,
    date: new Date(point.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={formattedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
          stroke="currentColor"
          className="text-muted-foreground"
        />
        <YAxis
          tick={{ fontSize: 12 }}
          stroke="currentColor"
          className="text-muted-foreground"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '0.5rem'
          }}
        />
        <Legend />

        {selectedMetrics.includes('booksReadThisYear') && (
          <Line
            type="monotone"
            dataKey="booksReadThisYear"
            stroke={METRIC_CONFIG.booksReadThisYear.color}
            name={METRIC_CONFIG.booksReadThisYear.name}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        )}

        {selectedMetrics.includes('poemsWritten') && (
          <Line
            type="monotone"
            dataKey="poemsWritten"
            stroke={METRIC_CONFIG.poemsWritten.color}
            name={METRIC_CONFIG.poemsWritten.name}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        )}

        {selectedMetrics.includes('kmRun') && (
          <Line
            type="monotone"
            dataKey="kmRun"
            stroke={METRIC_CONFIG.kmRun.color}
            name={METRIC_CONFIG.kmRun.name}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        )}

        {selectedMetrics.includes('coffeesConsumed') && (
          <Line
            type="monotone"
            dataKey="coffeesConsumed"
            stroke={METRIC_CONFIG.coffeesConsumed.color}
            name={METRIC_CONFIG.coffeesConsumed.name}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  )
}
