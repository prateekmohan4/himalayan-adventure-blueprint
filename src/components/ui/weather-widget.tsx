import { Cloud, CloudRain, Sun } from "lucide-react";

interface WeatherWidgetProps {
  temperature: number;
  condition: "sunny" | "cloudy" | "rainy";
  location: string;
}

export const WeatherWidget = ({ temperature, condition, location }: WeatherWidgetProps) => {
  const getWeatherIcon = () => {
    switch (condition) {
      case "sunny":
        return <Sun className="w-5 h-5 text-yellow-400" />;
      case "rainy":
        return <CloudRain className="w-5 h-5 text-blue-400" />;
      default:
        return <Cloud className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="absolute bottom-8 left-8 z-20">
      <div className="bg-background/20 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/20">
        <div className="flex items-center space-x-3 text-white">
          {getWeatherIcon()}
          <div>
            <div className="font-body font-semibold text-lg">
              {temperature}°C
            </div>
            <div className="font-body text-sm opacity-80 capitalize">
              {condition}
            </div>
          </div>
        </div>
        <div className="text-white/70 text-xs font-body mt-1">
          {location}
        </div>
      </div>
    </div>
  );
};