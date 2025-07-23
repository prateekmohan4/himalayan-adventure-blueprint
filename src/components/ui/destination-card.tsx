import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, Star } from "lucide-react";
import { motion } from "framer-motion";

interface DestinationCardProps {
  destination: {
    id: string;
    name: string;
    slug: string;
    description: string;
    image: string;
    location: string;
    duration: string;
    groupSize: string;
    rating: number;
    reviewCount: number;
    startingPrice: number;
    features: string[];
    difficulty: "Easy" | "Moderate" | "Challenging";
  };
}

export const DestinationCard = ({ destination }: DestinationCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-500/20 text-green-400";
      case "Moderate": return "bg-yellow-500/20 text-yellow-400";
      case "Challenging": return "bg-red-500/20 text-red-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group"
    >
      <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-white/10 hover:border-primary/30 transition-all duration-300">
        <div className="relative overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <Badge 
            className={`absolute top-4 left-4 ${getDifficultyColor(destination.difficulty)} border-none`}
          >
            {destination.difficulty}
          </Badge>
          
          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white text-sm font-medium">{destination.rating}</span>
            <span className="text-white/70 text-sm">({destination.reviewCount})</span>
          </div>

          <div className="absolute bottom-4 left-4">
            <h3 className="text-white font-heading font-bold text-xl mb-1">
              {destination.name}
            </h3>
            <div className="flex items-center text-white/80 text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              {destination.location}
            </div>
          </div>
        </div>

        <div className="p-6">
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {destination.description}
          </p>

          <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {destination.duration}
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {destination.groupSize}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {destination.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                {feature}
              </Badge>
            ))}
            {destination.features.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                +{destination.features.length - 3} more
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-muted-foreground">Starting from</span>
              <div className="text-2xl font-bold text-primary">
                ₹{destination.startingPrice.toLocaleString()}
              </div>
              <span className="text-xs text-muted-foreground">per person</span>
            </div>
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
              onClick={() => window.location.href = `/destinations/${destination.slug}`}
            >
              Explore Packages
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};