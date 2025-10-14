-- Seed Data for Testing

-- Insert test profiles (passwords will be handled by Supabase Auth)
-- Note: In production, users should register through the app

-- Sample equipment data
INSERT INTO public.equipment (owner_id, name, category, description, specifications, daily_rate, location, image_url, status)
VALUES
  -- You'll need to replace owner_id with actual user UUIDs after users register
  -- This is just sample structure
  (
    '00000000-0000-0000-0000-000000000001'::uuid,
    'John Deere 5075E Tractor',
    'tractor',
    'Versatile utility tractor perfect for various farm operations',
    '{"horsepower": "75 HP", "transmission": "PowrReverser", "pto": "540/1000 rpm", "hydraulics": "Open center"}'::jsonb,
    150.00,
    'Iowa, USA',
    '/john-deere-tractor.jpg',
    'available'
  );

-- Note: To properly seed data, you should:
-- 1. First create users through Supabase Auth
-- 2. Then insert their profiles with the correct UUIDs
-- 3. Then add equipment, bookings, etc. with valid foreign keys
