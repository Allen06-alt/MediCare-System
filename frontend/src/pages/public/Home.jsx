import Hero from "../../components/home/Hero";
import Services from "../../components/home/Services";
import FeaturedDoctors from "../../components/home/FeaturedDoctors";
import Testimonials from "../../components/home/Testimonials";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Services />
      <FeaturedDoctors />
      <Testimonials />
    </div>
  );
}