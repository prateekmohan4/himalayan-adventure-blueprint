import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Shield, Heart } from "lucide-react";

// Import images
import teamPhoto from "@/assets/team-photo.jpg";
import trekkersImage from "@/assets/trekkers-camp.jpg";

const About = () => {
  const teamMembers = [
    {
      name: "Rajesh Kumar",
      role: "Founder & Lead Guide",
      bio: "With over 15 years of mountaineering experience, Rajesh has led expeditions across the Himalayas and is certified by the Indian Mountaineering Foundation.",
      image: teamPhoto
    },
    {
      name: "Priya Sharma",
      role: "Operations Manager",
      bio: "Priya ensures seamless trek operations and guest experiences. Her attention to detail and passion for sustainable tourism drives our commitment to excellence.",
      image: teamPhoto
    },
    {
      name: "Tenzin Norbu",
      role: "Cultural Guide",
      bio: "A local from Spiti Valley, Tenzin brings authentic insights into Himalayan culture, Buddhism, and traditional mountain life to every journey.",
      image: teamPhoto
    },
    {
      name: "Dr. Amit Patel",
      role: "Medical Advisor",
      bio: "Our on-call medical expert specializes in high-altitude medicine and ensures the health and safety protocols for all our expeditions.",
      image: teamPhoto
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description: "Every trek is meticulously planned with comprehensive safety protocols, experienced guides, and emergency response systems."
    },
    {
      icon: Heart,
      title: "Sustainable Tourism",
      description: "We practice Leave No Trace principles and actively support local communities through responsible tourism initiatives."
    },
    {
      icon: Users,
      title: "Authentic Experiences",
      description: "Our local guides provide genuine cultural insights, connecting you with the true spirit of Himalayan communities."
    },
    {
      icon: Award,
      title: "Excellence in Service",
      description: "From planning to execution, we maintain the highest standards to ensure unforgettable mountain adventures."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={teamPhoto}
            alt="Himalayan Adventures Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/70 via-secondary/50 to-primary/30"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            We are <span className="text-primary-muted">Himalayan by Heart</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-body font-light max-w-3xl mx-auto leading-relaxed">
            Dedicated to creating authentic mountain experiences that connect travelers with the soul of the Himalayas
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-8">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground font-body leading-relaxed mb-6">
                Himalayan Adventures was born from a simple yet profound love for the mountains. Founded in 2010 by mountaineer Rajesh Kumar, our journey began with a vision to share the transformative power of the Himalayas with fellow adventurers while preserving these pristine landscapes for future generations.
              </p>
              <p className="text-lg text-muted-foreground font-body leading-relaxed mb-6">
                What started as weekend treks with friends has evolved into a leading adventure tourism company, recognized for our commitment to safety, sustainability, and authentic cultural experiences. We've guided over 5,000 trekkers through the majestic landscapes of Himachal Pradesh and Kashmir, each journey carefully crafted to create lasting memories while respecting local traditions and environments.
              </p>
              <p className="text-lg text-muted-foreground font-body leading-relaxed">
                Today, Himalayan Adventures stands as a testament to our belief that travel should be more than sightseeing—it should be a journey of discovery, connection, and transformation. Every trek we organize contributes to local communities, supports conservation efforts, and creates ambassadors for responsible mountain tourism.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-20 lg:py-32 bg-gradient-section">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground font-body max-w-2xl mx-auto">
              Our passionate team of mountain experts, local guides, and adventure enthusiasts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-1">
                    {member.name}
                  </h3>
                  <Badge variant="secondary" className="mb-4">
                    {member.role}
                  </Badge>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Philosophy Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Column */}
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-elevation-2">
                <img
                  src={trekkersImage}
                  alt="Responsible trekking practices"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent"></div>
              </div>
            </div>

            {/* Content Column */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
                Responsible & Sustainable Travel
              </h2>
              <p className="text-lg text-muted-foreground font-body mb-8 leading-relaxed">
                Our philosophy extends beyond adventure tourism to encompass environmental stewardship and community empowerment. We believe that responsible travel creates positive impacts that ripple through generations, preserving the natural beauty and cultural heritage of the Himalayas.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground font-body text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-display font-bold text-primary-foreground mb-2">
                5000+
              </div>
              <p className="text-primary-foreground/80 font-body">Happy Trekkers</p>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-display font-bold text-primary-foreground mb-2">
                50+
              </div>
              <p className="text-primary-foreground/80 font-body">Trek Routes</p>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-display font-bold text-primary-foreground mb-2">
                14
              </div>
              <p className="text-primary-foreground/80 font-body">Years Experience</p>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-display font-bold text-primary-foreground mb-2">
                100%
              </div>
              <p className="text-primary-foreground/80 font-body">Safety Record</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;