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
  const [showVideo, setShowVideo] = useState(false);

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
      position: { x: "15%", y: "70%" },
      title: "Alpine Adventure Base",
      subtitle: "Gateway to high-altitude expeditions and mountain climbing",
      info: {
        location: "Rohtang Pass",
        duration: "6 Days",
        groupSize: "4-10 People"
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
      {/* Simulated Video Background with CSS Animation */}
      {showVideo ? (
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center animate-ken-burns"
            style={{
              backgroundImage: `url(${heroImage})`,
              animation: 'kenBurns 20s ease-in-out infinite alternate'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 via-secondary/20 to-primary/10"></div>
          </div>
        </div>
      ) : (
        /* Static Background with Seasonal Filters */
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
      )}
      
      {/* Video Toggle Button */}
      <button
        onClick={() => setShowVideo(!showVideo)}
        className="absolute top-24 right-8 z-30 bg-white/20 backdrop-blur-md rounded-full p-3 text-white hover:bg-white/30 transition-all duration-300"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          {showVideo ? "📷" : "🎥"}
        </div>
      </button>

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
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative z-10 text-center max-w-5xl mx-auto px-4 lg:px-8 group"
            whileHover={{ scale: 1.02 }}
          >
            {/* Glassmorphism card with better transparency */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl -z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              whileHover={{ 
                background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.05) 100%)",
                borderColor: "rgba(255,255,255,0.3)"
              }}
            ></motion.div>
            
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight py-8"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              whileHover={{ 
                textShadow: "0 0 30px rgba(255,255,255,0.3)",
                transition: { duration: 0.3 }
              }}
            >
              Experience the Soul of{" "}
              <motion.span 
                className="text-primary-muted bg-gradient-to-r from-primary to-primary-muted bg-clip-text text-transparent"
                whileHover={{ 
                  scale: 1.05,
                  filter: "brightness(1.2)",
                  transition: { duration: 0.3 }
                }}
              >
                the Mountains
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 font-body font-light max-w-3xl mx-auto leading-relaxed px-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              whileHover={{ 
                color: "rgba(255,255,255,1)",
                transition: { duration: 0.3 }
              }}
            >
              Curated journeys through the majestic landscapes of Himachal and Kashmir
              <br />
              <motion.span 
                className="text-primary-muted font-medium"
                animate={{ 
                  opacity: [0.7, 1, 0.7],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {currentSeason.description}
              </motion.span>
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pb-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  variant="cta"
                  className="border-2 border-white/30 bg-white/10 text-white hover:bg-white hover:text-primary backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:shadow-white/25"
                >
                  Discover Our Treks
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  onClick={() => setShowSearch(true)}
                  variant="cta"
                  className="bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                >
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Search className="w-5 h-5 mr-2" />
                  </motion.div>
                  Plan Your Journey
                </Button>
              </motion.div>
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