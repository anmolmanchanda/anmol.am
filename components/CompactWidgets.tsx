"use client"

import { ExternalLink } from "lucide-react"

interface WidgetProps {
  title: string
  value: string | number
  subtitle?: string
  url?: string
  icon: React.ReactNode
  color: string
}

export function CompactWidget({ title, value, subtitle, url, icon, color }: WidgetProps) {
  const content = (
    <div className={`liquid-glass rounded-lg border backdrop-blur-md p-3 hover:shadow-md transition-all ${url ? 'cursor-pointer' : ''}`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${color}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground truncate">{title}</p>
          <p className="text-lg font-bold">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
          )}
        </div>
        {url && (
          <ExternalLink className="w-3 h-3 text-muted-foreground" />
        )}
      </div>
    </div>
  )

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    )
  }

  return content
}

interface WidgetGridProps {
  widgets: Array<{
    title: string
    value: string | number
    subtitle?: string
    url?: string
    icon: React.ReactNode
    color: string
  }>
}

export function WidgetGrid({ widgets }: WidgetGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {widgets.map((widget) => (
        <CompactWidget key={widget.title} {...widget} />
      ))}
    </div>
  )
}