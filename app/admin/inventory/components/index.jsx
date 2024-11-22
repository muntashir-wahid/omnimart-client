"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import APIKit from "@/lib/apiKit";
import { createOptionsFromData, sanitizeParams } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import DataLoadingState from "@/components/shared/Loaders/DataLoadingState";
import SearchField from "@/components/shared/Form/SearchField";
import SelectField from "@/components/shared/Form/SelectField";

const priceSortOptions = [
  { label: "Low to Heigh", value: "price" },
  { label: "Heigh to Low", value: "-price" },
];

const AdminInventoryModule = () => {
  const router = useRouter();
  const [params, setParams] = useState({ search: "", category: "", sort: "" });

  const {
    data,
    isLoading,
    refetch: refetchInventory,
  } = useQuery({
    queryKey: ["inventory"],
    queryFn: () => APIKit.inventory.getAllInventory(sanitizeParams(params)),
  });

  const { data: categoryList, isLoading: isCategoryListLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: APIKit.categories.getAllCategories,
  });

  useEffect(() => {
    refetchInventory();
  }, [params]);

  if (isLoading) {
    return <DataLoadingState content="Inventory is Loading..." />;
  }

  const { inventory: products } = data.data;

  const handleParamsChange = (value, fieldName) => {
    setParams((prevParams) => {
      const newParams = { ...prevParams };
      newParams[fieldName] = value;
      return newParams;
    });
  };

  return (
    <div>
      {/* Search And Filters */}

      <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="search">Search Inventory</Label>
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
          <Label>Filter by Category</Label>
          <SelectField
            options={
              isCategoryListLoading
                ? []
                : createOptionsFromData(
                    categoryList?.data.categories,
                    "name",
                    "slug"
                  )
            }
            placeholder="Select a Category"
            labelText="Choose Category"
            value={params.category}
            onChange={(selectedValue) =>
              handleParamsChange(selectedValue, "category")
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Sort by Date</Label>
          <SelectField
            options={priceSortOptions}
            placeholder="Sort By..."
            // labelText=""
            value={params.sort}
            onChange={(selectedValue) =>
              handleParamsChange(selectedValue, "sort")
            }
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Base Price</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.uid}
              onClick={() => router.push(`/admin/inventory/${product.slug}`)}
              className="cursor-pointer"
              title={`See details of ${product.name}`}
            >
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell className="capitalize">{product.basePrice}</TableCell>
              <TableCell className="capitalize">
                {product.productStatus.toLowerCase()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminInventoryModule;
