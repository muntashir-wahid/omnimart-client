import UserOrderDetailsModule from "./components";

const UserOrderDetailsPage = ({ params }) => {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">Orders Details</h1>
      <UserOrderDetailsModule orderUid={params.orderUid} />
    </div>
  );
};

export default UserOrderDetailsPage;
