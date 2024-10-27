import PublicFooter from "@/components/global/Footer/PublicFooter";
import PublicTopNav from "@/components/global/NavMenu/PublicTopNav";

const PublicLayout = ({ children }) => {
  return (
    <main>
      <PublicTopNav />
      {children}
      <PublicFooter />
    </main>
  );
};

export default PublicLayout;
