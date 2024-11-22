"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

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

const statusOptions = [
  { label: "Active", value: "ACTIVE" },
  { label: "Pending", value: "PENDING" },
  { label: "Suspended", value: "SUSPENDED" },
];

const roleOptions = [
  { label: "Customer", value: "USER" },
  { label: "Admin", value: "ADMIN" },
  { label: "Super Admin", value: "SUPER_ADMIN" },
];

const SuperAdminUsersModule = () => {
  const router = useRouter();
  const [params, setParams] = useState({ search: "", status: "", role: "" });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => APIKit.users.getAllUsers(sanitizeParams(params)),
  });

  useEffect(() => {
    refetch();
  }, [params]);

  if (isLoading) {
    return <DataLoadingState content="Users is Loading..." />;
  }

  const { users } = data.data;

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

      <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="search">Search Inventory</Label>
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

        <div className="space-y-2">
          <Label>Filter by Status</Label>
          <SelectField
            options={statusOptions}
            placeholder="Select a Status"
            labelText="Choose Status"
            value={params.status}
            onChange={(selectedValue) =>
              handleParamsChange(selectedValue, "status")
            }
          />
        </div>
        <div className="space-y-2">
          <Label>Filter by Status</Label>
          <SelectField
            options={roleOptions}
            placeholder="Select a Role"
            labelText="Choose Role"
            value={params.role}
            onChange={(selectedValue) =>
              handleParamsChange(selectedValue, "role")
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
    </div>
  );
};

export default SuperAdminUsersModule;
