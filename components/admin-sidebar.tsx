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
  ClipboardList,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  BarChart2,
  FileEdit,
  CheckSquare,
  AlertTriangle,
} from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)

      // Redirect if not admin
      if (parsedUser.role !== "admin") {
        router.push("/dashboard")
      }
    } else {
      // Redirect to login if no user
      router.push("/signin")
    }

    // For demo purposes, let's simulate unsaved changes
    // In a real app, you would track form changes or edits
    const checkForUnsavedChanges = () => {
      // This is where you would check for actual unsaved changes
      // For now, we'll just set it to true for demonstration
      if (
        pathname.includes("/admin/create-post") ||
        pathname.includes("/admin/settings") ||
        pathname.includes("/admin/admin-proposal")
      ) {
        setHasUnsavedChanges(true)
      } else {
        setHasUnsavedChanges(false)
      }
    }

    checkForUnsavedChanges()

    // Add beforeunload event listener to warn about unsaved changes
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = ""
        return ""
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [router, pathname, hasUnsavedChanges])

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

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Proposals",
      href: "/admin/admin-proposal",
      icon: ClipboardList,
    },
    {
      title: "Reviews",
      href: "/admin/reviews",
      icon: CheckSquare,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: BarChart2,
    },
    {
      title: "Create Post",
      href: "/admin/create-post",
      icon: FileEdit,
    },
  ]

  const accountItems = [
    {
      title: "Profile",
      href: "/admin/profile",
      icon: User,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  if (!user) {
    return null // Or a loading spinner
  }

  return (
    <>
      <div
        className={cn(
          "fixed left-0 top-0 z-30 flex h-screen flex-col border-r bg-background transition-all duration-300 ease-in-out",
          isCollapsed ? "w-[70px]" : "w-[240px]",
        )}
      >
        <div className="flex h-14 items-center border-b px-3 py-4">
          {!isCollapsed && (
            <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
              <span className="text-primary text-xl">Admin Panel</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={cn("ml-auto h-8 w-8", isCollapsed && "mx-auto")}
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
        <ScrollArea className="flex-1 py-2">
          <nav className="grid gap-1 px-2">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <TooltipProvider key={index} delayDuration={0}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex h-10 items-center rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
                          isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground",
                          "sidebar-item",
                          isActive && "active",
                        )}
                      >
                        <div className="flex w-5 items-center justify-center mr-3">
                          <item.icon className={cn("h-5 w-5")} />
                        </div>
                        {!isCollapsed && <span className="truncate">{item.title}</span>}
                      </Link>
                    </TooltipTrigger>
                    {isCollapsed && <TooltipContent side="right">{item.title}</TooltipContent>}
                  </Tooltip>
                </TooltipProvider>
              )
            })}
          </nav>
          <div className="mt-4 px-4 py-2">
            {!isCollapsed && <div className="mb-2 text-xs font-semibold text-muted-foreground">ACCOUNT</div>}
            <nav className="grid gap-1">
              {accountItems.map((item, index) => {
                const isActive = pathname === item.href
                return (
                  <TooltipProvider key={index} delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "group flex h-10 items-center rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
                            isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground",
                            "sidebar-item",
                            isActive && "active",
                          )}
                        >
                          <div className="flex w-5 items-center justify-center mr-3">
                            <item.icon className={cn("h-5 w-5")} />
                          </div>
                          {!isCollapsed && <span className="truncate">{item.title}</span>}
                        </Link>
                      </TooltipTrigger>
                      {isCollapsed && <TooltipContent side="right">{item.title}</TooltipContent>}
                    </Tooltip>
                  </TooltipProvider>
                )
              })}
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "group flex h-10 w-full items-center justify-start gap-x-3 rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-accent",
                        "text-muted-foreground hover:text-foreground",
                        "sidebar-item",
                      )}
                      onClick={handleLogout}
                    >
                      <div className="flex w-5 items-center justify-center mr-3">
                        <LogOut className={cn("h-5 w-5", hasUnsavedChanges && "text-amber-500")} />
                      </div>
                      {!isCollapsed && (
                        <div className="flex items-center gap-1 truncate">
                          <span>Logout</span>
                          {hasUnsavedChanges && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>You have unsaved changes</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </div>
                      )}
                    </Button>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">
                      <div className="flex items-center gap-1">
                        <span>Logout</span>
                        {hasUnsavedChanges && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                      </div>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </nav>
          </div>
        </ScrollArea>
        {!isCollapsed && user && (
          <div className="mt-auto border-t p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatar || ""} alt={user.name} />
                <AvatarFallback>{user.name?.charAt(0) || "A"}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Logout Dialog with Unsaved Changes Warning */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <LogOut className="h-5 w-5" />
              Are you sure you want to log out?
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>You will be logged out of the admin dashboard and redirected to the sign-in page.</p>

              {hasUnsavedChanges && (
                <div className="mt-2 rounded-md bg-amber-50 p-3 text-amber-800 dark:bg-amber-950 dark:text-amber-200">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                    <p className="font-medium">Warning: You have unsaved changes</p>
                  </div>
                  <p className="mt-1 text-sm">Any unsaved changes will be lost if you log out now.</p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelLogout}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmLogout}
              className={cn(
                "bg-primary text-primary-foreground hover:bg-primary/90",
                hasUnsavedChanges && "bg-destructive text-destructive-foreground hover:bg-destructive/90",
              )}
            >
              {hasUnsavedChanges ? "Log out anyway" : "Log out"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

