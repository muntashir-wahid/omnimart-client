import DataLoadingState from "@/components/shared/Loaders/DataLoadingState";

const UserOrderDetailsPage = ({ params }) => {
  console.log(params.orderUid);
  return <DataLoadingState content="Welcome to Order Details page!" />;
};

export default UserOrderDetailsPage;
