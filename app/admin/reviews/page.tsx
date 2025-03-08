"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Search, Filter, MoreHorizontal, Eye, Edit, Download, CheckCircle, Clock, AlertTriangle } from "lucide-react"

// Mock review data
const mockReviews = [
  {
    id: 1,
    proposalTitle: "Impact of Climate Change on Agricultural Practices",
    proposalId: "P-2023-001",
    reviewer: {
      name: "Dr. Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Environmental Science",
    },
    status: "completed",
    rating: 4.5,
    submittedAt: "2023-10-15T14:30:00Z",
    dueDate: "2023-10-20T00:00:00Z",
  },
  {
    id: 2,
    proposalTitle: "Machine Learning Applications in Healthcare",
    proposalId: "P-2023-002",
    reviewer: {
      name: "Dr. John Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Computer Science",
    },
    status: "in_progress",
    rating: null,
    submittedAt: null,
    dueDate: "2023-10-25T00:00:00Z",
  },
  {
    id: 3,
    proposalTitle: "Sustainable Urban Development Strategies",
    proposalId: "P-2023-003",
    reviewer: {
      name: "Prof. Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Urban Planning",
    },
    status: "completed",
    rating: 3.8,
    submittedAt: "2023-10-12T09:45:00Z",
    dueDate: "2023-10-18T00:00:00Z",
  },
  {
    id: 4,
    proposalTitle: "Psychological Effects of Remote Work",
    proposalId: "P-2023-004",
    reviewer: {
      name: "Dr. Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Psychology",
    },
    status: "pending",
    rating: null,
    submittedAt: null,
    dueDate: "2023-11-05T00:00:00Z",
  },
  {
    id: 5,
    proposalTitle: "Renewable Energy Integration in Power Grids",
    proposalId: "P-2023-005",
    reviewer: {
      name: "Dr. Robert Brown",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Electrical Engineering",
    },
    status: "overdue",
    rating: null,
    submittedAt: null,
    dueDate: "2023-10-10T00:00:00Z",
  },
]

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedReview, setSelectedReview] = useState<any>(null)
  const [showViewDialog, setShowViewDialog] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch reviews
    const fetchReviews = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would fetch from an API
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setReviews(mockReviews)
      } catch (error) {
        console.error("Error fetching reviews:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const handleViewReview = (review: any) => {
    setSelectedReview(review)
    setShowViewDialog(true)
  }

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.proposalTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.proposalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.reviewer.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || review.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300">
            Completed
          </Badge>
        )
      case "in_progress":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300">
            In Progress
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300">
            Pending
          </Badge>
        )
      case "overdue":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300">
            Overdue
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in_progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "overdue":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const renderRating = (rating: number | null) => {
    if (rating === null) return "N/A"

    return (
      <div className="flex items-center">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`h-4 w-4 ${
                star <= Math.floor(rating)
                  ? "text-yellow-400"
                  : star - 0.5 <= rating
                    ? "text-yellow-400"
                    : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Review Management</h1>
          <p className="text-muted-foreground">Manage and track reviews for research proposals</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Reviews</CardTitle>
              <CardDescription>
                {filteredReviews.length} {filteredReviews.length === 1 ? "review" : "reviews"} found
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search reviews..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[130px]">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Export</span>
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-60">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-60 text-center">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No reviews found</h3>
              <p className="text-muted-foreground mt-1">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "No reviews are currently available"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Proposal</TableHead>
                    <TableHead>Reviewer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{review.proposalTitle}</div>
                          <div className="text-sm text-muted-foreground">{review.proposalId}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={review.reviewer.avatar} alt={review.reviewer.name} />
                            <AvatarFallback>{review.reviewer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{review.reviewer.name}</div>
                            <div className="text-sm text-muted-foreground">{review.reviewer.department}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(review.status)}</TableCell>
                      <TableCell>{renderRating(review.rating)}</TableCell>
                      <TableCell>{formatDate(review.dueDate)}</TableCell>
                      <TableCell>{formatDate(review.submittedAt)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleViewReview(review)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Review
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download Report
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Review Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Review Details</DialogTitle>
            <DialogDescription>Detailed information about the selected review</DialogDescription>
          </DialogHeader>
          {selectedReview && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                {getStatusIcon(selectedReview.status)}
                <div>
                  <h3 className="text-xl font-bold">{selectedReview.proposalTitle}</h3>
                  <div className="text-sm text-muted-foreground">{selectedReview.proposalId}</div>
                  <div className="flex items-center gap-2 mt-1">{getStatusBadge(selectedReview.status)}</div>
                </div>
              </div>

              <Tabs defaultValue="summary">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                <TabsContent value="summary" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Reviewer</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={selectedReview.reviewer.avatar} alt={selectedReview.reviewer.name} />
                          <AvatarFallback>{selectedReview.reviewer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p>{selectedReview.reviewer.name}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{selectedReview.reviewer.department}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Rating</h4>
                      <div className="mt-1">{renderRating(selectedReview.rating)}</div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Due Date</h4>
                      <p>{formatDate(selectedReview.dueDate)}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Submitted Date</h4>
                      <p>{formatDate(selectedReview.submittedAt)}</p>
                    </div>
                  </div>

                  {selectedReview.status === "completed" && (
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Review Summary</h4>
                      <p className="mt-1">
                        This proposal presents a well-structured research plan with clear objectives and methodology.
                        The literature review is comprehensive and the proposed timeline is realistic. The budget
                        allocation is appropriate for the scope of work. Overall, this is a strong proposal that
                        addresses an important research question with potential for significant impact in the field.
                      </p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="comments" className="space-y-4 mt-4">
                  {selectedReview.status === "completed" ? (
                    <div className="space-y-4">
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium">Strengths</h4>
                        <ul className="mt-2 space-y-2 list-disc pl-5">
                          <li>Clear research objectives and questions</li>
                          <li>Comprehensive literature review</li>
                          <li>Appropriate methodology for the research questions</li>
                          <li>Realistic timeline and budget</li>
                        </ul>
                      </div>
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium">Areas for Improvement</h4>
                        <ul className="mt-2 space-y-2 list-disc pl-5">
                          <li>Consider expanding the sample size for better statistical power</li>
                          <li>More details needed on data analysis methods</li>
                          <li>Address potential limitations more thoroughly</li>
                        </ul>
                      </div>
                      <div className="p-4 border rounded-md">
                        <h4 className="font-medium">Additional Comments</h4>
                        <p className="mt-2">
                          This is a promising proposal that addresses an important gap in the literature. With some
                          minor revisions, it has the potential to make a significant contribution to the field.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-40 text-center">
                      <p className="text-muted-foreground">
                        {selectedReview.status === "overdue"
                          ? "This review is overdue. No comments have been submitted."
                          : "No comments available yet. Review is still in progress."}
                      </p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="history" className="space-y-4 mt-4">
                  <div className="relative space-y-0">
                    <div className="flex gap-4 pb-8">
                      <div className="relative flex h-full w-6 items-center justify-center">
                        <div className="absolute h-full w-px bg-border" />
                        <div className="relative z-10 h-2 w-2 rounded-full bg-primary" />
                      </div>
                      <div className="flex-1 pb-2">
                        <p className="text-sm font-medium">Review assigned</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span>October 5, 2023</span>
                          <span className="mx-1">•</span>
                          <span>System</span>
                        </div>
                      </div>
                    </div>

                    {selectedReview.status === "completed" && (
                      <div className="flex gap-4 pb-8">
                        <div className="relative flex h-full w-6 items-center justify-center">
                          <div className="absolute h-full w-px bg-border" />
                          <div className="relative z-10 h-2 w-2 rounded-full bg-primary" />
                        </div>
                        <div className="flex-1 pb-2">
                          <p className="text-sm font-medium">Review submitted</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>{formatDate(selectedReview.submittedAt)}</span>
                            <span className="mx-1">•</span>
                            <span>{selectedReview.reviewer.name}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedReview.status === "in_progress" && (
                      <div className="flex gap-4 pb-8">
                        <div className="relative flex h-full w-6 items-center justify-center">
                          <div className="absolute h-full w-px bg-border" />
                          <div className="relative z-10 h-2 w-2 rounded-full bg-primary" />
                        </div>
                        <div className="flex-1 pb-2">
                          <p className="text-sm font-medium">Review started</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>October 10, 2023</span>
                            <span className="mx-1">•</span>
                            <span>{selectedReview.reviewer.name}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedReview.status === "overdue" && (
                      <div className="flex gap-4 pb-8">
                        <div className="relative flex h-full w-6 items-center justify-center">
                          <div className="absolute h-full w-px bg-border" />
                          <div className="relative z-10 h-2 w-2 rounded-full bg-red-500" />
                        </div>
                        <div className="flex-1 pb-2">
                          <p className="text-sm font-medium">Review overdue</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>{formatDate(selectedReview.dueDate)}</span>
                            <span className="mx-1">•</span>
                            <span>System</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewDialog(false)}>
              Close
            </Button>
            {selectedReview && selectedReview.status === "completed" && <Button>Download Report</Button>}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

