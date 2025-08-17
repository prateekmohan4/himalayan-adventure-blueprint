-- =====================================================
-- SAMPLE DATA FOR HIMALAYAN ADVENTURES
-- =====================================================

-- Insert sample treks
INSERT INTO public.treks (
  title, slug, description, overview, duration_days, difficulty_level, base_price, max_altitude,
  best_season, highlights, inclusions, exclusions, featured_image, gallery_images, is_active, is_featured,
  itinerary
) VALUES 
(
  'Chandratal Lake Trek',
  'chandratal-lake-trek',
  'Experience the mesmerizing beauty of the "Moon Lake" nestled in the high-altitude desert landscape of Spiti Valley.',
  'Embark on an unforgettable journey to Chandratal Lake, often called the "Moon Lake" for its crescent shape and ethereal beauty. This moderate trek takes you through the diverse landscapes of Himachal Pradesh, from lush green valleys to the stark, moonscape terrain of Spiti Valley. Experience the raw beauty of the high Himalayas while camping under star-studded skies at one of India''s most pristine high-altitude lakes.',
  7,
  'moderate',
  25000.00,
  4300,
  ARRAY['May', 'June', 'July', 'August', 'September', 'October'],
  ARRAY['Crystal clear high-altitude lake', 'Stunning Spiti Valley landscapes', 'Ancient Buddhist monasteries', 'Traditional Himachali villages'],
  ARRAY['Accommodation (Hotels & Camping)', 'All meals during trek', 'Professional trek leader and guides', 'All permits and entry fees', 'Transportation as per itinerary', 'First aid kit and oxygen cylinder', 'Camping equipment (tents, sleeping bags)', 'Porter services for common equipment'],
  ARRAY['Personal trekking gear', 'Travel insurance', 'Tips for guides and porters', 'Personal expenses', 'Any meals not mentioned', 'Emergency evacuation costs', 'Anything not specifically mentioned in inclusions'],
  '/assets/chandratal-lake.jpg',
  ARRAY['/assets/chandratal-lake.jpg', '/assets/spiti-valley.jpg', '/assets/trekkers-camp.jpg'],
  true,
  true,
  '[
    {"day": 1, "title": "Arrival in Manali", "description": "Arrive in Manali and check into hotel. Evening briefing about the trek. Gear check and preparation.", "meals": "Dinner", "accommodation": "Hotel"},
    {"day": 2, "title": "Manali to Chatru", "description": "Drive to Chatru via Rohtang Pass. First glimpse of Spiti Valley''s landscape. Set up camp.", "meals": "Breakfast, Lunch, Dinner", "accommodation": "Camping"},
    {"day": 3, "title": "Chatru to Chandratal Lake", "description": "Trek to the magnificent Chandratal Lake. Set up camp near the lake and enjoy sunset views.", "meals": "Breakfast, Lunch, Dinner", "accommodation": "Camping"},
    {"day": 4, "title": "Explore Chandratal", "description": "Full day at the lake. Photography, short hikes around the lake, and relaxation.", "meals": "Breakfast, Lunch, Dinner", "accommodation": "Camping"},
    {"day": 5, "title": "Chandratal to Kunzum Pass", "description": "Trek to Kunzum Pass. Visit ancient monasteries and interact with local communities.", "meals": "Breakfast, Lunch, Dinner", "accommodation": "Camping"},
    {"day": 6, "title": "Kunzum Pass to Manali", "description": "Return journey to Manali via spectacular mountain roads. Evening celebration dinner.", "meals": "Breakfast, Lunch, Dinner", "accommodation": "Hotel"},
    {"day": 7, "title": "Departure", "description": "Check out from hotel and departure. Trip concludes.", "meals": "Breakfast", "accommodation": "None"}
  ]'::jsonb
),
(
  'Spiti Valley Odyssey',
  'spiti-valley-odyssey',
  'Journey through the moonscapes of Spiti, visiting ancient monasteries and experiencing the unique high-altitude desert culture.',
  'Discover the mystical beauty of Spiti Valley, often called "Little Tibet" for its striking resemblance to the Tibetan plateau. This comprehensive journey takes you through ancient monasteries, traditional villages, and stark yet stunning landscapes that have remained unchanged for centuries.',
  10,
  'moderate',
  35000.00,
  4500,
  ARRAY['May', 'June', 'July', 'August', 'September', 'October'],
  ARRAY['Ancient Buddhist monasteries', 'Traditional Spitian culture', 'High-altitude desert landscapes', 'Fossil hunting opportunities'],
  ARRAY['Accommodation (Hotels & Camping)', 'All meals during trek', 'Professional guide', 'All permits', 'Transportation', 'Monastery entry fees'],
  ARRAY['Personal gear', 'Travel insurance', 'Tips', 'Personal expenses', 'Emergency costs'],
  '/assets/spiti-valley.jpg',
  ARRAY['/assets/spiti-valley.jpg', '/assets/chandratal-lake.jpg', '/assets/himachali-village.jpg'],
  true,
  true,
  '[]'::jsonb
),
(
  'Kashmir Paradise Trek',
  'kashmir-paradise-trek',
  'Explore the breathtaking beauty of Kashmir''s meadows and valleys, staying in traditional houseboats.',
  'Experience the unparalleled beauty of Kashmir, rightfully called "Paradise on Earth." This gentle trek combines the comfort of houseboat stays with moderate hiking through alpine meadows, pristine lakes, and flower-filled valleys.',
  7,
  'easy',
  28000.00,
  3500,
  ARRAY['April', 'May', 'June', 'July', 'August', 'September'],
  ARRAY['Traditional houseboat experience', 'Alpine meadows and flowers', 'Dal Lake and Shikara rides', 'Kashmiri culture and cuisine'],
  ARRAY['Houseboat accommodation', 'All meals', 'Shikara rides', 'Local transportation', 'Cultural programs'],
  ARRAY['Personal expenses', 'Shopping', 'Tips', 'Travel insurance'],
  '/assets/kashmir-houseboat.jpg',
  ARRAY['/assets/kashmir-houseboat.jpg', '/assets/spiti-valley.jpg', '/assets/chandratal-lake.jpg'],
  true,
  false,
  '[]'::jsonb
),
(
  'Himachali Heritage Trail',
  'himachali-heritage-trail',
  'Immerse yourself in traditional mountain villages, discovering ancient customs and local crafts.',
  'Step back in time and experience the rich cultural heritage of Himachal Pradesh. This easy trek takes you through traditional villages where ancient customs are still practiced, offering insights into mountain life and local craftsmanship.',
  5,
  'easy',
  18000.00,
  2500,
  ARRAY['March', 'April', 'May', 'September', 'October', 'November'],
  ARRAY['Traditional Himachali villages', 'Local handicrafts workshops', 'Ancient temples and customs', 'Organic farming practices'],
  ARRAY['Village homestays', 'All meals', 'Cultural activities', 'Local guide', 'Workshop participation'],
  ARRAY['Personal shopping', 'Tips', 'Personal expenses'],
  '/assets/himachali-village.jpg',
  ARRAY['/assets/himachali-village.jpg', '/assets/kashmir-houseboat.jpg', '/assets/trekkers-camp.jpg'],
  true,
  false,
  '[]'::jsonb
),
(
  'Hampta Pass Adventure',
  'hampta-pass-adventure',
  'Cross the famous Hampta Pass connecting Kullu and Lahaul valleys through diverse landscapes.',
  'One of the most popular treks in Himachal Pradesh, the Hampta Pass trek offers dramatic landscape changes from lush green valleys to barren desert terrain. This moderate trek is perfect for experiencing the diverse beauty of the Himalayas.',
  6,
  'moderate',
  22000.00,
  4270,
  ARRAY['June', 'July', 'August', 'September'],
  ARRAY['Dramatic landscape transitions', 'Hampta Pass crossing', 'Chandratal Lake visit', 'Diverse flora and fauna'],
  ARRAY['Camping accommodation', 'All meals', 'Trekking permits', 'Guide services', 'Transportation'],
  ARRAY['Personal gear', 'Insurance', 'Personal expenses'],
  '/assets/trekkers-camp.jpg',
  ARRAY['/assets/trekkers-camp.jpg', '/assets/chandratal-lake.jpg', '/assets/spiti-valley.jpg'],
  true,
  true,
  '[]'::jsonb
),
(
  'Pin Parvati Pass Trek',
  'pin-parvati-pass-trek',
  'Challenge yourself with this demanding high-altitude trek through pristine Himalayan wilderness.',
  'For experienced trekkers seeking the ultimate challenge, the Pin Parvati Pass trek offers one of the most demanding yet rewarding experiences in the Indian Himalayas. This expedition-style trek crosses one of the highest trekking passes in the region.',
  12,
  'strenuous',
  45000.00,
  5319,
  ARRAY['July', 'August', 'September'],
  ARRAY['Highest trekking pass in the region', 'Pristine wilderness', 'Challenging terrain', 'Expedition-style camping'],
  ARRAY['Complete camping setup', 'All meals', 'Expert mountaineering guide', 'Technical equipment', 'Permits and fees'],
  ARRAY['Personal mountaineering gear', 'Insurance', 'Emergency evacuation'],
  '/assets/spiti-valley.jpg',
  ARRAY['/assets/spiti-valley.jpg', '/assets/trekkers-camp.jpg', '/assets/chandratal-lake.jpg'],
  true,
  false,
  '[]'::jsonb
);

