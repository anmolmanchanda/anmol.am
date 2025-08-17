export function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  )
}

export function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-4 bg-muted rounded w-3/4"></div>
      <div className="h-4 bg-muted rounded"></div>
      <div className="h-4 bg-muted rounded w-5/6"></div>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-6 space-y-4">
      <div className="skeleton h-40 rounded-lg"></div>
      <div className="space-y-2">
        <div className="skeleton h-4 rounded w-3/4"></div>
        <div className="skeleton h-3 rounded"></div>
        <div className="skeleton h-3 rounded w-5/6"></div>
      </div>
      <div className="flex gap-2">
        <div className="skeleton h-6 rounded-full w-16"></div>
        <div className="skeleton h-6 rounded-full w-20"></div>
        <div className="skeleton h-6 rounded-full w-18"></div>
      </div>
    </div>
  )
}