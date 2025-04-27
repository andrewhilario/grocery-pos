export interface Product {
  id: number;
  name: string;
  sku: string;
  barcode: string;
  description: string;
  category: ProductCategory;
  price: string;
  cost: string;
  tax_rate: string;
  image_url: string;
  stocks_available: number;
}

export interface ProductCategory {
  id: number;
  name: string;
  description: string;
}

export interface InventoryItem {
  id: number;
  product: Product;
  quantity: number;
  reorder_level: number;
  last_restock_date: string;
  created_at: string;
  updated_at: string;
  needs_restock: string;
  supplier: string;
  category: ProductCategory;
}
