"use client";

import { useRouter } from "next/navigation";
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

import DataLoadingState from "@/components/shared/Loaders/DataLoadingState";

const SuperAdminUsersModule = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: APIKit.users.getAllUsers,
  });

  if (isLoading) {
    return <DataLoadingState content="Users is Loading..." />;
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
          <TableRow
            key={user.uid}
            onClick={() => router.push(`/super-admin/users/${user.uid}`)}
            className="cursor-pointer"
            title={`See details of ${user.firstName} ${user.lastName}`}
          >
            <TableCell>{user.firstName}</TableCell>
            <TableCell>{user.lastName}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell className="capitalize">
              {user.userStatus.toLowerCase()}
            </TableCell>
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
