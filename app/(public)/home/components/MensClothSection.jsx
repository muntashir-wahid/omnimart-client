"use client";

import { useQuery } from "@tanstack/react-query";

import APIKit from "@/lib/apiKit";

import DataLoadingState from "@/components/shared/Loaders/DataLoadingState";
import ProductCard from "@/components/shared/Cards/ProductCard";

const MensClothSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products-men-clothing"],
    queryFn: () => APIKit.products.getAllProducts({ category: "men-clothing" }),
  });

  if (isLoading) {
    return (
      <DataLoadingState
        content="Men Clothes are Loading..."
        extraClassNames="h-[120px]"
      />
    );
  }

  const { products } = data.data;

  return (
    <div>
      <h3 className="text-xl text-gray-800 font-semibold mb-4">Men Clothes</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.uid} product={product} />
        ))}
      </div>
    </div>
  );
};

export default MensClothSection;
