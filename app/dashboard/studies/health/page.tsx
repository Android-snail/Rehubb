import Link from "next/link"
import { Heart, Filter, Search, SlidersHorizontal } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for Health studies
const healthStudies = [
  {
    id: "health-001",
    title: "Community-Based Approaches to Dengue Prevention and Control",
    status: "Active",
    category: "Public Health",
    tags: ["Dengue", "Vector Control", "Community Health"],
    lead: "Dr. Ana Reyes",
    institution: "National Institute of Tropical Diseases",
    date: "2023-04-12",
    excerpt:
      "This study evaluates the effectiveness of community-based interventions for dengue prevention and control, focusing on sustainable vector management strategies and community engagement.",
  },
  {
    id: "health-002",
    title: "Nutritional Interventions for Maternal and Child Health in Rural Areas",
    status: "Active",
    category: "Nutrition",
    tags: ["Maternal Health", "Child Nutrition", "Rural Health"],
    lead: "Dr. Miguel Fernandez",
    institution: "Center for Nutrition Research",
    date: "2023-03-05",
    excerpt:
      "A comprehensive assessment of nutritional interventions targeting pregnant women and young children in rural communities, aiming to reduce malnutrition and improve health outcomes.",
  },
  {
    id: "health-003",
    title: "Mental Health Support Systems for Healthcare Workers Post-Pandemic",
    status: "Active",
    category: "Mental Health",
    tags: ["Healthcare Workers", "Pandemic Response", "Psychological Support"],
    lead: "Dr. Isabella Santos",
    institution: "Mental Health Research Institute",
    date: "2023-05-20",
    excerpt:
      "Investigating effective mental health support systems for healthcare workers following the COVID-19 pandemic, with a focus on preventing burnout and promoting resilience.",
  },
  {
    id: "health-004",
    title: "Traditional Medicine Integration in Primary Healthcare Systems",
    status: "Active",
    category: "Traditional Medicine",
    tags: ["Primary Healthcare", "Traditional Knowledge", "Integrative Medicine"],
    lead: "Dr. Carlos Mendoza",
    institution: "Institute for Traditional Medicine Research",
    date: "2023-02-15",
    excerpt:
      "Exploring models for effectively integrating evidence-based traditional medicine practices into primary healthcare systems to improve accessibility and cultural appropriateness of care.",
  },
  {
    id: "health-005",
    title: "Digital Health Solutions for Remote Patient Monitoring",
    status: "Active",
    category: "Digital Health",
    tags: ["Telemedicine", "Remote Monitoring", "Healthcare Technology"],
    lead: "Dr. Sarah Johnson",
    institution: "Digital Health Innovation Center",
    date: "2023-06-01",
    excerpt:
      "Development and evaluation of digital health technologies for remote patient monitoring, focusing on chronic disease management and improving healthcare access in underserved areas.",
  },
]

export default function HealthStudiesPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
          <Heart className="h-6 w-6 text-red-600" />
          <span>Health Studies</span>
        </h2>
        <p className="text-muted-foreground">Health Research and Development</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search Health studies..." className="w-full pl-9" />
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
          <TabsTrigger value="public-health">Public Health</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="mental-health">Mental Health</TabsTrigger>
          <TabsTrigger value="digital-health">Digital Health</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6">
        {healthStudies.map((study) => (
          <Card key={study.id} className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl hover:text-primary hover:underline">
                    <Link href={`/dashboard/studies/health/${study.id}`}>{study.title}</Link>
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
                <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
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

