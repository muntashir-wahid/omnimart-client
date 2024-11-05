"use client";

import { format } from "date-fns";
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

const AdminOrdersModule = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: APIKit.orders.getAllOrders,
  });

  if (isLoading) {
    return <DataLoadingState content="Orders are Loading..." />;
  }

  const { orders } = data.data;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Total Price</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow
            key={order.uid}
            onClick={() => router.push(`/admin/orders/${order.uid}`)}
            className="cursor-pointer"
            title={`See details of ${order.uid}`}
          >
            <TableCell>{order.uid}</TableCell>
            <TableCell className="font-bold text-gray-700">
              ${order.totalPrice}
            </TableCell>
            <TableCell>
              {order.user.firstName} {order.user.lastName}
            </TableCell>
            <TableCell className="capitalize">
              {order.orderStatus.toLowerCase().split("_").join(" ")}
            </TableCell>
            <TableCell>{format(order.createdAt, "PP")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AdminOrdersModule;
