import AdminOrdersModule from "./components";

const AdminOrdersPage = () => {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-gray-800">Order List</h1>
      </header>

      <AdminOrdersModule />
    </div>
  );
};

export default AdminOrdersPage;
