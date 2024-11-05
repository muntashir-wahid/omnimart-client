import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import AdminOrderDetailsModule from "./components";

const AdminOrderDetailsPage = ({ params }) => {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center gap-2">
        <Link href="/admin/orders">
          <ArrowLeft />
        </Link>
        <h1 className="text-3xl font-semibold text-gray-800">Order Details</h1>
      </header>

      <AdminOrderDetailsModule orderUid={params.orderUid} />
    </div>
  );
};

export default AdminOrderDetailsPage;
