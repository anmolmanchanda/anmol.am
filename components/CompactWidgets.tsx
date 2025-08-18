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
    <div className={`liquid-glass rounded-lg border backdrop-blur-md p-3 sm:p-4 hover:shadow-md transition-all ${url ? 'cursor-pointer hover:scale-[1.02]' : ''} min-h-[80px]`}>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className={`p-1.5 sm:p-2 rounded-lg ${color} shrink-0`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm text-muted-foreground truncate">{title}</p>
          <p className="text-base sm:text-lg font-bold truncate">{value}</p>
          {subtitle && (
            <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{subtitle}</p>
          )}
        </div>
        {url && (
          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground shrink-0" />
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 widget-grid">
      {widgets.map((widget) => (
        <CompactWidget key={widget.title} {...widget} />
      ))}
    </div>
  )
}