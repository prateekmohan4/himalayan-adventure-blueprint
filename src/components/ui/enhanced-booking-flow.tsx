import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calendar as CalendarIcon,
  Users, 
  Plus, 
  Minus, 
  Check, 
  ArrowLeft, 
  ArrowRight,
  MapPin,
  Clock,
  Star,
  Shield,
  Utensils,
  Camera,
  Backpack
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface Trek {
  id: string;
  name: string;
  location: string;
  duration: string;
  difficulty: string;
  price: number;
  rating: number;
  image: string;
  highlights: string[];
}

interface BookingStep {
  id: number;
  title: string;
  description: string;
}

interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "guide" | "equipment" | "meal" | "photography";
  icon: React.ReactNode;
}

const bookingSteps: BookingStep[] = [
  { id: 1, title: "Select Dates", description: "Choose your preferred travel dates" },
  { id: 2, title: "Travelers", description: "Add traveler information" },
  { id: 3, title: "Package", description: "Select your package type" },
  { id: 4, title: "Add-ons", description: "Enhance your experience" },
  { id: 5, title: "Review", description: "Review and confirm booking" },
  { id: 6, title: "Payment", description: "Complete your booking" }
];

const addOns: AddOn[] = [
  {
    id: "guide",
    name: "Professional Guide",
    description: "Experienced local guide for your trek",
    price: 2000,
    category: "guide",
    icon: <Users className="h-5 w-5" />
  },
  {
    id: "equipment",
    name: "Trekking Equipment",
    description: "Complete set of trekking gear",
    price: 1500,
    category: "equipment",
    icon: <Backpack className="h-5 w-5" />
  },
  {
    id: "meals",
    name: "Premium Meals",
    description: "Upgraded meal plan with local delicacies",
    price: 1000,
    category: "meal",
    icon: <Utensils className="h-5 w-5" />
  },
  {
    id: "photography",
    name: "Professional Photography",
    description: "Dedicated photographer for your trek",
    price: 3000,
    category: "photography",
    icon: <Camera className="h-5 w-5" />
  }
];

interface EnhancedBookingFlowProps {
  trek: Trek;
  onComplete: (bookingData: any) => void;
  onCancel: () => void;
}

