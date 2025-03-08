"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LineChart } from "@/components/charts/line-chart"
import { BarChart } from "@/components/charts/bar-chart"
import { DoughnutChart } from "@/components/charts/doughnut-chart"
import { RadarChart } from "@/components/charts/radar-chart"
import {
  getUserActivityData,
  getProposalSubmissionsData,
  getUserDistributionData,
  getUserEngagementData,
} from "@/lib/chart-utils"
import {
  ArrowUpRight,
  Users,
  FileText,
  CheckCircle,
  AlertTriangle,
  Download,
  BarChart3,
  PieChart,
  LineChartIcon,
  Activity,
  Filter,
  X,
  Leaf,
  Heart,
  Cpu,
  Cloud,
  Brain,
} from "lucide-react"

// Study agenda categories with their respective icons
const studyAgendaCategories = [
  {
    id: "aanr",
    name: "AANR",
    fullName: "Agriculture, Aquatic and Natural Resources",
    icon: <Leaf className="h-4 w-4" />,
  },
  { id: "health", name: "Health", fullName: "Health Research and Development", icon: <Heart className="h-4 w-4" /> },
  { id: "ieet", name: "IEET", fullName: "Industry, Energy and Emerging Technology", icon: <Cpu className="h-4 w-4" /> },
  {
    id: "drrcc",
    name: "DRRCC",
    fullName: "Disaster Risk Reduction and Climate Change",
    icon: <Cloud className="h-4 w-4" />,
  },
  {
    id: "scinnb",
    name: "SCINNB",
    fullName: "Science, Innovation and Nation Building",
    icon: <Brain className="h-4 w-4" />,
  },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6m")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Mock data for charts - in a real app, this would be filtered based on selectedCategories
  const [userActivityData, setUserActivityData] = useState(getUserActivityData())
  const [proposalSubmissionsData, setProposalSubmissionsData] = useState(getProposalSubmissionsData())
  const [userDistributionData, setUserDistributionData] = useState(getUserDistributionData())
  const [userEngagementData, setUserEngagementData] = useState(getUserEngagementData())

  // Update chart data when filters change
  useEffect(() => {
    // In a real application, you would fetch filtered data from an API
    // For this demo, we'll simulate filtering by slightly modifying the data

    if (selectedCategories.length === 0) {
      // If no filters, use the original data
      setUserActivityData(getUserActivityData())
      setProposalSubmissionsData(getProposalSubmissionsData())
      setUserDistributionData(getUserDistributionData())
      setUserEngagementData(getUserEngagementData())
      return
    }

    // Simulate filtered data by adjusting values based on selected categories
    // In a real app, you would fetch the actual filtered data from your backend
    const multiplier = 0.8 + selectedCategories.length * 0.1

    // Adjust user activity data
    const filteredActivityData = getUserActivityData()
    filteredActivityData.datasets.forEach((dataset) => {
      dataset.data = dataset.data.map((value) => Math.round(value * multiplier))
    })
    setUserActivityData(filteredActivityData)

    // Adjust proposal submissions data
    const filteredProposalData = getProposalSubmissionsData()
    filteredProposalData.datasets.forEach((dataset) => {
      dataset.data = dataset.data.map((value) => Math.round(value * multiplier))
    })
    setProposalSubmissionsData(filteredProposalData)

    // For the other charts, we'll just use the original data for simplicity
    setUserDistributionData(getUserDistributionData())
    setUserEngagementData(getUserEngagementData())
  }, [selectedCategories])

  // Toggle category selection
  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([])
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive analytics and insights for the ResearchHub platform</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="1m">Last month</SelectItem>
              <SelectItem value="3m">Last 3 months</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-muted" : ""}
          >
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter by study agenda</span>
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download report</span>
          </Button>
        </div>
      </div>

      {/* Study Agenda Filters */}
      {showFilters && (
        <Card className="border border-muted">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Filter by Study Agenda</CardTitle>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs">
                Clear filters
              </Button>
            </div>
            <CardDescription>Select one or more research categories to filter the analytics data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {studyAgendaCategories.map((category) => (
                <Badge
                  key={category.id}
                  variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-muted-hover transition-colors flex items-center gap-1 px-3 py-1"
                  onClick={() => toggleCategory(category.id)}
                >
                  {category.icon}
                  <span>{category.name}</span>
                  {selectedCategories.includes(category.id) && <X className="h-3 w-3 ml-1" />}
                </Badge>
              ))}
            </div>
            {selectedCategories.length > 0 && (
              <div className="mt-4 text-sm text-muted-foreground">
                Showing data for:{" "}
                {selectedCategories
                  .map((id) => studyAgendaCategories.find((cat) => cat.id === id)?.fullName)
                  .join(", ")}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">24%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Proposals</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">12%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">8%</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting review</p>
          </CardContent>
        </Card>
      </div>

      {/* Study Agenda Distribution Card */}
      {selectedCategories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Study Agenda Distribution</CardTitle>
            <CardDescription>Breakdown of proposals by research category</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="space-y-4">
              {selectedCategories.map((categoryId) => {
                const category = studyAgendaCategories.find((cat) => cat.id === categoryId)!
                // Generate random values for demonstration
                const total = Math.floor(Math.random() * 20) + 5
                const approved = Math.floor(total * 0.7)
                const pending = total - approved
                const percentage = Math.floor(Math.random() * 30) + 10

                return (
                  <div key={categoryId} className="flex items-center">
                    <div className="w-9 text-sm font-medium">{total}</div>
                    <div className="flex-1 ml-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm font-medium">
                          {category.icon}
                          <span className="ml-2">{category.fullName}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{percentage}%</div>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-muted">
                        <div className="h-2 rounded-full bg-primary" style={{ width: `${percentage}%` }} />
                      </div>
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>{approved} approved</span>
                        <span>{pending} pending</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="activity" className="w-full">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <LineChartIcon className="h-4 w-4" />
            <span>User Activity</span>
          </TabsTrigger>
          <TabsTrigger value="proposals" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>Proposals</span>
          </TabsTrigger>
          <TabsTrigger value="distribution" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            <span>Distribution</span>
          </TabsTrigger>
          <TabsTrigger value="engagement" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Engagement</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>User Activity Trends</CardTitle>
              <CardDescription>
                Monthly active users and new registrations over time
                {selectedCategories.length > 0 && (
                  <span className="ml-1">
                    (Filtered by {selectedCategories.length}{" "}
                    {selectedCategories.length === 1 ? "category" : "categories"})
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <LineChart data={userActivityData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="proposals" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Proposal Submissions</CardTitle>
              <CardDescription>
                Submitted, approved, and rejected proposals over time
                {selectedCategories.length > 0 && (
                  <span className="ml-1">
                    (Filtered by {selectedCategories.length}{" "}
                    {selectedCategories.length === 1 ? "category" : "categories"})
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <BarChart data={proposalSubmissionsData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
              <CardDescription>
                Breakdown of users by role
                {selectedCategories.length > 0 && (
                  <span className="ml-1">
                    (Filtered by {selectedCategories.length}{" "}
                    {selectedCategories.length === 1 ? "category" : "categories"})
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <DoughnutChart data={userDistributionData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>User Engagement Metrics</CardTitle>
              <CardDescription>
                Comparison of user engagement across different activities
                {selectedCategories.length > 0 && (
                  <span className="ml-1">
                    (Filtered by {selectedCategories.length}{" "}
                    {selectedCategories.length === 1 ? "category" : "categories"})
                  </span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <RadarChart data={userEngagementData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Departments</CardTitle>
            <CardDescription>Departments with the most approved proposals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Environmental Science", count: 12, percentage: 28 },
                { name: "Computer Science", count: 9, percentage: 21 },
                { name: "Medical Research", count: 7, percentage: 16 },
                { name: "Psychology", count: 5, percentage: 12 },
                { name: "Engineering", count: 4, percentage: 9 },
              ].map((dept, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-9 text-sm font-medium">{dept.count}</div>
                  <div className="flex-1 ml-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{dept.name}</div>
                      <div className="text-sm text-muted-foreground">{dept.percentage}%</div>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: `${dept.percentage}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "New proposal submitted",
                  user: "Dr. Jane Smith",
                  time: "2 hours ago",
                  icon: <FileText className="h-4 w-4 text-blue-500" />,
                  category: "Health",
                },
                {
                  action: "Proposal approved",
                  user: "Admin User",
                  time: "5 hours ago",
                  icon: <CheckCircle className="h-4 w-4 text-green-500" />,
                  category: "AANR",
                },
                {
                  action: "New user registered",
                  user: "Robert Johnson",
                  time: "1 day ago",
                  icon: <Users className="h-4 w-4 text-primary" />,
                },
                {
                  action: "Review submitted",
                  user: "Dr. Michael Chen",
                  time: "1 day ago",
                  icon: <FileText className="h-4 w-4 text-purple-500" />,
                  category: "IEET",
                },
                {
                  action: "Proposal needs revision",
                  user: "Admin User",
                  time: "2 days ago",
                  icon: <AlertTriangle className="h-4 w-4 text-yellow-500" />,
                  category: "DRRCC",
                },
              ].map((activity, i) => (
                <div key={i} className="flex items-start">
                  <div className="mr-3 mt-0.5">{activity.icon}</div>
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span>{activity.user}</span>
                      <span className="mx-1">•</span>
                      <span>{activity.time}</span>
                      {activity.category && (
                        <>
                          <span className="mx-1">•</span>
                          <Badge variant="outline" className="text-xs h-5 px-1.5">
                            {activity.category}
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

