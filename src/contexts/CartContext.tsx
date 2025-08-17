import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, CartItem, Trek } from '@/lib/supabase';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';

interface CartContextType {
  items: CartItem[];
  loading: boolean;
  totalItems: number;
  totalAmount: number;
  addToCart: (trekId: string, selectedDate: string, participantsCount: number, packageType: string, addOns: string[]) => Promise<boolean>;
  removeFromCart: (itemId: string) => Promise<boolean>;
  updateCartItem: (itemId: string, updates: Partial<CartItem>) => Promise<boolean>;
  clearCart: () => Promise<boolean>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const totalItems = items.length;
  const totalAmount = items.reduce((sum, item) => sum + item.price_snapshot * item.participants_count, 0);

  useEffect(() => {
    if (user) {
      refreshCart();
    } else {
      setItems([]);
    }
  }, [user]);

  const refreshCart = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          trek:treks(*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setItems(data || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast({
        title: "Error",
        description: "Failed to load cart items",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (
    trekId: string,
    selectedDate: string,
    participantsCount: number,
    packageType: string,
    addOns: string[]
  ): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to add items to cart",
        variant: "destructive",
      });
      return false;
    }

    setLoading(true);
    try {
      // First get the trek details to calculate price
      const { data: trek, error: trekError } = await supabase
        .from('treks')
        .select('*')
        .eq('id', trekId)
        .single();

      if (trekError) throw trekError;

      // Calculate price (simplified - in real app would consider package types and add-ons)
      const basePrice = trek.base_price;
      const addOnsPrice = addOns.length * 1000; // Example: ₹1000 per add-on
      const totalPrice = basePrice + addOnsPrice;

      // Check if item already exists
      const { data: existingItem, error: checkError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id)
        .eq('trek_id', trekId)
        .eq('selected_date', selectedDate)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (existingItem) {
        // Update existing item
        const { error: updateError } = await supabase
          .from('cart_items')
          .update({
            participants_count: participantsCount,
            package_type: packageType,
            add_ons: addOns,
            price_snapshot: totalPrice,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingItem.id);

        if (updateError) throw updateError;
      } else {
        // Insert new item
        const { error: insertError } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            trek_id: trekId,
            selected_date: selectedDate,
            participants_count: participantsCount,
            package_type: packageType,
            add_ons: addOns,
            price_snapshot: totalPrice,
          });

        if (insertError) throw insertError;
      }

      await refreshCart();
      
      toast({
        title: "Added to Cart",
        description: `${trek.title} has been added to your cart`,
      });
      
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: string): Promise<boolean> => {
    if (!user) return false;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId)
        .eq('user_id', user.id);

      if (error) throw error;

      await refreshCart();
      
      toast({
        title: "Removed from Cart",
        description: "Item has been removed from your cart",
      });
      
      return true;
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (itemId: string, updates: Partial<CartItem>): Promise<boolean> => {
    if (!user) return false;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('cart_items')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', itemId)
        .eq('user_id', user.id);

      if (error) throw error;

      await refreshCart();
      return true;
    } catch (error) {
      console.error('Error updating cart item:', error);
      toast({
        title: "Error",
        description: "Failed to update cart item",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async (): Promise<boolean> => {
    if (!user) return false;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setItems([]);
      
      toast({
        title: "Cart Cleared",
        description: "All items have been removed from your cart",
      });
      
      return true;
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    items,
    loading,
    totalItems,
    totalAmount,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};