export const EnhancedBookingFlow: React.FC<EnhancedBookingFlowProps> = ({
  trek,
  onComplete,
  onCancel
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [travelers, setTravelers] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState("standard");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [travelerDetails, setTravelerDetails] = useState<any[]>([]);
  const [specialRequests, setSpecialRequests] = useState("");
  const { toast } = useToast();

  const packages = [
    {
      id: "budget",
      name: "Budget Explorer",
      description: "Essential trekking experience",
      price: trek.price * 0.8,
      features: ["Basic accommodation", "Group meals", "Standard equipment", "Trek guide"]
    },
    {
      id: "standard",
      name: "Adventure Standard",
      description: "Complete trekking package",
      price: trek.price,
      features: ["Comfortable accommodation", "All meals included", "Quality equipment", "Experienced guide", "First aid kit"]
    },
    {
      id: "premium",
      name: "Premium Explorer",
      description: "Luxury trekking experience",
      price: trek.price * 1.5,
      features: ["Premium accommodation", "Gourmet meals", "Premium equipment", "Personal guide", "Photography service", "Insurance coverage"]
    }
  ];

  const selectedPackageData = packages.find(p => p.id === selectedPackage);
  const selectedAddOnsList = addOns.filter(addon => selectedAddOns.includes(addon.id));

  const calculateTotal = () => {
    const packagePrice = (selectedPackageData?.price || 0) * travelers;
    const addOnPrice = selectedAddOnsList.reduce((total, addon) => total + addon.price, 0);
    return packagePrice + addOnPrice;
  };

  const nextStep = () => {
    if (currentStep < bookingSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBookingComplete = () => {
    const bookingData = {
      trek,
      startDate,
      endDate,
      travelers,
      selectedPackage,
      selectedAddOns,
      travelerDetails,
      specialRequests,
      total: calculateTotal()
    };
    onComplete(bookingData);
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center">
        {bookingSteps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
              currentStep >= step.id 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground"
            )}>
              {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
            </div>
            {index < bookingSteps.length - 1 && (
              <div className={cn(
                "w-full h-1 mx-2 transition-colors",
                currentStep > step.id ? "bg-primary" : "bg-muted"
              )} />
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <h2 className="text-2xl font-display font-bold text-foreground">
          {bookingSteps[currentStep - 1].title}
        </h2>
        <p className="text-muted-foreground">
          {bookingSteps[currentStep - 1].description}
        </p>
      </div>
    </div>
  );

  const renderDateSelection = () => (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2" />
          Select Your Travel Dates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "Pick start date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : "Pick end date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  disabled={(date) => date < (startDate || new Date())}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="bg-primary/5 p-4 rounded-lg">
          <h4 className="font-semibold text-foreground mb-2">Best Time to Visit</h4>
          <p className="text-sm text-muted-foreground">
            March to June and September to November are ideal for trekking in {trek.location}.
            Weather is pleasant with clear mountain views.
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const renderTravelerSelection = () => (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Number of Travelers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTravelers(Math.max(1, travelers - 1))}
            disabled={travelers <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="text-2xl font-bold w-16 text-center">{travelers}</div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTravelers(Math.min(12, travelers + 1))}
            disabled={travelers >= 12}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Group size: 1-12 travelers
        </p>
      </CardContent>
    </Card>
  );

  const renderPackageSelection = () => (
    <div className="space-y-6">
      <RadioGroup value={selectedPackage} onValueChange={setSelectedPackage}>
        {packages.map((pkg) => (
          <Card key={pkg.id} className={cn(
            "bg-card border-border cursor-pointer transition-all",
            selectedPackage === pkg.id && "ring-2 ring-primary"
          )}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <RadioGroupItem value={pkg.id} id={pkg.id} />
                <Label htmlFor={pkg.id} className="cursor-pointer flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-display font-semibold">{pkg.name}</h3>
                      <p className="text-muted-foreground">{pkg.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-foreground">
                        ₹{pkg.price.toLocaleString('en-IN')}
                      </div>
                      <div className="text-sm text-muted-foreground">per person</div>
                    </div>
                  </div>
                </Label>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {pkg.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    {feature}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </RadioGroup>
    </div>
  );

  const renderAddOnsSelection = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-display font-semibold">Enhance Your Experience</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addOns.map((addon) => (
          <Card key={addon.id} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-primary">{addon.icon}</div>
                  <div>
                    <h4 className="font-semibold">{addon.name}</h4>
                    <p className="text-sm text-muted-foreground">{addon.description}</p>
                  </div>
                </div>
                <Checkbox
                  checked={selectedAddOns.includes(addon.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedAddOns([...selectedAddOns, addon.id]);
                    } else {
                      setSelectedAddOns(selectedAddOns.filter(id => id !== addon.id));
                    }
                  }}
                />
              </div>
              <div className="text-right">
                <span className="text-lg font-bold">₹{addon.price.toLocaleString('en-IN')}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-6">
      {/* Trek Summary */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Trek Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-4">
            <img
              src={trek.image}
              alt={trek.name}
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-display font-semibold">{trek.name}</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {trek.location}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {trek.duration}
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2" />
                  {trek.rating} rating
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Details */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Booking Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Dates:</span>
              <p className="font-medium">
                {startDate && endDate 
                  ? `${format(startDate, "MMM dd")} - ${format(endDate, "MMM dd, yyyy")}`
                  : "Not selected"
                }
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Travelers:</span>
              <p className="font-medium">{travelers} {travelers > 1 ? 'people' : 'person'}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Package:</span>
              <p className="font-medium">{selectedPackageData?.name}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Add-ons:</span>
              <p className="font-medium">
                {selectedAddOnsList.length > 0 
                  ? selectedAddOnsList.map(addon => addon.name).join(", ")
                  : "None"
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Breakdown */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Price Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>{selectedPackageData?.name} × {travelers}</span>
            <span>₹{((selectedPackageData?.price || 0) * travelers).toLocaleString('en-IN')}</span>
          </div>
          {selectedAddOnsList.map((addon) => (
            <div key={addon.id} className="flex justify-between text-sm">
              <span>{addon.name}</span>
              <span>₹{addon.price.toLocaleString('en-IN')}</span>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{calculateTotal().toLocaleString('en-IN')}</span>
          </div>
        </CardContent>
      </Card>

      {/* Special Requests */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Special Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Any special requirements or requests..."
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            className="bg-input border-border"
          />
        </CardContent>
      </Card>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderDateSelection();
      case 2:
        return renderTravelerSelection();
      case 3:
        return renderPackageSelection();
      case 4:
        return renderAddOnsSelection();
      case 5:
        return renderReview();
      case 6:
        return (
          <div className="text-center py-12">
            <h3 className="text-2xl font-display font-bold mb-4">
              Redirecting to Payment...
            </h3>
            <p className="text-muted-foreground">
              You will be redirected to our secure payment gateway.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return startDate && endDate;
      case 2:
        return travelers > 0;
      case 3:
        return selectedPackage;
      case 4:
        return true; // Add-ons are optional
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {renderStepIndicator()}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderCurrentStep()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <Button
          variant="outline"
          onClick={currentStep === 1 ? onCancel : prevStep}
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {currentStep === 1 ? "Cancel" : "Previous"}
        </Button>

        <div className="text-sm text-muted-foreground">
          Step {currentStep} of {bookingSteps.length}
        </div>

        <Button
          onClick={currentStep === bookingSteps.length ? handleBookingComplete : nextStep}
          disabled={!canProceed()}
          className="flex items-center bg-primary hover:bg-primary/90"
        >
          {currentStep === bookingSteps.length ? "Complete Booking" : "Next"}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};