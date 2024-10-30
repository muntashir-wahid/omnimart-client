import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import SuperAdminUserEditModule from "./components";

const SuperAdminUserEditPage = ({ params }) => {
  const { userUid } = params;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center gap-2">
        <Link href={`/super-admin/users/${userUid}`}>
          <ArrowLeft />
        </Link>
        <h1 className="text-3xl font-semibold text-gray-800">Edit User Info</h1>
      </header>
      <SuperAdminUserEditModule userUid={userUid} />
    </div>
  );
};

export default SuperAdminUserEditPage;
