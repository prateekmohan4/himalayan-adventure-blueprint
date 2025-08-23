import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { BookingFlow } from "@/components/ui/booking-flow";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { toast } from "sonner";

const Booking = () => {
  const [user, setUser] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchCartItems();
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchCartItems();
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchCartItems = async () => {
    try {
      const { data, error } = await supabase
        .from("cart_items")
        .select(`
          *,
          treks (
            title,
            featured_image,
            duration_days,
            base_price
          )
        `);

      if (error) throw error;
      setCartItems(data || []);
    } catch (error: any) {
      toast.error("Failed to load booking items");
    } finally {
      setLoading(false);
    }
  };

  const handleBookingComplete = async (bookingData: any) => {
    try {
      // Create booking record
      const { error: bookingError } = await supabase
        .from("bookings")
        .insert({
          user_id: user.id,
          trek_id: bookingData.trek_id,
          trek_start_date: bookingData.start_date,
          trek_end_date: bookingData.end_date,
          participants: bookingData.participants,
          participants_count: bookingData.participants_count,
          package_type: bookingData.package_type,
          add_ons: bookingData.add_ons,
          base_amount: bookingData.base_amount,
          add_ons_amount: bookingData.add_ons_amount,
          total_amount: bookingData.total_amount,
          booking_reference: `TRK-${Date.now()}`,
          payment_status: "completed",
          booking_status: "confirmed"
        });

      if (bookingError) throw bookingError;

      // Clear cart
      await supabase.from("cart_items").delete().eq("user_id", user.id);

      toast.success("Booking confirmed successfully!");
      navigate("/booking-success");
    } catch (error: any) {
      toast.error("Failed to complete booking");
    }
  };

  const handleBookingCancel = () => {
    navigate("/cart");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-display mb-4">Please Sign In</h1>
          <p className="text-muted-foreground mb-8">You need to be signed in to make a booking.</p>
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
          <p>Loading booking details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-display mb-4">No Items to Book</h1>
          <p className="text-muted-foreground mb-8">Your cart is empty. Please add treks to proceed with booking.</p>
          <Button onClick={() => navigate("/treks")}>Browse Treks</Button>
        </div>
        <Footer />
      </div>
    );
  }

  // For now, handle single item booking (first item from cart)
  const trekItem = cartItems[0];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <BookingFlow
          trek={{
            id: trekItem.trek_id,
            name: trekItem.treks?.title,
            basePrice: trekItem.price_snapshot,
            duration: `${trekItem.treks?.duration_days} days`,
            difficulty: "Moderate",
            location: "Himalayas",
            maxParticipants: 12,
            availableDates: [new Date(), new Date(Date.now() + 86400000)]
          }}
          onComplete={handleBookingComplete}
          onCancel={handleBookingCancel}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Booking;