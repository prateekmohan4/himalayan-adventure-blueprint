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
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10">
        <h2 className="text-3xl font-display font-bold text-foreground mb-2 text-center">
          Find Your Perfect Adventure
        </h2>
        <p className="text-muted-foreground text-center mb-8">
          Discover curated Himalayan experiences tailored just for you
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="relative group">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary/60 w-5 h-5 transition-colors group-focus-within:text-primary" />
            <Input 
              placeholder="Where to? (Spiti, Manali, Kashmir...)"
              className="pl-12 h-14 bg-white/95 border-2 border-white/30 rounded-xl text-foreground placeholder:text-muted-foreground/70 focus:border-primary/50 focus:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
            />
          </div>
          
          <div className="relative group">
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary/60 w-5 h-5 transition-colors group-focus-within:text-primary" />
            <Input 
              placeholder="When? (Oct '24, Nov '24, Dec '24...)"
              className="pl-12 h-14 bg-white/95 border-2 border-white/30 rounded-xl text-foreground placeholder:text-muted-foreground/70 focus:border-primary/50 focus:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
            />
          </div>
          
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary/60 w-5 h-5 transition-colors group-focus-within:text-primary" />
            <Input 
              placeholder="What? (Trekking, Photography, Culture...)"
              className="pl-12 h-14 bg-white/95 border-2 border-white/30 rounded-xl text-foreground placeholder:text-muted-foreground/70 focus:border-primary/50 focus:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
            />
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground px-10 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Search className="w-5 h-5 mr-3" />
            Search Adventures
          </Button>
        </div>
      </div>
    </div>
  );
};