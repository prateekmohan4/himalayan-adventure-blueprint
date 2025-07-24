import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  MapPin, 
  Calendar, 
  Clock, 
  Star, 
  Heart, 
  Settings, 
  Download,
  Eye,
  CreditCard
} from "lucide-react";

interface Booking {
  id: string;
  trekName: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  participants: number;
  totalAmount: number;
  bookingDate: string;
  image: string;
}

interface WishlistItem {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  difficulty: string;
}

const mockBookings: Booking[] = [
  {
    id: "BKG001",
    trekName: "Triund Trek",
    destination: "Dharamshala, HP",
    startDate: "2024-03-15",
    endDate: "2024-03-17",
    status: "confirmed",
    participants: 2,
    totalAmount: 15000,
    bookingDate: "2024-02-10",
    image: "/api/placeholder/300/200"
  },
  {
    id: "BKG002",
    trekName: "Spiti Valley Adventure",
    destination: "Spiti Valley, HP",
    startDate: "2024-04-20",
    endDate: "2024-04-27",
    status: "pending",
    participants: 4,
    totalAmount: 140000,
    bookingDate: "2024-02-15",
    image: "/api/placeholder/300/200"
  }
];

const mockWishlist: WishlistItem[] = [
  {
    id: "1",
    name: "Chandratal Lake Trek",
    location: "Spiti Valley, HP",
    price: 25000,
    rating: 4.9,
    image: "/api/placeholder/300/200",
    difficulty: "Challenging"
  },
  {
    id: "2",
    name: "Hampta Pass Trek",
    location: "Manali, HP",
    price: 18000,
    rating: 4.7,
    image: "/api/placeholder/300/200",
    difficulty: "Moderate"
  }
];

export const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("bookings");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800 border-green-200";
      case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed": return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/api/placeholder/80/80" alt="User" />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                RK
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Rahul Kumar
              </h1>
              <p className="text-muted-foreground">
                Member since February 2024
              </p>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm text-foreground">Adventure Enthusiast</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-primary mr-1" />
                  <span className="text-sm text-foreground">3 treks completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="bookings" className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              My Bookings
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center">
              <Star className="h-4 w-4 mr-2" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-display font-bold">My Bookings</h2>
              <Button variant="outline" className="flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            </div>

            <div className="grid gap-6">
              {mockBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-card border-border hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex items-start space-x-4">
                          <img
                            src={booking.image}
                            alt={booking.trekName}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-display font-semibold">
                                {booking.trekName}
                              </h3>
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </Badge>
                            </div>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2" />
                                {booking.destination}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                              </div>
                              <div className="flex items-center">
                                <User className="h-4 w-4 mr-2" />
                                {booking.participants} participant{booking.participants > 1 ? 's' : ''}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-display font-bold text-foreground mb-2">
                            {formatCurrency(booking.totalAmount)}
                          </div>
                          <div className="text-sm text-muted-foreground mb-4">
                            Booked on {formatDate(booking.bookingDate)}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                            {booking.status === "confirmed" && (
                              <Button size="sm" className="bg-primary hover:bg-primary/90">
                                <Download className="h-4 w-4 mr-2" />
                                Download Voucher
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist" className="space-y-6">
            <h2 className="text-2xl font-display font-bold">My Wishlist</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockWishlist.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-card border-border hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      >
                        <Heart className="h-4 w-4 text-red-500 fill-current" />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-display font-semibold mb-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {item.location}
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm">{item.rating}</span>
                        </div>
                        <Badge variant="secondary">{item.difficulty}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-display font-bold">
                          {formatCurrency(item.price)}
                        </span>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          Book Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <h2 className="text-2xl font-display font-bold">My Reviews</h2>
            
            <div className="text-center py-12">
              <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No reviews yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Complete your first trek to leave a review
              </p>
              <Button className="bg-primary hover:bg-primary/90">
                Explore Treks
              </Button>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-2xl font-display font-bold">Profile Settings</h2>
            
            <div className="grid gap-6">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Full Name</label>
                      <p className="text-muted-foreground">Rahul Kumar</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Email</label>
                      <p className="text-muted-foreground">rahul.kumar@email.com</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Phone</label>
                      <p className="text-muted-foreground">+91 98765 43210</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Location</label>
                      <p className="text-muted-foreground">Delhi, India</p>
                    </div>
                  </div>
                  <Button variant="outline">Edit Information</Button>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    No payment methods saved
                  </p>
                  <Button variant="outline">Add Payment Method</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};