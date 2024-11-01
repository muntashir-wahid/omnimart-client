"use client";

import { useQuery } from "@tanstack/react-query";

import APIKit from "@/lib/apiKit";

import DataLoadingState from "@/components/shared/Loaders/DataLoadingState";
import Container from "@/components/shared/Container/Container";
import ProductCard from "@/components/shared/Cards/ProductCard";

const CategoryProductsModule = ({ categorySlug }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => APIKit.products.getAllProducts({ category: categorySlug }),
  });

  if (isLoading) {
    return <DataLoadingState content="Products is Loading..." />;
  }

  const { products } = data.data;
  const { name: categoryName } = products[0].category;

  return (
    <Container extraClassName="p-4 flex flex-col gap-16">
      <h1 className="text-4xl text-gray-800 font-semibold">
        Products of {categoryName}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.uid} product={product} />
        ))}
      </div>
    </Container>
  );
};

export default CategoryProductsModule;
