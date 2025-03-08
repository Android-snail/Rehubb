import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Improved error handling for fetch requests
export async function fetchWithErrorHandling(url: string, options?: RequestInit) {
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Fetch error:", error)
    throw error
  }
}

// Helper for handling form submissions with better error messages
export function handleFormSubmission(callback: Function) {
  return async (formData: FormData) => {
    try {
      return await callback(formData)
    } catch (error) {
      console.error("Form submission error:", error)
      return { error: "Failed to submit form. Please try again." }
    }
  }
}

// Improved date formatting with fallback
export function formatDate(date: string | Date) {
  if (!date) return "N/A"

  try {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  } catch (error) {
    console.error("Date formatting error:", error)
    return "Invalid date"
  }
}

// Debounce function for improved performance
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

