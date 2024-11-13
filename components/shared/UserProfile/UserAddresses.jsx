import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import UserAddressCard from "./UserAddressCard";

const UserAddresses = () => {
  return (
    <div>
      <div className="mb-8 flex justify-between items-center gap-8">
        <h2 className="text-3xl font-bold text-gray-600">All Addresses</h2>
        <Button variant="outline">
          <Plus />
          Add New Address
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        <UserAddressCard />
      </div>
    </div>
  );
};

export default UserAddresses;
