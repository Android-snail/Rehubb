"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Download, FileText, BookOpen, Video, LinkIcon, Filter } from "lucide-react"

// Mock resources data
const mockResources = [
  {
    id: 1,
    title: "Research Proposal Template",
    description: "A comprehensive template for creating research proposals with all required sections.",
    type: "template",
    format: "docx",
    downloads: 245,
    updatedAt: "2023-09-15",
  },
  {
    id: 2,
    title: "Literature Review Guide",
    description: "Step-by-step guide for conducting and writing an effective literature review.",
    type: "guide",
    format: "pdf",
    downloads: 189,
    updatedAt: "2023-08-22",
  },
  {
    id: 3,
    title: "Research Ethics Checklist",
    description: "Checklist to ensure your research meets ethical standards and requirements.",
    type: "checklist",
    format: "pdf",
    downloads: 156,
    updatedAt: "2023-10-05",
  },
  {
    id: 4,
    title: "Data Analysis Methods",
    description: "Overview of common data analysis methods for different types of research.",
    type: "guide",
    format: "pdf",
    downloads: 210,
    updatedAt: "2023-07-18",
  },
  {
    id: 5,
    title: "Budget Planning Spreadsheet",
    description: "Template for planning and tracking your research budget.",
    type: "template",
    format: "xlsx",
    downloads: 178,
    updatedAt: "2023-09-30",
  },
  {
    id: 6,
    title: "Research Presentation Template",
    description: "Professional template for presenting your research findings.",
    type: "template",
    format: "pptx",
    downloads: 132,
    updatedAt: "2023-08-12",
  },
  {
    id: 7,
    title: "Grant Writing Tutorial",
    description: "Video tutorial on writing effective grant applications.",
    type: "video",
    format: "mp4",
    downloads: 98,
    updatedAt: "2023-10-10",
  },
  {
    id: 8,
    title: "Academic Writing Style Guide",
    description: "Guide to academic writing conventions and best practices.",
    type: "guide",
    format: "pdf",
    downloads: 167,
    updatedAt: "2023-09-08",
  },
]

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [resourceType, setResourceType] = useState("all")

  const filteredResources = mockResources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = resourceType === "all" || resource.type === resourceType

    return matchesSearch && matchesType
  })

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "template":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "guide":
        return <BookOpen className="h-5 w-5 text-green-500" />
      case "checklist":
        return <FileText className="h-5 w-5 text-yellow-500" />
      case "video":
        return <Video className="h-5 w-5 text-red-500" />
      default:
        return <FileText className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getFormatBadge = (format: string) => {
    switch (format) {
      case "pdf":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300"
          >
            PDF
          </Badge>
        )
      case "docx":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300"
          >
            DOCX
          </Badge>
        )
      case "xlsx":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300"
          >
            XLSX
          </Badge>
        )
      case "pptx":
        return (
          <Badge
            variant="outline"
            className="bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-300"
          >
            PPTX
          </Badge>
        )
      case "mp4":
        return (
          <Badge
            variant="outline"
            className="bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300"
          >
            MP4
          </Badge>
        )
      default:
        return <Badge variant="outline">{format.toUpperCase()}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
          <p className="text-muted-foreground">Access helpful guides, templates, and tools for your research</p>
        </div>
        <Button>
          <LinkIcon className="h-4 w-4 mr-2" />
          Suggest Resource
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Tabs defaultValue="all" value={resourceType} onValueChange={setResourceType}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="template">Templates</TabsTrigger>
              <TabsTrigger value="guide">Guides</TabsTrigger>
              <TabsTrigger value="checklist">Checklists</TabsTrigger>
              <TabsTrigger value="video">Videos</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-md transition-all duration-200">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getResourceIcon(resource.type)}
                  <div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      {getFormatBadge(resource.format)}
                      <span className="text-xs text-muted-foreground">
                        Updated: {new Date(resource.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{resource.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-xs text-muted-foreground">{resource.downloads} downloads</div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Popular Resources</CardTitle>
          <CardDescription>Most downloaded resources in the past month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockResources
              .sort((a, b) => b.downloads - a.downloads)
              .slice(0, 5)
              .map((resource, index) => (
                <div
                  key={resource.id}
                  className="flex items-start gap-4 p-3 border rounded-md hover:border-primary hover:bg-accent/10 transition-all duration-200"
                >
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{resource.title}</div>
                        <div className="flex items-center gap-2 mt-1">
                          {getFormatBadge(resource.format)}
                          <span className="text-xs text-muted-foreground">{resource.downloads} downloads</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

