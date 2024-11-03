import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Hero = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${"https://plus.unsplash.com/premium_photo-1677995700941-100976883af7?q=80&w=1523"})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
      className="h-[80vh] w-full"
    ></div>
  );
};

export default Hero;
