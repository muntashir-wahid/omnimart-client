"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import APIKit from "@/lib/apiKit";
import { sanitizeParams } from "@/lib/utils";

import { Label } from "@/components/ui/label";

import DataLoadingState from "@/components/shared/Loaders/DataLoadingState";
import Container from "@/components/shared/Container/Container";
import ProductCard from "@/components/shared/Cards/ProductCard";
import SearchField from "@/components/shared/Form/SearchField";
import SelectField from "@/components/shared/Form/SelectField";

const priceSortOptions = [
  { label: "Low to Heigh", value: "price" },
  { label: "Heigh to Low", value: "-price" },
];

const CategoryProductsModule = ({ categorySlug }) => {
  const [params, setParams] = useState({
    search: "",
    sort: "",
  });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      APIKit.products.getAllProducts({
        category: categorySlug,
        ...sanitizeParams(params),
      }),
  });

  useEffect(() => {
    refetch();
  }, [params]);

  if (isLoading) {
    return <DataLoadingState content="Products is Loading..." />;
  }

  const { products } = data.data;

  const handleParamsChange = (value, fieldName) => {
    setParams((prevParams) => {
      const newParams = { ...prevParams };
      newParams[fieldName] = value;
      return newParams;
    });
  };

  return (
    <Container extraClassName="p-4 flex flex-col gap-8">
      <h1 className="text-4xl text-gray-800 font-semibold">
        Products of {categorySlug}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="space-y-2 sm:col-span-3">
          <Label htmlFor="search">Search Customer</Label>
          <SearchField
            id="search"
            name="search"
            value={params.search}
            onChange={(event) =>
              handleParamsChange(event.target.value, "search")
            }
            placeholder="Search by Name..."
          />
        </div>

        <div className="space-y-2">
          <Label>Sort by Date</Label>
          <SelectField
            options={priceSortOptions}
            placeholder="Sort By Price..."
            labelText="Select"
            value={params.sort}
            onChange={(selectedValue) =>
              handleParamsChange(selectedValue, "sort")
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.uid} product={product} />
        ))}
      </div>
    </Container>
  );
};

export default CategoryProductsModule;
