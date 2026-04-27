-- Iwan Real Estate Extranet - Database Schema
-- Optimized for UAE/Arab Market

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Units Table (Properties in Dubai/Riyadh)
CREATE TABLE IF NOT EXISTS units (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  price_aed NUMERIC NOT NULL,
  location_en TEXT NOT NULL,
  location_ar TEXT NOT NULL,
  image_url TEXT,
  category TEXT DEFAULT 'Villa', -- Matches frontend filters
  amenities TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Profiles Table (Linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3.1 Trigger for Profile Creation (CRITICAL: Links Auth to Database)
-- This ensures when a user signs up via Auth UI, a record is created in the profiles table automatically.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Visits/Interactions Table
CREATE TABLE IF NOT EXISTS visits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  unit_id UUID REFERENCES units(id) ON DELETE CASCADE,
  visit_date DATE NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
  id_document_url TEXT, -- Path in Supabase Storage
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Contact Messages (Leads)
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- (Rest of the file remains as it was: RLS policies and Storage setup)

-- 5. Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- 5.1 Units Policies (Publicly readable structured data)
DROP POLICY IF EXISTS "Units are readable by everyone" ON units;
CREATE POLICY "Units are readable by everyone" ON units
  FOR SELECT USING (true);

-- 5.2 Contact Messages Policies (Mission 1: Leads generation)
DROP POLICY IF EXISTS "Anyone can send contact messages" ON contact_messages;
CREATE POLICY "Anyone can send contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- 5.2 Profiles Policies (Private structured data)
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- 5.3 Visits Policies (Table C: Mission 1 Compliance)
-- Ensures users ONLY interact with their own visit records
DROP POLICY IF EXISTS "Users can view their own visits" ON visits;
CREATE POLICY "Users can view their own visits" ON visits
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own visits" ON visits;
CREATE POLICY "Users can create their own visits" ON visits
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own pending visits" ON visits;
CREATE POLICY "Users can update their own pending visits" ON visits
  FOR UPDATE USING (auth.uid() = user_id AND status = 'pending');

-- 6. Storage Setup & Security (Unstructured Data)
-- Create the bucket titled 'id-documents'
INSERT INTO storage.buckets (id, name, public)
VALUES ('id-documents', 'id-documents', false)
ON CONFLICT (id) DO NOTHING;

-- Policy for 'id-documents' bucket
-- Users can only upload and read files in their own folder (auth.uid())
DROP POLICY IF EXISTS "Users can upload their own ID scans" ON storage.objects;
CREATE POLICY "Users can upload their own ID scans"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'id-documents' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS "Users can view their own ID scans" ON storage.objects;
CREATE POLICY "Users can view their own ID scans"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'id-documents' AND (storage.foldername(name))[1] = auth.uid()::text);
