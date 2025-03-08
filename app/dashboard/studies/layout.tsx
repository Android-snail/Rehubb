import type React from "react"
import { StudiesSidebarNav } from "@/components/studies-sidebar-nav"
import { Leaf, Heart, Cpu, CloudRain, Brain } from "lucide-react"

// Define research categories that will be used across study pages
export const researchCategories = [
  {
    id: "aanr",
    title: "AANR",
    description: "Agriculture, Aquatic and Natural Resources",
    icon: Leaf,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950/50",
    href: "/dashboard/studies/aanr",
  },
  {
    id: "health",
    title: "Health",
    description: "Health Research and Development",
    icon: Heart,
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-950/50",
    href: "/dashboard/studies/health",
  },
  {
    id: "ieet",
    title: "IEET",
    description: "Industry, Energy and Emerging Technology",
    icon: Cpu,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/50",
    href: "/dashboard/studies/ieet",
  },
  {
    id: "drrcc",
    title: "DRRCC",
    description: "Disaster Risk Reduction and Climate Change",
    icon: CloudRain,
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-950/50",
    href: "/dashboard/studies/drrcc",
  },
  {
    id: "scinnb",
    title: "SCINNB",
    description: "Science, Innovation and Nation Building",
    icon: Brain,
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-50 dark:bg-purple-950/50",
    href: "/dashboard/studies/scinnb",
  },
]

export default function StudiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container grid grid-cols-4 gap-6 pt-6">
      <aside className="md:col-span-1">
        <StudiesSidebarNav />
      </aside>
      <main className="md:col-span-3">{children}</main>
    </div>
  )
}

