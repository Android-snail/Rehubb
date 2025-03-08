import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

export default function FeedPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Research Feed</h1>
          <p className="text-muted-foreground">Discover the latest research papers and studies from around the world</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="w-full md:w-1/2">
            <Input placeholder="Search for research papers..." className="w-full" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Sort</Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=200&width=400&text=Research+${i + 1}`}
                    alt={`Research ${i + 1}`}
                    width={400}
                    height={200}
                    className="w-full object-cover"
                  />
                  <CardHeader className="p-4 pb-2">
                    <div className="flex gap-2 mb-2">
                      <Badge variant="outline">Medicine</Badge>
                      <Badge variant="outline">Technology</Badge>
                    </div>
                    <CardTitle className="text-xl">
                      <Link href={`/feed/research-${i + 1}`} className="hover:underline">
                        Breakthrough Research on Topic {i + 1}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-muted-foreground">
                      This research explores the intersection of medicine and technology, with groundbreaking findings
                      that could change the field.
                    </p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="Author"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <span className="text-sm">Dr. Researcher</span>
                    </div>
                    <span className="text-sm text-muted-foreground">2 days ago</span>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Button variant="outline">Load More</Button>
            </div>
          </TabsContent>
          <TabsContent value="trending" className="mt-6">
            <div className="flex items-center justify-center h-40">
              <p className="text-muted-foreground">Trending research content will appear here</p>
            </div>
          </TabsContent>
          <TabsContent value="recent" className="mt-6">
            <div className="flex items-center justify-center h-40">
              <p className="text-muted-foreground">Recent research content will appear here</p>
            </div>
          </TabsContent>
          <TabsContent value="following" className="mt-6">
            <div className="flex items-center justify-center h-40">
              <p className="text-muted-foreground">Research from people you follow will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

