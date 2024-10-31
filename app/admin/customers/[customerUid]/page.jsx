import DataLoadingState from "@/components/shared/Loaders/DataLoadingState";

const AdminCustomerDetailsPage = ({ params }) => {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-gray-800">
          Customers Details
        </h1>
      </header>

      <DataLoadingState content="Customer Details Coming Soon..." />
    </div>
  );
};

export default AdminCustomerDetailsPage;
