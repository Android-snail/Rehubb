import type { Post } from "./types"

export function getMockPosts(): Post[] {
  return [
    {
      id: "post-1",
      title: "New Research Grant Opportunities",
      content:
        "We're excited to announce new grant opportunities for researchers in the fields of environmental science, renewable energy, and sustainable development. Applications open next week!",
      author: {
        name: "Dr. Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Research Director",
      },
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      image: "/placeholder.svg?height=400&width=600",
      likes: 42,
      isLiked: false,
      comments: [
        {
          id: "comment-1",
          author: {
            name: "Prof. Michael Chen",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Senior Researcher",
          },
          content: "This is fantastic news! Will there be any webinars to discuss the application process?",
          timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "comment-2",
          author: {
            name: "Dr. Sarah Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Research Director",
          },
          content: "Yes, we'll be hosting a webinar next Tuesday at 2 PM. Registration details will be sent via email.",
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: "post-2",
      title: "Upcoming Workshop: Research Methodology",
      content:
        "Join us for a comprehensive workshop on advanced research methodologies and data analysis techniques. Perfect for both new and experienced researchers looking to enhance their skills.",
      author: {
        name: "Prof. David Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Workshop Coordinator",
      },
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      likes: 28,
      isLiked: false,
      comments: [
        {
          id: "comment-3",
          author: {
            name: "Dr. Lisa Rodriguez",
            avatar: "/placeholder.svg?height=40&width=40",
            role: "Assistant Professor",
          },
          content: "Will this workshop cover qualitative research methods as well?",
          timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: "post-3",
      title: "Congratulations to Our Recent Grant Recipients",
      content:
        "We're proud to announce the recipients of this quarter's research grants. These innovative projects span multiple disciplines and promise significant contributions to their respective fields.",
      author: {
        name: "Dr. Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Research Director",
      },
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
      image: "/placeholder.svg?height=400&width=600",
      likes: 56,
      isLiked: true,
      comments: [],
    },
  ]
}

