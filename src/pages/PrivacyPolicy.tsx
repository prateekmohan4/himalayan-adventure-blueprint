import React from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Users, Bell, Trash2 } from "lucide-react";
import heroHimalayas from "@/assets/hero-himalayas.jpg";

export default function PrivacyPolicy() {
  const privacyData = [
    {
      title: "Information We Collect",
      icon: <Users className="h-6 w-6" />,
      content: [
        "Personal Information: Name, email address, phone number, postal address, date of birth, and emergency contact details when you make a booking or create an account.",
        "Payment Information: Credit/debit card details, bank account information, and other payment method data (processed securely through encrypted payment gateways).",
        "Travel Preferences: Dietary requirements, medical conditions, accessibility needs, and other preferences relevant to your travel experience.",
        "Usage Data: Information about how you interact with our website, including pages visited, time spent, and navigation patterns.",
        "Device Information: IP address, browser type, operating system, and device identifiers for security and optimization purposes.",
        "Communication Records: Records of our communications with you, including customer service interactions and feedback."
      ]
    },
    {
      title: "How We Use Your Information",
      icon: <Eye className="h-6 w-6" />,
      content: [
        "Service Delivery: To process bookings, arrange accommodations, coordinate with local partners, and provide customer support.",
        "Communication: To send booking confirmations, travel updates, emergency notifications, and respond to your inquiries.",
        "Personalization: To customize your experience based on your preferences and past interactions with our services.",
        "Safety and Security: To verify identities, prevent fraud, ensure traveler safety, and comply with legal requirements.",
        "Marketing: To send newsletters, promotional offers, and travel recommendations (with your consent).",
        "Improvement: To analyze website usage, improve our services, and develop new offerings based on customer feedback."
      ]
    },
    {
      title: "Information Sharing and Disclosure",
      icon: <Lock className="h-6 w-6" />,
      content: [
        "Service Partners: We share necessary information with hotels, transport providers, guides, and other service partners to deliver your booked services.",
        "Payment Processors: Payment information is shared with secure payment gateways and financial institutions to process transactions.",
        "Legal Compliance: We may disclose information when required by law, court orders, or government authorities.",
        "Emergency Situations: In case of medical emergencies or safety concerns, we may share relevant information with emergency services or healthcare providers.",
        "Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity.",
        "Consent-Based Sharing: We may share information with third parties when you explicitly consent to such sharing."
      ]
    },
    {
      title: "Data Security Measures",
      icon: <Shield className="h-6 w-6" />,
      content: [
        "Encryption: All sensitive data is encrypted during transmission and storage using industry-standard protocols.",
        "Access Controls: Strict access controls ensure that only authorized personnel can access your personal information.",
        "Regular Audits: We conduct regular security audits and vulnerability assessments to maintain data protection standards.",
        "Staff Training: All employees receive training on data protection and privacy best practices.",
        "Secure Infrastructure: Our systems are hosted on secure servers with robust physical and digital security measures.",
        "Incident Response: We have procedures in place to quickly respond to and mitigate any security incidents."
      ]
    },
    {
      title: "Your Privacy Rights",
      icon: <Eye className="h-6 w-6" />,
      content: [
        "Access: You have the right to request access to the personal information we hold about you.",
        "Correction: You can request correction of any inaccurate or incomplete personal information.",
        "Deletion: You may request deletion of your personal information, subject to legal and business requirements.",
        "Portability: You can request a copy of your personal information in a commonly used format.",
        "Objection: You have the right to object to certain types of data processing, particularly for marketing purposes.",
        "Consent Withdrawal: You can withdraw your consent for data processing activities at any time."
      ]
    },
    {
      title: "Cookies and Tracking Technologies",
      icon: <Bell className="h-6 w-6" />,
      content: [
        "Essential Cookies: Required for basic website functionality, including security features and user authentication.",
        "Performance Cookies: Help us understand how visitors interact with our website to improve user experience.",
        "Functionality Cookies: Remember your preferences and settings to provide a personalized experience.",
        "Marketing Cookies: Used to deliver relevant advertisements and track campaign effectiveness.",
        "Cookie Control: You can manage cookie preferences through your browser settings or our cookie consent tool.",
        "Third-Party Cookies: Some cookies are set by third-party services we use, such as analytics providers."
      ]
    },
    {
      title: "Data Retention",
      icon: <Trash2 className="h-6 w-6" />,
      content: [
        "Booking Records: Maintained for 7 years after trip completion for tax, legal, and customer service purposes.",
        "Marketing Data: Retained until you unsubscribe or withdraw consent for marketing communications.",
        "Website Analytics: Aggregated and anonymized data may be retained indefinitely for business intelligence.",
        "Communication Records: Customer service communications retained for 3 years for quality assurance.",
        "Payment Information: Deleted immediately after transaction completion, except for records required by law.",
        "Account Data: Retained while your account is active and for a reasonable period afterward for reactivation."
      ]
    },
    {
      title: "International Data Transfers",
      icon: <Users className="h-6 w-6" />,
      content: [
        "Service Delivery: Your information may be transferred to countries where our service partners operate.",
        "Data Protection: We ensure adequate protection measures are in place for international transfers.",
        "Legal Compliance: All transfers comply with applicable data protection laws and regulations.",
        "Partner Agreements: Our international partners are contractually bound to protect your personal information.",
        "Security Standards: The same security standards apply regardless of where your data is processed.",
        "Notification: We will inform you of any significant changes to our international data transfer practices."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroHimalayas})`,
            filter: "brightness(0.7)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto px-4"
          >
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-white/90">
              How we protect and use your personal information
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Shield className="h-8 w-8 text-primary mt-1" />
                  <div>
                    <p className="text-foreground font-semibold mb-2">
                      <strong>Last Updated:</strong> February 15, 2024
                    </p>
                    <p className="text-muted-foreground">
                      At Himalayan Adventures, we are committed to protecting your privacy and ensuring the 
                      security of your personal information. This Privacy Policy explains how we collect, use, 
                      and safeguard your information when you use our services.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="space-y-8">
            {privacyData.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-xl font-display text-foreground flex items-center">
                      <div className="text-primary mr-3">
                        {section.icon}
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {section.content.map((paragraph, pIndex) => (
                        <div key={pIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <p className="text-muted-foreground leading-relaxed">
                            {paragraph}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-border">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                    Exercise Your Privacy Rights
                  </h3>
                  <p className="text-muted-foreground">
                    Contact our Data Protection Officer to exercise any of your privacy rights
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card p-4 rounded-lg border border-border">
                    <h4 className="font-semibold text-foreground mb-2">Data Protection Officer</h4>
                    <p className="text-sm text-muted-foreground mb-1">Email: privacy@himalayan-adventures.com</p>
                    <p className="text-sm text-muted-foreground">Phone: +91 98765 43210</p>
                  </div>
                  
                  <div className="bg-card p-4 rounded-lg border border-border">
                    <h4 className="font-semibold text-foreground mb-2">Response Time</h4>
                    <p className="text-sm text-muted-foreground mb-1">Privacy requests: Within 30 days</p>
                    <p className="text-sm text-muted-foreground">Urgent matters: Within 48 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Updates Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="text-lg font-display font-semibold text-foreground mb-3">
                  Policy Updates
                </h3>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time to reflect changes in our practices 
                  or applicable laws. We will notify you of any material changes through email or a prominent 
                  notice on our website. Your continued use of our services after such updates constitutes 
                  acceptance of the revised policy.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}