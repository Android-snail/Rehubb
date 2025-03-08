import Link from "next/link"
import { Brain, Filter, Search, SlidersHorizontal } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for SCINNB studies
const scinnb
TabsList, TabsTrigger
} from "@/components/ui/tabs"

// Sample data for SCINNB studies
const scinnbStudies = [
  {
    id: "scinnb-001",
    title: "Science Communication Strategies for Public Engagement",
    status: "Active",
    category: "Science Communication",
    tags: ["Public Engagement", "Science Literacy", "Communication"],
    lead: "Dr. Elena Mendoza",
    institution: "National Science Communication Institute",
    date: "2023-04-15",
    excerpt:
      "This study explores effective science communication strategies to enhance public understanding and engagement with scientific research, focusing on innovative approaches for different audience segments.",
  },
  {
    id: "scinnb-002",
    title: "Innovation Ecosystems for Sustainable Development",
    status: "Active",
    category: "Innovation",
    tags: ["Sustainable Development", "Ecosystems", "Policy"],
    lead: "Dr. Gabriel Santos",
    institution: "Center for Innovation Studies",
    date: "2023-03-08",
    excerpt:
      "Research on developing and strengthening innovation ecosystems that promote sustainable development goals through collaborative networks, policy frameworks, and knowledge transfer mechanisms.",
  },
  {
    id: "scinnb-003",
    title: "Science Education Reform for 21st Century Skills",
    status: "Active",
    category: "Science Education",
    tags: ["Education Reform", "21st Century Skills", "STEM"],
    lead: "Dr. Maria Chen",
    institution: "Education Innovation Research Center",
    date: "2023-05-22",
    excerpt:
      "Investigating approaches to science education reform that integrate 21st century skills development, inquiry-based learning, and technology integration for improved student outcomes.",
  },
  {
    id: "scinnb-004",
    title: "Evidence-Based Policy Making for National Development",
    status: "Active",
    category: "Policy",
    tags: ["Evidence-Based Policy", "Governance", "Development"],
    lead: "Dr. Carlos Rivera",
    institution: "Policy Research Institute",
    date: "2023-02-18",
    excerpt:
      "Examining frameworks and processes for strengthening evidence-based policy making in government institutions to enhance national development outcomes and governance.",
  },
  {
    id: "scinnb-005",
    title: "Scientific Collaboration Networks for Knowledge Production",
    status: "Active",
    category: "Scientific Collaboration",
    tags: ["Research Networks", "Knowledge Production", "Collaboration"],
    lead: "Dr. Sophia Park",
    institution: "Collaborative Science Research Center",
    date: "2023-06-03",
    excerpt:
      "Analysis of scientific collaboration networks and their impact on knowledge production, innovation, and research quality across disciplines and institutions.",
  },
]

export default function SCINNBStudiesPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Brain className="h-6 w-6 text-purple-600" />
          <span>SCINNB Studies</span>
        </h2>
        <p className="text-muted-foreground">Science, Innovation and Nation Building Research</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search SCINNB studies..." className="w-full pl-9" />
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
          <TabsTrigger value="science-communication">Science Communication</TabsTrigger>
          <TabsTrigger value="innovation">Innovation</TabsTrigger>
          <TabsTrigger value="science-education">Science Education</TabsTrigger>
          <TabsTrigger value="policy">Policy</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6">
        {scinnbStudies.map((study) => (
          <Card key={study.id} className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl hover:text-primary hover:underline">
                    <Link href={`/dashboard/studies/scinnb/${study.id}`}>{study.title}</Link>
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
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
                >
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

