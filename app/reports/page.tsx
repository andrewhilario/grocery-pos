"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/date-range-picker"
import type { DateRange } from "react-day-picker"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart4, Download, FileText, Printer } from "lucide-react"

// Sample sales data for reports
const salesData = [
  {
    id: "INV-001",
    date: "2023-04-01",
    cashier: "John Doe",
    items: 12,
    subtotal: 145.97,
    tax: 10.22,
    total: 156.19,
    payment: "Credit Card",
  },
  {
    id: "INV-002",
    date: "2023-04-01",
    cashier: "Jane Smith",
    items: 8,
    subtotal: 78.45,
    tax: 5.49,
    total: 83.94,
    payment: "Cash",
  },
  {
    id: "INV-003",
    date: "2023-04-02",
    cashier: "John Doe",
    items: 15,
    subtotal: 189.32,
    tax: 13.25,
    total: 202.57,
    payment: "Credit Card",
  },
  {
    id: "INV-004",
    date: "2023-04-02",
    cashier: "Jane Smith",
    items: 5,
    subtotal: 42.99,
    tax: 3.01,
    total: 46.0,
    payment: "Cash",
  },
  {
    id: "INV-005",
    date: "2023-04-03",
    cashier: "John Doe",
    items: 10,
    subtotal: 112.5,
    tax: 7.88,
    total: 120.38,
    payment: "Debit Card",
  },
  {
    id: "INV-006",
    date: "2023-04-03",
    cashier: "Jane Smith",
    items: 7,
    subtotal: 65.75,
    tax: 4.6,
    total: 70.35,
    payment: "Cash",
  },
  {
    id: "INV-007",
    date: "2023-04-04",
    cashier: "John Doe",
    items: 9,
    subtotal: 95.25,
    tax: 6.67,
    total: 101.92,
    payment: "Credit Card",
  },
]

// Sample inventory data for reports
const inventoryData = [
  {
    id: 1,
    sku: "PRD-001",
    name: "Organic Bananas",
    category: "Produce",
    quantity: 48,
    reorderLevel: 15,
    lastRestocked: "2023-03-28",
    value: 72.0,
  },
  {
    id: 2,
    sku: "PRD-002",
    name: "Whole Milk",
    category: "Dairy",
    quantity: 36,
    reorderLevel: 10,
    lastRestocked: "2023-03-30",
    value: 75.6,
  },
  {
    id: 3,
    sku: "PRD-003",
    name: "Wheat Bread",
    category: "Bakery",
    quantity: 24,
    reorderLevel: 8,
    lastRestocked: "2023-03-31",
    value: 30.0,
  },
  {
    id: 4,
    sku: "PRD-004",
    name: "Chicken Breast",
    category: "Meat",
    quantity: 15,
    reorderLevel: 5,
    lastRestocked: "2023-04-01",
    value: 82.5,
  },
  {
    id: 5,
    sku: "PRD-005",
    name: "Cheddar Cheese",
    category: "Dairy",
    quantity: 20,
    reorderLevel: 7,
    lastRestocked: "2023-03-29",
    value: 65.0,
  },
]

export default function ReportsPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2023, 3, 1),
    to: new Date(2023, 3, 7),
  })
  const [reportType, setReportType] = useState("sales")

  const handlePrint = () => {
    window.print()
  }

  const handleExport = () => {
    // In a real application, this would generate a CSV or PDF file
    alert("Exporting report as CSV...")
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">Reports</h1>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/3">
                  <label className="block text-sm font-medium mb-1">Report Type</label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales Report</SelectItem>
                      <SelectItem value="inventory">Inventory Report</SelectItem>
                      <SelectItem value="products">Product Performance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full md:w-2/3">
                  <label className="block text-sm font-medium mb-1">Date Range</label>
                  <DatePickerWithRange date={date} setDate={setDate} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="table" className="w-full">
            <TabsList className="grid w-full md:w-[400px] grid-cols-2">
              <TabsTrigger value="table">
                <FileText className="mr-2 h-4 w-4" />
                Table View
              </TabsTrigger>
              <TabsTrigger value="chart">
                <BarChart4 className="mr-2 h-4 w-4" />
                Chart View
              </TabsTrigger>
            </TabsList>

            <TabsContent value="table" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {reportType === "sales"
                      ? "Sales Report"
                      : reportType === "inventory"
                        ? "Inventory Report"
                        : "Product Performance"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {reportType === "sales" && (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Invoice #</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Cashier</TableHead>
                            <TableHead className="text-right">Items</TableHead>
                            <TableHead className="text-right">Subtotal</TableHead>
                            <TableHead className="text-right">Tax</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead>Payment</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {salesData.map((sale) => (
                            <TableRow key={sale.id}>
                              <TableCell className="font-medium">{sale.id}</TableCell>
                              <TableCell>{sale.date}</TableCell>
                              <TableCell>{sale.cashier}</TableCell>
                              <TableCell className="text-right">{sale.items}</TableCell>
                              <TableCell className="text-right">${sale.subtotal.toFixed(2)}</TableCell>
                              <TableCell className="text-right">${sale.tax.toFixed(2)}</TableCell>
                              <TableCell className="text-right">${sale.total.toFixed(2)}</TableCell>
                              <TableCell>{sale.payment}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>

                      <div className="mt-4 flex justify-end">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                            <div className="text-gray-500">Total Sales:</div>
                            <div className="text-right font-medium">
                              ${salesData.reduce((sum, sale) => sum + sale.total, 0).toFixed(2)}
                            </div>
                            <div className="text-gray-500">Total Items:</div>
                            <div className="text-right font-medium">
                              {salesData.reduce((sum, sale) => sum + sale.items, 0)}
                            </div>
                            <div className="text-gray-500">Average Sale:</div>
                            <div className="text-right font-medium">
                              ${(salesData.reduce((sum, sale) => sum + sale.total, 0) / salesData.length).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {reportType === "inventory" && (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>SKU</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Quantity</TableHead>
                            <TableHead className="text-right">Reorder Level</TableHead>
                            <TableHead>Last Restocked</TableHead>
                            <TableHead className="text-right">Value</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {inventoryData.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">{item.sku}</TableCell>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{item.category}</TableCell>
                              <TableCell className="text-right">{item.quantity}</TableCell>
                              <TableCell className="text-right">{item.reorderLevel}</TableCell>
                              <TableCell>{item.lastRestocked}</TableCell>
                              <TableCell className="text-right">${item.value.toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>

                      <div className="mt-4 flex justify-end">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                            <div className="text-gray-500">Total Products:</div>
                            <div className="text-right font-medium">{inventoryData.length}</div>
                            <div className="text-gray-500">Total Quantity:</div>
                            <div className="text-right font-medium">
                              {inventoryData.reduce((sum, item) => sum + item.quantity, 0)}
                            </div>
                            <div className="text-gray-500">Total Value:</div>
                            <div className="text-right font-medium">
                              ${inventoryData.reduce((sum, item) => sum + item.value, 0).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {reportType === "products" && (
                    <div className="flex items-center justify-center p-12 text-gray-500">
                      <p>Product performance report would be displayed here</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chart" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {reportType === "sales"
                      ? "Sales Chart"
                      : reportType === "inventory"
                        ? "Inventory Chart"
                        : "Product Performance Chart"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-[400px] bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Chart visualization would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
