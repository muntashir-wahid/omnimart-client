"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import APIKit from "@/lib/apiKit";

const SuperAdminUsersModule = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: APIKit.users.getAllUsers,
  });

  if (isLoading) {
    return (
      <div className="min-h-[72vh] flex items-center justify-center text-center">
        <p className="text-lg font-medium">Users is Loading...</p>
      </div>
    );
  }

  const { users } = data.data;

  return (
    <Table className="overflow-y-scroll">
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.uid}>
            <TableCell>{user.firstName}</TableCell>
            <TableCell>{user.lastName}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>{user.userStatus}</TableCell>
            <TableCell className="capitalize">
              {user.userRole.toLowerCase().split("_").join(" ")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SuperAdminUsersModule;
