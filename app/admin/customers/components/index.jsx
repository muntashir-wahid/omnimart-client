"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

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

const AdminCustomersModule = () => {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: APIKit.customers.getAllCustomers,
  });

  if (isLoading) {
    return <DataLoadingState content="Customers is Loading..." />;
  }

  const { customers } = data.data;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Join Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {customers.map((customer) => (
          <TableRow
            key={customer.uid}
            onClick={() => router.push(`/admin/customers/${customer.uid}`)}
            className="cursor-pointer"
            title={`See details of ${customer.firstName} ${customer.lastName}`}
          >
            <TableCell>{customer.firstName}</TableCell>
            <TableCell>{customer.lastName}</TableCell>
            <TableCell>{customer.phone}</TableCell>
            <TableCell className="capitalize">
              {customer.userStatus.toLowerCase()}
            </TableCell>
            <TableCell className="capitalize">
              {format(customer.createdAt, "PP")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminCustomersModule;