-- Insert trek availability for next 6 months
INSERT INTO public.trek_availability (trek_id, start_date, end_date, available_spots) 
SELECT 
  t.id,
  CURRENT_DATE + (i * INTERVAL '14 days'),
  CURRENT_DATE + (i * INTERVAL '14 days') + (t.duration_days * INTERVAL '1 day'),
  12
FROM public.treks t
CROSS JOIN generate_series(0, 12) i
WHERE t.is_active = true;

-- Insert sample blog posts
INSERT INTO public.blog_posts (
  title, slug, excerpt, content, featured_image, category, tags, is_published, published_at
) VALUES 
(
  'Essential Trekking Gear for Himalayan Adventures',
  'essential-trekking-gear-himalayan-adventures',
  'A comprehensive guide to the must-have equipment for safe and comfortable trekking in the Himalayas.',
  'Planning a trek in the Himalayas requires careful preparation, especially when it comes to selecting the right gear. From base layers to mountaineering boots, every piece of equipment plays a crucial role in ensuring your safety and comfort...',
  '/assets/blog-featured.jpg',
  'Gear Guide',
  ARRAY['trekking', 'gear', 'himalayas', 'preparation'],
  true,
  CURRENT_TIMESTAMP - INTERVAL '7 days'
),
(
  'Best Time to Visit Spiti Valley: A Complete Guide',
  'best-time-visit-spiti-valley-guide',
  'Discover the optimal seasons for exploring the mystical landscapes of Spiti Valley.',
  'Spiti Valley, often called "Little Tibet," is a high-altitude desert valley that offers unique experiences throughout the year. Understanding the seasonal variations is crucial for planning your visit...',
  '/assets/spiti-valley.jpg',
  'Destination Guide',
  ARRAY['spiti valley', 'travel tips', 'seasons', 'planning'],
  true,
  CURRENT_TIMESTAMP - INTERVAL '14 days'
),
(
  'Acclimatization Tips for High-Altitude Trekking',
  'acclimatization-tips-high-altitude-trekking',
  'Learn essential techniques to prevent altitude sickness and enjoy your high-altitude adventures safely.',
  'High-altitude trekking in the Himalayas presents unique challenges, with altitude sickness being one of the most common concerns. Proper acclimatization techniques can make the difference between a successful trek and a medical emergency...',
  '/assets/mountain-video-poster.jpg',
  'Safety',
  ARRAY['altitude', 'safety', 'health', 'acclimatization'],
  true,
  CURRENT_TIMESTAMP - INTERVAL '21 days'
);

-- Function to create a sample user profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, trekking_experience)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'beginner');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();