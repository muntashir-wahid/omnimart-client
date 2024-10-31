import { Button } from "@/components/ui/button";

import AdminCustomersModule from "./components";

const AdminCustomersPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-gray-800">Customers List</h1>
      </header>

      <AdminCustomersModule />
    </div>
  );
};

export default AdminCustomersPage;
