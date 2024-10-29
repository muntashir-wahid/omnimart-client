import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SuperAdminUserDetailsModule from "./components";

const SuperAdminUserDetailsPage = ({ params }) => {
  const { userUid } = params;

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center gap-2">
        <Link href="/super-admin/users">
          <ArrowLeft />
        </Link>
        <h1 className="text-3xl font-semibold text-gray-800">User Details</h1>
      </header>
      <SuperAdminUserDetailsModule userUid={userUid} />
    </div>
  );
};

export default SuperAdminUserDetailsPage;
