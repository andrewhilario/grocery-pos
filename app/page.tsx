import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ShoppingCart, Package, Users, BarChart4 } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">GroceryPOS</h1>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Complete Grocery Store Management System</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            An all-in-one solution for managing your grocery store operations, inventory, and sales.
          </p>
        </section>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <ShoppingCart className="h-8 w-8 mb-2 text-green-600" />
              <CardTitle>Point of Sale</CardTitle>
              <CardDescription>Fast and efficient checkout process</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Streamlined checkout experience with barcode scanning, quick product search, and receipt printing.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Package className="h-8 w-8 mb-2 text-green-600" />
              <CardTitle>Inventory Management</CardTitle>
              <CardDescription>Track stock levels in real-time</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Monitor product quantities, set reorder alerts, and manage suppliers all in one place.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-8 w-8 mb-2 text-green-600" />
              <CardTitle>User Management</CardTitle>
              <CardDescription>Role-based access control</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Manage cashiers, inventory staff, and administrators with customizable permissions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart4 className="h-8 w-8 mb-2 text-green-600" />
              <CardTitle>Sales Analytics</CardTitle>
              <CardDescription>Detailed reporting and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Track sales performance, identify trends, and make data-driven decisions.</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} GroceryPOS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
