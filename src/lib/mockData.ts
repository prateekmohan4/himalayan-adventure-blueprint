import { Trek, UserProfile, Booking, CartItem, Review } from './types';

// Sample trek data for development and testing
export const mockTreks: Trek[] = [
  {
    id: '1',
    title: 'Chandratal Lake Trek',
    slug: 'chandratal-lake-trek',
    description: 'Experience the mystical beauty of Chandratal Lake, known as the Moon Lake',
    overview: 'Embark on an unforgettable journey to Chandratal Lake, often called the Moon Lake for its crescent shape and ethereal beauty. This moderate trek takes you through diverse landscapes of Himachal Pradesh, from lush green valleys to the stark, moonscape terrain of Spiti Valley.',
    duration_days: 7,
    difficulty_level: 'moderate',
    base_price: 25000,
    max_altitude: 4300,
    best_season: ['June', 'July', 'August', 'September'],
    highlights: [
      'Crystal clear high-altitude lake',
      'Stunning Spiti Valley landscapes',
      'Ancient Buddhist monasteries',
      'Traditional Himachali villages'
    ],
    inclusions: [
      'Accommodation (Hotels & Camping)',
      'All meals during trek',
      'Professional trek leader and guides',
      'All permits and entry fees',
      'Transportation as per itinerary',
      'First aid kit and oxygen cylinder',
      'Camping equipment (tents, sleeping bags)',
      'Porter services for common equipment'
    ],
    exclusions: [
      'Personal trekking gear',
      'Travel insurance',
      'Tips for guides and porters',
      'Personal expenses',
      'Any meals not mentioned',
      'Emergency evacuation costs'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Manali',
        description: 'Arrive in Manali and check into hotel. Evening briefing about the trek.',
        meals: 'Dinner',
        accommodation: 'Hotel'
      },
      {
        day: 2,
        title: 'Manali to Chatru',
        description: 'Drive to Chatru via Rohtang Pass. Set up camp.',
        meals: 'Breakfast, Lunch, Dinner',
        accommodation: 'Camping'
      }
    ],
    gallery_images: [
      '/assets/chandratal-lake.jpg',
      '/assets/spiti-valley.jpg',
      '/assets/trekkers-camp.jpg'
    ],
    featured_image: '/assets/chandratal-lake.jpg',
    is_active: true,
    is_featured: true,
    max_group_size: 12,
    min_group_size: 2,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    title: 'Kashmir Great Lakes Trek',
    slug: 'kashmir-great-lakes-trek',
    description: 'Discover the pristine alpine lakes of Kashmir in this spectacular high-altitude trek',
    overview: 'The Kashmir Great Lakes Trek is considered one of the most beautiful treks in India, featuring seven pristine alpine lakes surrounded by snow-capped peaks and colorful meadows.',
    duration_days: 8,
    difficulty_level: 'strenuous',
    base_price: 32000,
    max_altitude: 4200,
    best_season: ['July', 'August', 'September'],
    highlights: [
      'Seven pristine alpine lakes',
      'Colorful meadows and wildflowers',
      'Snow-capped Himalayan peaks',
      'Rich Kashmir culture'
    ],
    inclusions: [
      'All accommodation',
      'All meals and refreshments',
      'Experienced trek leaders',
      'Permits and entry fees',
      'Transport during trek',
      'Safety equipment',
      'Camping gear'
    ],
    exclusions: [
      'Personal gear and clothing',
      'Insurance coverage',
      'Guide tips',
      'Personal expenses',
      'Emergency evacuation'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Srinagar',
        description: 'Pick up from airport and transfer to houseboat.',
        meals: 'Dinner',
        accommodation: 'Houseboat'
      }
    ],
    gallery_images: [
      '/assets/kashmir-houseboat.jpg',
      '/assets/hero-himalayas.jpg'
    ],
    featured_image: '/assets/kashmir-houseboat.jpg',
    is_active: true,
    is_featured: true,
    max_group_size: 15,
    min_group_size: 4,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    title: 'Hampta Pass Circuit',
    slug: 'hampta-pass-circuit',
    description: 'Cross the famous Hampta Pass and experience contrasting landscapes',
    overview: 'The Hampta Pass Trek offers a unique experience of contrasting landscapes - from the lush green valleys of Kullu to the stark, barren beauty of Lahaul and Spiti.',
    duration_days: 5,
    difficulty_level: 'moderate',
    base_price: 18000,
    max_altitude: 4270,
    best_season: ['June', 'July', 'August', 'September'],
    highlights: [
      'Contrasting valley landscapes',
      'Hampta Pass crossing',
      'Chandratal Lake visit',
      'Rich flora and fauna'
    ],
    inclusions: [
      'All meals during trek',
      'Accommodation and camping',
      'Professional guides',
      'All necessary permits',
      'Transportation',
      'Trekking equipment'
    ],
    exclusions: [
      'Personal trekking gear',
      'Travel to Manali',
      'Insurance',
      'Personal expenses'
    ],
    itinerary: [],
    gallery_images: [
      '/assets/himachali-village.jpg',
      '/assets/mountain-video-poster.jpg'
    ],
    featured_image: '/assets/himachali-village.jpg',
    is_active: true,
    is_featured: false,
    max_group_size: 12,
    min_group_size: 2,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    title: 'Pin Parvati Pass Trek',
    slug: 'pin-parvati-pass-trek',
    description: 'Challenge yourself with this demanding high-altitude pass crossing',
    overview: 'The Pin Parvati Pass Trek is one of the most challenging treks in Himachal Pradesh, connecting the lush Parvati Valley with the stark Pin Valley in Spiti.',
    duration_days: 11,
    difficulty_level: 'strenuous',
    base_price: 45000,
    max_altitude: 5319,
    best_season: ['July', 'August', 'September'],
    highlights: [
      'High-altitude pass crossing',
      'Glacial landscapes',
      'Remote Spiti villages',
      'Technical trekking challenge'
    ],
    inclusions: [
      'All meals and accommodation',
      'Expert mountain guides',
      'All permits and fees',
      'Safety equipment',
      'Emergency support',
      'Porter services'
    ],
    exclusions: [
      'Personal mountain gear',
      'Travel insurance',
      'Personal expenses',
      'Guide gratuities'
    ],
    itinerary: [],
    gallery_images: [
      '/assets/spiti-valley.jpg',
      '/assets/trek-listing-banner.jpg'
    ],
    featured_image: '/assets/spiti-valley.jpg',
    is_active: true,
    is_featured: false,
    max_group_size: 8,
    min_group_size: 3,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    title: 'Valley of Flowers Trek',
    slug: 'valley-of-flowers-trek',
    description: 'Witness the spectacular bloom in this UNESCO World Heritage Site',
    overview: 'The Valley of Flowers is a UNESCO World Heritage Site known for its meadows of endemic alpine flowers and outstanding natural beauty.',
    duration_days: 6,
    difficulty_level: 'easy',
    base_price: 22000,
    max_altitude: 3658,
    best_season: ['July', 'August', 'September'],
    highlights: [
      'UNESCO World Heritage Site',
      'Rare Himalayan flowers',
      'Hemkund Sahib pilgrimage',
      'Easy to moderate difficulty'
    ],
    inclusions: [
      'All accommodation',
      'Vegetarian meals',
      'Experienced guides',
      'Entry permits',
      'Transportation',
      'First aid support'
    ],
    exclusions: [
      'Personal gear',
      'Insurance',
      'Tips for staff',
      'Personal expenses'
    ],
    itinerary: [],
    gallery_images: [
      '/assets/team-photo.jpg',
      '/assets/hero-himalayas.jpg'
    ],
    featured_image: '/assets/team-photo.jpg',
    is_active: true,
    is_featured: true,
    max_group_size: 20,
    min_group_size: 5,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

