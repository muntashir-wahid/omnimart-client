import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import AdminInventoryDetailsModule from "./components";

const AdminInventoryDetailsPage = ({ params }) => {
  const { inventorySlug } = params;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center gap-2">
        <Link href="/admin/inventory">
          <ArrowLeft />
        </Link>
        <h1 className="text-3xl font-semibold text-gray-800">
          Inventory Details
        </h1>
      </header>

      <AdminInventoryDetailsModule inventorySlug={inventorySlug} />
    </div>
  );
};

export default AdminInventoryDetailsPage;
