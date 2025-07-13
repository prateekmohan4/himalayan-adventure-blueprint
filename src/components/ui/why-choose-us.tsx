import { Shield, Users, Leaf } from "lucide-react";
import trekkersImage from "@/assets/trekkers-camp.jpg";

export const WhyChooseUs = () => {
  const features = [
    {
      icon: Users,
      title: "Certified Local Guides",
      description: "Our experienced guides are certified mountaineers with deep knowledge of local culture and terrain."
    },
    {
      icon: Shield,
      title: "Commitment to Safety",
      description: "Safety is our top priority. We maintain the highest standards of equipment and emergency protocols."
    },
    {
      icon: Leaf,
      title: "Sustainable & Responsible Travel",
      description: "We practice Leave No Trace principles and support local communities through our eco-tourism initiatives."
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Column */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-elevation-2">
              <img
                src={trekkersImage}
                alt="Happy trekkers at campsite"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent"></div>
            </div>
          </div>

          {/* Content Column */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              Local Expertise, Global Standards
            </h2>
            <p className="text-lg text-muted-foreground font-body mb-8 leading-relaxed">
              With over a decade of experience in Himalayan adventures, we combine authentic local knowledge with international safety standards to create unforgettable journeys that respect both our guests and the pristine mountain environment.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground font-body leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};