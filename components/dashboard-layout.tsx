"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileText,
  Home,
  LayoutDashboard,
  Settings,
  User,
  Users,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import UserHeader from "@/components/user-header"
import AdminHeader from "@/components/admin-header"
import { LogoutConfirmation } from "@/components/logout-confirmation"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = React.useState<any>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false)

  React.useEffect(() => {
    // Get user from localStorage
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      } else {
        // Redirect to login if no user found
        router.push("/signin")
      }
      setIsLoading(false)
    }
  }, [router])

  // Define navigation items based on user role
  const navItems =
    user?.role === "admin"
      ? [
          { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
          { icon: FileText, label: "Proposals", href: "/admin/proposals" },
          { icon: Users, label: "Users", href: "/admin/users" },
          { icon: ClipboardList, label: "Reviews", href: "/admin/reviews" },
          { icon: User, label: "Profile", href: "/admin/profile" },
          { icon: Settings, label: "Settings", href: "/admin/settings" },
        ]
      : [
          { icon: Home, label: "Dashboard", href: "/dashboard" },
          { icon: FileText, label: "Submit Proposal", href: "/dashboard/submit-proposal" },
          { icon: ClipboardList, label: "My Proposals", href: "/dashboard/my-proposals" },
          { icon: User, label: "Profile", href: "/dashboard/profile" },
          { icon: Settings, label: "Settings", href: "/dashboard/settings" },
        ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      {user.role === "admin" ? <AdminHeader /> : <UserHeader />}

      <div className="flex flex-1">
        {/* Mobile sidebar backdrop */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <motion.aside
          className={cn(
            "fixed inset-y-0 left-0 z-30 mt-16 flex h-[calc(100vh-4rem)] w-64 flex-col border-r bg-background transition-all duration-300 lg:relative lg:top-0 lg:mt-0",
            sidebarCollapsed ? "lg:w-20" : "lg:w-64",
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          )}
          initial={false}
          animate={{
            width: sidebarCollapsed ? 80 : 256,
            x: mobileSidebarOpen ? 0 : window.innerWidth < 1024 ? -256 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex h-16 items-center border-b px-4">
            <div className="flex items-center space-x-2 w-full">
              {!sidebarCollapsed ? (
                <>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize truncate">{user.role}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto flex-shrink-0 hover:bg-accent/50"
                    onClick={() => setSidebarCollapsed(true)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="mx-auto hover:bg-accent/50"
                  onClick={() => setSidebarCollapsed(false)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-auto py-6 px-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent/50",
                      pathname === item.href || pathname.startsWith(`${item.href}/`)
                        ? "bg-primary/10 text-primary"
                        : "text-foreground",
                      sidebarCollapsed ? "justify-center" : "",
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", sidebarCollapsed ? "" : "mr-3")} />
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t p-4">
            {sidebarCollapsed ? (
              <Button
                variant="ghost"
                className="w-full justify-center"
                onClick={() => {
                  setSidebarCollapsed(false)
                  setTimeout(() => {
                    const logoutButton = document.getElementById("sidebar-logout-button")
                    if (logoutButton) {
                      logoutButton.click()
                    }
                  }, 300)
                }}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            ) : (
              <LogoutConfirmation variant="sidebar" className="w-full justify-start text-sm font-medium" />
            )}
          </div>
        </motion.aside>

        {/* Main content */}
        <div className="flex-1">
          {/* Mobile sidebar toggle */}
          <div className="sticky top-16 z-10 flex h-12 items-center border-b bg-background px-4 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">{user.role === "admin" ? "Admin Dashboard" : "Dashboard"}</span>
          </div>

          <motion.main className="p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            {children}
          </motion.main>
        </div>
      </div>
    </div>
  )
}

