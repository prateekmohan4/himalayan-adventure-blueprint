import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingFlow } from "@/components/ui/booking-flow";
import { PhotoGallery } from "@/components/ui/photo-gallery";
import { TestimonialCarousel } from "@/components/ui/testimonial-carousel";
import { MapPin, Clock, Users, Star, Calendar, Hotel, Camera, Mountain } from "lucide-react";
import { useState } from "react";

// Mock data for destination packages
const destinationPackages = {
  "spiti-valley": {
    name: "Spiti Valley Explorer",
    location: "Spiti Valley, Himachal Pradesh",
    description: "Experience the mystical beauty of Spiti Valley with its ancient monasteries, pristine lakes, and dramatic landscapes.",
    heroImage: "/lovable-uploads/9408100d-3d07-4fe6-b73f-b81a9f246ca0.png",
    packages: [
      {
        id: "spiti-classic-7d",
        name: "Classic Spiti Circuit",
        duration: "7 Days",
        price: 35000,
        groupSize: "4-12 People",
        difficulty: "Moderate",
        highlights: ["Key Monastery", "Chandratal Lake", "Kaza Town", "Pin Valley", "Local Homestays"],
        itinerary: [
          { day: 1, title: "Manali to Kaza", description: "Drive through Rohtang Pass and Kunzum Pass to reach Kaza" },
          { day: 2, title: "Kaza Exploration", description: "Visit Key Monastery and Kibber village" },
          { day: 3, title: "Pin Valley Excursion", description: "Explore Pin Valley National Park and Mud village" },
          { day: 4, title: "Chandratal Lake", description: "Journey to the pristine Moon Lake" },
          { day: 5, title: "Tabo & Dhankar", description: "Visit ancient Tabo Monastery and Dhankar Gompa" },
          { day: 6, title: "Langza & Komic", description: "Explore world's highest villages" },
          { day: 7, title: "Return Journey", description: "Drive back to Manali via Spiti Valley" }
        ],
        inclusions: ["Accommodation", "All Meals", "Transport", "Guide", "Permits"],
        hotels: [
          { name: "Spiti Heritage", type: "Heritage Hotel", location: "Kaza", rating: 4.2 },
          { name: "Zostel Spiti", type: "Hostel", location: "Kaza", rating: 4.0 },
          { name: "Camp Chandratal", type: "Camping", location: "Chandratal", rating: 4.5 }
        ]
      },
      {
        id: "spiti-luxury-10d",
        name: "Luxury Spiti Experience",
        duration: "10 Days",
        price: 65000,
        groupSize: "2-8 People",
        difficulty: "Moderate",
        highlights: ["Premium Accommodations", "Private Transport", "Photography Guide", "Cultural Immersion", "Wellness Sessions"],
        itinerary: [
          { day: 1, title: "Arrival Manali", description: "Luxury hotel stay and acclimatization" },
          { day: 2, title: "Manali to Kaza", description: "Premium vehicle journey with photo stops" },
          { day: 3, title: "Kaza Cultural Tour", description: "Private monastery visits with cultural guide" },
          { day: 4, title: "Pin Valley Safari", description: "Wildlife photography and nature walks" },
          { day: 5, title: "Chandratal Luxury Camp", description: "Glamping experience under stars" },
          { day: 6, title: "Photography Workshop", description: "Professional photography guidance" },
          { day: 7, title: "Village Immersion", description: "Homestay experience in Langza" },
          { day: 8, title: "Wellness Day", description: "Yoga and meditation sessions" },
          { day: 9, title: "Tabo Heritage", description: "Ancient art and culture exploration" },
          { day: 10, title: "Departure", description: "Return journey with memories" }
        ],
        inclusions: ["Luxury Accommodation", "All Meals", "Private Transport", "Photography Guide", "Wellness Sessions"],
        hotels: [
          { name: "The Himalayan Village", type: "Luxury Resort", location: "Kaza", rating: 4.8 },
          { name: "Chandratal Luxury Camp", type: "Glamping", location: "Chandratal", rating: 4.7 },
          { name: "Heritage Homestay", type: "Heritage", location: "Langza", rating: 4.5 }
        ]
      }
    ],
    gallery: [
      { id: "1", src: "/lovable-uploads/9408100d-3d07-4fe6-b73f-b81a9f246ca0.png", alt: "Spiti Valley", title: "Spiti Valley Landscape", location: "Spiti Valley", tags: ["landscape", "mountains"], likes: 245 },
      { id: "2", src: "/lovable-uploads/9408100d-3d07-4fe6-b73f-b81a9f246ca0.png", alt: "Monasteries", title: "Ancient Monasteries", location: "Key Monastery", tags: ["culture", "heritage"], likes: 189 },
      { id: "3", src: "/lovable-uploads/9408100d-3d07-4fe6-b73f-b81a9f246ca0.png", alt: "Chandratal Lake", title: "Moon Lake", location: "Chandratal", tags: ["lake", "pristine"], likes: 312 }
    ]
  }
};

