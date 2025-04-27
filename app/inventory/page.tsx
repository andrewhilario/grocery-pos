"use client";

import type React from "react";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Package
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import useProducts from "@/hooks/useProducts";
import { InventoryItem, ProductCategory } from "@/types/products";

export default function InventoryPage() {
  const {
    listInventory,
    loadingInventoryList,
    inventorySummary,
    loadingInventorySummary,
    listCategories,
    loadingCategoryList
  } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [inventory, setInventory] = useState(listInventory);
  const [filteredInventory, setFilteredInventory] = useState(listInventory);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showLowStock, setShowLowStock] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    cost: "",
    quantity: "",
    reorderLevel: "",
    supplier: ""
  });

  // Get unique categories for filter
  const categories = loadingCategoryList
    ? ["Loading..."]
    : [
        "all",
        ...listCategories.map((category: ProductCategory) => category.name)
      ];

  const filterInventory = () => {
    let filtered = inventory;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (item: InventoryItem) =>
          item.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (item: InventoryItem) => item.category.name === selectedCategory
      );
    }

    // Filter by low stock
    if (showLowStock) {
      filtered = filtered.filter(
        (item: InventoryItem) => item.quantity <= item.reorder_level
      );
    }

    setFilteredInventory(filtered);
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    filterInventory();
  };

  // Handle category filter
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    filterInventory();
  };

  // Handle low stock filter
  const handleLowStockToggle = () => {
    setShowLowStock(!showLowStock);
    filterInventory();
  };

  // Handle adding new product
  const handleAddProduct = () => {
    // Validate form
    if (
      !newProduct.name ||
      !newProduct.sku ||
      !newProduct.category ||
      !newProduct.price ||
      !newProduct.cost ||
      !newProduct.quantity ||
      !newProduct.reorderLevel ||
      !newProduct.supplier
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Create new product
    const product = {
      id: inventory.length + 1,
      name: newProduct.name,
      sku: newProduct.sku,
      category: newProduct.category,
      price: Number.parseFloat(newProduct.price),
      cost: Number.parseFloat(newProduct.cost),
      quantity: Number.parseInt(newProduct.quantity),
      reorderLevel: Number.parseInt(newProduct.reorderLevel),
      supplier: newProduct.supplier
    };

    // Add to inventory
    const updatedInventory = [...inventory, product];
    setInventory(updatedInventory);
    setFilteredInventory(updatedInventory);

    // Reset form
    setNewProduct({
      name: "",
      sku: "",
      category: "",
      price: "",
      cost: "",
      quantity: "",
      reorderLevel: "",
      supplier: ""
    });
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">
            Inventory Management
          </h1>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Enter the details of the new product to add to inventory.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      value={newProduct.sku}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, sku: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={newProduct.category}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          category: e.target.value
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="supplier">Supplier</Label>
                    <Input
                      id="supplier"
                      value={newProduct.supplier}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          supplier: e.target.value
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, price: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cost">Cost ($)</Label>
                    <Input
                      id="cost"
                      type="number"
                      step="0.01"
                      value={newProduct.cost}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, cost: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={newProduct.quantity}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          quantity: e.target.value
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reorderLevel">Reorder Level</Label>
                    <Input
                      id="reorderLevel"
                      type="number"
                      value={newProduct.reorderLevel}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          reorderLevel: e.target.value
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddProduct}>
                  Add Product
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <Package className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {inventorySummary?.total_products}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Low Stock Items
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {inventorySummary?.low_stock_count}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Inventory Value
              </CardTitle>
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${Number(inventorySummary?.overall_inventory_value).toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name or SKU..."
                className="pl-10"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <div className="flex gap-2">
              <Select
                value={selectedCategory}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant={showLowStock ? "default" : "outline"}
                onClick={handleLowStockToggle}
                className={
                  showLowStock ? "bg-amber-500 hover:bg-amber-600" : ""
                }
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Low Stock
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {loadingInventoryList ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Cost</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell className="animate-pulse bg-gray-200 h-6 rounded"></TableCell>
                      <TableCell className="animate-pulse bg-gray-200 h-6 rounded"></TableCell>
                      <TableCell className="animate-pulse bg-gray-200 h-6 rounded"></TableCell>
                      <TableCell className="animate-pulse bg-gray-200 h-6 rounded"></TableCell>
                      <TableCell className="animate-pulse bg-gray-200 h-6 rounded"></TableCell>
                      <TableCell className="animate-pulse bg-gray-200 h-6 rounded"></TableCell>
                      <TableCell className="animate-pulse bg-gray-200 h-6 rounded"></TableCell>
                      <TableCell className="animate-pulse bg-gray-200 h-6 rounded"></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Cost</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listInventory?.map((item: InventoryItem) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.product.name}
                      </TableCell>
                      <TableCell>{item.product.sku}</TableCell>
                      <TableCell>{item.category?.name}</TableCell>
                      <TableCell className="text-right">
                        ${Number(item.product.price).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        ${Number(item.product.cost).toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.quantity}
                      </TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        {item.quantity <= item.reorder_level ? (
                          <Badge variant="destructive" className="bg-amber-500">
                            Low Stock
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-green-600">
                            In Stock
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}

                  {listInventory?.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className="text-center py-8 text-gray-500"
                      >
                        No products found. Try a different search term or
                        filter.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
