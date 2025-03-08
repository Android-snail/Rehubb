import type { Metadata } from "next"
import Link from "next/link"
import { Cpu, ArrowLeft, Filter, Search, SlidersHorizontal } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "IEET Studies | ResearchHub",
  description: "Industry, Energy and Emerging Technology Research",
}

// Sample data for IEET studies
const ieetStudies = [
  {
    id: "ieet-001",
    title: "Renewable Energy Integration in Industrial Manufacturing",
    status: "Active",
    category: "Energy",
    tags: ["Renewable Energy", "Manufacturing", "Sustainability"],
    lead: "Dr. Ricardo Torres",
    institution: "Center for Sustainable Energy Research",
    date: "2023-05-10",
    excerpt:
      "This study explores effective strategies for integrating renewable energy sources into industrial manufacturing processes to reduce carbon footprint while maintaining productivity and cost-effectiveness.",
  },
  {
    id: "ieet-002",
    title: "AI-Driven Quality Control Systems for Small and Medium Enterprises",
    status: "Active",
    category: "Industry",
    tags: ["Artificial Intelligence", "Quality Control", "SMEs"],
    lead: "Dr. Lisa Wong",
    institution: "Industrial Technology Institute",
    date: "2023-03-15",
    excerpt:
      "Development and implementation of affordable AI-based quality control systems specifically designed for small and medium enterprises to improve product quality and reduce waste.",
  },
  {
    id: "ieet-003",
    title: "Blockchain Applications for Supply Chain Transparency",
    status: "Active",
    category: "Emerging Technology",
    tags: ["Blockchain", "Supply Chain", "Transparency"],
    lead: "Dr. Michael Chen",
    institution: "Digital Innovation Research Center",
    date: "2023-04-22",
    excerpt:
      "Investigating practical applications of blockchain technology to enhance transparency, traceability, and efficiency in supply chains across various industries.",
  },
  {
    id: "ieet-004",
    title: "Smart Grid Technologies for Urban Energy Management",
    status: "Active",
    category: "Energy",
    tags: ["Smart Grid", "Urban Planning", "Energy Efficiency"],
    lead: "Dr. Sophia Rodriguez",
    institution: "Urban Energy Systems Laboratory",
    date: "2023-02-28",
    excerpt:
      "Research on advanced smart grid technologies and systems for optimizing energy distribution, consumption, and management in urban environments.",
  },
  {
    id: "ieet-005",
    title: "Augmented Reality Applications in Industrial Training and Maintenance",
    status: "Active",
    category: "Emerging Technology",
    tags: ["Augmented Reality", "Industrial Training", "Maintenance"],
    lead: "Dr. James Park",
    institution: "Advanced Manufacturing Research Institute",
    date: "2023-06-05",
    excerpt:
      "Exploring the effectiveness of augmented reality technologies in industrial training programs and maintenance procedures to improve worker performance and safety.",
  },
]

export default function IEETStudiesPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
          <Link href="/dashboard/studies">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <Cpu className="h-6 w-6 text-blue-600" />
            <span>IEET Studies</span>
          </h1>
          <p className="text-muted-foreground">Industry, Energy and Emerging Technology Research</p>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search IEET studies..." className="w-full pl-9" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Sort
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="industry">Industry</TabsTrigger>
          <TabsTrigger value="energy">Energy</TabsTrigger>
          <TabsTrigger value="emerging-tech">Emerging Technology</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6">
        {ieetStudies.map((study) => (
          <Card key={study.id} className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl hover:text-primary hover:underline">
                    <Link href={`/dashboard/studies/ieet/${study.id}`}>{study.title}</Link>
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {study.lead} · {study.institution}
                  </CardDescription>
                </div>
                <Badge variant={study.status === "Active" ? "default" : "outline"}>{study.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{study.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  {study.category}
                </Badge>
                {study.tags.map((tag, i) => (
                  <Badge key={i} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/40 px-6 py-3 text-sm text-muted-foreground">
              <span>Started: {new Date(study.date).toLocaleDateString()}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

