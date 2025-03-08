"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { LineChart } from "@/components/charts/line-chart"
import { BarChart } from "@/components/charts/bar-chart"
import { DoughnutChart } from "@/components/charts/doughnut-chart"
import { Download, LineChartIcon, BarChart3, PieChart } from "lucide-react"

// Mock data for user statistics
const userProposalData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Submitted Proposals",
      data: [1, 0, 1, 0, 2, 0, 1, 0, 0, 1, 0, 0],
      borderColor: "hsl(var(--primary) / 0.8)",
      backgroundColor: "hsl(var(--primary) / 0.1)",
      tension: 0.4,
      fill: true,
    },
  ],
}

const proposalStatusData = {
  labels: ["Approved", "Pending", "Revision Required", "Rejected"],
  datasets: [
    {
      data: [3, 2, 1, 0],
      backgroundColor: [
        "hsl(var(--success) / 0.8)",
        "hsl(var(--warning) / 0.8)",
        "hsl(var(--info) / 0.8)",
        "hsl(var(--destructive) / 0.8)",
      ],
      borderColor: "hsl(var(--background))",
      borderWidth: 2,
    },
  ],
}

const proposalCategoryData = {
  labels: ["Environmental Science", "Technology", "Healthcare", "Education", "Social Sciences"],
  datasets: [
    {
      label: "Proposals by Category",
      data: [2, 1, 1, 1, 1],
      backgroundColor: [
        "hsl(var(--primary) / 0.8)",
        "hsl(var(--primary) / 0.6)",
        "hsl(var(--primary) / 0.4)",
        "hsl(var(--primary) / 0.3)",
        "hsl(var(--primary) / 0.2)",
      ],
    },
  ],
}

export default function StatisticsPage() {
  const [timeRange, setTimeRange] = useState("1y")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Statistics</h1>
          <p className="text-muted-foreground">Track your research metrics and proposal statistics</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">Last 3 months</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download report</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Proposals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground mt-1">Across all categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50%</div>
            <p className="text-xs text-muted-foreground mt-1">3 out of 6 proposals approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Review Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14 days</div>
            <p className="text-xs text-muted-foreground mt-1">From submission to decision</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <LineChartIcon className="h-4 w-4" />
            <span>Timeline</span>
          </TabsTrigger>
          <TabsTrigger value="status" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            <span>Status</span>
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Categories</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Proposal Submission Timeline</CardTitle>
              <CardDescription>Number of proposals submitted over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <LineChart data={userProposalData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Proposal Status Distribution</CardTitle>
              <CardDescription>Breakdown of proposals by current status</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <DoughnutChart data={proposalStatusData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Proposals by Category</CardTitle>
              <CardDescription>Distribution of proposals across research categories</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <BarChart data={proposalCategoryData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Research Impact</CardTitle>
          <CardDescription>Metrics related to the impact of your research</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-medium mb-2">Citations</h3>
              <div className="flex items-center">
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: "45%" }}></div>
                </div>
                <span className="text-sm font-medium ml-4">45</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Total citations across all publications</p>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Downloads</h3>
              <div className="flex items-center">
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: "70%" }}></div>
                </div>
                <span className="text-sm font-medium ml-4">312</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Number of times your papers have been downloaded</p>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Collaborations</h3>
              <div className="flex items-center">
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: "30%" }}></div>
                </div>
                <span className="text-sm font-medium ml-4">8</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Number of research collaborations</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

