import { Header } from "@/components/ui/header";
import { HeroSection } from "@/components/ui/hero-section";
import { FeaturedTours } from "@/components/ui/featured-tours";
import { WhyChooseUs } from "@/components/ui/why-choose-us";
import { Footer } from "@/components/ui/footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturedTours />
        <WhyChooseUs />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
