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
import { Bell, FileText, HelpCircle, Home, Menu, MessageSquare, Settings, User, LogOut, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LogoutConfirmation } from "./logout-confirmation"
import { Badge } from "@/components/ui/badge"

export default function UserHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)
  const [user, setUser] = React.useState<any>(null)
  const [notifications, setNotifications] = React.useState(3)
  const [showLogoutDialog, setShowLogoutDialog] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
    }
  }, [router])

  const handleLogout = () => {
    setShowLogoutDialog(true)
  }

  const confirmLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    router.push("/signin")
  }

  const cancelLogout = () => {
    setShowLogoutDialog(false)
  }

  if (!user) {
    return null // Or a loading spinner
  }

  return (
    <motion.header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
        scrolled ? "bg-background/95 shadow-sm" : "bg-background/80",
      )}
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
                className="md:hidden hover:bg-accent/50 transition-colors duration-200 rounded-full"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[350px] pr-0">
              <div className="flex justify-between items-center mb-6">
                <Link href="/dashboard" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                  <span className="text-2xl font-bold text-primary">ResearchHub</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full hover:bg-accent/50"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center gap-3 px-2">
                  <Avatar className="h-10 w-10 border-2 border-primary/10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </div>
                <nav className="flex flex-col gap-2 mt-4">
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-md text-base font-medium transition-all duration-200",
                      pathname === "/dashboard" ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent/50",
                    )}
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/submit-proposal"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-md text-base font-medium transition-all duration-200",
                      pathname === "/dashboard/submit-proposal"
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-accent/50",
                    )}
                  >
                    <FileText className="h-5 w-5" />
                    Submit Proposal
                  </Link>
                  <Link
                    href="/dashboard/my-proposals"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-md text-base font-medium transition-all duration-200",
                      pathname.startsWith("/dashboard/my-proposals")
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-accent/50",
                    )}
                  >
                    <MessageSquare className="h-5 w-5" />
                    My Proposals
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-md text-base font-medium transition-all duration-200",
                      pathname === "/dashboard/profile"
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-accent/50",
                    )}
                  >
                    <User className="h-5 w-5" />
                    Profile
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-2 p-2 rounded-md text-base font-medium transition-all duration-200",
                      pathname === "/dashboard/settings"
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-accent/50",
                    )}
                  >
                    <Settings className="h-5 w-5" />
                    Settings
                  </Link>
                </nav>
                <div className="mt-auto pt-4 border-t">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 p-2 text-base font-medium hover:bg-destructive/10 hover:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5" />
                    Log out
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/dashboard" className="flex items-center space-x-2">
            <motion.span
              className="text-2xl font-bold text-primary"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              ResearchHub
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 ml-4">
            <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Link
                href="/dashboard"
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === "/dashboard" ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent/50",
                )}
              >
                Dashboard
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Link
                href="/dashboard/submit-proposal"
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === "/dashboard/submit-proposal"
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-accent/50",
                )}
              >
                Submit Proposal
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Link
                href="/dashboard/my-proposals"
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname.startsWith("/dashboard/my-proposals")
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-accent/50",
                )}
              >
                My Proposals
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
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-accent/50 transition-colors duration-200 rounded-full"
              aria-label={`${notifications} notifications`}
            >
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
                >
                  {notifications}
                </Badge>
              )}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-accent/50 transition-colors duration-200 rounded-full"
              aria-label="Help"
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
          </motion.div>

          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Avatar className="h-8 w-8 ring-2 ring-primary/10">
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
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-destructive focus:text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <LogoutConfirmation isOpen={showLogoutDialog} onConfirm={confirmLogout} onCancel={cancelLogout} />
    </motion.header>
  )
}

