import Link from "next/link"
import { CloudRain, Filter, Search, SlidersHorizontal } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for DRRCC studies
const drrccStudies = [
  {
    id: "drrcc-001",
    title: "Community-Based Early Warning Systems for Flood-Prone Areas",
    status: "Active",
    category: "Disaster Risk Reduction",
    tags: ["Early Warning", "Floods", "Community Engagement"],
    lead: "Dr. Ramon Flores",
    institution: "Disaster Risk Reduction Research Center",
    date: "2023-05-18",
    excerpt:
      "This study develops and evaluates community-based early warning systems for flood-prone areas, focusing on local knowledge integration, technology accessibility, and community response protocols.",
  },
  {
    id: "drrcc-002",
    title: "Climate-Resilient Infrastructure Design for Coastal Communities",
    status: "Active",
    category: "Climate Change Adaptation",
    tags: ["Infrastructure", "Coastal Resilience", "Engineering"],
    lead: "Dr. Sophia Garcia",
    institution: "Climate Adaptation Research Institute",
    date: "2023-03-10",
    excerpt:
      "Research on designing and implementing climate-resilient infrastructure in coastal communities vulnerable to sea-level rise, storm surges, and extreme weather events.",
  },
  {
    id: "drrcc-003",
    title: "Indigenous Knowledge Systems for Drought Management",
    status: "Active",
    category: "Traditional Knowledge",
    tags: ["Indigenous Knowledge", "Drought", "Sustainable Practices"],
    lead: "Dr. Marco Reyes",
    institution: "Center for Indigenous Studies",
    date: "2023-04-25",
    excerpt:
      "Documenting and integrating indigenous knowledge systems for drought prediction, management, and adaptation strategies in agricultural communities.",
  },
  {
    id: "drrcc-004",
    title: "Urban Heat Island Mitigation Strategies for Climate Change Adaptation",
    status: "Active",
    category: "Climate Change Adaptation",
    tags: ["Urban Planning", "Heat Islands", "Green Infrastructure"],
    lead: "Dr. Leila Santos",
    institution: "Urban Climate Research Center",
    date: "2023-02-20",
    excerpt:
      "Investigating effective strategies to mitigate urban heat island effects through green infrastructure, urban design, and policy interventions in rapidly urbanizing areas.",
  },
  {
    id: "drrcc-005",
    title: "Multi-Hazard Risk Assessment Models for Comprehensive Disaster Planning",
    status: "Active",
    category: "Disaster Risk Reduction",
    tags: ["Risk Assessment", "Multi-Hazard", "Planning"],
    lead: "Dr. Antonio Cruz",
    institution: "Comprehensive Disaster Management Institute",
    date: "2023-06-05",
    excerpt:
      "Development of integrated multi-hazard risk assessment models that consider the compounding effects of multiple disaster types for more effective disaster planning and response.",
  },
]

export default function DRRCCStudiesPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <CloudRain className="h-6 w-6 text-amber-600" />
          <span>DRRCC Studies</span>
        </h2>
        <p className="text-muted-foreground">Disaster Risk Reduction and Climate Change Research</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search DRRCC studies..." className="w-full pl-9" />
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
          <TabsTrigger value="disaster-risk">Disaster Risk Reduction</TabsTrigger>
          <TabsTrigger value="climate-change">Climate Change Adaptation</TabsTrigger>
          <TabsTrigger value="traditional">Traditional Knowledge</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6">
        {drrccStudies.map((study) => (
          <Card key={study.id} className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl hover:text-primary hover:underline">
                    <Link href={`/dashboard/studies/drrcc/${study.id}`}>{study.title}</Link>
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
                <Badge variant="outline" className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
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

