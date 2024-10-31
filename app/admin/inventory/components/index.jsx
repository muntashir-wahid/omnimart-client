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
            onClick={() => router.push(`/admin/products/${product.uid}`)}
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
  );
};

export default AdminInventoryModule;
