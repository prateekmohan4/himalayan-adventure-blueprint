import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Package, Star, LogOut } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserData(session.user.id);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserData(session.user.id);
      } else {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchUserData = async (userId: string) => {
    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

      setProfile(profileData);

      // Fetch bookings
      const { data: bookingsData } = await supabase
        .from("bookings")
        .select(`
          *,
          treks (
            title,
            featured_image,
            duration_days
          )
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      setBookings(bookingsData || []);

      // Fetch reviews
      const { data: reviewsData } = await supabase
        .from("reviews")
        .select(`
          *,
          treks (
            title
          )
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      setReviews(reviewsData || []);
    } catch (error: any) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error: any) {
      toast.error("Failed to sign out");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-display mb-4">Please Sign In</h1>
          <Button onClick={() => navigate("/auth")}>Sign In</Button>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <p>Loading dashboard...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-display font-bold">Welcome back!</h1>
            <p className="text-muted-foreground">
              {profile?.full_name || user.email}
            </p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="reviews">My Reviews</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-display font-semibold">My Bookings</h2>
              <Button onClick={() => navigate("/treks")}>Book New Trek</Button>
            </div>

            {bookings.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No bookings found</p>
                  <Button className="mt-4" onClick={() => navigate("/treks")}>
                    Browse Treks
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {bookings.map((booking) => (
                  <Card key={booking.id} className="shadow-card">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/4">
                          <img
                            src={booking.treks?.featured_image || "/placeholder.svg"}
                            alt={booking.treks?.title}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-display font-semibold mb-2">
                                {booking.treks?.title}
                              </h3>
                              <div className="flex gap-2 mb-2">
                                <Badge variant="secondary">{booking.package_type}</Badge>
                                <Badge 
                                  variant={booking.booking_status === "confirmed" ? "default" : "outline"}
                                >
                                  {booking.booking_status}
                                </Badge>
                              </div>
                            </div>
                            <Badge variant="outline">{booking.booking_reference}</Badge>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">Start Date</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(booking.trek_start_date).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">Participants</p>
                                <p className="text-sm text-muted-foreground">
                                  {booking.participants_count}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Total Amount</p>
                              <p className="text-lg font-bold">
                                ₹{booking.total_amount?.toLocaleString()}
                              </p>
                            </div>
                          </div>

                          {booking.add_ons && booking.add_ons.length > 0 && (
                            <div>
                              <p className="text-sm font-medium mb-2">Add-ons:</p>
                              <div className="flex gap-2 flex-wrap">
                                {booking.add_ons.map((addon: string, index: number) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {addon}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <h2 className="text-2xl font-display font-semibold">My Reviews</h2>
            
            {reviews.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No reviews yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {reviews.map((review) => (
                  <Card key={review.id} className="shadow-card">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold">{review.treks?.title}</h3>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <Badge variant={review.is_published ? "default" : "secondary"}>
                          {review.is_published ? "Published" : "Pending"}
                        </Badge>
                      </div>
                      {review.review_title && (
                        <h4 className="font-medium mb-2">{review.review_title}</h4>
                      )}
                      <p className="text-muted-foreground">{review.review_text}</p>
                      <p className="text-xs text-muted-foreground mt-4">
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-2xl font-display font-semibold">Profile Information</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                  {profile?.full_name && (
                    <div>
                      <label className="text-sm font-medium">Full Name</label>
                      <p className="text-muted-foreground">{profile.full_name}</p>
                    </div>
                  )}
                  {profile?.phone && (
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <p className="text-muted-foreground">{profile.phone}</p>
                    </div>
                  )}
                  <Button variant="outline">Edit Profile</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;