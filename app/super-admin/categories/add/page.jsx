import Link from "next/link";

import { ArrowLeft } from "lucide-react";
import SuperAdminCategoryAddModule from "./components";

const SuperAdminCategoryAddPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center gap-2">
        <Link href="/super-admin/categories">
          <ArrowLeft />
        </Link>
        <h1 className="text-3xl font-semibold text-gray-800">
          Add New Category
        </h1>
      </header>

      <SuperAdminCategoryAddModule />
    </div>
  );
};

export default SuperAdminCategoryAddPage;
