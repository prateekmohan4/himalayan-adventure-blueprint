import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Calendar, Users, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { supabase } from "@/integrations/supabase/client";

const BookingSuccess = () => {
  const [latestBooking, setLatestBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLatestBooking();
  }, []);

  const fetchLatestBooking = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          treks (
            title,
            featured_image,
            duration_days
          )
        `)
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      setLatestBooking(data);
    } catch (error: any) {
      console.error("Failed to fetch booking:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <p>Loading booking details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
            <h1 className="text-4xl font-display font-bold text-foreground mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-xl text-muted-foreground">
              Thank you for booking with Alpine Adventures. Your trek booking has been confirmed.
            </p>
          </div>

          {latestBooking && (
            <Card className="shadow-elevation-2 text-left mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Booking Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <img
                      src={latestBooking.treks?.featured_image || "/placeholder.svg"}
                      alt={latestBooking.treks?.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-xl font-display font-semibold mb-2">
                        {latestBooking.treks?.title}
                      </h3>
                      <Badge variant="secondary" className="mb-2">
                        {latestBooking.package_type}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Trek Dates</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(latestBooking.trek_start_date).toLocaleDateString()} - {" "}
                            {new Date(latestBooking.trek_end_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Participants</p>
                          <p className="text-sm text-muted-foreground">
                            {latestBooking.participants_count} people
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Booking Reference:</span>
                        <Badge variant="outline">{latestBooking.booking_reference}</Badge>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-medium">Total Amount:</span>
                        <span className="text-lg font-bold">
                          ₹{latestBooking.total_amount?.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {latestBooking.add_ons && latestBooking.add_ons.length > 0 && (
                      <div>
                        <p className="font-medium mb-2">Add-ons:</p>
                        <div className="flex gap-2 flex-wrap">
                          {latestBooking.add_ons.map((addon: string, index: number) => (
                            <Badge key={index} variant="outline">{addon}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="bg-info/10 border border-info/20 rounded-lg p-6 mb-8">
            <h3 className="font-semibold mb-2">What's Next?</h3>
            <ul className="text-sm text-muted-foreground space-y-1 text-left">
              <li>• You will receive a confirmation email with detailed trek information</li>
              <li>• Our team will contact you 48 hours before the trek start date</li>
              <li>• Please check your dashboard for updates and trek preparations</li>
              <li>• Keep your booking reference handy for all communications</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/dashboard")} variant="default">
              View My Bookings
            </Button>
            <Button onClick={() => navigate("/treks")} variant="outline">
              Book Another Trek
            </Button>
            <Button onClick={() => navigate("/")} variant="ghost">
              Back to Home
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingSuccess;