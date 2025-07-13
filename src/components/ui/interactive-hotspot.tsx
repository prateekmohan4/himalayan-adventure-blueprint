import { motion } from "framer-motion";

interface InteractiveHotspotProps {
  position: { x: string; y: string };
  onClick: () => void;
  isActive: boolean;
}

export const InteractiveHotspot = ({ position, onClick, isActive }: InteractiveHotspotProps) => {
  return (
    <motion.button
      className="absolute z-10"
      style={{ left: position.x, top: position.y }}
      onClick={onClick}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Pulsing outer circle */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/30"
        animate={{
          scale: isActive ? [1, 1.5, 1] : 1,
          opacity: isActive ? [0.6, 0, 0.6] : 0.6,
        }}
        transition={{
          duration: 2,
          repeat: isActive ? Infinity : 0,
          ease: "easeOut"
        }}
        style={{ width: "32px", height: "32px" }}
      />
      
      {/* Main circle */}
      <div className={`relative w-8 h-8 rounded-full border-2 border-white transition-all duration-300 ${
        isActive ? "bg-primary shadow-lg" : "bg-primary/80 hover:bg-primary"
      }`}>
        <div className="absolute inset-2 bg-white rounded-full"></div>
      </div>
    </motion.button>
  );
};