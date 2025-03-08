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
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Bell, LogIn, LogOut, Menu, Settings, User, UserPlus } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Public routes for unauthenticated users
const publicRoutes = [
  { name: "Feed", path: "/feed" },
  { name: "How it Works", path: "/how-it-works" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
]

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)
  const [user, setUser] = React.useState<any>(null)
  const [notifications, setNotifications] = React.useState(3)

  React.useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/signin")
  }

  const isDashboard = pathname.includes("/dashboard") || pathname.includes("/admin")

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link
          href={user ? (user.role === "admin" ? "/admin/dashboard" : "/dashboard") : "/"}
          className="flex items-center space-x-2"
        >
          <motion.span
            className="text-2xl font-bold text-primary"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            ResearchHub
          </motion.span>
          {user?.role === "admin" && (
            <Badge variant="outline" className="bg-primary/10">
              Admin
            </Badge>
          )}
        </Link>

        {/* Public Navigation - Show only for unauthenticated users */}
        {!user && (
          <>
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                {publicRoutes.map((route) => (
                  <NavigationMenuItem key={route.path}>
                    <Link href={route.path} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          pathname === route.path && "bg-accent text-accent-foreground",
                          "transition-all duration-200 hover:bg-accent/80",
                        )}
                      >
                        {route.name}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Mobile Navigation */}
            <div className="flex md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-accent/50 transition-colors duration-200">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <nav className="flex flex-col gap-4 mt-8">
                    {publicRoutes.map((route) => (
                      <Link
                        key={route.path}
                        href={route.path}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "text-lg font-medium transition-all duration-200 hover:text-primary hover:translate-x-1",
                          pathname === route.path ? "text-primary" : "text-foreground",
                        )}
                      >
                        {route.name}
                      </Link>
                    ))}
                    <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
                      <Link
                        href="/signin"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 text-lg font-medium transition-all duration-200 hover:text-primary hover:translate-x-1"
                      >
                        <LogIn className="h-5 w-5" />
                        Sign In
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 text-lg font-medium transition-all duration-200 hover:text-primary hover:translate-x-1"
                      >
                        <UserPlus className="h-5 w-5" />
                        Sign Up
                      </Link>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="gap-2 hover:bg-accent/50 transition-all duration-200"
                >
                  <Link href="/signin">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Button
                  asChild
                  size="sm"
                  className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200"
                >
                  <Link href="/signup">
                    <UserPlus className="h-4 w-4" />
                    Sign Up
                  </Link>
                </Button>
              </motion.div>
              <ModeToggle />
            </div>
          </>
        )}

        {/* Authenticated User Menu */}
        {user && (
          <div className="flex items-center gap-2">
            {!isDashboard && (
              <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="gap-2 hover:bg-accent/50 transition-all duration-200"
                >
                  <Link href={user.role === "admin" ? "/admin/dashboard" : "/dashboard"}>Dashboard</Link>
                </Button>
              </motion.div>
            )}

            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative"
            >
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-accent/50 transition-colors duration-200"
              >
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    {notifications}
                  </span>
                )}
                <span className="sr-only">Notifications</span>
              </Button>
            </motion.div>

            <ModeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <Avatar className={cn("h-8 w-8", user.role === "admin" && "border-2 border-primary")}>
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
                    {user.role === "admin" && (
                      <Badge variant="outline" className="mt-1 w-fit bg-primary/10">
                        Admin
                      </Badge>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href={user.role === "admin" ? "/admin/dashboard" : "/dashboard"} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href={user.role === "admin" ? "/admin/profile" : "/dashboard/profile"}
                      className="cursor-pointer"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href={user.role === "admin" ? "/admin/settings" : "/dashboard/settings"}
                      className="cursor-pointer"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </motion.header>
  )
}

