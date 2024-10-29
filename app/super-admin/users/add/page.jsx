import Link from "next/link";

import { ArrowLeft } from "lucide-react";

const SuperAdminAddUserPage = () => {
  return (
    <div>
      <header className="flex items-center gap-2">
        <Link href="/super-admin/users">
          <ArrowLeft />
        </Link>
        <h1 className="text-3xl font-semibold text-gray-800">Add New User</h1>
      </header>
    </div>
  );
};

export default SuperAdminAddUserPage;
