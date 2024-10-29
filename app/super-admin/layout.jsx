import SuperAdminSidebar from "@/components/global/NavMenu/SuperAdminSidebar";
import React from "react";

const SuperAdminLayout = ({ children }) => {
  return (
    <div>
      <SuperAdminSidebar children={children} />
    </div>
  );
};

export default SuperAdminLayout;
