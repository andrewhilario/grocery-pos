"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Printer,
  Trash2,
  Plus,
  Minus,
  ShoppingCart
} from "lucide-react";
import { generateReceipt } from "@/lib/receipt-actions";
import useProducts from "@/hooks/useProducts";
import { Product } from "@/types/products";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function POSPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  // const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const [isPrinting, setIsPrinting] = useState(false);
  const { listProducts, loadingProductList } = useProducts();
  // Filter products based on search term
  // useEffect(() => {
  //   console.log("listProducts", listProducts);
  //   if (searchTerm) {
  //     const filtered = sampleProducts.filter(
  //       (product: Product) =>
  //         product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //         product.barcode.includes(searchTerm)
  //     );
  //     setFilteredProducts(filtered);
  //   } else {
  //     setFilteredProducts(sampleProducts);
  //   }
  // }, [searchTerm]);

  // Add product to cart
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: Number(product.price),
            quantity: 1
          }
        ];
      }
    });
  };

  // Update item quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Calculate subtotal
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.07; // 7% tax rate
  const total = subtotal + tax;

  // Handle print receipt
  const handlePrintReceipt = async () => {
    if (cart.length === 0) return;

    setIsPrinting(true);
    try {
      await generateReceipt({
        items: cart,
        subtotal,
        tax,
        total,
        date: new Date().toISOString(),
        cashier: "Admin User"
      });

      // Clear cart after successful print
      setCart([]);
    } catch (error) {
      console.error("Failed to print receipt:", error);
    } finally {
      setIsPrinting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row h-full">
        {/* Product search and selection */}
        <div className="lg:w-2/3 p-6 overflow-auto">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search products by name or scan barcode..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loadingProductList ? (
              <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Card key={index} className="animate-pulse bg-gray-100 p-4">
                    <CardContent>
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2 mb-4"></div>
                      <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                {listProducts?.results?.map((product: Product) => (
                  <Card
                    key={product.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => addToCart(product)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-gray-500">
                            {product.category.name}
                          </p>
                        </div>
                        <Badge
                          variant={
                            product.stocks_available > 10
                              ? "outline"
                              : "destructive"
                          }
                        >
                          {product.stocks_available} in stock
                        </Badge>
                      </div>
                      <div className="mt-2 text-lg font-bold">
                        ${Number(product.price).toFixed(2)}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {listProducts?.results?.length === 0 && (
                  <div className="col-span-full text-center py-8 text-gray-500">
                    No products found. Try a different search term.
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Shopping cart */}
        <div className="lg:w-1/3 border-t lg:border-t-0 lg:border-l bg-white">
          <Card className="h-full border-0 rounded-none">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Current Sale
              </CardTitle>
            </CardHeader>

            <CardContent
              className="p-0 overflow-auto"
              style={{ maxHeight: "calc(100vh - 300px)" }}
            >
              {cart.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-right">Qty</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cart.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-red-500"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <ShoppingCart className="h-12 w-12 mb-4 text-gray-300" />
                  <p>Your cart is empty</p>
                  <p className="text-sm">
                    Search or scan products to add them to the cart
                  </p>
                </div>
              )}
            </CardContent>

            <div className="border-t p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (7%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <CardFooter className="flex flex-col gap-2 border-t p-4">
              <Button
                className="w-full"
                disabled={cart.length === 0 || isPrinting}
                onClick={handlePrintReceipt}
              >
                <Printer className="mr-2 h-4 w-4" />
                {isPrinting ? "Printing..." : "Print Receipt & Complete Sale"}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                disabled={cart.length === 0}
                onClick={() => setCart([])}
              >
                Cancel Sale
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
