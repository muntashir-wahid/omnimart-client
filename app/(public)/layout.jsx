import PublicTopNav from "@/components/global/NavMenu/PublicTopNav";

const PublicLayout = ({ children }) => {
  return (
    <main className="min-h-screen">
      <PublicTopNav />
      {children}
    </main>
  );
};

export default PublicLayout;
