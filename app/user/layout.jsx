import PublicTopNav from "@/components/global/NavMenu/PublicTopNav";

const UserLayout = ({ children }) => {
  return (
    <main className="min-h-screen">
      <PublicTopNav />
      {children}
    </main>
  );
};

export default UserLayout;
