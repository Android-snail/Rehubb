"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ToastProps {
  title: string
  description?: string
  variant?: "default" | "destructive"
  duration?: number
}

type Toast = ToastProps & {
  id: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface ToastContextProps {
  toasts: Toast[]
  toast: (props: ToastProps) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextProps>({
  toasts: [],
  toast: () => {},
  dismiss: () => {},
})

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = (props: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { ...props, id }])
  }

  const dismiss = (id: string) => {
    setToasts((prev) => prev.map((toast) => (toast.id === id ? { ...toast, open: false } : toast)))

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 200)
  }

  const value = {
    toasts,
    toast,
    dismiss,
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4 md:max-w-[420px]">
        {toasts.map((toast) => (
          <ToastComponent key={toast.id} {...toast} onClose={() => dismiss(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

function ToastComponent({
  id,
  title,
  description,
  variant = "default",
  duration = 5000,
  onClose,
}: ToastProps & { id: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div
      className={cn(
        "pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
        variant === "default" ? "bg-background text-foreground" : "bg-destructive text-destructive-foreground",
      )}
    >
      <div className="grid gap-1">
        <h3 className="font-medium">{title}</h3>
        {description && <p className="text-sm opacity-90">{description}</p>}
      </div>
      <button
        onClick={onClose}
        className={cn(
          "absolute right-2 top-2 rounded-md p-1",
          variant === "default"
            ? "text-foreground/50 hover:text-foreground"
            : "text-destructive-foreground/50 hover:text-destructive-foreground",
        )}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  )
}

export const toast = (props: ToastProps) => {
  const id = Math.random().toString(36).substring(2, 9)
  const event = new CustomEvent("toast", { detail: { ...props, id } })
  document.dispatchEvent(event)
}

