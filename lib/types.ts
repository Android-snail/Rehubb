export interface Author {
  name: string
  avatar: string
  role: string
}

export interface Comment {
  id: string
  author: Author
  content: string
  timestamp: string
}

export interface Post {
  id: string
  title: string
  content: string
  author: Author
  timestamp: string
  image?: string
  likes: number
  isLiked: boolean
  comments: Comment[]
}

