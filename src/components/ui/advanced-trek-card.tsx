import { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Star, Heart, Share2 } from "lucide-react";

interface AdvancedTrekCardProps {
  id: string;
  image: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Easy" | "Moderate" | "Strenuous";
  price: number;
  rating: number;
  reviews: number;
  location: string;
  availability: "Available" | "Limited" | "Full";
  nextDate: string;
  highlights: string[];
}

export const AdvancedTrekCard = ({
  id,
  image,
  title,
  description,
  duration,
  difficulty,
  price,
  rating,
  reviews,
  location,
  availability,
  nextDate,
  highlights
}: AdvancedTrekCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const difficultyColors = {
    Easy: "bg-green-100 text-green-800 border-green-200",
    Moderate: "bg-orange-100 text-orange-800 border-orange-200", 
    Strenuous: "bg-red-100 text-red-800 border-red-200"
  };

  const availabilityColors = {
    Available: "bg-green-500",
    Limited: "bg-orange-500",
    Full: "bg-red-500"
  };

  return (
    <motion.div
      className="group relative bg-card/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-card hover:shadow-elevation-3 transition-all duration-500"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      layout
    >
      {/* Availability Badge */}
      <div className="absolute top-4 left-4 z-20">
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm font-medium ${availabilityColors[availability]} backdrop-blur-sm`}>
          <div className="w-2 h-2 rounded-full bg-white"></div>
          {availability}
        </div>
      </div>

      {/* Wishlist & Share */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <motion.button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart 
            className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-white'}`} 
          />
        </motion.button>
        <motion.button
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Share2 className="w-4 h-4 text-white" />
        </motion.button>
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Price Tag */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
            <span className="text-sm font-medium text-muted-foreground">Starting from</span>
            <div className="font-display font-bold text-lg text-foreground">
              ₹{price.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-display font-semibold text-foreground mb-1 line-clamp-1">
              {title}
            </h3>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{rating}</span>
            <span className="text-muted-foreground">({reviews})</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground font-body mb-4 leading-relaxed line-clamp-2">
          {description}
        </p>

        {/* Highlights */}
        <motion.div 
          className="mb-4 overflow-hidden"
          animate={{ height: isHovered ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-1">
            {highlights.slice(0, 2).map((highlight, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>Max 12</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge 
            variant="outline" 
            className={`${difficultyColors[difficulty]} font-medium`}
          >
            {difficulty}
          </Badge>
          <Badge variant="secondary" className="bg-primary-muted text-primary font-medium">
            Next: {nextDate}
          </Badge>
        </div>

        {/* CTA */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            View Details
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Book Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};