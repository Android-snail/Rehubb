"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, DoughnutChart, RadarChart } from "@/components/charts"
import { Users, FileText, CheckSquare, BarChart2 } from "lucide-react"

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProposals: 0,
    pendingReviews: 0,
    approvedProposals: 0,
  })

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setStats({
        totalUsers: 156,
        totalProposals: 87,
        pendingReviews: 12,
        approvedProposals: 45,
      })
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of the research management system</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Proposals</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProposals}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReviews}</div>
            <p className="text-xs text-muted-foreground">-3% from last month</p>
          </CardContent>
        </Card>
        <Card className="card-hover">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Approved Proposals</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.approvedProposals}</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 card-hover">
              <CardHeader>
                <CardTitle>Proposal Submissions</CardTitle>
                <CardDescription>Monthly proposal submissions over the past year</CardDescription>
              </CardHeader>
              <CardContent className="chart-gradient-bg">
                <LineChart
                  className="aspect-[4/3]"
                  data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [
                      {
                        label: "Submissions",
                        data: [12, 19, 15, 17, 22, 24, 19, 21, 25, 28, 24, 29],
                        borderColor: "hsl(var(--primary))",
                        backgroundColor: "hsl(var(--primary) / 0.2)",
                        tension: 0.3,
                      },
                    ],
                  }}
                />
              </CardContent>
            </Card>
            <Card className="col-span-3 card-hover">
              <CardHeader>
                <CardTitle>Proposal Status</CardTitle>
                <CardDescription>Current status of all proposals</CardDescription>
              </CardHeader>
              <CardContent className="chart-gradient-bg">
                <DoughnutChart
                  className="aspect-square"
                  data={{
                    labels: ["Approved", "Pending", "Rejected", "Under Review"],
                    datasets: [
                      {
                        data: [45, 25, 10, 20],
                        backgroundColor: [
                          "hsl(var(--primary))",
                          "hsl(var(--muted-foreground))",
                          "hsl(var(--destructive))",
                          "hsl(var(--accent))",
                        ],
                      },
                    ],
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>New user registrations over time</CardDescription>
              </CardHeader>
              <CardContent className="chart-gradient-bg">
                <BarChart
                  className="aspect-[4/3]"
                  data={{
                    labels: ["Q1", "Q2", "Q3", "Q4"],
                    datasets: [
                      {
                        label: "2023",
                        data: [25, 30, 35, 40],
                        backgroundColor: "hsl(var(--primary) / 0.8)",
                      },
                      {
                        label: "2024",
                        data: [35, 45, 55, 0],
                        backgroundColor: "hsl(var(--primary) / 0.4)",
                      },
                    ],
                  }}
                />
              </CardContent>
            </Card>
            <Card className="card-hover">
              <CardHeader>
                <CardTitle>Research Categories</CardTitle>
                <CardDescription>Distribution of research proposals by category</CardDescription>
              </CardHeader>
              <CardContent className="chart-gradient-bg">
                <RadarChart
                  className="aspect-[4/3]"
                  data={{
                    labels: ["Medical", "Technology", "Agriculture", "Education", "Environment", "Social Sciences"],
                    datasets: [
                      {
                        label: "Proposal Count",
                        data: [25, 18, 12, 20, 15, 10],
                        backgroundColor: "hsl(var(--primary) / 0.2)",
                        borderColor: "hsl(var(--primary))",
                      },
                    ],
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Reports</CardTitle>
              <CardDescription>Summary of system activity</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Reports will be displayed here. This feature is coming soon.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

