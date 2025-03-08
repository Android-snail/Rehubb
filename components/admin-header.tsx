"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Bell,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Menu,
  Settings,
  Shield,
  User,
  Users,
  LogOut,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LogoutConfirmation } from "./logout-confirmation"

export default function AdminHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)
  const [user, setUser] = React.useState<any>(null)
  const [notifications, setNotifications] = React.useState(5)

  React.useEffect(() => {
    // Get user from localStorage
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        const userData = JSON.parse(storedUser)
        if (userData.role !== "admin") {
          // Redirect to login if not admin
          router.push("/signin")
        } else {
          setUser(userData)
        }
      } else {
        // Redirect to login if no user found
        router.push("/signin")
      }
    }
  }, [router])

  if (!user) {
    return null // Or a loading spinner
  }

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile menu trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-accent/50 transition-colors duration-200"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <div className="flex flex-col gap-6 mt-8">
                <Link href="/admin/dashboard" className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-primary">ResearchHub</span>
                  <Badge variant="outline" className="ml-2 bg-primary/10">
                    Admin
                  </Badge>
                </Link>
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-2 text-lg font-medium transition-all duration-200 hover:text-primary hover:translate-x-1",
                      pathname === "/admin/dashboard" ? "text-primary" : "text-foreground",
                    )}
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    href="/admin/proposals"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-2 text-lg font-medium transition-all duration-200 hover:text-primary hover:translate-x-1",
                      pathname.startsWith("/admin/proposals") ? "text-primary" : "text-foreground",
                    )}
                  >
                    <FileText className="h-5 w-5" />
                    Proposals
                  </Link>
                  <Link
                    href="/admin/users"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-2 text-lg font-medium transition-all duration-200 hover:text-primary hover:translate-x-1",
                      pathname.startsWith("/admin/users") ? "text-primary" : "text-foreground",
                    )}
                  >
                    <Users className="h-5 w-5" />
                    Users
                  </Link>
                  <Link
                    href="/admin/reviews"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-2 text-lg font-medium transition-all duration-200 hover:text-primary hover:translate-x-1",
                      pathname.startsWith("/admin/reviews") ? "text-primary" : "text-foreground",
                    )}
                  >
                    <ClipboardList className="h-5 w-5" />
                    Reviews
                  </Link>
                  <Link
                    href="/admin/settings"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-2 text-lg font-medium transition-all duration-200 hover:text-primary hover:translate-x-1",
                      pathname === "/admin/settings" ? "text-primary" : "text-foreground",
                    )}
                  >
                    <Settings className="h-5 w-5" />
                    Settings
                  </Link>
                </nav>
                <div className="mt-auto pt-4 border-t">
                  <LogoutConfirmation variant="sidebar" className="w-full justify-start" />
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/admin/dashboard" className="flex items-center space-x-2">
            <motion.span
              className="text-2xl font-bold text-primary"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              ResearchHub
            </motion.span>
            <Badge variant="outline" className="ml-2 bg-primary/10">
              Admin
            </Badge>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 ml-4">
            <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Link
                href="/admin/dashboard"
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === "/admin/dashboard" ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent/50",
                )}
              >
                Dashboard
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Link
                href="/admin/proposals"
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname.startsWith("/admin/proposals")
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-accent/50",
                )}
              >
                Proposals
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Link
                href="/admin/users"
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname.startsWith("/admin/users")
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-accent/50",
                )}
              >
                Users
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Link
                href="/admin/reviews"
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname.startsWith("/admin/reviews")
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-accent/50",
                )}
              >
                Reviews
              </Link>
            </motion.div>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="relative"
          >
            <Button variant="ghost" size="icon" className="relative hover:bg-accent/50 transition-colors duration-200">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {notifications}
                </span>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Button variant="ghost" size="icon" className="hover:bg-accent/50 transition-colors duration-200">
              <Shield className="h-5 w-5" />
              <span className="sr-only">Admin Controls</span>
            </Button>
          </motion.div>

          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Avatar className="h-8 w-8 border-2 border-primary">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </motion.div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  <Badge variant="outline" className="mt-1 w-fit bg-primary/10">
                    Admin
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/admin/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <button
                  id="admin-header-logout-button"
                  className="w-full flex items-center"
                  onClick={() => {
                    const logoutButton = document.getElementById("sidebar-logout-button")
                    if (logoutButton) {
                      logoutButton.click()
                    }
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  )
}

