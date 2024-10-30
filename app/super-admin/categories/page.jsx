import Link from "next/link";

import { Button } from "@/components/ui/button";
import SuperAdminCategoriesModule from "./components";

const SuperAdminCategoriesPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-gray-800">Category List</h1>
        <Button asChild>
          <Link href="/super-admin/categories/add">Add New Category</Link>
        </Button>
      </header>
      <SuperAdminCategoriesModule />
    </div>
  );
};

export default SuperAdminCategoriesPage;
