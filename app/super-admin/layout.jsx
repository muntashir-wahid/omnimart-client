import SuperAdminSidebar from "@/components/global/NavMenu/SuperAdminSidebar";

const SuperAdminLayout = ({ children }) => {
  return (
    <div>
      <SuperAdminSidebar children={children} />
    </div>
  );
};

export default SuperAdminLayout;
