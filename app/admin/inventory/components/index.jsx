"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import APIKit from "@/lib/apiKit";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import DataLoadingState from "@/components/shared/Loaders/DataLoadingState";
import { Label } from "@/components/ui/label";
import SearchField from "@/components/shared/Form/SearchField";
import SelectField from "@/components/shared/Form/SelectField";

const AdminInventoryModule = () => {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["inventory"],
    queryFn: APIKit.inventory.getAllInventory,
  });

  if (isLoading) {
    return <DataLoadingState content="Inventory is Loading..." />;
  }

  const { inventory: products } = data.data;

  return (
    <div>
      {/* Search And Filters */}

      <div className="my-4 flex flex-col md:flex-row gap-6">
        <div className="space-y-2 w-full md:w-3/5">
          <Label>Search Inventory</Label>
          <SearchField />
        </div>

        <div className="space-y-2 w-full md:w-2/5">
          <Label>Filter by Category</Label>
          <SelectField />
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
