"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart } from "@/components/charts/line-chart"
import {
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Calendar,
  Bell,
  BookOpen,
} from "lucide-react"
import Link from "next/link"
import { PROPOSAL_STATUS } from "@/lib/constants"
import { getUserActivityData } from "@/lib/chart-utils"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [proposals, setProposals] = useState<any[]>([])
  const [notifications, setNotifications] = useState<any[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])
  const [resources, setResources] = useState<any[]>([])
  const [activityData, setActivityData] = useState(getUserActivityData())

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    // Mock proposals data
    setProposals([
      {
        id: 1,
        title: "Impact of Climate Change on Agricultural Practices",
        status: PROPOSAL_STATUS.SUBMITTED,
        submittedAt: "2023-10-15",
        updatedAt: "2023-10-15",
      },
      {
        id: 2,
        title: "Machine Learning Applications in Healthcare",
        status: PROPOSAL_STATUS.INITIAL_SCREENING,
        submittedAt: "2023-09-28",
        updatedAt: "2023-10-05",
      },
      {
        id: 3,
        title: "Sustainable Urban Development Strategies",
        status: PROPOSAL_STATUS.APPROVED_FOR_REVIEW,
        submittedAt: "2023-08-12",
        updatedAt: "2023-09-20",
      },
      {
        id: 4,
        title: "Psychological Effects of Remote Work",
        status: PROPOSAL_STATUS.REVISION_REQUIRED,
        submittedAt: "2023-07-05",
        updatedAt: "2023-08-15",
      },
    ])

    // Mock notifications
    setNotifications([
      {
        id: 1,
        title: "Proposal Status Update",
        message: "Your proposal 'Machine Learning Applications in Healthcare' has moved to initial screening.",
        time: "2 hours ago",
        read: false,
      },
      {
        id: 2,
        title: "Revision Required",
        message: "Your proposal 'Psychological Effects of Remote Work' requires revisions.",
        time: "1 day ago",
        read: true,
      },
      {
        id: 3,
        title: "New Resource Available",
        message: "A new research proposal template has been added to the resources section.",
        time: "3 days ago",
        read: true,
      },
    ])

    // Mock upcoming events
    setUpcomingEvents([
      {
        id: 1,
        title: "Proposal Submission Deadline",
        date: "2023-10-25",
        type: "deadline",
      },
      {
        id: 2,
        title: "Research Meeting",
        date: "2023-10-18",
        type: "meeting",
      },
      {
        id: 3,
        title: "Grant Application Due",
        date: "2023-11-05",
        type: "deadline",
      },
    ])

    // Mock resources
    setResources([
      {
        id: 1,
        title: "Research Proposal Template",
        type: "template",
        format: "docx",
      },
      {
        id: 2,
        title: "Literature Review Guide",
        type: "guide",
        format: "pdf",
      },
      {
        id: 3,
        title: "Data Analysis Methods",
        type: "guide",
        format: "pdf",
      },
    ])
  }, [])

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
          <Badge
            variant="default"
            className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300"
          >
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
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300"
          >
            Revision Required
          </Badge>
        )
      case PROPOSAL_STATUS.FINAL_REVISION:
        return <Badge variant="secondary">Final Revision</Badge>
      case PROPOSAL_STATUS.RESUBMITTED:
        return <Badge variant="secondary">Resubmitted</Badge>
      case PROPOSAL_STATUS.NTP_ISSUED:
        return (
          <Badge
            variant="default"
            className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300"
          >
            NTP Issued
          </Badge>
        )
      case PROPOSAL_STATUS.CLEARANCE_REQUIRED:
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300"
          >
            Clearance Required
          </Badge>
        )
      case PROPOSAL_STATUS.CLEARANCE_SUBMITTED:
        return <Badge variant="secondary">Clearance Submitted</Badge>
      case PROPOSAL_STATUS.COMPLETED:
        return (
          <Badge
            variant="default"
            className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300"
          >
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getEventBadge = (type: string) => {
    switch (type) {
      case "deadline":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300"
          >
            Deadline
          </Badge>
        )
      case "meeting":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300"
          >
            Meeting
          </Badge>
        )
      case "event":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300"
          >
            Event
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  if (!user) {
    return null // Or a loading spinner
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.name}! Here&ampos;s an overview of your research activities.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/submit-proposal">
            <FileText className="mr-2 h-4 w-4" />
            Submit New Proposal
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Proposals</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{proposals.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all stages</p>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                proposals.filter(
                  (p) => p.status === PROPOSAL_STATUS.SUBMITTED || p.status === PROPOSAL_STATUS.INITIAL_SCREENING,
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting feedback</p>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                proposals.filter(
                  (p) =>
                    p.status === PROPOSAL_STATUS.APPROVED_FOR_REVIEW ||
                    p.status === PROPOSAL_STATUS.IN_HOUSE_REVIEW ||
                    p.status === PROPOSAL_STATUS.NTP_ISSUED ||
                    p.status === PROPOSAL_STATUS.COMPLETED,
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground mt-1">Moving forward</p>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Needs Attention</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                proposals.filter(
                  (p) =>
                    p.status === PROPOSAL_STATUS.REVISION_REQUIRED || p.status === PROPOSAL_STATUS.CLEARANCE_REQUIRED,
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground mt-1">Requires your action</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2 lg:col-span-1 card-hover">
          <CardHeader>
            <CardTitle>Recent Proposals</CardTitle>
            <CardDescription>Your most recent research proposals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {proposals.slice(0, 3).map((proposal) => (
                <div
                  key={proposal.id}
                  className="flex items-start justify-between p-3 border rounded-md hover:border-primary hover:bg-accent/10 transition-all duration-200"
                >
                  <div className="space-y-1">
                    <Link href={`/dashboard/my-proposals/${proposal.id}`} className="font-medium hover:underline">
                      {proposal.title}
                    </Link>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(proposal.status)}
                      <span className="text-xs text-muted-foreground">Updated {proposal.updatedAt}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/dashboard/my-proposals/${proposal.id}`}>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/my-proposals">
                View All Proposals
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>Your research activity over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] chart-gradient-bg">
            <LineChart data={activityData} gradient={true} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-hover">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
            </CardTitle>
            <Badge>{notifications.filter((n) => !n.read).length}</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No notifications</p>
              ) : (
                notifications.slice(0, 3).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 border rounded-md ${!notification.read ? "bg-primary/5 border-primary/20" : ""}`}
                  >
                    <div className="font-medium">{notification.title}</div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full">
              View All Notifications
            </Button>
          </CardFooter>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No upcoming events</p>
              ) : (
                upcomingEvents.slice(0, 3).map((event) => (
                  <div key={event.id} className="p-3 border rounded-md">
                    <div className="font-medium">{event.title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      {getEventBadge(event.type)}
                      <span className="text-xs text-muted-foreground">{formatDate(event.date)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link href="/dashboard/calendar">View Calendar</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="card-hover">
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resources.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No resources available</p>
              ) : (
                resources.slice(0, 3).map((resource) => (
                  <div key={resource.id} className="p-3 border rounded-md">
                    <div className="font-medium">{resource.title}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{resource.type}</Badge>
                      <Badge variant="outline">{resource.format.toUpperCase()}</Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link href="/dashboard/resources">Browse Resources</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Research Progress</CardTitle>
          <CardDescription>Track your overall research progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Proposal Completion</div>
                <div className="text-sm text-muted-foreground">50%</div>
              </div>
              <Progress value={50} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Data Collection</div>
                <div className="text-sm text-muted-foreground">25%</div>
              </div>
              <Progress value={25} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Analysis</div>
                <div className="text-sm text-muted-foreground">10%</div>
              </div>
              <Progress value={10} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Publication</div>
                <div className="text-sm text-muted-foreground">0%</div>
              </div>
              <Progress value={0} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

