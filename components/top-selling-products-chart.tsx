"use client";

import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

// Register all Chart.js components
Chart.register(...registerables);

// Sample data for top selling products
const topProductsData = {
  labels: [
    "Organic Bananas",
    "Whole Milk",
    "Chicken Breast",
    "Wheat Bread",
    "Orange Juice"
  ],
  datasets: [
    {
      label: "Units Sold",
      data: [1245, 1120, 980, 865, 740],
      backgroundColor: [
        "rgba(34, 197, 94, 0.8)",
        "rgba(59, 130, 246, 0.8)",
        "rgba(249, 115, 22, 0.8)",
        "rgba(168, 85, 247, 0.8)",
        "rgba(236, 72, 153, 0.8)"
      ],
      borderColor: [
        "rgba(34, 197, 94, 1)",
        "rgba(59, 130, 246, 1)",
        "rgba(249, 115, 22, 1)",
        "rgba(168, 85, 247, 1)",
        "rgba(236, 72, 153, 1)"
      ],
      borderWidth: 1
    }
  ]
};

export default function TopSellingProductsChart() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create new chart
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: topProductsData,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: "y",
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    let label = context.dataset.label || "";
                    if (label) {
                      label += ": ";
                    }
                    if (context.parsed.x !== null) {
                      label += context.parsed.x.toLocaleString() + " units";
                    }
                    return label;
                  }
                }
              }
            },
            scales: {
              x: {
                beginAtZero: true,
                grid: {
                  display: true
                  // Removed invalid property
                },
                ticks: {
                  callback: (value) => value.toLocaleString()
                }
              },
              y: {
                grid: {
                  display: false
                  // drawBorder: false,
                }
              }
            }
          }
        });
      }
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} />;
}
