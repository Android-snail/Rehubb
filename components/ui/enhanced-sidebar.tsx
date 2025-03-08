"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ChevronLeft, ChevronRight, Menu } from "lucide-react"

interface SidebarItem {
  title: string
  href: string
  icon: React.ElementType
  description?: string
  badge?: number | string
}

interface SidebarSection {
  title?: string
  items: SidebarItem[]
}

interface EnhancedSidebarProps {
  logo: React.ReactNode
  sections: SidebarSection[]
  footer?: React.ReactNode
  defaultExpanded?: boolean
  variant?: "user" | "admin"
  children?: React.ReactNode
}

export function EnhancedSidebar({
  logo,
  sections,
  footer,
  defaultExpanded = true,
  variant = "user",
  children,
}: EnhancedSidebarProps) {
  const pathname = usePathname()
  const [expanded, setExpanded] = React.useState(defaultExpanded)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  // Color schemes based on variant
  const colorScheme = {
    user: {
      activeBackground: "bg-primary/10",
      activeText: "text-primary",
      hoverBackground: "hover:bg-primary/5",
      sectionTitle: "text-muted-foreground",
    },
    admin: {
      activeBackground: "bg-primary/10",
      activeText: "text-primary",
      hoverBackground: "hover:bg-primary/5",
      sectionTitle: "text-muted-foreground",
    },
  }[variant]

  const sidebarVariants = {
    expanded: { width: "280px" },
    collapsed: { width: "80px" },
  }

  const sidebarTransition = { duration: 0.2, ease: "easeInOut" }

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      {/* Sidebar */}
      <motion.aside
        initial={expanded ? "expanded" : "collapsed"}
        animate={expanded ? "expanded" : "collapsed"}
        variants={sidebarVariants}
        transition={sidebarTransition}
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex h-full flex-col border-r bg-background/95 backdrop-blur-sm lg:sticky",
          "transition-all duration-200 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Sidebar header */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          <AnimatePresence mode="wait">
            {expanded ? (
              <motion.div
                key="full-logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center"
              >
                {logo}
              </motion.div>
            ) : (
              <motion.div
                key="icon-logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center w-full"
              >
                {React.isValidElement(logo) && React.cloneElement(logo, { compact: true })}
              </motion.div>
            )}
          </AnimatePresence>

          <Button variant="ghost" size="icon" className="hidden lg:flex" onClick={() => setExpanded(!expanded)}>
            {expanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>

        {/* Sidebar content */}
        <div className="flex-1 overflow-auto py-4 px-3">
          <nav className="space-y-6">
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-2">
                {section.title && expanded && (
                  <h3 className={cn("px-4 text-xs font-semibold uppercase tracking-wider", colorScheme.sectionTitle)}>
                    {section.title}
                  </h3>
                )}
                <ul className="space-y-1">
                  {section.items.map((item, itemIndex) => {
                    const active = isActive(item.href)
                    const Icon = item.icon

                    return (
                      <TooltipProvider key={itemIndex}>
                        <Tooltip delayDuration={300}>
                          <TooltipTrigger asChild>
                            <li>
                              <Link
                                href={item.href}
                                className={cn(
                                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                                  active ? cn(colorScheme.activeBackground, colorScheme.activeText) : "text-foreground",
                                  !active && colorScheme.hoverBackground,
                                  "relative overflow-hidden",
                                )}
                              >
                                {/* Background animation on hover */}
                                {!active && (
                                  <motion.span
                                    className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100"
                                    initial={false}
                                    animate={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                  />
                                )}

                                {/* Active indicator */}
                                {active && (
                                  <motion.span
                                    className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                                    layoutId="activeIndicator"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                  />
                                )}

                                <Icon className={cn("h-5 w-5 flex-shrink-0", expanded ? "mr-3" : "mx-auto")} />

                                {expanded && <span className="truncate">{item.title}</span>}

                                {expanded && item.badge && (
                                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/10 px-1 text-xs font-medium text-primary">
                                    {item.badge}
                                  </span>
                                )}
                              </Link>
                            </li>
                          </TooltipTrigger>
                          {!expanded && (
                            <TooltipContent side="right" className="flex flex-col">
                              <span>{item.title}</span>
                              {item.description && (
                                <span className="text-xs text-muted-foreground">{item.description}</span>
                              )}
                              {item.badge && (
                                <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                                  {item.badge}
                                </span>
                              )}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    )
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Sidebar footer */}
        {footer && <div className="mt-auto border-t p-4">{footer}</div>}
      </motion.aside>

      {/* Main content */}
      <div
        className={cn(
          "flex flex-1 flex-col transition-all duration-200 ease-in-out",
          expanded ? "lg:pl-[280px]" : "lg:pl-[80px]",
        )}
      >
        {children}
      </div>
    </>
  )
}

// Logo component with support for compact mode
interface LogoProps {
  title: string
  icon?: React.ReactNode
  compact?: boolean
  variant?: "user" | "admin"
}

export function Logo({ title, icon, compact = false, variant = "user" }: LogoProps) {
  const isAdmin = variant === "admin"

  return (
    <div className="flex items-center">
      {icon && (
        <div
          className={cn(
            "flex items-center justify-center rounded-md",
            isAdmin ? "text-primary" : "text-primary",
            compact ? "h-8 w-8" : "h-8 w-8 mr-3",
          )}
        >
          {icon}
        </div>
      )}

      {!compact && (
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <span className={cn("text-xl font-bold", isAdmin ? "text-primary" : "text-primary")}>{title}</span>

          {isAdmin && (
            <span className="ml-2 rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">Admin</span>
          )}
        </motion.div>
      )}
    </div>
  )
}

