-- Insert sample data for the blog platform
-- Note: We'll create sample users directly in public.users table
-- In a real application, these would be created through Supabase Auth

-- Insert sample users
INSERT INTO public.users (id, email, name, username, avatar, bio, location, website, social_links, followers_count, following_count, posts_count) VALUES
(
  gen_random_uuid(),
  'demo@example.com',
  'Demo User',
  'demouser',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
  'Welcome to our community blog platform!',
  'San Francisco, CA',
  'https://example.com',
  '{"twitter": "@demouser", "linkedin": "demouser", "github": "demouser"}',
  150,
  75,
  12
),
(
  gen_random_uuid(),
  'sarah@example.com',
  'Sarah Chen',
  'sarahchen',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
  'Tech enthusiast and remote work advocate',
  'Seattle, WA',
  'https://sarahchen.dev',
  '{"twitter": "@sarahchen", "linkedin": "sarahchen"}',
  320,
  180,
  25
),
(
  gen_random_uuid(),
  'marcus@example.com',
  'Marcus Rodriguez',
  'marcusr',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=marcus',
  'Travel blogger and sustainability advocate',
  'Austin, TX',
  'https://wanderlustmarcus.com',
  '{"twitter": "@marcusr", "instagram": "wanderlustmarcus"}',
  280,
  95,
  18
)
ON CONFLICT (email) DO NOTHING;

-- Insert sample posts
INSERT INTO public.posts (title, content, excerpt, slug, featured_image, category, tags, author_id, status, views_count, likes_count, comments_count, read_time, published_at) VALUES
(
  'The Future of Remote Work: How Technology is Reshaping Our Workplaces',
  'As remote work becomes the new normal, discover how emerging technologies are transforming collaboration and productivity across distributed teams. From AI-powered project management tools to virtual reality meeting spaces, the workplace of tomorrow is being built today.',
  'As remote work becomes the new normal, discover how emerging technologies are transforming collaboration and productivity across distributed teams.',
  'future-remote-work-technology-reshaping-workplaces',
  'https://images.unsplash.com/photo-1593642532744-d377ab507dc8?w=800&q=80',
  'Technology',
  ARRAY['remote work', 'technology', 'future', 'workplace'],
  (SELECT id FROM auth.users LIMIT 1),
  'published',
  1243,
  84,
  32,
  5,
  NOW() - INTERVAL '2 days'
),
(
  'Sustainable Travel: Exploring the World While Minimizing Your Carbon Footprint',
  'Learn practical tips for eco-friendly travel that allows you to experience amazing destinations while preserving them for future generations. Discover sustainable accommodation options, green transportation methods, and responsible tourism practices.',
  'Learn practical tips for eco-friendly travel that allows you to experience amazing destinations while preserving them for future generations.',
  'sustainable-travel-minimizing-carbon-footprint',
  'https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=800&q=80',
  'Travel',
  ARRAY['travel', 'sustainability', 'eco-friendly', 'environment'],
  (SELECT id FROM auth.users LIMIT 1),
  'published',
  2156,
  192,
  45,
  7,
  NOW() - INTERVAL '5 days'
),
(
  'Mindfulness in the Digital Age: Finding Balance in a Connected World',
  'Discover strategies for maintaining mental wellness and focus in an era of constant notifications and digital distractions. Learn practical mindfulness techniques that can be integrated into your daily digital routine.',
  'Discover strategies for maintaining mental wellness and focus in an era of constant notifications and digital distractions.',
  'mindfulness-digital-age-finding-balance',
  'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80',
  'Wellness',
  ARRAY['mindfulness', 'wellness', 'digital detox', 'mental health'],
  (SELECT id FROM auth.users LIMIT 1),
  'published',
  1879,
  145,
  38,
  6,
  NOW() - INTERVAL '1 week'
),
(
  'Plant-Based Cooking: Simple Recipes for Beginners',
  'Start your plant-based journey with these easy, nutritious recipes that don''t sacrifice flavor or satisfaction. From hearty breakfast bowls to satisfying dinner mains, discover how delicious plant-based eating can be.',
  'Start your plant-based journey with these easy, nutritious recipes that don''t sacrifice flavor or satisfaction.',
  'plant-based-cooking-simple-recipes-beginners',
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
  'Food',
  ARRAY['plant-based', 'cooking', 'recipes', 'healthy eating'],
  (SELECT id FROM auth.users LIMIT 1),
  'published',
  1562,
  127,
  29,
  4,
  NOW() - INTERVAL '3 days'
),
(
  'Home Fitness: Creating an Effective Workout Space in Any Size Home',
  'Transform any corner of your home into a functional fitness area with these space-saving ideas and equipment recommendations. Learn how to stay fit without a gym membership.',
  'Transform any corner of your home into a functional fitness area with these space-saving ideas and equipment recommendations.',
  'home-fitness-effective-workout-space',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
  'Fitness',
  ARRAY['fitness', 'home workout', 'exercise', 'health'],
  (SELECT id FROM auth.users LIMIT 1),
  'published',
  1843,
  156,
  42,
  8,
  NOW() - INTERVAL '4 days'
),
(
  'The Art of Storytelling: Crafting Narratives That Captivate Readers',
  'Learn the fundamental elements of compelling storytelling that will engage your audience and leave them wanting more. Discover techniques used by master storytellers across different mediums.',
  'Learn the fundamental elements of compelling storytelling that will engage your audience and leave them wanting more.',
  'art-storytelling-crafting-captivating-narratives',
  'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80',
  'Writing',
  ARRAY['storytelling', 'writing', 'creativity', 'narrative'],
  (SELECT id FROM auth.users LIMIT 1),
  'published',
  1356,
  98,
  27,
  9,
  NOW() - INTERVAL '6 days'
);

-- Insert some sample comments
INSERT INTO public.comments (content, post_id, author_id, likes_count) VALUES
(
  'This is such a comprehensive guide! I''ve been working remotely for 2 years now and these tips are spot on.',
  (SELECT id FROM public.posts WHERE slug = 'future-remote-work-technology-reshaping-workplaces'),
  (SELECT id FROM public.users WHERE email = 'sarah@example.com'),
  12
),
(
  'Great article! I''m planning a trip to Costa Rica and will definitely use these sustainable travel tips.',
  (SELECT id FROM public.posts WHERE slug = 'sustainable-travel-minimizing-carbon-footprint'),
  (SELECT id FROM public.users WHERE email = 'marcus@example.com'),
  8
),
(
  'The mindfulness techniques mentioned here have really helped me manage screen time better. Thank you!',
  (SELECT id FROM public.posts WHERE slug = 'mindfulness-digital-age-finding-balance'),
  (SELECT id FROM public.users WHERE email = 'sarah@example.com'),
  15
);

-- Insert some sample analytics data
INSERT INTO public.analytics (post_id, event_type, created_at) 
SELECT 
  p.id,
  'view',
  NOW() - (random() * INTERVAL '30 days')
FROM public.posts p
CROSS JOIN generate_series(1, 100) -- Generate 100 view events per post
WHERE p.status = 'published';

-- Insert some sample newsletter subscriptions
INSERT INTO public.newsletter_subscriptions (email, categories, frequency, active, confirmed) VALUES
('subscriber1@example.com', ARRAY['Technology', 'Wellness'], 'weekly', true, true),
('subscriber2@example.com', ARRAY['Travel', 'Food'], 'monthly', true, true),
('subscriber3@example.com', ARRAY['Fitness', 'Writing'], 'daily', true, false);
