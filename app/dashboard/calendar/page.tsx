"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

// Helper function to get days in month
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate()
}

// Helper function to get day of week (0-6, where 0 is Sunday)
const getDayOfWeek = (year: number, month: number, day: number) => {
  return new Date(year, month, day).getDay()
}

// Mock events data
const mockEvents = [
  {
    id: 1,
    title: "Proposal Submission Deadline",
    date: "2023-10-15",
    type: "deadline",
  },
  {
    id: 2,
    title: "Research Meeting",
    date: "2023-10-18",
    type: "meeting",
  },
  {
    id: 3,
    title: "Conference Registration",
    date: "2023-10-20",
    type: "event",
  },
  {
    id: 4,
    title: "Grant Application Due",
    date: "2023-10-25",
    type: "deadline",
  },
  {
    id: 5,
    title: "Department Workshop",
    date: "2023-10-28",
    type: "event",
  },
]

export default function CalendarPage() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [view, setView] = useState("month")

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDayOfMonth = getDayOfWeek(currentYear, currentMonth, 1)

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const getEventsForDay = (day: number) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return mockEvents.filter((event) => event.date === dateString)
  }

  const getEventBadge = (type: string) => {
    switch (type) {
      case "deadline":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300"
          >
            Deadline
          </Badge>
        )
      case "meeting":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300"
          >
            Meeting
          </Badge>
        )
      case "event":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300"
          >
            Event
          </Badge>
        )
      default:
        return <Badge variant="outline">{type}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">Track important dates, deadlines, and events</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={view} onValueChange={setView}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={previousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <CardTitle>
                {monthNames[currentMonth]} {currentYear}
              </CardTitle>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setCurrentMonth(today.getMonth())
                setCurrentYear(today.getFullYear())
              }}
            >
              Today
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1">
            {/* Day names */}
            {dayNames.map((day, index) => (
              <div key={index} className="text-center font-medium text-sm py-2">
                {day}
              </div>
            ))}

            {/* Empty cells for days before the first day of the month */}
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} className="h-24 border rounded-md bg-muted/20 p-1" />
            ))}

            {/* Days of the month */}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1
              const isToday =
                day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
              const events = getEventsForDay(day)

              return (
                <div key={day} className={`h-24 border rounded-md p-1 ${isToday ? "border-primary bg-primary/5" : ""}`}>
                  <div className="flex justify-between items-start">
                    <span className={`text-sm font-medium ${isToday ? "text-primary" : ""}`}>{day}</span>
                    {events.length > 0 && (
                      <span className="text-xs bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">
                        {events.length}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 space-y-1 overflow-y-auto max-h-[calc(100%-20px)]">
                    {events.map((event) => (
                      <div key={event.id} className="text-xs p-1 rounded bg-muted/50 truncate">
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Your scheduled events and deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start justify-between p-3 border rounded-md hover:border-primary hover:bg-accent/10 transition-all duration-200"
              >
                <div className="space-y-1">
                  <div className="font-medium">{event.title}</div>
                  <div className="flex items-center gap-2">
                    {getEventBadge(event.type)}
                    <span className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

