import useProducts from "@/hooks/useProducts";

export default function Loading() {
  const { loadingInventoryList } = useProducts();

  if (loadingInventoryList) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return null;
}
