import Container from "@/components/shared/Container/Container";
import Hero from "./components/Hero";
import MensClothSection from "./components/MensClothSection";
import WomenClothSection from "./components/WomenClothSection";
import SmartphoneSection from "./components/SmartphoneSection";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Container extraClassName="px-4 pt-10 flex flex-col gap-10">
        <MensClothSection />
        <WomenClothSection />
        <SmartphoneSection />
      </Container>
    </div>
  );
};

export default HomePage;
