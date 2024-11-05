import PublicTopNav from "@/components/global/NavMenu/PublicTopNav";
import Container from "@/components/shared/Container/Container";

const UserLayout = ({ children }) => {
  return (
    <main className="min-h-screen">
      <PublicTopNav />
      <Container extraClassName="p-6">{children}</Container>
    </main>
  );
};

export default UserLayout;
