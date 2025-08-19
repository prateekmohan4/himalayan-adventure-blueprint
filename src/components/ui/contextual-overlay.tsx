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
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="absolute z-40 pointer-events-auto"
      style={{ 
        left: position.x, 
        top: position.y,
        transform: 'translate(-50%, calc(-100% - 20px))' // Center the overlay above the hotspot with gap
      }}
    >
      {/* Elegant Connection Line */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2">
        <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-transparent"></div>
        <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg -mt-2 ml-[-7px] animate-pulse"></div>
      </div>
      
      {/* Enhanced Content Card */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 min-w-96 max-w-sm"
           style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
        <div className="mb-6">
          <h3 className="font-display font-bold text-2xl text-foreground mb-2">
            {title}
          </h3>
          <p className="font-body text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center text-foreground bg-primary/5 rounded-lg p-3">
            <MapPin className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
            <span className="font-medium">{info.location}</span>
          </div>
          <div className="flex items-center text-foreground bg-primary/5 rounded-lg p-3">
            <Clock className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
            <span className="font-medium">{info.duration}</span>
          </div>
          <div className="flex items-center text-foreground bg-primary/5 rounded-lg p-3">
            <Users className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
            <span className="font-medium">{info.groupSize}</span>
          </div>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Explore This Adventure →
        </motion.button>
      </div>
    </motion.div>
  );
};