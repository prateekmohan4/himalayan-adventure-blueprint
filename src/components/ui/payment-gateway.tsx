import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Shield, Lock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface PaymentGatewayProps {
  amount: number;
  trekName: string;
  bookingDetails: {
    participants: number;
    dates: string;
    package: string;
  };
  onPaymentSuccess: (paymentId: string) => void;
  onPaymentFailure: (error: string) => void;
}

type PaymentStep = "details" | "payment" | "processing" | "success" | "failure";

export const PaymentGateway = ({
  amount,
  trekName,
  bookingDetails,
  onPaymentSuccess,
  onPaymentFailure
}: PaymentGatewayProps) => {
  const [currentStep, setCurrentStep] = useState<PaymentStep>("details");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "netbanking">("card");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    upiId: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const paymentMethods = [
    { id: "card", name: "Credit/Debit Card", icon: CreditCard },
    { id: "upi", name: "UPI", icon: Shield },
    { id: "netbanking", name: "Net Banking", icon: Lock }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    
    if (paymentMethod === "card") {
      if (!formData.cardNumber) newErrors.cardNumber = "Card number is required";
      if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";
      if (!formData.cvv) newErrors.cvv = "CVV is required";
      if (!formData.nameOnCard) newErrors.nameOnCard = "Name on card is required";
    }
    
    if (paymentMethod === "upi" && !formData.upiId) {
      newErrors.upiId = "UPI ID is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;
    
    setCurrentStep("processing");
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock payment success/failure
      const isSuccess = Math.random() > 0.2; // 80% success rate
      
      if (isSuccess) {
        const paymentId = `PAY_${Date.now()}`;
        setCurrentStep("success");
        onPaymentSuccess(paymentId);
      } else {
        throw new Error("Payment failed due to network issues");
      }
    } catch (error) {
      setCurrentStep("failure");
      onPaymentFailure(error instanceof Error ? error.message : "Payment failed");
    }
  };

  const renderPaymentDetails = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Contact Details */}
      <div className="space-y-4">
        <h3 className="font-display font-semibold text-lg">Contact Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
        </div>
      </div>

      <Separator />

      {/* Payment Method Selection */}
      <div className="space-y-4">
        <h3 className="font-display font-semibold text-lg">Payment Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {paymentMethods.map((method) => (
            <motion.button
              key={method.id}
              onClick={() => setPaymentMethod(method.id as any)}
              className={`p-4 rounded-lg border-2 transition-all ${
                paymentMethod === method.id
                  ? "border-primary bg-primary-muted"
                  : "border-border hover:border-primary/50"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <method.icon className="w-6 h-6 mx-auto mb-2" />
              <p className="text-sm font-medium">{method.name}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Payment Form */}
      <AnimatePresence mode="wait">
        {paymentMethod === "card" && (
          <motion.div
            key="card"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="nameOnCard">Name on Card</Label>
              <Input
                id="nameOnCard"
                value={formData.nameOnCard}
                onChange={(e) => setFormData(prev => ({ ...prev, nameOnCard: e.target.value }))}
                className={errors.nameOnCard ? "border-red-500" : ""}
              />
              {errors.nameOnCard && <p className="text-red-500 text-sm mt-1">{errors.nameOnCard}</p>}
            </div>
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: e.target.value }))}
                className={errors.cardNumber ? "border-red-500" : ""}
              />
              {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                  className={errors.expiryDate ? "border-red-500" : ""}
                />
                {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={(e) => setFormData(prev => ({ ...prev, cvv: e.target.value }))}
                  className={errors.cvv ? "border-red-500" : ""}
                />
                {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
              </div>
            </div>
          </motion.div>
        )}

        {paymentMethod === "upi" && (
          <motion.div
            key="upi"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="upiId">UPI ID</Label>
              <Input
                id="upiId"
                placeholder="yourname@paytm"
                value={formData.upiId}
                onChange={(e) => setFormData(prev => ({ ...prev, upiId: e.target.value }))}
                className={errors.upiId ? "border-red-500" : ""}
              />
              {errors.upiId && <p className="text-red-500 text-sm mt-1">{errors.upiId}</p>}
            </div>
          </motion.div>
        )}

        {paymentMethod === "netbanking" && (
          <motion.div
            key="netbanking"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 bg-muted rounded-lg text-center"
          >
            <p className="text-muted-foreground">
              You will be redirected to your bank's secure portal to complete the payment.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <Button onClick={handlePayment} className="w-full" size="lg">
        Pay ₹{amount.toLocaleString()}
      </Button>
    </motion.div>
  );

  const renderProcessing = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-8"
    >
      <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
      <h3 className="font-display font-semibold text-lg mb-2">Processing Payment</h3>
      <p className="text-muted-foreground">Please wait while we process your payment...</p>
    </motion.div>
  );

  const renderSuccess = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
      <h3 className="font-display font-semibold text-xl mb-2">Payment Successful!</h3>
      <p className="text-muted-foreground mb-4">
        Your booking for {trekName} has been confirmed.
      </p>
      <Badge variant="secondary" className="bg-green-100 text-green-800">
        Booking ID: {`BK${Date.now()}`}
      </Badge>
    </motion.div>
  );

  const renderFailure = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
      <h3 className="font-display font-semibold text-xl mb-2">Payment Failed</h3>
      <p className="text-muted-foreground mb-4">
        There was an issue processing your payment. Please try again.
      </p>
      <Button onClick={() => setCurrentStep("details")} variant="outline">
        Try Again
      </Button>
    </motion.div>
  );

  return (
    <div className="bg-card rounded-2xl p-6 shadow-card">
      {/* Order Summary */}
      <div className="mb-6 p-4 bg-muted rounded-lg">
        <h3 className="font-display font-semibold mb-3">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Trek:</span>
            <span className="font-medium">{trekName}</span>
          </div>
          <div className="flex justify-between">
            <span>Participants:</span>
            <span>{bookingDetails.participants}</span>
          </div>
          <div className="flex justify-between">
            <span>Dates:</span>
            <span>{bookingDetails.dates}</span>
          </div>
          <div className="flex justify-between">
            <span>Package:</span>
            <span>{bookingDetails.package}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-semibold text-base">
            <span>Total Amount:</span>
            <span>₹{amount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Payment Steps */}
      <AnimatePresence mode="wait">
        {currentStep === "details" && renderPaymentDetails()}
        {currentStep === "processing" && renderProcessing()}
        {currentStep === "success" && renderSuccess()}
        {currentStep === "failure" && renderFailure()}
      </AnimatePresence>

      {/* Security Badge */}
      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Shield className="w-4 h-4" />
        <span>Your payment is secured with 256-bit SSL encryption</span>
      </div>
    </div>
  );
};