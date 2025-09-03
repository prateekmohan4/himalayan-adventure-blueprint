import { supabase } from '@/integrations/supabase/client';
import { useMockData, getMockTrekBySlug, filterMockTreks, searchMockTreks } from './mockData';
import type { Trek, UserProfile, Booking, CartItem, Review } from './types';

// Data service that switches between mock data and Supabase based on environment
export class DataService {
  private static useMockDataFlag = import.meta.env.USE_MOCK_DATA === 'true';
  
  // Trek services
  static async getTreks(filters?: any): Promise<Trek[]> {
    if (this.useMockDataFlag) {
      const { treks } = useMockData();
      return filters ? filterMockTreks(filters) : (treks || []);
    }
    
    let query = supabase
      .from('treks')
      .select('*')
      .eq('is_active', true);
    
    if (filters) {
      if (filters.difficulty) query = query.eq('difficulty_level', filters.difficulty);
      if (filters.season) query = query.contains('best_season', [filters.season]);
      if (filters.priceRange) {
        query = query.gte('base_price', filters.priceRange[0]);
        query = query.lte('base_price', filters.priceRange[1]);
      }
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return (data as Trek[]) || [];
  }
  
  static async getTrekBySlug(slug: string): Promise<Trek | null> {
    if (this.useMockDataFlag) {
      return getMockTrekBySlug(slug) || null;
    }
    
    const { data, error } = await supabase
      .from('treks')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle();
    
    if (error) throw error;
    return data as Trek | null;
  }
  
  static async searchTreks(query: string): Promise<Trek[]> {
    if (this.useMockDataFlag) {
      return searchMockTreks(query);
    }
    
    const { data, error } = await supabase
      .from('treks')
      .select('*')
      .eq('is_active', true)
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`);
    
    if (error) throw error;
    return (data as Trek[]) || [];
  }
  
  // User Profile services
  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    if (this.useMockDataFlag) {
      const { userProfile } = useMockData();
      return userProfile;
    }
    
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (error) throw error;
    return data as UserProfile | null;
  }
  
  static async updateUserProfile(userId: string, profile: Partial<UserProfile>): Promise<UserProfile> {
    if (this.useMockDataFlag) {
      const { userProfile } = useMockData();
      return { ...userProfile!, ...profile };
    }
    
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({ user_id: userId, ...profile } as any)
      .select()
      .single();
    
    if (error) throw error;
    return data as UserProfile;
  }
  
  // Booking services
  static async getUserBookings(userId: string): Promise<Booking[]> {
    if (this.useMockDataFlag) {
      const { bookings } = useMockData();
      return bookings || [];
    }
    
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        treks (
          title,
          featured_image,
          duration_days
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data as Booking[]) || [];
  }
  
  static async createBooking(booking: any): Promise<Booking> {
    if (this.useMockDataFlag) {
      const newBooking = {
        id: `booking-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        booking_reference: `HIM${Date.now()}`,
        booking_status: 'confirmed',
        payment_status: 'pending',
        ...booking
      } as Booking;
      return newBooking;
    }
    
    const { data, error } = await supabase
      .from('bookings')
      .insert(booking)
      .select()
      .single();
    
    if (error) throw error;
    return data as Booking;
  }
  
  // Cart services
  static async getCartItems(userId: string): Promise<CartItem[]> {
    if (this.useMockDataFlag) {
      const { cartItems } = useMockData();
      return cartItems || [];
    }
    
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        *,
        treks (
          title,
          featured_image,
          duration_days
        )
      `)
      .eq('user_id', userId);
    
    if (error) throw error;
    return (data as CartItem[]) || [];
  }
  
  static async addToCart(item: any): Promise<CartItem> {
    if (this.useMockDataFlag) {
      const newItem = {
        id: `cart-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...item
      } as CartItem;
      return newItem;
    }
    
    const { data, error } = await supabase
      .from('cart_items')
      .insert(item)
      .select()
      .single();
    
    if (error) throw error;
    return data as CartItem;
  }
  
  static async updateCartItem(itemId: string, updates: any): Promise<CartItem> {
    if (this.useMockDataFlag) {
      const { cartItems } = useMockData();
      const item = cartItems?.find(item => item.id === itemId);
      return { ...item!, ...updates };
    }
    
    const { data, error } = await supabase
      .from('cart_items')
      .update(updates)
      .eq('id', itemId)
      .select()
      .single();
    
    if (error) throw error;
    return data as CartItem;
  }
  
  static async removeFromCart(itemId: string): Promise<void> {
    if (this.useMockDataFlag) {
      return;
    }
    
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);
    
    if (error) throw error;
  }
  
  // Review services
  static async getTrekReviews(trekId: string): Promise<Review[]> {
    if (this.useMockDataFlag) {
      const { reviews } = useMockData();
      return reviews?.filter(review => review.trek_id === trekId) || [];
    }
    
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        user_profiles (
          full_name,
          avatar_url
        )
      `)
      .eq('trek_id', trekId)
      .eq('is_published', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data as Review[]) || [];
  }
  
  static async createReview(review: any): Promise<Review> {
    if (this.useMockDataFlag) {
      const newReview = {
        id: `review-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        is_published: true,
        is_verified: false,
        helpful_count: 0,
        ...review
      } as Review;
      return newReview;
    }
    
    const { data, error } = await supabase
      .from('reviews')
      .insert(review)
      .select()
      .single();
    
    if (error) throw error;
    return data as Review;
  }
  
  // Utility methods
  static isUsingMockData(): boolean {
    return this.useMockDataFlag;
  }
  
  static toggleMockData(useMock: boolean): void {
    this.useMockDataFlag = useMock;
  }
}