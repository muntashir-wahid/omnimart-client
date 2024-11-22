"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import APIKit from "@/lib/apiKit";
import { sanitizeParams } from "@/lib/utils";

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

const statuses = [
  { label: "Order Placed", value: "ORDER_PLACED" },
  { label: "Accepted", value: "ACCEPTED" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Completed", value: "COMPLETED" },
];

const priceSortOptions = [
  { label: "Newest to Oldest", value: "createdAt" },
  { label: "Oldest to Newest", value: "-createdAt" },
];

const AdminOrdersModule = () => {
  const router = useRouter();
  const [params, setParams] = useState({
    search: "",
    status: "",
    sort: "createdAt",
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: () => APIKit.orders.getAllOrders(sanitizeParams(params)),
  });

  useEffect(() => {
    refetch();
  }, [params]);

  if (isLoading) {
    return <DataLoadingState content="Orders are Loading..." />;
  }

  const { orders } = data.data;

  const handleParamsChange = (value, fieldName) => {
    setParams((prevParams) => {
      const newParams = { ...prevParams };
      newParams[fieldName] = value;
      return newParams;
    });
  };

  return (
    <div>
      <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="space-y-2 sm:col-span-2">
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
          <Label>Filter by Status</Label>
          <SelectField
            options={statuses}
            placeholder="Select a Status"
            labelText="Choose Status"
            value={params.status}
            onChange={(selectedValue) =>
              handleParamsChange(selectedValue, "status")
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
    </div>
  );
};

export default AdminOrdersModule;
