import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-himalayas.jpg";

export const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Himalayan Mountains"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/70 via-secondary/50 to-primary/30"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 lg:px-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
          Experience the Soul of{" "}
          <span className="text-primary-muted">the Mountains</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 font-body font-light max-w-3xl mx-auto leading-relaxed">
          Curated journeys through the majestic landscapes of Himachal and
          Kashmir.
        </p>
        <Button
          variant="outline"
          size="lg"
          className="border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground font-body font-semibold px-8 py-3 text-lg transition-all duration-300"
        >
          Discover Our Treks
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};