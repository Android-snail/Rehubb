"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { Heart, MessageCircle, Share2, Send } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import type { Post } from "@/lib/types"
import { cn } from "@/lib/utils"

interface PostCardProps {
  post: Post
  onLike: (postId: string) => void
  onComment: (postId: string, comment: string) => void
  onShare: (postId: string) => void
}

export function PostCard({ post, onLike, onComment, onShare }: PostCardProps) {
  const [commentText, setCommentText] = useState("")
  const [showComments, setShowComments] = useState(false)

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    onComment(post.id, commentText)
    setCommentText("")
  }

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{post.author.name}</div>
            <div className="text-sm text-muted-foreground flex items-center">
              <span>{post.author.role}</span>
              <span className="mx-1">•</span>
              <span>{formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        <p className="mb-4">{post.content}</p>
        {post.image && (
          <div className="relative h-64 w-full overflow-hidden rounded-md mb-4">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
          </div>
        )}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>{post.likes} likes</div>
          <div>{post.comments.length} comments</div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="p-2 flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onLike(post.id)}
          className={cn(post.isLiked && "text-primary")}
        >
          <Heart className={cn("mr-1 h-4 w-4", post.isLiked && "fill-primary")} />
          Like
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setShowComments(!showComments)}>
          <MessageCircle className="mr-1 h-4 w-4" />
          Comment
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onShare(post.id)}>
          <Share2 className="mr-1 h-4 w-4" />
          Share
        </Button>
      </CardFooter>

      {showComments && (
        <div className="px-4 pb-4">
          <Separator className="my-2" />
          <form onSubmit={handleSubmitComment} className="flex items-center space-x-2 mb-4">
            <Textarea
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="min-h-[60px]"
            />
            <Button type="submit" size="icon" disabled={!commentText.trim()} className="h-10 w-10 shrink-0">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send comment</span>
            </Button>
          </form>

          <div className="space-y-4">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                  <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-muted p-2 rounded-md">
                    <div className="font-semibold text-sm">{comment.author.name}</div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}

