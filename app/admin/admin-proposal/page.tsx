"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  FileText,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash,
  Download,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"

// Mock proposal data
const mockProposals = [
  {
    id: 1,
    title: "Annual Budget Allocation for Research Departments",
    type: "budget",
    status: "approved",
    priority: "high",
    submittedBy: "Admin User",
    submittedAt: "2023-10-15T14:30:00Z",
    dueDate: "2023-11-15T00:00:00Z",
  },
  {
    id: 2,
    title: "New Equipment Purchase for Laboratory Facilities",
    type: "procurement",
    status: "pending",
    priority: "medium",
    submittedBy: "Admin User",
    submittedAt: "2023-10-14T09:15:00Z",
    dueDate: "2023-11-01T00:00:00Z",
  },
  {
    id: 3,
    title: "Research Staff Hiring Plan for Q1 2024",
    type: "staffing",
    status: "pending",
    priority: "high",
    submittedBy: "Admin User",
    submittedAt: "2023-10-13T11:20:00Z",
    dueDate: "2023-12-01T00:00:00Z",
  },
  {
    id: 4,
    title: "Policy Updates for Research Ethics Committee",
    type: "policy",
    status: "rejected",
    priority: "medium",
    submittedBy: "Admin User",
    submittedAt: "2023-10-10T16:45:00Z",
    dueDate: "2023-10-30T00:00:00Z",
  },
  {
    id: 5,
    title: "Annual Conference Planning and Budget",
    type: "event",
    status: "approved",
    priority: "medium",
    submittedBy: "Admin User",
    submittedAt: "2023-10-08T10:30:00Z",
    dueDate: "2023-11-15T00:00:00Z",
  },
  {
    id: 6,
    title: "Software License Renewals for Research Tools",
    type: "procurement",
    status: "pending",
    priority: "low",
    submittedBy: "Admin User",
    submittedAt: "2023-10-05T13:45:00Z",
    dueDate: "2023-10-25T00:00:00Z",
  },
]

