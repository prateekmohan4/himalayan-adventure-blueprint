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

  const seasonColors = {
    0: "from-blue-400 to-gray-400",    // Winter
    1: "from-blue-300 to-gray-300",    // Late Winter
    2: "from-green-300 to-blue-300",   // Early Spring
    3: "from-green-400 to-green-300",  // Spring
    4: "from-green-500 to-yellow-400", // Late Spring
    5: "from-yellow-400 to-green-500", // Early Summer
    6: "from-yellow-500 to-orange-400", // Summer
    7: "from-orange-400 to-yellow-500", // Late Summer
    8: "from-orange-500 to-red-400",   // Early Autumn
    9: "from-red-400 to-orange-400",   // Autumn
    10: "from-gray-400 to-blue-400",   // Late Autumn
    11: "from-blue-400 to-gray-500"    // Early Winter
  };

  return (
    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
      <div className="bg-background/20 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20">
        <div className="flex items-center space-x-6 mb-4">
          {months.map((month, index) => (
            <button
              key={month}
              onClick={() => onMonthChange(index)}
              className={`text-white font-body font-medium transition-all duration-300 hover:scale-110 ${
                currentMonth === index 
                  ? "text-xl font-semibold text-primary" 
                  : "text-base hover:text-primary/80"
              }`}
            >
              {month}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full bg-gradient-to-r ${seasonColors[currentMonth as keyof typeof seasonColors]} transition-all duration-500`}
              style={{ width: `${((currentMonth + 1) / 12) * 100}%` }}
            />
          </div>
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg transition-all duration-500"
            style={{ left: `${(currentMonth / 11) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};