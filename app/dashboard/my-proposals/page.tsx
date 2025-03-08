"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, FileText, Plus, Search } from "lucide-react"
import { PROPOSAL_STATUS } from "@/lib/constants"

export default function MyProposalsPage() {
  const [proposals, setProposals] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
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
      {
        id: 5,
        title: "Renewable Energy Integration in Power Grids",
        status: PROPOSAL_STATUS.IN_HOUSE_REVIEW,
        submittedAt: "2023-06-20",
        updatedAt: "2023-07-10",
      },
      {
        id: 6,
        title: "Biodiversity Conservation in Urban Areas",
        status: PROPOSAL_STATUS.NTP_ISSUED,
        submittedAt: "2023-05-15",
        updatedAt: "2023-06-25",
      },
      {
        id: 7,
        title: "Microplastics in Marine Ecosystems",
        status: PROPOSAL_STATUS.CLEARANCE_REQUIRED,
        submittedAt: "2023-04-10",
        updatedAt: "2023-05-20",
      },
      {
        id: 8,
        title: "Artificial Intelligence Ethics Framework",
        status: PROPOSAL_STATUS.COMPLETED,
        submittedAt: "2023-03-05",
        updatedAt: "2023-04-15",
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

  const filteredProposals = proposals.filter((proposal) => {
    const matchesSearch = proposal.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || proposal.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const activeProposals = filteredProposals.filter(
    (p) => p.status !== PROPOSAL_STATUS.COMPLETED && p.status !== PROPOSAL_STATUS.DISAPPROVED,
  )

  const completedProposals = filteredProposals.filter(
    (p) => p.status === PROPOSAL_STATUS.COMPLETED || p.status === PROPOSAL_STATUS.DISAPPROVED,
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Proposals</h1>
          <p className="text-muted-foreground">View and manage all your research proposals.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/submit-proposal">
            <Plus className="mr-2 h-4 w-4" />
            New Proposal
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search proposals..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value={PROPOSAL_STATUS.DRAFT}>Draft</SelectItem>
            <SelectItem value={PROPOSAL_STATUS.SUBMITTED}>Submitted</SelectItem>
            <SelectItem value={PROPOSAL_STATUS.INITIAL_SCREENING}>Initial Screening</SelectItem>
            <SelectItem value={PROPOSAL_STATUS.APPROVED_FOR_REVIEW}>Approved for Review</SelectItem>
            <SelectItem value={PROPOSAL_STATUS.IN_HOUSE_REVIEW}>In-House Review</SelectItem>
            <SelectItem value={PROPOSAL_STATUS.REVISION_REQUIRED}>Revision Required</SelectItem>
            <SelectItem value={PROPOSAL_STATUS.NTP_ISSUED}>NTP Issued</SelectItem>
            <SelectItem value={PROPOSAL_STATUS.COMPLETED}>Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active ({activeProposals.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedProposals.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4 mt-4">
          {activeProposals.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <FileText className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="font-medium text-lg">No active proposals found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Submit your first research proposal to get started"}
              </p>
              {!searchTerm && statusFilter === "all" && (
                <Button asChild>
                  <Link href="/dashboard/submit-proposal">
                    <Plus className="mr-2 h-4 w-4" />
                    New Proposal
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {activeProposals.map((proposal) => (
                <Card key={proposal.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <Link
                          href={`/dashboard/my-proposals/${proposal.id}`}
                          className="font-medium hover:underline text-lg"
                        >
                          {proposal.title}
                        </Link>
                        <div className="flex flex-wrap items-center gap-2">
                          {getStatusBadge(proposal.status)}
                          <span className="text-xs text-muted-foreground">Submitted: {proposal.submittedAt}</span>
                          <span className="text-xs text-muted-foreground">Last updated: {proposal.updatedAt}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dashboard/my-proposals/${proposal.id}`}>
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-4">
          {completedProposals.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <FileText className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="font-medium text-lg">No completed proposals found</h3>
              <p className="text-muted-foreground">
                {searchTerm || statusFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Your completed proposals will appear here"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {completedProposals.map((proposal) => (
                <Card key={proposal.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <Link
                          href={`/dashboard/my-proposals/${proposal.id}`}
                          className="font-medium hover:underline text-lg"
                        >
                          {proposal.title}
                        </Link>
                        <div className="flex flex-wrap items-center gap-2">
                          {getStatusBadge(proposal.status)}
                          <span className="text-xs text-muted-foreground">Submitted: {proposal.submittedAt}</span>
                          <span className="text-xs text-muted-foreground">Last updated: {proposal.updatedAt}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dashboard/my-proposals/${proposal.id}`}>
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

