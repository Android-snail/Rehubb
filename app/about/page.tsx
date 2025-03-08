import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function AboutPage() {
  const team = [
    {
      name: "Dr. Jane Smith",
      role: "Founder & CEO",
      bio: "Former professor with 15+ years of research experience in molecular biology.",
      image: "/placeholder.svg?height=300&width=300&text=JS",
    },
    {
      name: "Dr. John Davis",
      role: "Chief Research Officer",
      bio: "Published researcher with expertise in data science and machine learning.",
      image: "/placeholder.svg?height=300&width=300&text=JD",
    },
    {
      name: "Sarah Johnson",
      role: "Head of Product",
      bio: "Tech industry veteran focused on creating intuitive research tools.",
      image: "/placeholder.svg?height=300&width=300&text=SJ",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Software architect with a background in academic publishing platforms.",
      image: "/placeholder.svg?height=300&width=300&text=MC",
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Software architect with a background in academic publishing platforms.",
      image: "/placeholder.svg?height=300&width=300&text=MC",
    },
  ]

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-16">
        {/* Mission Section */}
        <section className="flex flex-col lg:flex-row gap-10 items-center">
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Our Mission</h1>
            <p className="text-xl text-muted-foreground">
              At Enresearch, we&ampos;re dedicated to democratizing access to research and fostering global collaboration
              among researchers, students, and knowledge seekers.
            </p>
            <p className="text-muted-foreground">
              We believe that knowledge should be accessible to everyone, regardless of their institutional affiliation
              or geographic location. By creating a platform that connects researchers from around the world, we aim to
              accelerate scientific discovery and innovation.
            </p>
          </div>
          <div className="flex-1">
            <Image
              src="/placeholder.svg?height=400&width=600&text=Our+Mission"
              alt="Our Mission"
              width={600}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>
        </section>

        {/* Story Section */}
        <section className="flex flex-col space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-center">Our Story</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">How We Started</h3>
              <p className="text-muted-foreground">
                ResearchHub was founded in 2020 by a group of researchers who were frustrated with the traditional
                academic publishing model. They envisioned a platform where research could be shared freely and openly,
                fostering collaboration across disciplines and borders.
              </p>
              <p className="text-muted-foreground">
                What began as a small project has grown into a global community of researchers, students, and knowledge
                enthusiasts committed to advancing human knowledge.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Where We&ampos;re Going</h3>
              <p className="text-muted-foreground">
                Today, ResearchHub is at the forefront of the open science movement. We&ampos;re constantly innovating and
                expanding our platform to better serve the global research community.
              </p>
              <p className="text-muted-foreground">
                Our vision for the future includes advanced AI-powered research tools, expanded collaboration features,
                and partnerships with leading research institutions around the world.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="flex flex-col space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-center">Meet Our Team</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            Our diverse team brings together expertise in research, technology, and education to create the best
            platform for the global research community.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <Card key={i} className="overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-full aspect-square object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                  <p className="text-sm text-muted-foreground mt-2">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        

        {/* CTA Section */}
        <section className="bg-primary/10 p-8 rounded-lg text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Join Us in Transforming Research</h2>
            <p className="text-muted-foreground">
              Whether you&ampos;re a researcher, student, or simply curious about the world, there&ampos;s a place for you in our
              community.
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground" asChild>
              <Link href="/signup">Get Started Today</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

