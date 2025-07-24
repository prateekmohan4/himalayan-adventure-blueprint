import React from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import heroHimalayas from "@/assets/hero-himalayas.jpg";

export default function TermsOfService() {
  const termsData = [
    {
      title: "1. Acceptance of Terms",
      content: [
        "By accessing and using the Himalayan Adventures website and services, you accept and agree to be bound by the terms and provisions of this agreement.",
        "If you do not agree to abide by these terms, you are not authorized to use or access this service."
      ]
    },
    {
      title: "2. Use License",
      content: [
        "Permission is granted to temporarily download one copy of the materials on Himalayan Adventures' website for personal, non-commercial transitory viewing only.",
        "This is the grant of a license, not a transfer of title, and under this license you may not:",
        "• Modify or copy the materials",
        "• Use the materials for any commercial purpose or for any public display",
        "• Attempt to reverse engineer any software contained on the website",
        "• Remove any copyright or other proprietary notations from the materials"
      ]
    },
    {
      title: "3. Booking and Cancellation Policy",
      content: [
        "All bookings are subject to availability and confirmation by Himalayan Adventures.",
        "A booking is confirmed only upon receipt of the required deposit and acknowledgment from our team.",
        "Cancellation charges will apply as per the following schedule:",
        "• 30+ days before departure: 25% of total cost",
        "• 15-29 days before departure: 50% of total cost",
        "• 7-14 days before departure: 75% of total cost",
        "• Less than 7 days before departure: 100% of total cost",
        "In case of cancellation due to natural disasters, political situations, or other force majeure events, we will provide alternative dates or partial refunds as feasible."
      ]
    },
    {
      title: "4. Payment Terms",
      content: [
        "A deposit of 25% is required to confirm your booking.",
        "The remaining balance must be paid 30 days before the departure date.",
        "We accept payments through bank transfers, credit cards, and digital payment platforms.",
        "All prices are quoted in Indian Rupees (INR) and include applicable taxes unless stated otherwise.",
        "Prices are subject to change without notice until full payment is received."
      ]
    },
    {
      title: "5. Travel Insurance",
      content: [
        "We strongly recommend that all participants obtain comprehensive travel insurance before traveling.",
        "Insurance should cover medical expenses, emergency evacuation, trip cancellation, and personal belongings.",
        "Himalayan Adventures is not responsible for any costs incurred due to lack of proper insurance coverage."
      ]
    },
    {
      title: "6. Health and Safety",
      content: [
        "Participants must disclose any medical conditions or physical limitations before booking.",
        "It is the participant's responsibility to ensure they are physically fit for the chosen activity.",
        "Himalayan Adventures reserves the right to refuse participation if safety concerns arise.",
        "Participants must follow all safety instructions provided by guides and staff.",
        "Adventure activities involve inherent risks, and participants assume these risks voluntarily."
      ]
    },
    {
      title: "7. Liability Limitations",
      content: [
        "Himalayan Adventures acts only as an agent for the various service providers and is not liable for their acts or omissions.",
        "We are not responsible for delays, changes, or cancellations due to weather, natural disasters, or other circumstances beyond our control.",
        "Our liability is limited to the cost of the services booked through us.",
        "Participants agree to indemnify Himalayan Adventures against any claims arising from their participation in activities."
      ]
    },
    {
      title: "8. Privacy Policy",
      content: [
        "We collect personal information necessary for booking and providing our services.",
        "Personal information is not shared with third parties except as required for service delivery.",
        "We may use your contact information to send updates about our services and offers.",
        "You may opt out of marketing communications at any time.",
        "We implement appropriate security measures to protect your personal information."
      ]
    },
    {
      title: "9. Intellectual Property",
      content: [
        "All content on this website, including text, graphics, images, and software, is owned by Himalayan Adventures or its licensors.",
        "You may not reproduce, distribute, or create derivative works from our content without written permission.",
        "User-generated content shared with us may be used for promotional purposes with appropriate credit."
      ]
    },
    {
      title: "10. Governing Law",
      content: [
        "These terms are governed by the laws of India.",
        "Any disputes will be subject to the jurisdiction of courts in Himachal Pradesh, India.",
        "If any provision of these terms is deemed invalid, the remaining provisions will continue in full force."
      ]
    },
    {
      title: "11. Changes to Terms",
      content: [
        "Himalayan Adventures reserves the right to modify these terms at any time.",
        "Changes will be posted on this page with an updated revision date.",
        "Continued use of our services after changes constitutes acceptance of the new terms."
      ]
    },
    {
      title: "12. Contact Information",
      content: [
        "If you have any questions about these Terms of Service, please contact us at:",
        "Email: legal@himalayan-adventures.com",
        "Phone: +91 98765 43210",
        "Address: Main Bazaar, Manali, Himachal Pradesh 175131, India"
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
              Terms of Service
            </h1>
            <p className="text-xl text-white/90">
              Understanding your rights and responsibilities
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
                <p className="text-foreground">
                  <strong>Last Updated:</strong> February 15, 2024
                </p>
                <p className="text-muted-foreground mt-2">
                  Please read these Terms of Service carefully before using our website or booking any services. 
                  These terms constitute a binding agreement between you and Himalayan Adventures.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <div className="space-y-8">
            {termsData.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-xl font-display text-foreground">
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {section.content.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-muted-foreground leading-relaxed">
                          {paragraph}
                        </p>
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
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                  Questions About Our Terms?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Our legal team is here to help clarify any questions you may have about these terms.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div className="text-sm text-foreground">
                    <strong>Email:</strong> legal@himalayan-adventures.com
                  </div>
                  <div className="text-sm text-foreground">
                    <strong>Phone:</strong> +91 98765 43210
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}