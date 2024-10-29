import Link from "next/link";

import { Button } from "@/components/ui/button";
import SuperAdminUsersModule from "./components";

const SuperAdminUsersPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-gray-800">User List</h1>
        <Button>
          <Link href="/super-admin/users/add">Add New User</Link>
        </Button>
      </header>

      <SuperAdminUsersModule />
    </div>
  );
};

export default SuperAdminUsersPage;
