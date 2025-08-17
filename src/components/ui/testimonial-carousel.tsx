import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  review: string;
  trek: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    avatar: "/api/placeholder/120/120",
    rating: 5,
    review: "The Chandratal Lake trek was absolutely breathtaking! The crystal-clear waters reflecting the mountains created a magical atmosphere. Our guide was knowledgeable and the entire team ensured our safety throughout the journey.",
    trek: "Chandratal Lake Trek",
    date: "October 2024"
  },
  {
    id: "2", 
    name: "Rajesh Kumar",
    location: "Delhi, India",
    avatar: "/api/placeholder/120/120",
    rating: 5,
    review: "Spiti Valley exceeded all my expectations! The barren landscapes, ancient monasteries, and warm hospitality of locals made this trip unforgettable. Highly recommend Himalayan Adventures for their professionalism.",
    trek: "Spiti Valley Odyssey",
    date: "September 2024"
  },
  {
    id: "3",
    name: "Ankita Patel",
    location: "Ahmedabad, Gujarat", 
    avatar: "/api/placeholder/120/120",
    rating: 5,
    review: "My first high-altitude trek and it couldn't have been better! The team was incredibly supportive, especially during acclimatization. The views of Himachali peaks were absolutely stunning.",
    trek: "Himachali Heritage Trail",
    date: "August 2024"
  },
  {
    id: "4",
    name: "Arjun Singh",
    location: "Bangalore, Karnataka",
    avatar: "/api/placeholder/120/120", 
    rating: 5,
    review: "Outstanding organization and attention to detail. The camping arrangements were comfortable, food was delicious, and the guides shared fascinating stories about local culture and history.",
    trek: "Kinnaur Kailash Circuit",
    date: "July 2024"
  },
  {
    id: "5",
    name: "Meera Joshi",
    location: "Pune, Maharashtra",
    avatar: "/api/placeholder/120/120",
    rating: 5,
    review: "A life-changing experience! The serenity of the mountains, the challenge of the trek, and the camaraderie with fellow trekkers created memories I'll cherish forever. Thank you Himalayan Adventures!",
    trek: "Hampta Pass Trek", 
    date: "June 2024"
  }
];

export const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 lg:py-32 bg-gradient-section">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            What Our Adventurers Say
          </h2>
          <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
            Real experiences from fellow mountain enthusiasts who have journeyed with us
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div 
            className="relative h-auto min-h-96 lg:h-96 overflow-hidden rounded-3xl"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 bg-card/80 backdrop-blur-sm border border-border rounded-3xl p-4 sm:p-6 lg:p-12"
              >
                <div className="h-full flex flex-col justify-between">
                  {/* Quote Icon */}
                  <div className="flex justify-center mb-6">
                    <Quote className="w-12 h-12 text-primary/30" />
                  </div>

                  {/* Review Text */}
                  <div className="flex-1 flex items-center">
                    <blockquote className="text-sm sm:text-base lg:text-xl text-center font-body leading-relaxed text-foreground">
                      "{testimonials[currentIndex].review}"
                    </blockquote>
                  </div>

                  {/* Author Info */}
                  <div className="mt-8 flex flex-col items-center">
                    {/* Avatar and Rating */}
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-16 h-16 border-2 border-primary/20">
                        <AvatarImage 
                          src={testimonials[currentIndex].avatar} 
                          alt={testimonials[currentIndex].name} 
                        />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="text-center">
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <h4 className="font-display font-semibold text-lg text-foreground">
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonials[currentIndex].location}
                        </p>
                      </div>
                    </div>

                    {/* Trek Info */}
                    <div className="text-center text-sm text-muted-foreground">
                      <span className="font-medium">{testimonials[currentIndex].trek}</span>
                      <span className="mx-2">•</span>
                      <span>{testimonials[currentIndex].date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-card/80 backdrop-blur-sm border-primary/20 hover:bg-primary hover:text-primary-foreground"
            onClick={goToPrevious}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="outline" 
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-card/80 backdrop-blur-sm border-primary/20 hover:bg-primary hover:text-primary-foreground"
            onClick={goToNext}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-primary scale-125" 
                    : "bg-muted hover:bg-primary/50"
                }`}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-4 w-full bg-muted rounded-full h-1">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentIndex + 1) / testimonials.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Thumbnail Preview */}
        <div className="mt-12 flex justify-center gap-4 overflow-x-auto pb-4">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 p-3 rounded-lg transition-all ${
                index === currentIndex 
                  ? "bg-primary/10 border-2 border-primary" 
                  : "bg-muted/50 border border-transparent hover:bg-muted"
              }`}
            >
              <div className="flex items-center gap-3 min-w-48">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback className="text-xs">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="font-medium text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.trek}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};