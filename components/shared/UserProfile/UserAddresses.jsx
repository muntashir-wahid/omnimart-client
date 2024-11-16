"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";

import APIKit from "@/lib/apiKit";

import { Button } from "@/components/ui/button";

import UserAddressCard from "./UserAddressCard";
import AddNewAddress from "./AddNewAddress";
import DataLoadingState from "../Loaders/DataLoadingState";

const UserAddresses = () => {
  const [openAddressAddModal, setOpenAddressAddModal] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["addresses"],
    queryFn: APIKit.users.addresses.getAllAddresses,
  });

  if (isLoading) {
    return <DataLoadingState content="User Addresses is Loading..." />;
  }

  const { addresses } = data.data;

  return (
    <>
      <div>
        <div className="mb-8 flex justify-between items-center gap-8">
          <h2 className="text-3xl font-bold text-gray-600">All Addresses</h2>
          <Button
            variant="outline"
            onClick={setOpenAddressAddModal.bind(null, true)}
          >
            <Plus />
            Add New Address
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {addresses.map((address) => (
            <UserAddressCard key={address.uid} addressData={address} />
          ))}
        </div>
      </div>
      {openAddressAddModal ? (
        <AddNewAddress
          openAddressAddModal={openAddressAddModal}
          setOpenAddressAddModal={setOpenAddressAddModal}
          refetchAddresses={refetch}
        />
      ) : null}
    </>
  );
};

export default UserAddresses;
