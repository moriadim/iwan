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
  category TEXT DEFAULT 'Luxury Villa',
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

-- 4. Visits/Interactions Table
CREATE TABLE IF NOT EXISTS visits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  unit_id UUID REFERENCES units(id) ON DELETE CASCADE,
  visit_date DATE NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
  id_document_url TEXT, -- Path in Supabase Storage
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;

-- 5.1 Units Policies (Publicly readable structured data)
DROP POLICY IF EXISTS "Units are readable by everyone" ON units;
CREATE POLICY "Units are readable by everyone" ON units
  FOR SELECT USING (true);

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
