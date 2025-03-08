"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"
import { doughnutChartOptions } from "@/lib/chart-utils"

// Register Chart.js components
Chart.register(...registerables)

interface DoughnutChartProps {
  data: any
  options?: any
  height?: number
}

export function DoughnutChart({ data, options = doughnutChartOptions, height = 300 }: DoughnutChartProps) {
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
        type: "doughnut",
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

