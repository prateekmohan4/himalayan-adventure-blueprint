import { useState } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  MessageCircle
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    alert("Thank you for your message! We'll get back to you soon.");
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Header Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary/80"></div>
        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight">
            Get <span className="text-primary-muted">In Touch</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-body font-light max-w-3xl mx-auto leading-relaxed">
            We'd love to hear from you. Reach out for any questions about our treks or to plan your next adventure in Himachal Pradesh.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <MessageCircle className="w-6 h-6 text-primary mr-3" />
                    <h2 className="text-2xl font-display font-bold text-foreground">
                      Send us a Message
                    </h2>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label 
                          htmlFor="name" 
                          className="block text-sm font-body font-medium text-foreground mb-2"
                        >
                          Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label 
                          htmlFor="email" 
                          className="block text-sm font-body font-medium text-foreground mb-2"
                        >
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label 
                        htmlFor="subject" 
                        className="block text-sm font-body font-medium text-foreground mb-2"
                      >
                        Subject *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What's this about?"
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label 
                        htmlFor="message" 
                        className="block text-sm font-body font-medium text-foreground mb-2"
                      >
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your trek preferences, dates, group size, or any questions you have..."
                        rows={6}
                        className="w-full"
                      />
                    </div>
                    
                    <Button 
                      type="submit"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-body font-semibold px-8 py-3 w-full md:w-auto"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {/* Contact Details */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-display font-semibold text-foreground mb-6">
                      Contact Information
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-body font-semibold text-foreground">Address</h4>
                          <p className="text-muted-foreground font-body text-sm mt-1">
                            Himalayan Adventures<br />
                            Manali-Leh Highway<br />
                            Manali, Himachal Pradesh 175131<br />
                            India
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-body font-semibold text-foreground">Phone</h4>
                          <p className="text-muted-foreground font-body text-sm mt-1">
                            +91 98765 43210<br />
                            +91 98765 43211
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-body font-semibold text-foreground">Email</h4>
                          <p className="text-muted-foreground font-body text-sm mt-1">
                            hello@himalayanadventures.com<br />
                            bookings@himalayanadventures.com
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Office Hours */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-display font-semibold text-foreground mb-4 flex items-center">
                      <Clock className="w-5 h-5 text-primary mr-2" />
                      Office Hours
                    </h3>
                    
                    <div className="space-y-2 text-sm font-body">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monday - Friday</span>
                        <span className="text-foreground font-medium">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Saturday</span>
                        <span className="text-foreground font-medium">9:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Sunday</span>
                        <span className="text-foreground font-medium">Closed</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-primary-muted rounded-lg">
                      <p className="text-primary font-body text-xs">
                        💡 During trek season (March-November), we're available 24/7 for emergency support.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Emergency Contact */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                      Emergency Contact
                    </h3>
                    <p className="text-muted-foreground font-body text-sm mb-3">
                      For urgent assistance during treks or emergencies:
                    </p>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <p className="text-red-800 font-body font-semibold">
                        📞 Emergency Hotline: +91 98765 00000
                      </p>
                      <p className="text-red-600 font-body text-xs mt-1">
                        Available 24/7 during active treks
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
              Visit Our Office
            </h2>
            <p className="text-muted-foreground font-body">
              Located in the heart of Manali, gateway to the Himalayas
            </p>
          </div>
          
          {/* Placeholder for Google Map */}
          <div className="w-full h-96 bg-card rounded-2xl border border-border flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                Interactive Map
              </h3>
              <p className="text-muted-foreground font-body">
                Google Maps integration would be embedded here<br />
                showing our office location in Manali
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;