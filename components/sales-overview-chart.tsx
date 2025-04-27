"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

// Register all Chart.js components
Chart.register(...registerables)

// Sample data for the sales chart
const salesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "2023 Sales",
      data: [18500, 19200, 21500, 22800, 24100, 23400, 26800, 27900, 25600, 28200, 29100, 32500],
      borderColor: "rgb(34, 197, 94)",
      backgroundColor: "rgba(34, 197, 94, 0.1)",
      fill: true,
      tension: 0.4,
    },
    {
      label: "2022 Sales",
      data: [15200, 16800, 18900, 19500, 21200, 20800, 23500, 24800, 22900, 25100, 26300, 28700],
      borderColor: "rgb(99, 102, 241)",
      backgroundColor: "rgba(99, 102, 241, 0.1)",
      fill: true,
      tension: 0.4,
    },
  ],
}

export default function SalesOverviewChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      // Create new chart
      const ctx = chartRef.current.getContext("2d")
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: salesData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
              },
              tooltip: {
                mode: "index",
                intersect: false,
                callbacks: {
                  label: (context) => {
                    let label = context.dataset.label || ""
                    if (label) {
                      label += ": "
                    }
                    if (context.parsed.y !== null) {
                      label += new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(context.parsed.y)
                    }
                    return label
                  },
                },
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  callback: (value) => "$" + value.toLocaleString(),
                },
              },
            },
          },
        })
      }
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return <canvas ref={chartRef} />
}
