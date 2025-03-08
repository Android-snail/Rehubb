import Link from "next/link"
import { researchCategories } from "./layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Sample data for study counts
const studyCounts = {
  aanr: 124,
  health: 98,
  ieet: 87,
  drrcc: 76,
  scinnb: 65,
}

// Sample data for research excerpts
const researchExcerpts = {
  aanr: "Research focused on sustainable agriculture, aquaculture, forestry, and natural resource management to ensure food security and environmental sustainability.",
  health:
    "Studies addressing health challenges, disease prevention, treatment innovations, and healthcare delivery systems to improve public health outcomes.",
  ieet: "Research on industrial innovation, sustainable energy solutions, and emerging technologies to drive economic growth and technological advancement.",
  drrcc:
    "Studies focused on understanding, mitigating, and adapting to natural disasters and climate change impacts to build resilient communities.",
  scinnb:
    "Research promoting scientific advancement, innovation ecosystems, and knowledge-based approaches to national development and policy-making.",
}

export default function StudiesPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {researchCategories.map((category) => (
        <Card key={category.id} className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader className={`${category.bgColor} pb-2`}>
            <div className="flex items-center gap-2">
              <category.icon className={`h-5 w-5 ${category.color.split(" ")[0]}`} />
              <CardTitle>{category.title}</CardTitle>
            </div>
            <CardDescription className="font-medium text-foreground/80">{category.description}</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm">{researchExcerpts[category.id as keyof typeof researchExcerpts]}</p>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <span className="font-medium">{studyCounts[category.id as keyof typeof studyCounts]}</span>
              <span className="ml-1">active studies</span>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/40 px-6 py-3">
            <Button asChild variant="ghost" className="w-full">
              <Link href={category.href}>Explore {category.title} Studies</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