export const mockUserProfile: UserProfile = {
  id: 'mock-user-1',
  full_name: 'John Adventurer',
  phone: '+91 98765 43210',
  date_of_birth: '1990-05-15',
  emergency_contact_name: 'Jane Adventurer',
  emergency_contact_phone: '+91 98765 43211',
  trekking_experience: 'intermediate',
  medical_conditions: 'None',
  dietary_preferences: 'Vegetarian',
  avatar_url: '/assets/team-photo.jpg',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z'
};

export const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    user_id: 'mock-user-1',
    trek_id: '1',
    booking_reference: 'HIM2024001',
    booking_date: '2024-01-15',
    trek_start_date: '2024-03-15',
    trek_end_date: '2024-03-21',
    participants: [
      {
        name: 'John Adventurer',
        age: 32,
        gender: 'Male',
        emergencyContact: 'Jane Adventurer',
        emergencyPhone: '+91 98765 43211'
      }
    ],
    participants_count: 1,
    package_type: 'Standard',
    add_ons: ['Travel Insurance', 'Equipment Rental'],
    base_amount: 25000,
    add_ons_amount: 3000,
    total_amount: 28000,
    payment_status: 'paid',
    payment_id: 'pay_123456789',
    payment_gateway: 'razorpay',
    booking_status: 'confirmed',
    special_requests: 'Vegetarian meals only',
    cancellation_reason: '',
    cancelled_at: '',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z',
    trek: mockTreks[0]
  }
];

