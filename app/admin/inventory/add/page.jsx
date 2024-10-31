import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import AdminAddInventoryModule from "./components";

const AdminAddInventoryPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center gap-2">
        <Link href="/admin/inventory">
          <ArrowLeft />
        </Link>
        <h1 className="text-3xl font-semibold text-gray-800">
          Add New Inventory
        </h1>
      </header>
      <AdminAddInventoryModule />
    </div>
  );
};

export default AdminAddInventoryPage;
