import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function HowItWorksPage() {
  const steps = [
    {
      title: "Create an Account",
      description: "Sign up for a free account to access all features of ResearchHub.",
      icon: "🔑",
    },
    {
      title: "Explore Research",
      description: "Browse through our extensive collection of research papers and studies.",
      icon: "🔍",
    },
    {
      title: "Connect with Researchers",
      description: "Follow researchers and institutions to stay updated with their latest work.",
      icon: "🤝",
    },
    {
      title: "Share Your Research",
      description: "Upload and share your own research to gain visibility and feedback.",
      icon: "📤",
    },
    {
      title: "Collaborate",
      description: "Find collaborators for your research projects and work together.",
      icon: "👥",
    },
    {
      title: "Get Cited",
      description: "Increase your citations and impact through our platform.",
      icon: "📊",
    },
  ]

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-12">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">How ResearchHub Works</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Our platform connects researchers, students, and knowledge seekers to create a global research community
          </p>
        </div>

        {/* Steps Section */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <Card key={i} className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="text-4xl mb-2">{step.icon}</div>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Video Section */}
        <div className="flex flex-col items-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">See ResearchHub in Action</h2>
          <div className="w-full max-w-4xl aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
            <Image
              src="/placeholder.svg?height=720&width=1280&text=Video+Placeholder"
              alt="How ResearchHub Works"
              width={1280}
              height={720}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Testimonials */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-center">What Researchers Say</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-muted/50">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <p className="italic">
                      "ResearchHub has transformed how I share and discover research. The platform's intuitive design
                      and collaborative features have significantly increased the visibility of my work."
                    </p>
                    <div className="flex items-center gap-4">
                      <Image
                        src={`/placeholder.svg?height=48&width=48&text=P${i}`}
                        alt={`Researcher ${i}`}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div>
                        <h4 className="font-medium">Dr. Jane Smith</h4>
                        <p className="text-sm text-muted-foreground">Professor of Biology, University of Science</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-center">Frequently Asked Questions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                q: "Is ResearchHub free to use?",
                a: "Yes, ResearchHub offers a free tier with access to most features. We also offer premium plans for researchers and institutions who need advanced features.",
              },
              {
                q: "How do I upload my research?",
                a: "After creating an account, you can upload your research papers through your profile dashboard. We support various file formats including PDF, DOCX, and LaTeX.",
              },
              {
                q: "Can I control who sees my research?",
                a: "Absolutely. You have full control over the privacy settings of your uploads. You can make them public, restricted to certain groups, or completely private.",
              },
              {
                q: "How does citation work on ResearchHub?",
                a: "ResearchHub automatically generates citation information in various formats (APA, MLA, Chicago, etc.) for all research papers on the platform.",
              },
            ].map((faq, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-xl">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center space-y-6 bg-primary/10 p-8 rounded-lg">
          <h2 className="text-3xl font-bold tracking-tight text-center">Ready to Join the Research Community?</h2>
          <p className="text-xl text-center max-w-2xl">
            Start sharing your research, connecting with peers, and discovering groundbreaking studies today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary text-primary-foreground">
              Sign Up Now
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

