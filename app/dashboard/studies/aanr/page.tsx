import Link from "next/link"
import { Leaf, Filter, Search, SlidersHorizontal } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for AANR studies
const aanrStudies = [
  {
    id: "aanr-001",
    title: "Sustainable Rice Production Systems for Climate Resilience",
    status: "Active",
    category: "Agriculture",
    tags: ["Rice", "Climate Resilience", "Sustainable Farming"],
    lead: "Dr. Maria Santos",
    institution: "National Agriculture Research Institute",
    date: "2023-05-15",
    excerpt:
      "This study aims to develop and validate sustainable rice production systems that can withstand climate change impacts while maintaining productivity and reducing environmental footprint.",
  },
  {
    id: "aanr-002",
    title: "Marine Ecosystem Monitoring and Conservation in Coastal Communities",
    status: "Active",
    category: "Aquatic",
    tags: ["Marine Conservation", "Coastal Management", "Biodiversity"],
    lead: "Dr. James Rivera",
    institution: "Ocean Research Center",
    date: "2023-03-22",
    excerpt:
      "A comprehensive assessment of marine ecosystems in coastal areas, focusing on biodiversity conservation, sustainable fishing practices, and community-based management approaches.",
  },
  {
    id: "aanr-003",
    title: "Forest Restoration and Carbon Sequestration Potential in Degraded Lands",
    status: "Active",
    category: "Natural Resources",
    tags: ["Reforestation", "Carbon Sequestration", "Land Restoration"],
    lead: "Dr. Elena Cruz",
    institution: "Environmental Research Institute",
    date: "2023-06-10",
    excerpt:
      "Investigating effective forest restoration techniques for degraded lands with a focus on maximizing carbon sequestration potential and enhancing ecosystem services.",
  },
  {
    id: "aanr-004",
    title: "Smart Irrigation Systems for Water Conservation in Agriculture",
    status: "Active",
    category: "Agriculture",
    tags: ["Smart Farming", "Water Conservation", "Precision Agriculture"],
    lead: "Dr. Robert Chen",
    institution: "Agricultural Technology Institute",
    date: "2023-04-05",
    excerpt:
      "Development and field testing of smart irrigation systems that optimize water usage in agricultural settings through sensor networks, weather data integration, and AI-driven decision support.",
  },
  {
    id: "aanr-005",
    title: "Sustainable Aquaculture Practices for Small-Scale Fish Farmers",
    status: "Active",
    category: "Aquatic",
    tags: ["Aquaculture", "Small-Scale Farming", "Sustainable Practices"],
    lead: "Dr. Sofia Mendoza",
    institution: "Fisheries Research Center",
    date: "2023-02-18",
    excerpt:
      "Researching and developing sustainable aquaculture methods specifically designed for small-scale fish farmers to improve productivity, reduce environmental impact, and enhance livelihoods.",
  },
]

export default function AANRStudiesPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Leaf className="h-6 w-6 text-green-600" />
          <span>AANR Studies</span>
        </h2>
        <p className="text-muted-foreground">Agriculture, Aquatic and Natural Resources Research</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search AANR studies..." className="w-full pl-9" />
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
          <TabsTrigger value="agriculture">Agriculture</TabsTrigger>
          <TabsTrigger value="aquatic">Aquatic</TabsTrigger>
          <TabsTrigger value="natural-resources">Natural Resources</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6">
        {aanrStudies.map((study) => (
          <Card key={study.id} className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl hover:text-primary hover:underline">
                    <Link href={`/dashboard/studies/aanr/${study.id}`}>{study.title}</Link>
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
                <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
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

