import { useState } from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HelpCircle, Mountain, Calendar, Shield, Backpack, Users } from "lucide-react";

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  icon: any;
}

const faqs: FAQ[] = [
  {
    id: "1",
    category: "Booking",
    question: "How do I book a trek with Himalayan Adventures?",
    answer: "Booking is simple! Browse our treks, select your preferred dates, fill in participant details, choose your package, and complete the payment. You'll receive confirmation within 24 hours with detailed itinerary and preparation guidelines.",
    icon: Calendar
  },
  {
    id: "2", 
    category: "Preparation",
    question: "What should I pack for a Himachal Pradesh trek?",
    answer: "Essential items include layered clothing, waterproof jacket, trekking boots, sleeping bag, headlamp, sunglasses, sunscreen, personal medication, and a 40-50L backpack. We provide a detailed packing checklist after booking. Gear rental is also available.",
    icon: Backpack
  },
  {
    id: "3",
    category: "Safety",
    question: "What safety measures do you have in place?",
    answer: "Safety is our top priority. All our guides are certified and carry first aid kits, oxygen cylinders, and satellite phones. We maintain strict group ratios, conduct regular health checks, and have evacuation protocols. All treks are insured.",
    icon: Shield
  },
  {
    id: "4",
    category: "Difficulty",
    question: "How do you classify trek difficulty levels?",
    answer: "Easy: 4-6 hours daily walking, max altitude 3,500m. Moderate: 6-8 hours daily, max altitude 4,500m, some steep sections. Strenuous: 8+ hours daily, altitude above 4,500m, technical terrain. Previous trekking experience recommended for moderate/strenuous treks.",
    icon: Mountain
  },
  {
    id: "5",
    category: "Group",
    question: "What is the typical group size?",
    answer: "We maintain small groups of 8-12 trekkers to ensure personalized attention and minimal environmental impact. Each group has 1-2 certified guides depending on size. Private group bookings are available for families or corporate teams.",
    icon: Users
  },
  {
    id: "6",
    category: "Weather",
    question: "What's the best time to trek in Himachal Pradesh?",
    answer: "May-June and September-October offer the best weather with clear skies and moderate temperatures. Monsoon (July-August) is avoided due to landslide risks. Winter treks (December-March) are possible but require special preparation for snow conditions.",
    icon: Mountain
  },
  {
    id: "7",
    category: "Permits",
    question: "Do I need special permits for trekking?",
    answer: "Most treks in Himachal require Inner Line Permits or Forest Department permissions. We handle all permit arrangements as part of our service. You just need to provide photocopies of ID proof and passport-size photographs 15 days before the trek.",
    icon: Shield
  },
  {
    id: "8",
    category: "Altitude",
    question: "How do you handle altitude acclimatization?",
    answer: "We follow gradual ascent profiles with acclimatization days built into itineraries. Our guides monitor for symptoms of altitude sickness and carry Diamox tablets. For treks above 4,000m, we include extra rest days and descend immediately if needed.",
    icon: Mountain
  },
  {
    id: "9",
    category: "Food",
    question: "What kind of food is provided during treks?",
    answer: "We serve nutritious, freshly prepared Indian meals including dal, rice, vegetables, chapati, and tea/coffee. Special dietary requirements (vegetarian, vegan, gluten-free) are accommodated with advance notice. Packed lunches are provided during trekking days.",
    icon: Users
  },
  {
    id: "10",
    category: "Cancellation",
    question: "What is your cancellation and refund policy?",
    answer: "Cancellations 30+ days before: 10% deduction. 15-29 days: 25% deduction. 7-14 days: 50% deduction. Less than 7 days: 75% deduction. Weather-related cancellations by us result in full refund or rescheduling options.",
    icon: Calendar
  }
];

const categories = ["All", "Booking", "Preparation", "Safety", "Difficulty", "Group", "Weather", "Permits", "Altitude", "Food", "Cancellation"];

export const FAQAccordion = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFAQs = selectedCategory === "All" 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const categoryColors: Record<string, string> = {
    Booking: "bg-blue-100 text-blue-800",
    Preparation: "bg-green-100 text-green-800", 
    Safety: "bg-red-100 text-red-800",
    Difficulty: "bg-orange-100 text-orange-800",
    Group: "bg-purple-100 text-purple-800",
    Weather: "bg-cyan-100 text-cyan-800",
    Permits: "bg-yellow-100 text-yellow-800",
    Altitude: "bg-indigo-100 text-indigo-800",
    Food: "bg-pink-100 text-pink-800",
    Cancellation: "bg-gray-100 text-gray-800"
  };

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-4"
          >
            <HelpCircle className="w-12 h-12 text-primary" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground font-body max-w-2xl mx-auto"
          >
            Everything you need to know about trekking in Himachal Pradesh
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Category Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 justify-center mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <AccordionItem 
                    value={faq.id} 
                    className="bg-card/50 rounded-lg border border-border px-6 py-2 hover:shadow-md transition-all"
                  >
                    <AccordionTrigger className="hover:no-underline group py-6">
                      <div className="flex items-center gap-4 text-left">
                        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <faq.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${categoryColors[faq.category]}`}
                            >
                              {faq.category}
                            </Badge>
                          </div>
                          <h3 className="font-display font-semibold text-lg group-hover:text-primary transition-colors">
                            {faq.question}
                          </h3>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 pt-2">
                      <div className="ml-14 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>

          {filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground text-lg">
                No FAQs found for the selected category.
              </p>
            </motion.div>
          )}

          {/* Still have questions? */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center bg-gradient-section rounded-2xl p-8"
          >
            <h3 className="font-display font-semibold text-xl mb-3">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our team of trekking experts is here to help you plan your perfect Himalayan adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Contact Our Experts
              </Button>
              <Button size="lg" variant="outline">
                Schedule a Call
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};