"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LogIn, Menu, UserPlus, X } from "lucide-react"

const routes = [
  { name: "Feed", path: "/feed" },
  { name: "How it Works", path: "/how-it-works" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
]

export default function PublicHeader(): JSX.Element {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const [user, setUser] = React.useState(null)
  const [scrolled, setScrolled] = React.useState(false)

  // Handle scroll effect with adjusted threshold
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Update the useEffect to handle client-side rendering properly
  React.useEffect(() => {
    // Get user from localStorage
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/85 backdrop-blur-md shadow-sm border-b border-border/40"
          : "bg-background/50 backdrop-blur-sm"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/uro logo.png"
            alt="Enresearch Logo"
            width={48}
            height={48}
            className="h-10 w-10"
          />
            <span className="text-xl font-bold text-primary transition-colors duration-150">
            Enresearch
            </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {routes.map((route) => (
              <NavigationMenuItem key={route.path}>
                <Link href={route.path} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === route.path && "bg-accent text-accent-foreground font-medium",
                      "transition-colors duration-150"
                    )}>
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
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-accent/50 transition-colors duration-200 rounded-full"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px] pr-0">
              <div className="flex justify-between items-center mb-6">
                <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
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
              <nav className="flex flex-col gap-4 mt-8">
                {routes.map((route) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors duration-150 p-2 rounded-md",
                      pathname === route.path ? "text-primary bg-primary/5" : "text-foreground hover:text-primary hover:bg-accent/50"
                    )}
                  >
                    {route.name}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 mt-6 pt-6 border-t">
                  <Link
                    href="/signin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-lg font-medium transition-all duration-200 hover:text-primary p-2 rounded-md"
                  >
                    <LogIn className="h-5 w-5" />
                    Sign In
                  </Link>
                  <Button asChild className="gap-2 mt-2 w-full justify-start">
                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                      <UserPlus className="h-5 w-5" />
                      Sign Up
                    </Link>
                  </Button>
                  <div className="mt-4 flex justify-center">
                    <ModeToggle />
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="relative group">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="gap-2 transition-colors duration-150 rounded-full px-4 hover:bg-accent/50"
            >
              <Link href="/signin">
                <LogIn className="h-4 w-4" />
                Sign In
              </Link>
            </Button>
          </div>
          <Button
            asChild
            size="sm"
            className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-150 rounded-full px-4"
          >
            <Link href="/signup">
              <UserPlus className="h-4 w-4" />
              Sign Up
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

