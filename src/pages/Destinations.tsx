import { motion } from "framer-motion";
import { DestinationCard } from "@/components/ui/destination-card";
import { AdvancedSearchFilter } from "@/components/ui/advanced-search-filter";
import { MapPin, Users, Clock } from "lucide-react";
import spitivalley from "@/assets/spiti-valley.jpg";
import chandratalLake from "@/assets/chandratal-lake.jpg";
import himachaliVillage from "@/assets/himachali-village.jpg";
import kashmirHouseboat from "@/assets/kashmir-houseboat.jpg";
import heroHimalayas from "@/assets/hero-himalayas.jpg";
import trekkersCamp from "@/assets/trekkers-camp.jpg";

const destinations = [
  {
    id: "1",
    name: "Spiti Valley Explorer",
    slug: "spiti-valley",
    description: "Discover the remote beauty of Spiti Valley with its ancient monasteries, pristine lakes, and dramatic landscapes. Experience authentic Himalayan culture.",
    image: spitivalley,
    location: "Spiti Valley, HP",
    duration: "7-10 Days",
    groupSize: "4-12 People",
    rating: 4.8,
    reviewCount: 156,
    startingPrice: 35000,
    features: ["Monastery Visits", "Local Homestays", "Photography Tours", "Cultural Immersion"],
    difficulty: "Moderate" as const
  },
  {
    id: "2",
    name: "Chandratal Lake Expedition",
    slug: "chandratal-lake",
    description: "Journey to the pristine Chandratal Lake, known as the Moon Lake. Camp under star-studded skies in this high-altitude paradise.",
    image: chandratalLake,
    location: "Chandratal, HP",
    duration: "4-6 Days",
    groupSize: "6-15 People",
    rating: 4.9,
    reviewCount: 203,
    startingPrice: 25000,
    features: ["High Altitude Camping", "Stargazing", "Photography", "Pristine Nature"],
    difficulty: "Challenging" as const
  },
  {
    id: "3",
    name: "Himachali Village Experience",
    slug: "himachali-villages",
    description: "Immerse yourself in traditional Himachali culture with village homestays, local cuisine, and authentic mountain experiences.",
    image: himachaliVillage,
    location: "Kullu Valley, HP",
    duration: "3-5 Days",
    groupSize: "2-8 People",
    rating: 4.7,
    reviewCount: 89,
    startingPrice: 15000,
    features: ["Village Homestays", "Local Cuisine", "Cultural Activities", "Nature Walks"],
    difficulty: "Easy" as const
  },
  {
    id: "4",
    name: "Kashmir Houseboat Retreat",
    slug: "kashmir-houseboats",
    description: "Experience the romantic charm of Kashmir with luxury houseboat stays on Dal Lake, Shikara rides, and Mughal garden visits.",
    image: kashmirHouseboat,
    location: "Srinagar, Kashmir",
    duration: "5-7 Days",
    groupSize: "2-10 People",
    rating: 4.6,
    reviewCount: 142,
    startingPrice: 28000,
    features: ["Luxury Houseboats", "Shikara Rides", "Mughal Gardens", "Local Crafts"],
    difficulty: "Easy" as const
  },
  {
    id: "5",
    name: "Himalayan Base Camp Adventure",
    slug: "himalayan-base-camps",
    description: "Challenge yourself with base camp expeditions offering stunning views of snow-capped peaks and alpine meadows.",
    image: heroHimalayas,
    location: "Multiple Locations, HP",
    duration: "8-12 Days",
    groupSize: "6-12 People",
    rating: 4.9,
    reviewCount: 98,
    startingPrice: 45000,
    features: ["Base Camp Treks", "Alpine Meadows", "Technical Climbing", "Mountain Views"],
    difficulty: "Challenging" as const
  },
  {
    id: "6",
    name: "Mountain Photography Tours",
    slug: "photography-tours",
    description: "Capture the essence of the Himalayas with guided photography tours focusing on landscapes, wildlife, and cultural moments.",
    image: trekkersCamp,
    location: "Various Locations, HP",
    duration: "6-8 Days",
    groupSize: "4-8 People",
    rating: 4.8,
    reviewCount: 67,
    startingPrice: 32000,
    features: ["Photo Workshops", "Golden Hour Shoots", "Wildlife Photography", "Cultural Portraits"],
    difficulty: "Moderate" as const
  }
];

export default function Destinations() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroHimalayas})`,
            filter: "brightness(0.7)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto px-4"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Discover Himalayan
              <span className="block text-primary">Destinations</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-8 font-body leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Curated travel experiences combining adventure, culture, and luxury
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <div className="flex items-center space-x-6 text-white/80">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  <span>15+ Destinations</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  <span>Small Groups</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-primary" />
                  <span>3-12 Days</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-background/95 backdrop-blur-sm sticky top-0 z-40 border-b border-border/50">
        <div className="container mx-auto px-4">
          <AdvancedSearchFilter 
            onFiltersChange={(filters) => console.log('Filters:', filters)}
            onSearch={(query) => console.log('Search:', query)}
          />
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Explore Our <span className="text-primary">Destinations</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From cultural immersions to adventure expeditions, discover experiences crafted for every traveler
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <DestinationCard destination={destination} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Ready for Your Himalayan Adventure?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let our experts craft a personalized itinerary that matches your interests and preferences
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold transition-colors"
            >
              Plan Your Custom Journey
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}