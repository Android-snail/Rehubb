"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"
import { barChartOptions } from "@/lib/chart-utils"

// Register Chart.js components
Chart.register(...registerables)

interface BarChartProps {
  data: any
  options?: any
  height?: number
}

export function BarChart({ data, options = barChartOptions, height = 300 }: BarChartProps) {
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
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data,
        options,
      })
    }

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, options])

  return <canvas ref={chartRef} height={height} />
}

