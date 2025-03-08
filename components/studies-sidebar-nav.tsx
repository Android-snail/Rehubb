"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { researchCategories } from "@/app/dashboard/studies/layout"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export function StudiesSidebarNav() {
  const pathname = usePathname()

  return (
    <ScrollArea className="h-[calc(100vh-10rem)]">
      <div className="space-y-4">
        <div>
          <h3 className="mb-2 text-lg font-semibold tracking-tight">Research Categories</h3>
          <div className="space-y-1">
            <Button
              asChild
              variant={pathname === "/dashboard/studies" ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <Link href="/dashboard/studies">Overview</Link>
            </Button>
            {researchCategories.map((category) => (
              <Button
                key={category.id}
                asChild
                variant={pathname.includes(category.href) ? "default" : "ghost"}
                className="w-full justify-start"
              >
                <Link href={category.href} className="flex items-center gap-2">
                  <category.icon className={`h-4 w-4 ${category.color.split(" ")[0]}`} />
                  <span>{category.title}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-lg font-semibold tracking-tight">Tools</h3>
          <div className="space-y-1">
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/dashboard/studies/search">Advanced Search</Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/dashboard/studies/compare">Compare Studies</Link>
            </Button>
            <Button asChild variant="ghost" className="w-full justify-start">
              <Link href="/dashboard/studies/export">Export Data</Link>
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

