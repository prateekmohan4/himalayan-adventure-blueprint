import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Clock, 
  Users, 
  Mountain, 
  Camera, 
  Star,
  Phone,
  Calendar,
  Check,
  X
} from "lucide-react";

// Import images
import chandratallLake from "@/assets/chandratal-lake.jpg";
import spitiValley from "@/assets/spiti-valley.jpg";
import trekkersImage from "@/assets/trekkers-camp.jpg";

const TrekDetail = () => {
  const { slug } = useParams();
  const [activeSection, setActiveSection] = useState("overview");
  const [selectedDate, setSelectedDate] = useState("");

  // Sample trek data (in real app, this would come from an API)
  const trekData = {
    title: "Chandratal Lake Trek",
    subtitle: "7 Days | Moderate | Max Altitude: 4,300m",
    heroImage: chandratallLake,
    price: "₹25,000",
    highlights: [
      "Crystal clear high-altitude lake",
      "Stunning Spiti Valley landscapes", 
      "Ancient Buddhist monasteries",
      "Traditional Himachali villages"
    ],
    overview: "Embark on an unforgettable journey to Chandratal Lake, often called the 'Moon Lake' for its crescent shape and ethereal beauty. This moderate trek takes you through the diverse landscapes of Himachal Pradesh, from lush green valleys to the stark, moonscape terrain of Spiti Valley. Experience the raw beauty of the high Himalayas while camping under star-studded skies at one of India's most pristine high-altitude lakes.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Manali",
        description: "Arrive in Manali and check into hotel. Evening briefing about the trek. Gear check and preparation.",
        meals: "Dinner",
        accommodation: "Hotel"
      },
      {
        day: 2,
        title: "Manali to Chatru",
        description: "Drive to Chatru via Rohtang Pass. First glimpse of Spiti Valley's landscape. Set up camp.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping"
      },
      {
        day: 3,
        title: "Chatru to Chandratal Lake",
        description: "Trek to the magnificent Chandratal Lake. Set up camp near the lake and enjoy sunset views.",
        meals: "Breakfast, Lunch, Dinner", 
        accommodation: "Camping"
      },
      {
        day: 4,
        title: "Explore Chandratal",
        description: "Full day at the lake. Photography, short hikes around the lake, and relaxation.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping"
      },
      {
        day: 5,
        title: "Chandratal to Kunzum Pass",
        description: "Trek to Kunzum Pass. Visit ancient monasteries and interact with local communities.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Camping"
      },
      {
        day: 6,
        title: "Kunzum Pass to Manali",
        description: "Return journey to Manali via spectacular mountain roads. Evening celebration dinner.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Hotel"
      },
      {
        day: 7,
        title: "Departure",
        description: "Check out from hotel and departure. Trip concludes.",
        meals: "Breakfast",
        accommodation: "None"
      }
    ],
    inclusions: [
      "Accommodation (Hotels & Camping)",
      "All meals during trek",
      "Professional trek leader and guides",
      "All permits and entry fees",
      "Transportation as per itinerary",
      "First aid kit and oxygen cylinder",
      "Camping equipment (tents, sleeping bags)",
      "Porter services for common equipment"
    ],
    exclusions: [
      "Personal trekking gear",
      "Travel insurance",
      "Tips for guides and porters",
      "Personal expenses",
      "Any meals not mentioned",
      "Emergency evacuation costs",
      "Anything not specifically mentioned in inclusions"
    ],
    gallery: [
      chandratallLake,
      spitiValley,
      trekkersImage,
      chandratallLake,
      spitiValley,
      trekkersImage
    ],
    reviews: [
      {
        name: "Priya Sharma",
        rating: 5,
        comment: "Absolutely breathtaking experience! The lake is even more beautiful than the photos. Our guide was knowledgeable and the camping arrangements were excellent.",
        date: "October 2024"
      },
      {
        name: "Rahul Gupta", 
        rating: 5,
        comment: "This trek changed my perspective on travel. The raw beauty of Spiti and the serenity of Chandratal is something everyone should experience. Highly recommend!",
        date: "September 2024"
      },
      {
        name: "Sarah Johnson",
        rating: 4,
        comment: "Great organization and stunning scenery. The high altitude was challenging but manageable with proper acclimatization. Would definitely book again.",
        date: "August 2024"
      }
    ]
  };

  // Sticky navigation
  const navItems = [
    { id: "overview", label: "Overview" },
    { id: "itinerary", label: "Itinerary" },
    { id: "inclusions", label: "Inclusions" },
    { id: "gallery", label: "Gallery" },
    { id: "reviews", label: "Reviews" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={trekData.heroImage}
            alt={trekData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/40 to-transparent"></div>
        </div>
        <div className="relative z-10 w-full p-8 lg:p-16">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
              {trekData.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-body">
              {trekData.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Navigation */}
      <nav className="sticky top-16 bg-background/95 backdrop-blur-md border-b border-border z-40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`whitespace-nowrap font-body font-medium py-2 px-1 border-b-2 transition-colors ${
                  activeSection === item.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            {/* Overview Section */}
            <section id="overview">
              <h2 className="text-3xl font-display font-bold text-foreground mb-6">Overview</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-muted-foreground font-body leading-relaxed mb-6">
                  {trekData.overview}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {trekData.highlights.map((highlight, index) => (
                    <div key={index} className="bg-primary-muted rounded-lg p-4 text-center">
                      <p className="text-sm font-body font-medium text-primary">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Itinerary Section */}
            <section id="itinerary">
              <h2 className="text-3xl font-display font-bold text-foreground mb-6">Day-by-Day Itinerary</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {trekData.itinerary.map((day) => (
                  <AccordionItem key={day.day} value={`day-${day.day}`} className="border border-border rounded-lg">
                    <AccordionTrigger className="px-6 py-4 hover:no-underline">
                      <div className="flex items-center space-x-4 text-left">
                        <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                          {day.day}
                        </div>
                        <div>
                          <h3 className="font-display font-semibold text-lg">{day.title}</h3>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <p className="text-muted-foreground font-body mb-4">{day.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <span className="font-medium mr-2">Meals:</span> {day.meals}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <span className="font-medium mr-2">Stay:</span> {day.accommodation}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            {/* Inclusions Section */}
            <section id="inclusions">
              <h2 className="text-3xl font-display font-bold text-foreground mb-6">Inclusions & Exclusions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      Included
                    </h3>
                    <ul className="space-y-2">
                      {trekData.inclusions.map((item, index) => (
                        <li key={index} className="flex items-start text-muted-foreground font-body">
                          <Check className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center">
                      <X className="w-5 h-5 text-red-500 mr-2" />
                      Not Included
                    </h3>
                    <ul className="space-y-2">
                      {trekData.exclusions.map((item, index) => (
                        <li key={index} className="flex items-start text-muted-foreground font-body">
                          <X className="w-4 h-4 text-red-500 mr-2 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Gallery Section */}
            <section id="gallery">
              <h2 className="text-3xl font-display font-bold text-foreground mb-6">Photo Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {trekData.gallery.map((image, index) => (
                  <div key={index} className="aspect-square overflow-hidden rounded-lg">
                    <img
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews Section */}
            <section id="reviews">
              <h2 className="text-3xl font-display font-bold text-foreground mb-6">Customer Reviews</h2>
              <div className="space-y-6">
                {trekData.reviews.map((review, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-display font-semibold text-foreground">{review.name}</h3>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground font-body leading-relaxed">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-display font-bold text-primary mb-2">
                      {trekData.price}
                    </div>
                    <p className="text-muted-foreground font-body">per person</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-body font-medium text-foreground mb-2">
                        Select Dates
                      </label>
                      <Select value={selectedDate} onValueChange={setSelectedDate}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose departure date" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024-10-15">Oct 15-21, 2024</SelectItem>
                          <SelectItem value="2024-11-05">Nov 5-11, 2024</SelectItem>
                          <SelectItem value="2024-11-20">Nov 20-26, 2024</SelectItem>
                          <SelectItem value="2024-12-10">Dec 10-16, 2024</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold py-3 text-lg mb-4">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Now
                  </Button>

                  <div className="border-t border-border pt-4">
                    <h3 className="font-display font-semibold text-foreground mb-3">Need Help?</h3>
                    <div className="space-y-2 text-sm text-muted-foreground font-body">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        +91 98765 43210
                      </div>
                      <p>Call us for personalized assistance</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TrekDetail;