import { Slider } from "@/components/ui/slider";

interface SeasonTimelineProps {
  currentMonth: number;
  onMonthChange: (month: number) => void;
}

export const SeasonTimeline = ({ currentMonth, onMonthChange }: SeasonTimelineProps) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const seasonColors = [
    "from-blue-400 to-gray-400",    // Winter
    "from-blue-300 to-gray-300",    // Late Winter
    "from-green-300 to-blue-300",   // Early Spring
    "from-green-400 to-green-300",  // Spring
    "from-green-500 to-yellow-400", // Late Spring
    "from-yellow-400 to-green-500", // Early Summer
    "from-yellow-500 to-orange-400", // Summer
    "from-orange-400 to-yellow-500", // Late Summer
    "from-orange-500 to-red-400",   // Early Autumn
    "from-red-400 to-orange-400",   // Autumn
    "from-gray-400 to-blue-400",   // Late Autumn
    "from-blue-400 to-gray-500"    // Early Winter
  ];

  const handleSliderChange = (values: number[]) => {
    onMonthChange(values[0]);
  };

  return (
    <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-4xl px-2 sm:px-4">
      <div className="bg-background/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl px-4 sm:px-8 py-3 sm:py-5 border border-white/10 shadow-2xl mx-auto relative">
        {/* Month labels */}
        <div className="flex items-center justify-between mb-4">
          {months.map((month, index) => (
            <button
              key={month}
              onClick={() => onMonthChange(index)}
              className={`font-body font-medium transition-all duration-300 hover:scale-110 min-w-[1.5rem] sm:min-w-[2.5rem] text-xs sm:text-sm ${
                currentMonth === index 
                  ? "sm:text-lg font-bold text-primary scale-110" 
                  : "text-white/80 hover:text-white"
              }`}
            >
              {month}
            </button>
          ))}
        </div>
        
        {/* Functional Slider */}
        <div className="px-2">
          <Slider
            value={[currentMonth]}
            onValueChange={handleSliderChange}
            max={11}
            min={0}
            step={1}
            className="w-full"
          />
        </div>
        
        {/* Season indicator */}
        <div className="mt-3 text-center">
          <div 
            className={`inline-block px-4 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${seasonColors[currentMonth]} text-white`}
          >
            {months[currentMonth]} Season
          </div>
        </div>
      </div>
    </div>
  );
};