import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Trek {
  id: string;
  title: string;
  slug: string;
  description: string;
  overview: string;
  duration_days: number;
  difficulty_level: 'easy' | 'moderate' | 'strenuous';
  base_price: number;
  max_altitude: number;
  best_season: string[];
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: any[];
  gallery_images: string[];
  featured_image: string;
  is_active: boolean;
  is_featured: boolean;
  max_group_size: number;
  min_group_size: number;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  full_name: string;
  phone: string;
  date_of_birth: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  trekking_experience: 'beginner' | 'intermediate' | 'advanced';
  medical_conditions: string;
  dietary_preferences: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  user_id: string;
  trek_id: string;
  booking_reference: string;
  booking_date: string;
  trek_start_date: string;
  trek_end_date: string;
  participants: any[];
  participants_count: number;
  package_type: string;
  add_ons: string[];
  base_amount: number;
  add_ons_amount: number;
  total_amount: number;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_id: string;
  payment_gateway: string;
  booking_status: 'confirmed' | 'cancelled' | 'completed';
  special_requests: string;
  cancellation_reason: string;
  cancelled_at: string;
  created_at: string;
  updated_at: string;
  trek?: Trek;
}

export interface CartItem {
  id: string;
  user_id: string;
  trek_id: string;
  selected_date: string;
  participants_count: number;
  package_type: string;
  add_ons: string[];
  price_snapshot: number;
  created_at: string;
  updated_at: string;
  trek?: Trek;
}

export interface Review {
  id: string;
  user_id: string;
  trek_id: string;
  booking_id: string;
  rating: number;
  review_title: string;
  review_text: string;
  photos: string[];
  is_verified: boolean;
  is_published: boolean;
  helpful_count: number;
  created_at: string;
  updated_at: string;
  user_profile?: UserProfile;
  trek?: Trek;
}