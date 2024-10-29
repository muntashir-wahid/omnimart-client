import Link from "next/link";

import { ArrowLeft } from "lucide-react";
import SuperAdminAddUserModule from "./components";

const SuperAdminAddUserPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center gap-2">
        <Link href="/super-admin/users">
          <ArrowLeft />
        </Link>
        <h1 className="text-3xl font-semibold text-gray-800">Add New User</h1>
      </header>
      <SuperAdminAddUserModule />
    </div>
  );
};

export default SuperAdminAddUserPage;
