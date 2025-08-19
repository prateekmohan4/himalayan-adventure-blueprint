import { motion } from "framer-motion";

interface InteractiveHotspotProps {
  position: { x: string; y: string };
  onClick: () => void;
  isActive: boolean;
}

export const InteractiveHotspot = ({ position, onClick, isActive }: InteractiveHotspotProps) => {
  return (
    <motion.button
      className="absolute z-30 cursor-pointer"
      style={{ 
        left: position.x, 
        top: position.y,
        transform: 'translate(-50%, -50%)'
      }}
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
        style={{ 
          width: "40px", 
          height: "40px", 
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }}
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
        style={{ 
          width: "36px", 
          height: "36px", 
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }}
      />
      
      {/* Enhanced Main circle */}
      <div className={`relative w-6 h-6 rounded-full border-2 border-white transition-all duration-500 shadow-xl ${
        isActive ? "bg-primary shadow-2xl scale-110 ring-2 ring-white/50" : "bg-primary/90 hover:bg-primary hover:scale-105 hover:shadow-2xl"
      }`}>
        <div className="absolute inset-1 bg-white rounded-full">
          <div className={`absolute inset-0.5 rounded-full transition-all duration-300 ${
            isActive ? "bg-primary animate-pulse" : "bg-primary/60"
          }`}></div>
        </div>
      </div>
    </motion.button>
  );
};