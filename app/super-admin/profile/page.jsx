import UserAddresses from "@/components/shared/UserProfile/UserAddresses";
import UserProfile from "@/components/shared/UserProfile/UserProfile";

const SuperAdminProfilePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <UserProfile />
      <UserAddresses />
    </div>
  );
};

export default SuperAdminProfilePage;
