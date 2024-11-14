"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import UserAddressCard from "./UserAddressCard";
import AddNewAddress from "./AddNewAddress";

const UserAddresses = () => {
  const [openAddressAddModal, setOpenAddressAddModal] = useState(false);

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

        <div className="grid grid-cols-1 md:grid-cols-2">
          <UserAddressCard />
        </div>
      </div>
      {openAddressAddModal ? (
        <AddNewAddress
          openAddressAddModal={openAddressAddModal}
          setOpenAddressAddModal={setOpenAddressAddModal}
        />
      ) : null}
    </>
  );
};

export default UserAddresses;
