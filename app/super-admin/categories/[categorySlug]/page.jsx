import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import SuperAdminCategoryDetailsModule from "./components";

const SuperAdminCategoryDetailsPage = ({ params }) => {
  const { categorySlug } = params;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center gap-2">
        <Link href="/super-admin/categories">
          <ArrowLeft />
        </Link>
        <h1 className="text-3xl font-semibold text-gray-800">
          Category Details
        </h1>
      </header>
      <SuperAdminCategoryDetailsModule categorySlug={categorySlug} />
    </div>
  );
};

export default SuperAdminCategoryDetailsPage;
