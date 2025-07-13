import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { SeasonTimeline } from "@/components/ui/season-timeline";
import { InteractiveSearch } from "@/components/ui/interactive-search";
import { ContextualOverlay } from "@/components/ui/contextual-overlay";
import { WeatherWidget } from "@/components/ui/weather-widget";
import { InteractiveHotspot } from "@/components/ui/interactive-hotspot";
import heroImage from "@/assets/hero-himalayas.jpg";

export const HeroSection = () => {
  const [currentMonth, setCurrentMonth] = useState(9); // October
  const [showSearch, setShowSearch] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const hotspots = [
    {
      id: 1,
      position: { x: "25%", y: "40%" },
      title: "Spiti Valley Monastery",
      subtitle: "Ancient Buddhist heritage nestled in the trans-Himalayan desert",
      info: {
        location: "Spiti Valley, HP",
        duration: "8 Days Trek",
        groupSize: "8-12 People"
      }
    },
    {
      id: 2,
      position: { x: "70%", y: "30%" },
      title: "High Altitude Camping",
      subtitle: "Experience night skies at 4,500m elevation with crystal clear views",
      info: {
        location: "Chandratal Lake",
        duration: "5 Days",
        groupSize: "6-10 People"
      }
    },
    {
      id: 3,
      position: { x: "60%", y: "65%" },
      title: "Traditional Village Stay",
      subtitle: "Immerse in authentic Himachali culture and warm hospitality",
      info: {
        location: "Malana Village",
        duration: "3 Days",
        groupSize: "4-8 People"
      }
    }
  ];

  const seasonalContent = {
    0: { filter: "hue-rotate(200deg) brightness(0.8)", description: "Winter Adventures" },
    1: { filter: "hue-rotate(180deg) brightness(0.9)", description: "Late Winter" },
    2: { filter: "hue-rotate(120deg) brightness(1.1)", description: "Spring Awakening" },
    3: { filter: "hue-rotate(90deg) brightness(1.2)", description: "Spring Blooms" },
    4: { filter: "hue-rotate(60deg) brightness(1.3)", description: "Late Spring" },
    5: { filter: "hue-rotate(30deg) brightness(1.2)", description: "Early Summer" },
    6: { filter: "hue-rotate(0deg) brightness(1.1)", description: "Summer Peak" },
    7: { filter: "hue-rotate(-30deg) brightness(1)", description: "Late Summer" },
    8: { filter: "hue-rotate(-60deg) brightness(0.95)", description: "Autumn Colors" },
    9: { filter: "hue-rotate(-90deg) brightness(0.9)", description: "Peak Autumn" },
    10: { filter: "hue-rotate(-120deg) brightness(0.85)", description: "Late Autumn" },
    11: { filter: "hue-rotate(-150deg) brightness(0.8)", description: "Early Winter" }
  };

  const currentSeason = seasonalContent[currentMonth as keyof typeof seasonalContent];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background with Seasonal Filters */}
      <motion.div 
        className="absolute inset-0"
        animate={{ 
          filter: currentSeason.filter,
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <img
          src={heroImage}
          alt="Himalayan Mountains"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 via-secondary/40 to-primary/20"></div>
      </motion.div>

      {/* Interactive Hotspots */}
      <AnimatePresence>
        {hotspots.map((hotspot) => (
          <div key={hotspot.id}>
            <InteractiveHotspot
              position={hotspot.position}
              onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
              isActive={activeHotspot === hotspot.id}
            />
            
            <ContextualOverlay
              title={hotspot.title}
              subtitle={hotspot.subtitle}
              position={hotspot.position}
              info={hotspot.info}
              isVisible={activeHotspot === hotspot.id}
            />
          </div>
        ))}
      </AnimatePresence>

      {/* Main Hero Content */}
      <AnimatePresence mode="wait">
        {!showSearch && (
          <motion.div 
            key="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center max-w-5xl mx-auto px-4 lg:px-8"
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Experience the Soul of{" "}
              <span className="text-primary-muted">the Mountains</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 font-body font-light max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Curated journeys through the majestic landscapes of Himachal and Kashmir
              <br />
              <span className="text-primary-muted font-medium">{currentSeason.description}</span>
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground font-body font-semibold px-8 py-3 text-lg transition-all duration-300"
              >
                Discover Our Treks
              </Button>
              
              <Button
                onClick={() => setShowSearch(true)}
                size="lg"
                className="bg-primary/90 hover:bg-primary text-primary-foreground font-body font-semibold px-8 py-3 text-lg transition-all duration-300"
              >
                <Search className="w-5 h-5 mr-2" />
                Plan Your Journey
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Search Overlay */}
      <InteractiveSearch isVisible={showSearch} />
      
      {showSearch && (
        <Button
          onClick={() => setShowSearch(false)}
          variant="ghost"
          className="absolute top-8 right-8 z-30 text-white hover:bg-white/20"
        >
          ✕ Close
        </Button>
      )}

      {/* Season Timeline */}
      <SeasonTimeline currentMonth={currentMonth} onMonthChange={setCurrentMonth} />

      {/* Weather Widget */}
      <WeatherWidget 
        temperature={12} 
        condition="cloudy" 
        location="Manali, HP" 
      />

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 right-8 animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};