export default function DestinationDetail() {
  const { slug } = useParams();
  const [showBooking, setShowBooking] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const destination = destinationPackages[slug as keyof typeof destinationPackages];

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Destination Not Found</h1>
          <p className="text-muted-foreground">The destination you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleBookNow = (packageId: string) => {
    setSelectedPackage(packageId);
    setShowBooking(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${destination.heroImage})`,
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
              {destination.name}
            </motion.h1>
            
            <motion.div
              className="flex items-center justify-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <MapPin className="w-6 h-6 mr-2 text-primary" />
              <span className="text-xl text-white/90">{destination.location}</span>
            </motion.div>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-8 font-body leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {destination.description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Package Selection */}
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
              Choose Your <span className="text-primary">Experience</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select from our carefully curated packages designed for different travel styles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {destination.packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full flex flex-col bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-heading font-bold">{pkg.name}</h3>
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      {pkg.difficulty}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-6 mb-6 text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      {pkg.groupSize}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Highlights</h4>
                    <div className="flex flex-wrap gap-2">
                      {pkg.highlights.map((highlight, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Partner Hotels</h4>
                    <div className="space-y-2">
                      {pkg.hotels.map((hotel, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div>
                            <div className="font-medium">{hotel.name}</div>
                            <div className="text-sm text-muted-foreground">{hotel.type} • {hotel.location}</div>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                            <span className="text-sm">{hotel.rating}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-sm text-muted-foreground">Starting from</span>
                        <div className="text-3xl font-bold text-primary">
                          ₹{pkg.price.toLocaleString()}
                        </div>
                        <span className="text-sm text-muted-foreground">per person</span>
                      </div>
                      <Button 
                        onClick={() => handleBookNow(pkg.id)}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Information Tabs */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="itinerary" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="itinerary" className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Itinerary
              </TabsTrigger>
              <TabsTrigger value="hotels" className="flex items-center">
                <Hotel className="w-4 h-4 mr-2" />
                Accommodations
              </TabsTrigger>
              <TabsTrigger value="gallery" className="flex items-center">
                <Camera className="w-4 h-4 mr-2" />
                Gallery
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center">
                <Star className="w-4 h-4 mr-2" />
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="itinerary" className="mt-8">
              {destination.packages.map((pkg, pkgIndex) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: pkgIndex * 0.1 }}
                  className="mb-12"
                >
                  <h3 className="text-2xl font-bold mb-6">{pkg.name} - Day by Day</h3>
                  <div className="space-y-6">
                    {pkg.itinerary.map((day, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start space-x-4 p-6 bg-card/50 rounded-lg"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                          {day.day}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-2">{day.title}</h4>
                          <p className="text-muted-foreground">{day.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </TabsContent>

            <TabsContent value="gallery" className="mt-8">
              <PhotoGallery images={destination.gallery} />
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <TestimonialCarousel />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Booking Flow Modal */}
      {showBooking && selectedPackage && (
        <BookingFlow
          trek={{
            id: selectedPackage,
            name: destination.packages.find(p => p.id === selectedPackage)?.name || "",
            basePrice: destination.packages.find(p => p.id === selectedPackage)?.price || 0,
            duration: destination.packages.find(p => p.id === selectedPackage)?.duration || "",
            difficulty: destination.packages.find(p => p.id === selectedPackage)?.difficulty || "",
            location: destination.location,
            maxParticipants: 12,
            availableDates: [new Date(), new Date(Date.now() + 86400000 * 7)]
          }}
          onComplete={(data) => {
            console.log('Booking completed:', data);
            setShowBooking(false);
          }}
          onCancel={() => setShowBooking(false)}
        />
      )}
    </div>
  );
}