import { motion } from "framer-motion";
import { MapPin, Clock, Users } from "lucide-react";

interface ContextualOverlayProps {
  title: string;
  subtitle: string;
  position: { x: string; y: string };
  info: {
    location: string;
    duration: string;
    groupSize: string;
  };
  isVisible: boolean;
}

export const ContextualOverlay = ({ 
  title, 
  subtitle, 
  position, 
  info, 
  isVisible 
}: ContextualOverlayProps) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="absolute z-10"
      style={{ left: position.x, top: position.y }}
    >
      {/* Connection Line */}
      <div className="absolute -bottom-6 left-1/2 w-0.5 h-6 bg-primary"></div>
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary rounded-full border-2 border-white"></div>
      
      {/* Content Card */}
      <div className="bg-background/95 backdrop-blur-md rounded-2xl shadow-elevation-2 border border-white/20 p-6 min-w-80 max-w-96">
        <h3 className="font-display font-bold text-lg text-foreground mb-1">
          {title}
        </h3>
        <p className="font-body text-muted-foreground mb-4">
          {subtitle}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2 text-primary" />
            <span>{info.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2 text-primary" />
            <span>{info.duration}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="w-4 h-4 mr-2 text-primary" />
            <span>{info.groupSize}</span>
          </div>
        </div>
        
        <button className="mt-4 text-primary font-body font-semibold hover:underline">
          Learn More →
        </button>
      </div>
    </motion.div>
  );
};