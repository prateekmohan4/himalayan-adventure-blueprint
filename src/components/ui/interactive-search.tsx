import { Search, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface InteractiveSearchProps {
  isVisible: boolean;
}

export const InteractiveSearch = ({ isVisible }: InteractiveSearchProps) => {
  if (!isVisible) return null;

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-4xl px-4">
      <div className="bg-background/95 backdrop-blur-md rounded-3xl shadow-elevation-3 border border-white/20 p-8">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6 text-center">
          Find Your Perfect Adventure
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              placeholder="Destination (e.g., Spiti Valley)"
              className="pl-10 h-12 bg-background border-border"
            />
          </div>
          
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              placeholder="When (e.g., October 2024)"
              className="pl-10 h-12 bg-background border-border"
            />
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              placeholder="Activity (e.g., Trekking)"
              className="pl-10 h-12 bg-background border-border"
            />
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold">
            <Search className="w-5 h-5 mr-2" />
            Search Adventures
          </Button>
        </div>
      </div>
    </div>
  );
};