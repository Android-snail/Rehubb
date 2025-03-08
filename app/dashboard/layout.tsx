import type React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <div className="flex flex-col min-h-screen pl-0 lg:pl-[240px] transition-all duration-300 ease-in-out">
        <main className="flex-1 p-4 md:p-6 lg:p-8 pt-20 lg:pt-8">{children}</main>
      </div>
    </div>
  )
}

