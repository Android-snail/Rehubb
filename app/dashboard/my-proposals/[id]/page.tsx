"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, CheckCircle, Clock, Download, FileText, MessageSquare, Upload } from "lucide-react"
import { PROPOSAL_STATUS } from "@/lib/constants"

export default function ProposalDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [proposal, setProposal] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Simulate API call to get proposal details
    const fetchProposal = async () => {
      setIsLoading(true)
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock proposal data
        const mockProposal = {
          id: Number(params.id),
          title: "Impact of Climate Change on Agricultural Practices",
          status: PROPOSAL_STATUS.INITIAL_SCREENING,
          submittedAt: "2023-10-15",
          updatedAt: "2023-10-20",
          abstract:
            "This research aims to investigate the effects of climate change on agricultural practices in tropical regions. The study will analyze data from the past decade to identify trends and patterns in crop yields, farming techniques, and adaptation strategies in response to changing climate conditions.",
          category: "Environmental Science",
          timeline: "12 months",
          budget: "$25,000",
          team: [
            { name: "Dr. Jane Smith", role: "Principal Investigator" },
            { name: "Dr. John Davis", role: "Co-Investigator" },
            { name: "Sarah Johnson", role: "Research Assistant" },
          ],
          documents: [
            { name: "Full Proposal.pdf", size: "2.4 MB", date: "2023-10-15" },
            { name: "Budget Breakdown.xlsx", size: "1.1 MB", date: "2023-10-15" },
            { name: "Research Timeline.pdf", size: "0.8 MB", date: "2023-10-15" },
          ],
          reviews: [
            {
              id: 1,
              reviewer: "Initial Screening Committee",
              date: "2023-10-18",
              status: "In Progress",
              comments:
                "Currently under review by the initial screening committee. Feedback will be provided within 7 working days.",
            },
          ],
          history: [
            { date: "2023-10-15", action: "Proposal submitted", user: "You" },
            { date: "2023-10-16", action: "Received by URO", user: "System" },
            { date: "2023-10-17", action: "Assigned to Initial Screening Committee", user: "Admin" },
            { date: "2023-10-18", action: "Initial screening in progress", user: "System" },
          ],
        }

        setProposal(mockProposal)
      } catch (error) {
        console.error("Error fetching proposal:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProposal()
  }, [params.id])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case PROPOSAL_STATUS.DRAFT:
        return <Badge variant="outline">Draft</Badge>
      case PROPOSAL_STATUS.SUBMITTED:
        return <Badge variant="secondary">Submitted</Badge>
      case PROPOSAL_STATUS.INITIAL_SCREENING:
        return <Badge variant="secondary">Initial Screening</Badge>
      case PROPOSAL_STATUS.APPROVED_FOR_REVIEW:
        return (
          <Badge variant="success" className="bg-green-100 text-green-800 hover:bg-green-200">
            Approved for Review
          </Badge>
        )
      case PROPOSAL_STATUS.DISAPPROVED:
        return <Badge variant="destructive">Disapproved</Badge>
      case PROPOSAL_STATUS.IN_HOUSE_REVIEW:
        return <Badge variant="secondary">In-House Review</Badge>
      case PROPOSAL_STATUS.ETHICS_REVIEW:
        return <Badge variant="secondary">Ethics Review</Badge>
      case PROPOSAL_STATUS.REVISION_REQUIRED:
        return (
          <Badge variant="warning" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            Revision Required
          </Badge>
        )
      case PROPOSAL_STATUS.FINAL_REVISION:
        return <Badge variant="secondary">Final Revision</Badge>
      case PROPOSAL_STATUS.RESUBMITTED:
        return <Badge variant="secondary">Resubmitted</Badge>
      case PROPOSAL_STATUS.NTP_ISSUED:
        return (
          <Badge variant="success" className="bg-green-100 text-green-800 hover:bg-green-200">
            NTP Issued
          </Badge>
        )
      case PROPOSAL_STATUS.CLEARANCE_REQUIRED:
        return (
          <Badge variant="warning" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            Clearance Required
          </Badge>
        )
      case PROPOSAL_STATUS.CLEARANCE_SUBMITTED:
        return <Badge variant="secondary">Clearance Submitted</Badge>
      case PROPOSAL_STATUS.COMPLETED:
        return (
          <Badge variant="success" className="bg-green-100 text-green-800 hover:bg-green-200">
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleSubmitRevision = async () => {
    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update proposal status
      setProposal((prev) => ({
        ...prev,
        status: PROPOSAL_STATUS.RESUBMITTED,
        history: [
          { date: new Date().toISOString().split("T")[0], action: "Revision submitted", user: "You" },
          ...prev.history,
        ],
      }))

      setFeedback("")
    } catch (error) {
      console.error("Error submitting revision:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitClearance = async () => {
    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update proposal status
      setProposal((prev) => ({
        ...prev,
        status: PROPOSAL_STATUS.CLEARANCE_SUBMITTED,
        history: [
          { date: new Date().toISOString().split("T")[0], action: "Clearance submitted", user: "You" },
          ...prev.history,
        ],
      }))
    } catch (error) {
      console.error("Error submitting clearance:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Clock className="h-10 w-10 text-muted-foreground mx-auto mb-4 animate-pulse" />
          <p>Loading proposal details...</p>
        </div>
      </div>
    )
  }

  if (!proposal) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p>Proposal not found</p>
          <Button asChild className="mt-4">
            <Link href="/dashboard/my-proposals">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to My Proposals
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Button variant="outline" size="sm" asChild className="mb-2">
            <Link href="/dashboard/my-proposals">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to My Proposals
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{proposal.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {getStatusBadge(proposal.status)}
            <span className="text-sm text-muted-foreground">Submitted: {proposal.submittedAt}</span>
            <span className="text-sm text-muted-foreground">Last updated: {proposal.updatedAt}</span>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Proposal Overview</CardTitle>
              <CardDescription>Basic information about your research proposal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-medium">Research Category</h3>
                  <p className="text-sm">{proposal.category}</p>
                </div>
                <div>
                  <h3 className="font-medium">Current Status</h3>
                  <div className="flex items-center gap-2">{getStatusBadge(proposal.status)}</div>
                </div>
                <div>
                  <h3 className="font-medium">Timeline</h3>
                  <p className="text-sm">{proposal.timeline}</p>
                </div>
                <div>
                  <h3 className="font-medium">Budget</h3>
                  <p className="text-sm">{proposal.budget}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium">Abstract</h3>
                <p className="text-sm mt-2">{proposal.abstract}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium">Research Team</h3>
                <ul className="mt-2 space-y-1">
                  {proposal.team.map((member: any, index: number) => (
                    <li key={index} className="text-sm">
                      <span className="font-medium">{member.name}</span> - {member.role}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {proposal.status === PROPOSAL_STATUS.REVISION_REQUIRED && (
            <Card>
              <CardHeader>
                <CardTitle>Submit Revision</CardTitle>
                <CardDescription>
                  Your proposal requires revisions. Please address the feedback and submit your revised proposal.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Revision Notes</h3>
                  <Textarea
                    placeholder="Describe the changes you've made in response to the feedback..."
                    rows={4}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </div>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">Upload your revised proposal documents</p>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSubmitRevision} disabled={isSubmitting || !feedback.trim()}>
                  {isSubmitting ? "Submitting..." : "Submit Revision"}
                </Button>
              </CardFooter>
            </Card>
          )}

          {proposal.status === PROPOSAL_STATUS.CLEARANCE_REQUIRED && (
            <Card>
              <CardHeader>
                <CardTitle>Submit Clearance</CardTitle>
                <CardDescription>
                  Please submit your clearance documents before proceeding with data gathering.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Notice to Proceed (NTP) Issued</AlertTitle>
                  <AlertDescription>
                    Your proposal has been approved. Please submit the required clearance documents before beginning
                    data collection.
                  </AlertDescription>
                </Alert>
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">Upload your clearance documents</p>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSubmitClearance} disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Clearance"}
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="documents" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Proposal Documents</CardTitle>
              <CardDescription>All documents related to your research proposal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {proposal.documents.map((doc: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 mr-3 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.size} • Uploaded on {doc.date}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Review Feedback</CardTitle>
              <CardDescription>Feedback and comments from reviewers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {proposal.reviews.length === 0 ? (
                <div className="text-center py-6">
                  <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No reviews available yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {proposal.reviews.map((review: any) => (
                    <div key={review.id} className="p-4 border rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{review.reviewer}</h3>
                        <Badge variant={review.status === "In Progress" ? "outline" : "secondary"}>
                          {review.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Date: {review.date}</p>
                      <p className="text-sm">{review.comments}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Proposal History</CardTitle>
              <CardDescription>Timeline of events related to your proposal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-0">
                {proposal.history.map((event: any, index: number) => (
                  <div key={index} className="flex gap-4 pb-8 last:pb-0">
                    <div className="relative flex h-full w-6 items-center justify-center">
                      <div className="absolute h-full w-px bg-border" />
                      <div className="relative z-10 h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <div className="flex-1 pb-2">
                      <p className="text-sm font-medium">{event.action}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span>{event.date}</span>
                        <span className="mx-1">•</span>
                        <span>{event.user}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

