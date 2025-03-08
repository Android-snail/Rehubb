"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  Calendar,
  BookOpen,
  BarChart2,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  Microscope,
} from "lucide-react"
import { LogoutConfirmation } from "@/components/logout-confirmation"
import { motion, AnimatePresence } from "framer-motion"

interface SidebarProps {
  className?: string
}

export function DashboardSidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [studiesOpen, setStudiesOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Get user from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      router.push("/signin")
    }

    // Auto-expand Studies section if we're on a studies page
    if (pathname.includes("/dashboard/studies")) {
      setStudiesOpen(true)
    }
  }, [router, pathname])

  const handleLogoutConfirm = async () => {
    try {
      // Clear all localStorage data
      localStorage.clear()
      // Redirect to signin page
      router.push('/signin')
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      setShowLogoutDialog(false)
    }
  }

  const handleLogoutClick = () => {
    setShowLogoutDialog(true)
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Submit Proposal",
      href: "/dashboard/submit-proposal",
      icon: FileText,
    },
    {
      title: "My Proposals",
      href: "/dashboard/my-proposals",
      icon: ClipboardList,
    },
    {
      title: "Calendar",
      href: "/dashboard/calendar",
      icon: Calendar,
    },
    {
      title: "Resources",
      href: "/dashboard/resources",
      icon: BookOpen,
    },
    {
      title: "Feed",
      href: "/dashboard/feed",
      icon: MessageSquare,
    },
  ]

  const accountItems = [
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  // Animation variants
  const sidebarVariants = {
    expanded: { width: "240px", transition: { duration: 0.3, ease: "easeInOut" } },
    collapsed: { width: "70px", transition: { duration: 0.3, ease: "easeInOut" } },
  }

  const textVariants = {
    expanded: { opacity: 1, x: 0, display: "block", transition: { delay: 0.1, duration: 0.2 } },
    collapsed: { opacity: 0, x: -10, transitionEnd: { display: "none" }, transition: { duration: 0.2 } },
  }

  const logoVariants = {
    expanded: { opacity: 1, scale: 1, transition: { delay: 0.1, duration: 0.2 } },
    collapsed: { opacity: 1, scale: 0.9, transition: { duration: 0.2 } },
  }

  const itemVariants = {
    expanded: {
      justifyContent: "flex-start",
      transition: { duration: 0.2 },
    },
    collapsed: {
      justifyContent: "center",
      transition: { duration: 0.2 },
    },
  }

  if (!isMounted) return null

  return (
    <>
      <motion.div
        initial={false}
        animate={isCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        className={cn("fixed left-0 top-0 z-30 flex h-screen flex-col border-r bg-background shadow-sm", className)}
      >
        <div className="flex h-14 items-center border-b px-3 py-4">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                variants={textVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="flex items-center gap-2 font-semibold"
              >
                <Link href="/dashboard" className="flex items-center gap-2">
                  <motion.span variants={logoVariants} className="text-primary text-xl">
                    ResearchHub
                  </motion.span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            variant="ghost"
            size="icon"
            className={cn("ml-auto h-8 w-8 rounded-full", isCollapsed && "mx-auto")}
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
            )}
          </Button>
        </div>
        <ScrollArea className="flex-1 py-2 overflow-x-hidden">
          <nav className="grid gap-1 px-2">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <TooltipProvider key={index} delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div variants={itemVariants} className="flex">
                        <Link
                          href={item.href}
                          className={cn(
                            "group flex h-10 w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-all",
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                            "relative overflow-hidden",
                          )}
                        >
                          {/* Active indicator */}
                          {isActive && (
                            <motion.span
                              layoutId="activeIndicator"
                              className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}

                          <div className={cn("flex items-center justify-center", isCollapsed ? "w-full" : "w-5 mr-3")}>
                            <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
                          </div>

                          {!isCollapsed && (
                            <motion.span variants={textVariants} className="truncate">
                              {item.title}
                            </motion.span>
                          )}
                        </Link>
                      </motion.div>
                    </TooltipTrigger>
                    {isCollapsed && <TooltipContent side="right">{item.title}</TooltipContent>}
                  </Tooltip>
                </TooltipProvider>
              )
            })}
          </nav>

          <div className="mt-4 px-4 py-2">
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  variants={textVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  className="mb-2 text-xs font-semibold text-muted-foreground"
                >
                  ACCOUNT
                </motion.div>
              )}
            </AnimatePresence>
            <nav className="grid gap-1">
              {accountItems.map((item, index) => {
                const isActive = pathname === item.href
                return (
                  <TooltipProvider key={index} delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div variants={itemVariants} className="flex">
                          <Link
                            href={item.href}
                            className={cn(
                              "group flex h-10 w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-all",
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                              "relative overflow-hidden",
                            )}
                          >
                            {/* Active indicator */}
                            {isActive && (
                              <motion.span
                                layoutId="activeIndicatorAccount"
                                className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              />
                            )}

                            <div
                              className={cn("flex items-center justify-center", isCollapsed ? "w-full" : "w-5 mr-3")}
                            >
                              <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
                            </div>

                            {!isCollapsed && (
                              <motion.span variants={textVariants} className="truncate">
                                {item.title}
                              </motion.span>
                            )}
                          </Link>
                        </motion.div>
                      </TooltipTrigger>
                      {isCollapsed && <TooltipContent side="right">{item.title}</TooltipContent>}
                    </Tooltip>
                  </TooltipProvider>
                )
              })}
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div variants={itemVariants} className="flex">
                      <Button
                        variant="ghost"
                        aria-label="Logout from your account"
                        className={cn(
                          "group flex h-10 w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-all",
                          "text-destructive hover:text-destructive hover:bg-destructive/10",
                          "relative overflow-hidden focus-visible:ring-destructive",
                        )}
                        onClick={handleLogoutClick}
                      >
                        <div className={cn("flex items-center justify-center", isCollapsed ? "w-full" : "w-5 mr-3")}>
                          <LogOut className="h-5 w-5" />
                        </div>

                        {!isCollapsed && (
                          <motion.span variants={textVariants} className="truncate">
                            Logout
                          </motion.span>
                        )}
                      </Button>
                    </motion.div>
                  </TooltipTrigger>
                  {isCollapsed && <TooltipContent side="right">Logout from your account</TooltipContent>}
                </Tooltip>
              </TooltipProvider>
            </nav>
          </div>
        </ScrollArea>
        <AnimatePresence>
          {!isCollapsed && user && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="mt-auto border-t bg-accent/5 p-4"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 ring-2 ring-background">
                  <AvatarImage src={user.avatar || ""} alt={user.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-medium text-base">
                    {user.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <motion.div 
                  variants={textVariants} 
                  className="flex flex-col min-w-0"
                >
                  <span className="text-sm font-medium truncate max-w-[140px]">
                    {user.name || "John Doe"}
                  </span>
                </motion.div>
              </div>
             
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <LogoutConfirmation 
        isOpen={showLogoutDialog} 
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogoutDialog(false)}
        variant="sidebar"
        className="w-full justify-start text-sm font-medium"
      />
    </>
  )
}

