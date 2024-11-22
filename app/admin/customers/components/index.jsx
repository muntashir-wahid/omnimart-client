"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

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
  { label: "Active", value: "ACTIVE" },
  { label: "Pending", value: "PENDING" },
  { label: "Suspended", value: "SUSPENDED" },
];

const AdminCustomersModule = () => {
  const router = useRouter();
  const [params, setParams] = useState({ search: "", status: "ACTIVE" });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["customers"],
    queryFn: () => APIKit.customers.getAllCustomers(sanitizeParams(params)),
  });

  useEffect(() => {
    refetch();
  }, [params]);

  if (isLoading) {
    return <DataLoadingState content="Customers is Loading..." />;
  }

  const { customers } = data.data;

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

      <div className="my-4 flex flex-col md:flex-row gap-6">
        <div className="space-y-2 w-full md:w-3/5">
          <Label htmlFor="search">Search Customer</Label>
          <SearchField
            id="search"
            name="search"
            value={params.search}
            onChange={(event) =>
              handleParamsChange(event.target.value, "search")
            }
            placeholder="Search by Name or Phone..."
          />
        </div>

        <div className="space-y-2 w-full md:w-2/5">
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
      </div>

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
    </div>
  );
};

export default AdminCustomersModule;