export default function AdminProposalPage() {
  const router = useRouter()
  const [proposals, setProposals] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedProposal, setSelectedProposal] = useState<any>(null)
  const [showViewDialog, setShowViewDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [newProposal, setNewProposal] = useState({
    title: "",
    type: "budget",
    priority: "medium",
    description: "",
    dueDate: "",
  })

  useEffect(() => {
    // Simulate API call to fetch proposals
    const fetchProposals = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would fetch from an API
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setProposals(mockProposals)
      } catch (error) {
        console.error("Error fetching proposals:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProposals()
  }, [])

  const handleViewProposal = (proposal: any) => {
    setSelectedProposal(proposal)
    setShowViewDialog(true)
  }

  const handleEditProposal = (proposal: any) => {
    router.push(`/admin/admin-proposal/${proposal.id}/edit`)
  }

  const handleDeleteProposal = (proposal: any) => {
    setSelectedProposal(proposal)
    setShowDeleteDialog(true)
  }

  const confirmDeleteProposal = async () => {
    // Simulate API call to delete proposal
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setProposals(proposals.filter((proposal) => proposal.id !== selectedProposal.id))
      setShowDeleteDialog(false)
    } catch (error) {
      console.error("Error deleting proposal:", error)
    }
  }

  const handleCreateProposal = async () => {
    // Validate form
    if (!newProposal.title || !newProposal.type || !newProposal.priority || !newProposal.dueDate) {
      alert("Please fill in all required fields")
      return
    }

    // Simulate API call to create proposal
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newId = Math.max(...proposals.map((p) => p.id)) + 1
      const createdProposal = {
        id: newId,
        ...newProposal,
        status: "pending",
        submittedBy: "Admin User",
        submittedAt: new Date().toISOString(),
      }

      setProposals([createdProposal, ...proposals])
      setShowCreateDialog(false)
      setNewProposal({
        title: "",
        type: "budget",
        priority: "medium",
        description: "",
        dueDate: "",
      })
    } catch (error) {
      console.error("Error creating proposal:", error)
    }
  }

  const filteredProposals = proposals.filter((proposal) => {
    const matchesSearch =
      proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proposal.type.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || proposal.type === typeFilter
    const matchesStatus = statusFilter === "all" || proposal.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300">
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300">
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300"
          >
            High
          </Badge>
        )
      case "medium":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300"
          >
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300"
          >
            Low
          </Badge>
        )
      default:
        return <Badge variant="outline">{priority}</Badge>
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Proposals</h1>
          <p className="text-muted-foreground">Manage administrative proposals for budgets, policies, and operations</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Proposal
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Proposals</CardTitle>
              <CardDescription>
                {filteredProposals.length} {filteredProposals.length === 1 ? "proposal" : "proposals"} found
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search proposals..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-[130px]">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <SelectValue placeholder="Type" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="budget">Budget</SelectItem>
                    <SelectItem value="procurement">Procurement</SelectItem>
                    <SelectItem value="staffing">Staffing</SelectItem>
                    <SelectItem value="policy">Policy</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[130px]">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="Status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
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
          ) : filteredProposals.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-60 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No proposals found</h3>
              <p className="text-muted-foreground mt-1">
                {searchTerm || typeFilter !== "all" || statusFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Create a new proposal to get started"}
              </p>
              {!searchTerm && typeFilter === "all" && statusFilter === "all" && (
                <Button className="mt-4" onClick={() => setShowCreateDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Proposal
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProposals.map((proposal) => (
                    <TableRow key={proposal.id}>
                      <TableCell className="font-medium">{proposal.title}</TableCell>
                      <TableCell className="capitalize">{proposal.type}</TableCell>
                      <TableCell>{getStatusBadge(proposal.status)}</TableCell>
                      <TableCell>{getPriorityBadge(proposal.priority)}</TableCell>
                      <TableCell>{formatDate(proposal.dueDate)}</TableCell>
                      <TableCell>{formatDate(proposal.submittedAt)}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleViewProposal(proposal)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditProposal(proposal)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Proposal
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteProposal(proposal)}
                              className="text-red-600 dark:text-red-400"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete Proposal
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

      {/* View Proposal Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Proposal Details</DialogTitle>
            <DialogDescription>Detailed information about the selected proposal</DialogDescription>
          </DialogHeader>
          {selectedProposal && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                {getStatusIcon(selectedProposal.status)}
                <div>
                  <h3 className="text-xl font-bold">{selectedProposal.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm capitalize">{selectedProposal.type}</span>
                    <span className="text-muted-foreground">•</span>
                    {getStatusBadge(selectedProposal.status)}
                    <span className="text-muted-foreground">•</span>
                    {getPriorityBadge(selectedProposal.priority)}
                  </div>
                </div>
              </div>

              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="attachments">Attachments</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Submitted By</h4>
                      <p>{selectedProposal.submittedBy}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Submitted Date</h4>
                      <p>{formatDate(selectedProposal.submittedAt)}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Due Date</h4>
                      <p>{formatDate(selectedProposal.dueDate)}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Proposal ID</h4>
                      <p>#{selectedProposal.id}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
                    <p className="mt-1">
                      This is a detailed description of the proposal. It includes information about the purpose, scope,
                      and expected outcomes of the proposal. The description provides context for reviewers and
                      stakeholders to understand the proposal's objectives and requirements.
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="timeline" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <div>
                        <p className="text-sm">Proposal created</p>
                        <p className="text-xs text-muted-foreground">{formatDate(selectedProposal.submittedAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <div>
                        <p className="text-sm">Initial review completed</p>
                        <p className="text-xs text-muted-foreground">October 18, 2023</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                      <div>
                        <p className="text-sm">Pending final approval</p>
                        <p className="text-xs text-muted-foreground">Current status</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="attachments" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>proposal_details.pdf</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded-md">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>budget_breakdown.xlsx</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowViewDialog(false)}>
              Close
            </Button>
            {selectedProposal && (
              <Button
                onClick={() => {
                  setShowViewDialog(false)
                  handleEditProposal(selectedProposal)
                }}
              >
                Edit Proposal
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Proposal Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Proposal</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this proposal? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {selectedProposal && (
            <div className="py-4">
              <h3 className="font-medium">{selectedProposal.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm capitalize">{selectedProposal.type}</span>
                <span className="text-muted-foreground">•</span>
                {getStatusBadge(selectedProposal.status)}
              </div>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteProposal} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Create Proposal Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Proposal</DialogTitle>
            <DialogDescription>Fill in the details to create a new administrative proposal</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Proposal Title</Label>
              <Input
                id="title"
                value={newProposal.title}
                onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
                placeholder="Enter proposal title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Proposal Type</Label>
                <Select
                  value={newProposal.type}
                  onValueChange={(value) => setNewProposal({ ...newProposal, type: value })}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">Budget</SelectItem>
                    <SelectItem value="procurement">Procurement</SelectItem>
                    <SelectItem value="staffing">Staffing</SelectItem>
                    <SelectItem value="policy">Policy</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newProposal.priority}
                  onValueChange={(value) => setNewProposal({ ...newProposal, priority: value })}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newProposal.description}
                onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
                placeholder="Enter proposal description"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={newProposal.dueDate}
                onChange={(e) => setNewProposal({ ...newProposal, dueDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="attachments">Attachments</Label>
              <div className="border-2 border-dashed rounded-md p-6 text-center">
                <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-2">Drag and drop files here, or click to browse</p>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Files
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateProposal}>Create Proposal</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

