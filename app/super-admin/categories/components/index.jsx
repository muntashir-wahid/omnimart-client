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
    queryKey: ["users"],
    queryFn: APIKit.users.getAllUsers,
  });

  if (isLoading) {
    return <DataLoadingState content="Categories is Loading..." />;
  }

  const { users } = data.data;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Category Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Parent Category</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow
            key={user.uid}
            onClick={() => router.push(`/super-admin/categories/${user.uid}`)}
            className="cursor-pointer"
            title={`See details of ${user.firstName} ${user.lastName}`}
          >
            <TableCell>{user.firstName}</TableCell>
            <TableCell>{user.lastName}</TableCell>
            <TableCell>{user.phone}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SuperAdminCategoriesModule;