export const mockCartItems: CartItem[] = [
  {
    id: 'cart-1',
    user_id: 'mock-user-1',
    trek_id: '2',
    selected_date: '2024-04-10',
    participants_count: 2,
    package_type: 'Premium',
    add_ons: ['Travel Insurance'],
    price_snapshot: 32000,
    created_at: '2024-01-20T15:00:00Z',
    updated_at: '2024-01-20T15:00:00Z',
    trek: mockTreks[1]
  }
];

export const mockReviews: Review[] = [
  {
    id: 'review-1',
    user_id: 'mock-user-1',
    trek_id: '1',
    booking_id: 'booking-1',
    rating: 5,
    review_title: 'Absolutely Amazing Experience!',
    review_text: 'The Chandratal Lake trek was beyond my expectations. The guides were knowledgeable, the camping arrangements were excellent, and the lake itself is breathtaking. Highly recommend this trek to anyone looking for a moderate challenge with spectacular rewards.',
    photos: [],
    is_verified: true,
    is_published: true,
    helpful_count: 12,
    created_at: '2024-03-25T14:30:00Z',
    updated_at: '2024-03-25T14:30:00Z',
    user_profile: mockUserProfile,
    trek: mockTreks[0]
  }
];

// Hook to toggle between mock data and Supabase
export const useMockData = () => {
  const isUsingMockData = import.meta.env.USE_MOCK_DATA === 'true';
  
  return {
    treks: isUsingMockData ? mockTreks : null,
    userProfile: isUsingMockData ? mockUserProfile : null,
    bookings: isUsingMockData ? mockBookings : null,
    cartItems: isUsingMockData ? mockCartItems : null,
    reviews: isUsingMockData ? mockReviews : null,
    isUsingMockData
  };
};

// Utility functions for mock data
export const getMockTrekById = (id: string): Trek | undefined => {
  return mockTreks.find(trek => trek.id === id);
};

export const getMockTrekBySlug = (slug: string): Trek | undefined => {
  return mockTreks.find(trek => trek.slug === slug);
};

export const searchMockTreks = (query: string): Trek[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockTreks.filter(trek =>
    trek.title.toLowerCase().includes(lowercaseQuery) ||
    trek.description.toLowerCase().includes(lowercaseQuery) ||
    trek.highlights.some(highlight => highlight.toLowerCase().includes(lowercaseQuery))
  );
};

export const filterMockTreks = (filters: {
  difficulty?: string;
  duration?: string;
  season?: string;
  priceRange?: [number, number];
}): Trek[] => {
  return mockTreks.filter(trek => {
    if (filters.difficulty && trek.difficulty_level !== filters.difficulty) {
      return false;
    }
    
    if (filters.duration) {
      const durationFilter = filters.duration;
      if (durationFilter === 'short' && trek.duration_days > 5) return false;
      if (durationFilter === 'medium' && (trek.duration_days < 6 || trek.duration_days > 10)) return false;
      if (durationFilter === 'long' && trek.duration_days < 11) return false;
    }
    
    if (filters.season && !trek.best_season.includes(filters.season)) {
      return false;
    }
    
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      if (trek.base_price < min || trek.base_price > max) return false;
    }
    
    return true;
  });
};