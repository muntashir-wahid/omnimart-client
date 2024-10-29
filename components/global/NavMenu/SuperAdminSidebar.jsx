"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Users, ShoppingCart, BarChart2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const menuItems = [
  {
    label: "Users",
    href: "/super-admin/users",
  },
  {
    label: "Categories",
    href: "/super-admin/categories",
  },
  {
    label: "Profile",
    href: "/super-admin/profile",
  },
];

const SuperAdminSidebar = ({ children }) => {
  const router = useRouter();

  return (
    <SidebarProvider>
      <Sidebar className="h-screen border-r">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <div href="#" className="flex items-center gap-2">
                  <span className="font-bold text-lg">OmniMart</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 font-semibold pl-3"
                  >
                    {item.label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Button
                  className="hover:bg-slate-800 hover:text-white"
                  onClick={() => router.push("/logout")}
                >
                  Logout
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <div className="flex-1">
        <div className="flex items-center gap-2 p-4 bg-gray-100">
          <SidebarTrigger />
          <h3 className="text-lg font-bold">Super Admin Panel</h3>
        </div>

        <div className="p-4">{children}</div>
      </div>
    </SidebarProvider>
  );
};

export default SuperAdminSidebar;
