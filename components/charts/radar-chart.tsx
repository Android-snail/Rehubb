"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"
import { radarChartOptions } from "@/lib/chart-utils"

// Register Chart.js components
Chart.register(...registerables)

interface RadarChartProps {
  data: any
  options?: any
  height?: number
}

export function RadarChart({ data, options = radarChartOptions, height = 300 }: RadarChartProps) {
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
        type: "radar",
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

