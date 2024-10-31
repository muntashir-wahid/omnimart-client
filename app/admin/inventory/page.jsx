import Link from "next/link";

import { Button } from "@/components/ui/button";

import AdminInventoryModule from "./components";

const AdminInventoryPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-gray-800">Inventory List</h1>
        <Button asChild>
          <Link href="/admin/inventory/add">Add New Inventory</Link>
        </Button>
      </header>

      <AdminInventoryModule />
    </div>
  );
};

export default AdminInventoryPage;
