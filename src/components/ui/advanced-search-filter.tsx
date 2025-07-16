import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Filter, X, Calendar as CalendarIcon, MapPin, Clock, Users, Mountain } from "lucide-react";
import { format, addDays } from "date-fns";

interface SearchFilters {
  destination: string;
  difficulty: string[];
  duration: [number, number];
  priceRange: [number, number];
  startDate: Date | null;
  endDate: Date | null;
  groupSize: string;
  activities: string[];
  regions: string[];
}

interface AdvancedSearchFilterProps {
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: (query: string) => void;
}

export const AdvancedSearchFilter = ({ onFiltersChange, onSearch }: AdvancedSearchFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({
    destination: "",
    difficulty: [],
    duration: [3, 15],
    priceRange: [5000, 50000],
    startDate: null,
    endDate: null,
    groupSize: "",
    activities: [],
    regions: []
  });

  const difficulties = ["Easy", "Moderate", "Strenuous"];
  const activities = ["High Altitude", "River Crossing", "Rock Climbing", "Glacier Walk", "Wildlife", "Photography"];
  const regions = ["Spiti Valley", "Kinnaur", "Kullu", "Manali", "Dharamshala", "Shimla", "Lahaul"];
  const groupSizes = ["Solo", "2-4 People", "5-8 People", "9-12 People", "Large Group"];

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleArrayFilter = (key: "difficulty" | "activities" | "regions", value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilter(key, newArray);
  };

  const clearFilters = () => {
    const clearedFilters: SearchFilters = {
      destination: "",
      difficulty: [],
      duration: [3, 15],
      priceRange: [5000, 50000],
      startDate: null,
      endDate: null,
      groupSize: "",
      activities: [],
      regions: []
    };
    setFilters(clearedFilters);
    setSearchQuery("");
    onFiltersChange(clearedFilters);
    onSearch("");
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.destination) count++;
    if (filters.difficulty.length > 0) count++;
    if (filters.duration[0] !== 3 || filters.duration[1] !== 15) count++;
    if (filters.priceRange[0] !== 5000 || filters.priceRange[1] !== 50000) count++;
    if (filters.startDate || filters.endDate) count++;
    if (filters.groupSize) count++;
    if (filters.activities.length > 0) count++;
    if (filters.regions.length > 0) count++;
    return count;
  };

  return (
    <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-card border border-border p-6">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          placeholder="Search treks, destinations, or activities..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            onSearch(e.target.value);
          }}
          className="pl-10 pr-12 h-12 text-lg bg-background/50"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchQuery("");
              onSearch("");
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-8 w-8"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          <Select value={filters.destination} onValueChange={(value) => updateFilter("destination", value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region} value={region.toLowerCase()}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-primary" />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-64 justify-start">
                {filters.startDate && filters.endDate ? (
                  `${format(filters.startDate, "MMM dd")} - ${format(filters.endDate, "MMM dd")}`
                ) : filters.startDate ? (
                  `From ${format(filters.startDate, "MMM dd, yyyy")}`
                ) : (
                  "Select dates"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={{ 
                  from: filters.startDate || undefined, 
                  to: filters.endDate || undefined 
                }}
                onSelect={(range) => {
                  updateFilter("startDate", range?.from || null);
                  updateFilter("endDate", range?.to || null);
                }}
                numberOfMonths={2}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button
          variant={isExpanded ? "default" : "outline"}
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative"
        >
          <Filter className="w-4 h-4 mr-2" />
          More Filters
          {getActiveFiltersCount() > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
              {getActiveFiltersCount()}
            </Badge>
          )}
        </Button>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6 border-t">
              {/* Difficulty */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 font-medium">
                  <Mountain className="w-4 h-4 text-primary" />
                  Difficulty Level
                </Label>
                <div className="space-y-2">
                  {difficulties.map((difficulty) => (
                    <div key={difficulty} className="flex items-center space-x-2">
                      <Checkbox
                        id={`difficulty-${difficulty}`}
                        checked={filters.difficulty.includes(difficulty)}
                        onCheckedChange={() => toggleArrayFilter("difficulty", difficulty)}
                      />
                      <Label htmlFor={`difficulty-${difficulty}`} className="text-sm">
                        {difficulty}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 font-medium">
                  <Clock className="w-4 h-4 text-primary" />
                  Duration (Days)
                </Label>
                <div className="px-3">
                  <Slider
                    value={filters.duration}
                    onValueChange={(value) => updateFilter("duration", value)}
                    max={20}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>{filters.duration[0]} days</span>
                    <span>{filters.duration[1]} days</span>
                  </div>
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 font-medium">
                  <span className="text-primary">₹</span>
                  Price Range
                </Label>
                <div className="px-3">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) => updateFilter("priceRange", value)}
                    max={100000}
                    min={5000}
                    step={1000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>₹{filters.priceRange[0].toLocaleString()}</span>
                    <span>₹{filters.priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Group Size */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 font-medium">
                  <Users className="w-4 h-4 text-primary" />
                  Group Size
                </Label>
                <Select value={filters.groupSize} onValueChange={(value) => updateFilter("groupSize", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any size" />
                  </SelectTrigger>
                  <SelectContent>
                    {groupSizes.map((size) => (
                      <SelectItem key={size} value={size.toLowerCase()}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Activities */}
              <div className="space-y-3">
                <Label className="font-medium">Activities & Features</Label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {activities.map((activity) => (
                    <div key={activity} className="flex items-center space-x-2">
                      <Checkbox
                        id={`activity-${activity}`}
                        checked={filters.activities.includes(activity)}
                        onCheckedChange={() => toggleArrayFilter("activities", activity)}
                      />
                      <Label htmlFor={`activity-${activity}`} className="text-sm">
                        {activity}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Regions */}
              <div className="space-y-3">
                <Label className="font-medium">Regions</Label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {regions.map((region) => (
                    <div key={region} className="flex items-center space-x-2">
                      <Checkbox
                        id={`region-${region}`}
                        checked={filters.regions.includes(region)}
                        onCheckedChange={() => toggleArrayFilter("regions", region)}
                      />
                      <Label htmlFor={`region-${region}`} className="text-sm">
                        {region}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t">
              <Button variant="outline" onClick={clearFilters}>
                Clear All Filters
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsExpanded(false)}>
                  Close
                </Button>
                <Button onClick={() => setIsExpanded(false)}>
                  Apply Filters ({getActiveFiltersCount()})
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Display */}
      {getActiveFiltersCount() > 0 && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex flex-wrap gap-2">
            {filters.difficulty.map((difficulty) => (
              <Badge key={difficulty} variant="secondary" className="gap-1">
                {difficulty}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => toggleArrayFilter("difficulty", difficulty)}
                />
              </Badge>
            ))}
            {filters.activities.map((activity) => (
              <Badge key={activity} variant="secondary" className="gap-1">
                {activity}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => toggleArrayFilter("activities", activity)}
                />
              </Badge>
            ))}
            {filters.regions.map((region) => (
              <Badge key={region} variant="secondary" className="gap-1">
                {region}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => toggleArrayFilter("regions", region)}
                />
              </Badge>
            ))}
            {filters.destination && (
              <Badge variant="secondary" className="gap-1">
                {filters.destination}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => updateFilter("destination", "")}
                />
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
};