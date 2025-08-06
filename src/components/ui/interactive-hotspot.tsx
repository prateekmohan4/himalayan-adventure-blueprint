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
      {/* Enhanced Pulsing outer circle */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/40"
        animate={{
          scale: isActive ? [1, 2, 1] : [1, 1.3, 1],
          opacity: isActive ? [0.8, 0, 0.8] : [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: isActive ? 2.5 : 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ width: "40px", height: "40px", marginLeft: "-4px", marginTop: "-4px" }}
      />
      
      {/* Secondary pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/20"
        animate={{
          scale: isActive ? [1.2, 1.8, 1.2] : 1.1,
          opacity: isActive ? [0.6, 0, 0.6] : 0.3,
        }}
        transition={{
          duration: 2,
          repeat: isActive ? Infinity : 0,
          ease: "easeOut",
          delay: 0.3
        }}
        style={{ width: "36px", height: "36px", marginLeft: "-2px", marginTop: "-2px" }}
      />
      
      {/* Enhanced Main circle */}
      <div className={`relative w-10 h-10 rounded-full border-3 border-white transition-all duration-500 shadow-xl ${
        isActive ? "bg-gradient-to-br from-primary to-primary/80 shadow-2xl scale-110 ring-4 ring-white/30" : "bg-gradient-to-br from-primary/90 to-primary hover:bg-primary hover:scale-105 hover:shadow-2xl"
      }`}>
        <div className="absolute inset-3 bg-white rounded-full shadow-inner">
          <div className={`absolute inset-1 rounded-full transition-all duration-300 ${
            isActive ? "bg-primary animate-pulse" : "bg-primary/60"
          }`}></div>
        </div>
      </div>
    </motion.button>
  );
};