"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"
import { lineChartOptions } from "@/lib/chart-utils"
import { cn } from "@/lib/utils"

// Register Chart.js components
Chart.register(...registerables)

interface LineChartProps {
  data: any
  options?: any
  height?: number
  className?: string
  gradient?: boolean
}

export function LineChart({
  data,
  options = lineChartOptions,
  height = 300,
  className,
  gradient = true,
}: LineChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    // Create new chart instance
    const ctx = chartRef.current.getContext("2d")
    if (ctx) {
      // Apply gradient if enabled
      if (gradient && data.datasets && data.datasets.length > 0) {
        const gradients = data.datasets.map((_: any, i: number) => {
          const gradient = ctx.createLinearGradient(0, 0, 0, height)
          const color = data.datasets[i].borderColor

          // Create gradient colors safely
          let startColor, endColor

          // Handle different color formats (rgba, hsla, hex)
          if (typeof color === "string") {
            if (color.startsWith("rgba")) {
              // For rgba format
              startColor = color.replace(/rgba$$(\d+,\s*\d+,\s*\d+,\s*)[\d.]+$$/, "rgba($1" + "0.5)")
              endColor = color.replace(/rgba$$(\d+,\s*\d+,\s*\d+,\s*)[\d.]+$$/, "rgba($1" + "0.05)")
            } else if (color.startsWith("hsla")) {
              // For hsla format
              startColor = color.replace(/hsla$$([^,]+,[^,]+,[^,]+,\s*)[\d.]+$$/, "hsla($1" + "0.5)")
              endColor = color.replace(/hsla$$([^,]+,[^,]+,[^,]+,\s*)[\d.]+$$/, "hsla($1" + "0.05)")
            } else {
              // For hex or other formats, use rgba with the original color
              startColor = `rgba(${hexToRgb(color)}, 0.5)`
              endColor = `rgba(${hexToRgb(color)}, 0.05)`
            }
          } else {
            // Fallback for non-string colors
            startColor = "rgba(100, 116, 139, 0.5)"
            endColor = "rgba(100, 116, 139, 0.05)"
          }

          gradient.addColorStop(0, startColor)
          gradient.addColorStop(1, endColor)

          return gradient
        })

        // Apply gradients to datasets
        const enhancedData = {
          ...data,
          datasets: data.datasets.map((dataset: any, i: number) => ({
            ...dataset,
            backgroundColor: gradients[i],
          })),
        }

        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: enhancedData,
          options: {
            ...options,
            elements: {
              ...options.elements,
              line: {
                ...options.elements?.line,
                tension: 0.4,
                borderWidth: 3,
              },
              point: {
                ...options.elements?.point,
                radius: 4,
                hoverRadius: 6,
                borderWidth: 2,
                backgroundColor: "white",
              },
            },
            plugins: {
              ...options.plugins,
              legend: {
                ...options.plugins?.legend,
                labels: {
                  ...options.plugins?.legend?.labels,
                  usePointStyle: true,
                  padding: 20,
                  font: {
                    size: 12,
                    weight: "bold",
                  },
                },
              },
            },
          },
        })
      } else {
        chartInstance.current = new Chart(ctx, {
          type: "line",
          data,
          options,
        })
      }
    }

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, options, height, gradient])

  return (
    <div className={cn("chart-container", className)}>
      <canvas ref={chartRef} height={height} />
    </div>
  )
}

// Helper function to convert hex to rgb
function hexToRgb(hex: string): string {
  // Default fallback
  if (!hex) return "100, 116, 139"

  // Remove the hash if it exists
  hex = hex.replace(/^#/, "")

  // Handle shorthand hex
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }

  // Convert to rgb
  const r = Number.parseInt(hex.substring(0, 2), 16)
  const g = Number.parseInt(hex.substring(2, 4), 16)
  const b = Number.parseInt(hex.substring(4, 6), 16)

  // Return as string for rgba()
  return isNaN(r) || isNaN(g) || isNaN(b)
    ? "100, 116, 139"
    : // Fallback if parsing fails
      `${r}, ${g}, ${b}`
}

