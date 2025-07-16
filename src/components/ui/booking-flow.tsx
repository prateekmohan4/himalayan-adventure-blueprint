import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { PaymentGateway } from "./payment-gateway";
import { CalendarIcon, Users, MapPin, Clock, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { format } from "date-fns";

interface BookingFlowProps {
  trek: {
    id: string;
    name: string;
    basePrice: number;
    duration: string;
    difficulty: string;
    location: string;
    maxParticipants: number;
    availableDates: Date[];
  };
  onComplete: (bookingData: any) => void;
  onCancel: () => void;
}

type BookingStep = "trek" | "dates" | "participants" | "packages" | "payment" | "confirmation";

interface ParticipantData {
  name: string;
  age: number;
  emergencyContact: string;
  medicalConditions: string;
  experience: string;
}

export const BookingFlow = ({ trek, onComplete, onCancel }: BookingFlowProps) => {
  const [currentStep, setCurrentStep] = useState<BookingStep>("trek");
  const [bookingData, setBookingData] = useState({
    selectedDate: null as Date | null,
    participants: [] as ParticipantData[],
    selectedPackage: "",
    addOns: [] as string[],
    totalAmount: trek.basePrice
  });

  const steps = [
    { id: "trek", title: "Trek Selection", completed: true },
    { id: "dates", title: "Select Dates", completed: currentStep !== "trek" },
    { id: "participants", title: "Participant Details", completed: false },
    { id: "packages", title: "Customize Package", completed: false },
    { id: "payment", title: "Payment", completed: false },
    { id: "confirmation", title: "Confirmation", completed: false }
  ];

  const packages = [
    {
      id: "basic",
      name: "Basic Package",
      price: 0,
      includes: ["Accommodation", "Meals", "Guide", "Permits"]
    },
    {
      id: "premium",
      name: "Premium Package", 
      price: 5000,
      includes: ["All Basic", "Private Guide", "High-altitude gear", "Medical kit"]
    },
    {
      id: "luxury",
      name: "Luxury Package",
      price: 12000,
      includes: ["All Premium", "Helicopter transfer", "Luxury camps", "Professional photography"]
    }
  ];

  const addOns = [
    { id: "gear", name: "Trekking Gear Rental", price: 2000 },
    { id: "insurance", name: "Travel Insurance", price: 1500 },
    { id: "photography", name: "Professional Photography", price: 3000 },
    { id: "porter", name: "Personal Porter", price: 2500 }
  ];

  const calculateTotal = () => {
    const packagePrice = packages.find(p => p.id === bookingData.selectedPackage)?.price || 0;
    const addOnPrice = bookingData.addOns.reduce((total, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId);
      return total + (addOn?.price || 0);
    }, 0);
    return (trek.basePrice + packagePrice + addOnPrice) * bookingData.participants.length;
  };

  const nextStep = () => {
    const stepOrder: BookingStep[] = ["trek", "dates", "participants", "packages", "payment", "confirmation"];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const stepOrder: BookingStep[] = ["trek", "dates", "participants", "packages", "payment", "confirmation"];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const addParticipant = () => {
    setBookingData(prev => ({
      ...prev,
      participants: [...prev.participants, {
        name: "",
        age: 0,
        emergencyContact: "",
        medicalConditions: "",
        experience: ""
      }]
    }));
  };

  const updateParticipant = (index: number, field: keyof ParticipantData, value: any) => {
    setBookingData(prev => ({
      ...prev,
      participants: prev.participants.map((p, i) => 
        i === index ? { ...p, [field]: value } : p
      )
    }));
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center relative">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
              step.id === currentStep 
                ? "border-primary bg-primary text-primary-foreground"
                : step.completed
                ? "border-green-500 bg-green-500 text-white"
                : "border-muted bg-background text-muted-foreground"
            }`}>
              {step.completed && step.id !== currentStep ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <span className="text-sm font-medium">{index + 1}</span>
              )}
            </div>
            <span className="text-xs mt-2 text-center max-w-20">{step.title}</span>
            {index < steps.length - 1 && (
              <div className={`absolute top-5 left-10 w-full h-0.5 ${
                steps[index + 1].completed ? "bg-green-500" : "bg-muted"
              }`} style={{ width: "calc(100vw / 6 - 2.5rem)" }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderTrekSelection = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="font-display font-bold text-2xl mb-2">Selected Trek</h2>
        <p className="text-muted-foreground">Review your trek selection</p>
      </div>

      <div className="bg-muted rounded-lg p-6">
        <h3 className="font-display font-semibold text-xl mb-4">{trek.name}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>{trek.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{trek.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span>Max {trek.maxParticipants}</span>
          </div>
          <div>
            <Badge variant="outline">{trek.difficulty}</Badge>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Base Price:</span>
            <span className="text-xl font-bold text-primary">₹{trek.basePrice.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Button onClick={nextStep} className="w-full" size="lg">
        Continue to Date Selection
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </motion.div>
  );

  const renderDateSelection = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="font-display font-bold text-2xl mb-2">Select Your Preferred Date</h2>
        <p className="text-muted-foreground">Choose from available trek dates</p>
      </div>

      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={bookingData.selectedDate}
          onSelect={(date) => setBookingData(prev => ({ ...prev, selectedDate: date }))}
          disabled={(date) => !trek.availableDates.some(d => 
            d.toDateString() === date.toDateString()
          )}
          className="rounded-md border"
        />
      </div>

      {bookingData.selectedDate && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-green-600" />
            <span className="font-medium">Selected Date: {format(bookingData.selectedDate, "PPP")}</span>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <Button onClick={prevStep} variant="outline" className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={nextStep} 
          className="flex-1" 
          disabled={!bookingData.selectedDate}
        >
          Continue to Participants
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );

  const renderParticipants = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="font-display font-bold text-2xl mb-2">Participant Details</h2>
        <p className="text-muted-foreground">Add details for all participants</p>
      </div>

      <div className="space-y-4">
        {bookingData.participants.map((participant, index) => (
          <div key={index} className="bg-muted rounded-lg p-4 space-y-4">
            <h4 className="font-semibold">Participant {index + 1}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`name-${index}`}>Full Name</Label>
                <Input
                  id={`name-${index}`}
                  value={participant.name}
                  onChange={(e) => updateParticipant(index, "name", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor={`age-${index}`}>Age</Label>
                <Input
                  id={`age-${index}`}
                  type="number"
                  value={participant.age || ""}
                  onChange={(e) => updateParticipant(index, "age", parseInt(e.target.value))}
                />
              </div>
              <div>
                <Label htmlFor={`emergency-${index}`}>Emergency Contact</Label>
                <Input
                  id={`emergency-${index}`}
                  value={participant.emergencyContact}
                  onChange={(e) => updateParticipant(index, "emergencyContact", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor={`experience-${index}`}>Trekking Experience</Label>
                <Select onValueChange={(value) => updateParticipant(index, "experience", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor={`medical-${index}`}>Medical Conditions (if any)</Label>
                <Textarea
                  id={`medical-${index}`}
                  value={participant.medicalConditions}
                  onChange={(e) => updateParticipant(index, "medicalConditions", e.target.value)}
                  placeholder="Please mention any medical conditions, allergies, or dietary restrictions"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button onClick={addParticipant} variant="outline" className="w-full">
        Add Another Participant
      </Button>

      <div className="flex gap-3">
        <Button onClick={prevStep} variant="outline" className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={nextStep} 
          className="flex-1"
          disabled={bookingData.participants.length === 0}
        >
          Continue to Packages
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );

  const renderPackages = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="font-display font-bold text-2xl mb-2">Customize Your Package</h2>
        <p className="text-muted-foreground">Select package and add-ons</p>
      </div>

      {/* Package Selection */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Choose Your Package</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                bookingData.selectedPackage === pkg.id
                  ? "border-primary bg-primary-muted"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => setBookingData(prev => ({ ...prev, selectedPackage: pkg.id }))}
            >
              <h4 className="font-semibold mb-2">{pkg.name}</h4>
              <p className="text-lg font-bold text-primary mb-3">
                {pkg.price === 0 ? "Included" : `+₹${pkg.price.toLocaleString()}`}
              </p>
              <ul className="text-sm space-y-1">
                {pkg.includes.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Add-ons */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Optional Add-ons</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addOns.map((addOn) => (
            <div key={addOn.id} className="flex items-center space-x-3 p-4 border rounded-lg">
              <Checkbox
                id={addOn.id}
                checked={bookingData.addOns.includes(addOn.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setBookingData(prev => ({ 
                      ...prev, 
                      addOns: [...prev.addOns, addOn.id] 
                    }));
                  } else {
                    setBookingData(prev => ({ 
                      ...prev, 
                      addOns: prev.addOns.filter(id => id !== addOn.id) 
                    }));
                  }
                }}
              />
              <div className="flex-1">
                <Label htmlFor={addOn.id} className="font-medium cursor-pointer">
                  {addOn.name}
                </Label>
                <p className="text-sm text-primary font-semibold">+₹{addOn.price.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total Amount:</span>
          <span className="text-primary">₹{calculateTotal().toLocaleString()}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={prevStep} variant="outline" className="flex-1">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={nextStep} 
          className="flex-1"
          disabled={!bookingData.selectedPackage}
        >
          Proceed to Payment
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {renderProgressBar()}
      
      <AnimatePresence mode="wait">
        {currentStep === "trek" && renderTrekSelection()}
        {currentStep === "dates" && renderDateSelection()}
        {currentStep === "participants" && renderParticipants()}
        {currentStep === "packages" && renderPackages()}
        {currentStep === "payment" && (
          <PaymentGateway
            amount={calculateTotal()}
            trekName={trek.name}
            bookingDetails={{
              participants: bookingData.participants.length,
              dates: bookingData.selectedDate ? format(bookingData.selectedDate, "PPP") : "",
              package: packages.find(p => p.id === bookingData.selectedPackage)?.name || ""
            }}
            onPaymentSuccess={(paymentId) => {
              setCurrentStep("confirmation");
              onComplete({ ...bookingData, paymentId, totalAmount: calculateTotal() });
            }}
            onPaymentFailure={(error) => {
              console.error("Payment failed:", error);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};