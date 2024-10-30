"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

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

const SuperAdminCategoriesModule = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: APIKit.categories.getAllCategories,
  });

  if (isLoading) {
    return <DataLoadingState content="Categories is Loading..." />;
  }

  const { categories } = data.data;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Category Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow
            key={category.uid}
            onClick={() =>
              router.push(`/super-admin/categories/${category.slug}`)
            }
            className="cursor-pointer"
            title={`See details of ${category.name}`}
          >
            <TableCell>{category.name}</TableCell>
            <TableCell>{category.description}</TableCell>
            <TableCell className="capitalize">
              {category.categoryStatus.toLowerCase()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SuperAdminCategoriesModule;
