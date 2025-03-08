import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

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
  ]

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-16">
        {/* Mission Section */}
        <section className="flex flex-col lg:flex-row gap-10 items-center">
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Our Mission</h1>
            <p className="text-xl text-muted-foreground">
              At ResearchHub, we're dedicated to democratizing access to research and fostering global collaboration
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
              <h3 className="text-2xl font-bold">Where We're Going</h3>
              <p className="text-muted-foreground">
                Today, ResearchHub is at the forefront of the open science movement. We're constantly innovating and
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

        {/* Values Section */}
        <section className="flex flex-col space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-center">Our Values</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Openness",
                description:
                  "We believe in making research accessible to everyone, breaking down barriers to knowledge.",
              },
              {
                title: "Collaboration",
                description: "We foster connections between researchers across disciplines and geographic boundaries.",
              },
              {
                title: "Innovation",
                description: "We continuously improve our platform to better serve the evolving needs of researchers.",
              },
              {
                title: "Integrity",
                description: "We uphold the highest standards of academic integrity and ethical research practices.",
              },
              {
                title: "Diversity",
                description: "We celebrate diverse perspectives and backgrounds in the research community.",
              },
              {
                title: "Impact",
                description:
                  "We measure our success by the positive impact research has on society and human knowledge.",
              },
            ].map((value, i) => (
              <Card key={i} className="border-2 hover:border-primary transition-colors">
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Partners Section */}
        <section className="flex flex-col space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-center">Our Partners</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            We collaborate with leading research institutions, universities, and organizations around the world.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="w-40 h-20 flex items-center justify-center">
                <Image
                  src={`/placeholder.svg?height=80&width=160&text=Partner+${i}`}
                  alt={`Partner ${i}`}
                  width={160}
                  height={80}
                  className="max-w-full max-h-full"
                />
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary/10 p-8 rounded-lg text-center">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Join Us in Transforming Research</h2>
            <p className="text-muted-foreground">
              Whether you're a researcher, student, or simply curious about the world, there's a place for you in our
              community.
            </p>
            <Button size="lg" className="bg-primary text-primary-foreground">
              Get Started Today
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

