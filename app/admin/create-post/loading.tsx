export default function Loading() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-4">
        <div className="h-10 w-48 bg-muted rounded-md animate-pulse" />
        <div className="h-6 w-full max-w-2xl bg-muted rounded-md animate-pulse" />

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <div className="h-5 w-20 bg-muted rounded-md animate-pulse" />
              <div className="h-10 w-full bg-muted rounded-md animate-pulse" />
            </div>

            <div className="space-y-2">
              <div className="h-5 w-24 bg-muted rounded-md animate-pulse" />
              <div className="h-40 w-full bg-muted rounded-md animate-pulse" />
            </div>

            <div className="space-y-2">
              <div className="h-5 w-32 bg-muted rounded-md animate-pulse" />
              <div className="h-10 w-full bg-muted rounded-md animate-pulse" />
            </div>

            <div className="flex justify-between pt-4">
              <div className="h-10 w-24 bg-muted rounded-md animate-pulse" />
              <div className="h-10 w-32 bg-muted rounded-md animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

