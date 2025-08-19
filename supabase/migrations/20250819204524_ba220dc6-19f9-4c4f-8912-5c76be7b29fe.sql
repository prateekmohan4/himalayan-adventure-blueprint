-- Create profiles table for user data
CREATE TABLE public.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  date_of_birth DATE,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  trekking_experience TEXT CHECK (trekking_experience IN ('beginner', 'intermediate', 'advanced')),
  medical_conditions TEXT,
  dietary_preferences TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create treks table
CREATE TABLE public.treks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  overview TEXT,
  duration_days INTEGER NOT NULL,
  difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('easy', 'moderate', 'strenuous')),
  base_price DECIMAL(10,2) NOT NULL,
  max_altitude INTEGER,
  best_season TEXT[] DEFAULT '{}',
  highlights TEXT[] DEFAULT '{}',
  inclusions TEXT[] DEFAULT '{}',
  exclusions TEXT[] DEFAULT '{}',
  itinerary JSONB DEFAULT '[]',
  gallery_images TEXT[] DEFAULT '{}',
  featured_image TEXT,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  max_group_size INTEGER DEFAULT 12,
  min_group_size INTEGER DEFAULT 2,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create cart_items table
CREATE TABLE public.cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  trek_id UUID NOT NULL REFERENCES public.treks(id) ON DELETE CASCADE,
  selected_date DATE NOT NULL,
  participants_count INTEGER NOT NULL DEFAULT 1,
  package_type TEXT NOT NULL,
  add_ons TEXT[] DEFAULT '{}',
  price_snapshot DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  trek_id UUID NOT NULL REFERENCES public.treks(id) ON DELETE CASCADE,
  booking_reference TEXT NOT NULL UNIQUE,
  booking_date DATE NOT NULL DEFAULT CURRENT_DATE,
  trek_start_date DATE NOT NULL,
  trek_end_date DATE NOT NULL,
  participants JSONB DEFAULT '[]',
  participants_count INTEGER NOT NULL,
  package_type TEXT NOT NULL,
  add_ons TEXT[] DEFAULT '{}',
  base_amount DECIMAL(10,2) NOT NULL,
  add_ons_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_id TEXT,
  payment_gateway TEXT,
  booking_status TEXT NOT NULL DEFAULT 'confirmed' CHECK (booking_status IN ('confirmed', 'cancelled', 'completed')),
  special_requests TEXT,
  cancellation_reason TEXT,
  cancelled_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  trek_id UUID NOT NULL REFERENCES public.treks(id) ON DELETE CASCADE,
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_title TEXT,
  review_text TEXT,
  photos TEXT[] DEFAULT '{}',
  is_verified BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, booking_id)
);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view their own profile" ON public.user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for treks (public read access)
CREATE POLICY "Anyone can view active treks" ON public.treks FOR SELECT USING (is_active = true);

-- RLS Policies for cart_items
CREATE POLICY "Users can view their own cart items" ON public.cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own cart items" ON public.cart_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own cart items" ON public.cart_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own cart items" ON public.cart_items FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for bookings
CREATE POLICY "Users can view their own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for reviews
CREATE POLICY "Anyone can view published reviews" ON public.reviews FOR SELECT USING (is_published = true);
CREATE POLICY "Users can insert their own reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = user_id);

-- Create functions for automatic timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_treks_updated_at BEFORE UPDATE ON public.treks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON public.cart_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();