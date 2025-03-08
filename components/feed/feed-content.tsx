"use client"

import { useState, useEffect } from "react"
import { PostCard } from "@/components/feed/post-card"
import { getMockPosts } from "@/lib/mock-data"
import type { Post } from "@/lib/types"
import { FeedSkeleton } from "@/components/feed/feed-skeleton"

export function FeedContent() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchPosts = async () => {
      try {
        setLoading(true)
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const data = getMockPosts()
        setPosts(data)
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
              isLiked: !post.isLiked,
            }
          : post,
      ),
    )
  }

  const handleComment = (postId: string, comment: string) => {
    if (!comment.trim()) return

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: `comment-${Date.now()}`,
                  author: {
                    name: "Current User",
                    avatar: "/placeholder.svg?height=40&width=40",
                    role: "Researcher",
                  },
                  content: comment,
                  timestamp: new Date().toISOString(),
                },
              ],
            }
          : post,
      ),
    )
  }

  const handleShare = (postId: string) => {
    // In a real app, this would open a share dialog or copy a link
    const post = posts.find((p) => p.id === postId)
    if (post) {
      alert(`Sharing post: ${post.title}`)
      // You could implement actual sharing functionality here
    }
  }

  if (loading) {
    return <FeedSkeleton />
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
        <p className="text-muted-foreground">Check back later for updates and announcements.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 py-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onLike={handleLike} onComment={handleComment} onShare={handleShare} />
      ))}
    </div>
  )
}

