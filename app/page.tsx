import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import PublicHeader from "@/components/public-header"

export default function Home() {
  return (
    <>
      <PublicHeader />
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Enhancing Research Oversight
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  A Monitoring and Analytics System for Palawan State University Research Office
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-primary text-primary-foreground">
                    <Link href="/feed">Explore Research</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/how-it-works">How It Works</Link>
                  </Button>
                </div>
              </div>
              <div className="mx-auto lg:ml-auto flex w-full max-w-[500px] items-center justify-center">
                <Image
                  src="/images/model.svg"
                  alt="Hero Image"
                  width={500}
                  height={500}
                  className="rounded-lg object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Research */}
        <section className="bg-muted py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Research</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Explore the latest and most impactful research from around the world
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Image
                  src={`https://placehold.co/400x200?text=Research+${i}`}
                  alt={`Research ${i}`}
                  width={400}
                  height={200}
                  className="w-full object-cover"
                  />
                  <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Research Title {i}</h3>
                  <p className="text-muted-foreground mb-4">
                    A brief description of this groundbreaking research and its potential impact on the field.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/feed/research-${i}`}>Read More</Link>
                  </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Research Categories */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Research Categories</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Browse research by category to find exactly what you&apos;re looking for
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
              {["Medicine", "Technology", "Climate", "Psychology", "Economics", "Education"].map((category) => (
                <Card key={category} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <Link href={`/feed?category=${category.toLowerCase()}`} className="block p-6 text-center">
                    <h3 className="font-medium">{category}</h3>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary/10 py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Join Our Research Community</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Connect with researchers, share your work, and contribute to global knowledge
                </p>
              </div>
              <Button asChild size="lg" className="bg-primary text-primary-foreground">
                <Link href="/signup">Sign Up Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

