import { FeedSkeleton } from "@/components/feed/feed-skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-4">
        <div className="h-10 w-48 bg-muted rounded-md animate-pulse" />
        <div className="h-6 w-full max-w-2xl bg-muted rounded-md animate-pulse" />
        <FeedSkeleton />
      </div>
    </div>
  )
}

