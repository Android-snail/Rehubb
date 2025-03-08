export function FeedSkeleton() {
  return (
    <div className="space-y-6 py-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-muted rounded-md animate-pulse" />
                <div className="h-3 w-24 bg-muted rounded-md animate-pulse" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-muted rounded-md animate-pulse" />
              <div className="h-4 w-full bg-muted rounded-md animate-pulse" />
              <div className="h-4 w-2/3 bg-muted rounded-md animate-pulse" />
            </div>
            <div className="h-40 bg-muted rounded-md animate-pulse" />
            <div className="flex justify-between">
              <div className="h-8 w-20 bg-muted rounded-md animate-pulse" />
              <div className="h-8 w-20 bg-muted rounded-md animate-pulse" />
              <div className="h-8 w-20 bg-muted rounded-md animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

