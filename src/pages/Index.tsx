import { Header } from "@/components/ui/header";
import { HeroSection } from "@/components/ui/hero-section";
import { FeaturedTours } from "@/components/ui/featured-tours";
import { WhyChooseUs } from "@/components/ui/why-choose-us";
import { Footer } from "@/components/ui/footer";
import { GlobeView } from "@/components/ui/globe-view";

const Index = () => {
  const globeLocations = [
    { name: "Spiti Valley", coordinates: [78.0339, 32.2432] as [number, number], color: "#EF4444" },
    { name: "Kashmir", coordinates: [75.0, 34.0] as [number, number], color: "#10B981" },
    { name: "Himachal", coordinates: [77.1734, 31.1048] as [number, number], color: "#3B82F6" },
    { name: "Ladakh", coordinates: [77.5771, 34.1526] as [number, number], color: "#F59E0B" },
    { name: "Uttarakhand", coordinates: [79.0193, 30.0668] as [number, number], color: "#8B5CF6" },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        
        {/* Globe View Section */}
        <section className="py-20 bg-gradient-section">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
                Explore the Himalayas
              </h2>
              <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
                Interactive 3D globe showing our adventure destinations across the Himalayan region
              </p>
            </div>
            <GlobeView locations={globeLocations} />
          </div>
        </section>

        <FeaturedTours />
        <WhyChooseUs />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
