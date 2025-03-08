import { Suspense } from "react"
import { FeedContent } from "@/components/feed/feed-content"
import { FeedSkeleton } from "@/components/feed/feed-skeleton"

export default function FeedPage() {
  return (
    <div className="container mx-auto py-6 animate-fadeIn">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Feed</h1>
        </div>
        <p className="text-muted-foreground">
          Stay updated with the latest announcements, news, and updates from the research community.
        </p>
        <Suspense fallback={<FeedSkeleton />}>
          <FeedContent />
        </Suspense>
      </div>
    </div>
  )
}

