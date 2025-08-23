import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

interface CartItem {
  id: string;
  trek_id: string;
  selected_date: string;
  participants_count: number;
  package_type: string;
  add_ons: string[];
  price_snapshot: number;
  trek?: {
    title: string;
    featured_image: string;
    duration_days: number;
  };
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
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
            duration_days
          )
        `);

      if (error) throw error;
      setCartItems(data || []);
    } catch (error: any) {
      toast.error("Failed to load cart items");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, newCount: number) => {
    if (newCount < 1) return;

    try {
      const { error } = await supabase
        .from("cart_items")
        .update({ participants_count: newCount })
        .eq("id", itemId);

      if (error) throw error;
      fetchCartItems();
      toast.success("Quantity updated");
    } catch (error: any) {
      toast.error("Failed to update quantity");
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", itemId);

      if (error) throw error;
      fetchCartItems();
      toast.success("Item removed from cart");
    } catch (error: any) {
      toast.error("Failed to remove item");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price_snapshot * item.participants_count);
    }, 0);
  };

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    navigate("/booking");
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-display mb-4">Please Sign In</h1>
          <p className="text-muted-foreground mb-8">You need to be signed in to view your cart.</p>
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
          <p>Loading cart...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-display font-bold text-center mb-12">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-muted-foreground mb-8">Your cart is empty</p>
            <Button onClick={() => navigate("/treks")}>Browse Treks</Button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 mb-8">
              {cartItems.map((item) => (
                <Card key={item.id} className="shadow-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <img
                          src={item.trek?.featured_image || "/placeholder.svg"}
                          alt={item.trek?.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-display font-semibold mb-2">
                              {item.trek?.title}
                            </h3>
                            <div className="flex gap-2 mb-2">
                              <Badge variant="secondary">{item.package_type}</Badge>
                              <Badge variant="outline">{item.trek?.duration_days} days</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Date: {new Date(item.selected_date).toLocaleDateString()}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.participants_count - 1)}
                              disabled={item.participants_count <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-medium">{item.participants_count} participants</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.participants_count + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold">
                              ₹{(item.price_snapshot * item.participants_count).toLocaleString()}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              ₹{item.price_snapshot.toLocaleString()} per person
                            </p>
                          </div>
                        </div>

                        {item.add_ons.length > 0 && (
                          <div className="mt-4">
                            <p className="text-sm font-medium mb-2">Add-ons:</p>
                            <div className="flex gap-2">
                              {item.add_ons.map((addon, index) => (
                                <Badge key={index} variant="outline">{addon}</Badge>
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

            <Card className="shadow-elevation-2">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-lg">
                    <span>Total Items:</span>
                    <span>{cartItems.length}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span>Total Participants:</span>
                    <span>{cartItems.reduce((sum, item) => sum + item.participants_count, 0)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total Amount:</span>
                      <span>₹{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                  <Button className="w-full" size="lg" onClick={proceedToCheckout}>
                    Proceed to Checkout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;