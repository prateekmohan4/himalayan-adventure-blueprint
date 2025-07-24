import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Mountain, Star, Send, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewsletterSignupProps {
  variant?: "inline" | "modal" | "footer";
  className?: string;
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ 
  variant = "inline", 
  className = "" 
}) => {
  const [email, setEmail] = useState("");
  const [preferences, setPreferences] = useState({
    trekUpdates: true,
    specialOffers: true,
    travelTips: false,
    seasonalGuides: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast({
        title: "Welcome to our community!",
        description: "You've successfully subscribed to our newsletter.",
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }, 1500);
  };

  const benefits = [
    {
      icon: <Mountain className="h-5 w-5" />,
      text: "Exclusive trek announcements"
    },
    {
      icon: <Star className="h-5 w-5" />,
      text: "Early bird discounts"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      text: "Monthly travel guides"
    }
  ];

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`text-center p-6 ${className}`}
      >
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Check className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h3 className="text-lg font-display font-semibold text-foreground mb-2">
          Thank you for subscribing!
        </h3>
        <p className="text-muted-foreground">
          Check your email for a welcome message and your first travel guide.
        </p>
      </motion.div>
    );
  }

  const renderCompactForm = () => (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 bg-input border-border"
        required
      />
      <Button 
        type="submit" 
        disabled={isLoading}
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Send className="h-4 w-4" />
          </motion.div>
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </form>
  );

  const renderFullForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-input border-border"
          required
        />
        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
        >
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>

      {variant === "modal" && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">What would you like to receive?</p>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="trekUpdates"
                checked={preferences.trekUpdates}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, trekUpdates: checked as boolean }))
                }
              />
              <label htmlFor="trekUpdates" className="text-sm text-muted-foreground">
                Trek Updates
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="specialOffers"
                checked={preferences.specialOffers}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, specialOffers: checked as boolean }))
                }
              />
              <label htmlFor="specialOffers" className="text-sm text-muted-foreground">
                Special Offers
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="travelTips"
                checked={preferences.travelTips}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, travelTips: checked as boolean }))
                }
              />
              <label htmlFor="travelTips" className="text-sm text-muted-foreground">
                Travel Tips
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="seasonalGuides"
                checked={preferences.seasonalGuides}
                onCheckedChange={(checked) => 
                  setPreferences(prev => ({ ...prev, seasonalGuides: checked as boolean }))
                }
              />
              <label htmlFor="seasonalGuides" className="text-sm text-muted-foreground">
                Seasonal Guides
              </label>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
      </p>
    </form>
  );

  if (variant === "footer") {
    return (
      <div className={className}>
        <h3 className="text-lg font-display font-semibold text-foreground mb-2">
          Stay Connected
        </h3>
        <p className="text-muted-foreground mb-4 text-sm">
          Get the latest trek updates and travel inspiration
        </p>
        {renderCompactForm()}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <Card className={`bg-card border-border ${className}`}>
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-display font-bold text-foreground mb-2">
              Join Our Adventure Community
            </h3>
            <p className="text-muted-foreground">
              Get exclusive access to new treks, special offers, and travel tips
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="text-primary">{benefit.icon}</div>
                <span className="text-sm text-muted-foreground">{benefit.text}</span>
              </div>
            ))}
          </div>

          {renderFullForm()}
        </CardContent>
      </Card>
    );
  }

  // Modal variant
  return (
    <div className={className}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Stay Updated with Himalayan Adventures
        </h2>
        <p className="text-muted-foreground">
          Be the first to know about new destinations, exclusive offers, and insider travel tips
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                {benefit.icon}
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{benefit.text}</span>
          </div>
        ))}
      </div>

      {renderFullForm()}
    </div>
  );
};