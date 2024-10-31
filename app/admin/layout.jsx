import AdminSidebar from "@/components/global/NavMenu/AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <AdminSidebar children={children} />
    </div>
  );
};

export default AdminLayout;
