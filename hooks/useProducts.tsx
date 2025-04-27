import { API_URL } from "@/constant/api";
import { useQuery } from "@tanstack/react-query";
import useGetAuthorizationToken from "./useGetAuthorizationToken";

export default function useProducts() {
  const token = useGetAuthorizationToken();

  const { data: listProducts, isLoading: loadingProductList } = useQuery({
    queryKey: ["product-list"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/products/products/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      return data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  const { data: listInventory, isLoading: loadingInventoryList } = useQuery({
    queryKey: ["inventory-list"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/products/inventory/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      return data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  const { data: inventorySummary, isLoading: loadingInventorySummary } =
    useQuery({
      queryKey: ["inventory-summary"],
      queryFn: async () => {
        const response = await fetch(`${API_URL}/products/inventory/summary/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        return data;
      },
      enabled: !!token,
      staleTime: 1000 * 60 * 5 // 5 minutes
    });

  const { data: listCategories, isLoading: loadingCategoryList } = useQuery({
    queryKey: ["category-list"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/products/categories/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      return data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  return {
    listProducts,
    loadingProductList,
    listInventory,
    loadingInventoryList,
    inventorySummary,
    loadingInventorySummary,
    listCategories,
    loadingCategoryList
  };
}
