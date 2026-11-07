-- ==============================================================================
-- AppNova – Supabase Database Schema & Setup Script
-- Run this in your Supabase Project -> SQL Editor -> Click 'Run'
-- ==============================================================================

-- 1. Create Categories Table
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon_name TEXT DEFAULT 'LayoutGrid',
    type TEXT DEFAULT 'app',
    color TEXT DEFAULT '#1677FF',
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Apps Table
CREATE TABLE IF NOT EXISTS public.apps (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    developer TEXT NOT NULL,
    category TEXT NOT NULL,
    type TEXT DEFAULT 'app',
    icon TEXT NOT NULL,
    banner TEXT,
    rating NUMERIC(2,1) DEFAULT 4.5,
    reviews_count TEXT DEFAULT '1M reviews',
    downloads TEXT DEFAULT '10M+',
    size TEXT NOT NULL,
    version TEXT NOT NULL,
    last_updated TEXT NOT NULL,
    min_android TEXT DEFAULT 'Android 8.0 and up',
    package_name TEXT NOT NULL,
    description TEXT NOT NULL,
    whats_new JSONB DEFAULT '[]'::jsonb,
    screenshots JSONB DEFAULT '[]'::jsonb,
    apk_url TEXT NOT NULL,
    sha256 TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT false,
    is_trending BOOLEAN DEFAULT false,
    is_popular BOOLEAN DEFAULT false,
    tags JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
    id TEXT PRIMARY KEY,
    app_id TEXT REFERENCES public.apps(id) ON DELETE CASCADE,
    user_name TEXT NOT NULL,
    user_avatar TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    date TEXT NOT NULL,
    comment TEXT NOT NULL,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable Row Level Security (RLS) with Public Access for App Store
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Allow public read access to everyone
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Apps" ON public.apps FOR SELECT USING (true);
CREATE POLICY "Public Read Reviews" ON public.reviews FOR SELECT USING (true);

-- Allow write/update/delete operations
CREATE POLICY "Allow All Insert Apps" ON public.apps FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow All Update Apps" ON public.apps FOR UPDATE USING (true);
CREATE POLICY "Allow All Delete Apps" ON public.apps FOR DELETE USING (true);

CREATE POLICY "Allow All Insert Categories" ON public.categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow All Delete Categories" ON public.categories FOR DELETE USING (true);

CREATE POLICY "Allow All Insert Reviews" ON public.reviews FOR INSERT WITH CHECK (true);

-- 5. Storage Bucket for APKs and Assets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('app-files', 'app-files', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Read App Files" ON storage.objects 
FOR SELECT USING (bucket_id = 'app-files');

CREATE POLICY "Allow Upload App Files" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'app-files');

-- ==============================================================================
-- 6. Initial Seed Data (WhatsApp, Instagram, Telegram, Spotify, Minecraft, etc.)
-- ==============================================================================

INSERT INTO public.categories (id, name, icon_name, type, color, description)
VALUES
('communication', 'Communication', 'MessageSquare', 'app', '#1677FF', 'Chat, call, and connect with friends'),
('social', 'Social', 'Users', 'app', '#E1306C', 'Share photos, moments, and reels'),
('music-audio', 'Music & Audio', 'Music', 'app', '#1DB954', 'Stream millions of tracks and podcasts'),
('action-games', 'Action', 'Gamepad2', 'game', '#F5222D', 'Battle royales and tactical combat'),
('sandbox-games', 'Simulation', 'Boxes', 'game', '#52C41A', 'Build worlds, survive, and explore')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.apps (
    id, name, developer, category, type, icon, banner, rating, reviews_count, 
    downloads, size, version, last_updated, min_android, package_name, description, 
    whats_new, screenshots, apk_url, sha256, is_featured, is_trending, is_popular, tags
)
VALUES
(
    'whatsapp-messenger',
    'WhatsApp Messenger',
    'WhatsApp LLC',
    'Communication',
    'app',
    'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=160&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=1000&auto=format&fit=crop&q=80',
    4.3,
    '198M reviews',
    '5B+',
    '84.2 MB',
    '2.24.22.79',
    'Nov 3, 2026',
    'Android 5.0 and up',
    'com.whatsapp',
    'Simple, reliable, private messaging and video calling across mobile and desktop.',
    '["Create events in communities", "Default HD photo sharing", "Video call performance enhancements"]'::jsonb,
    '["https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=600&auto=format&fit=crop&q=80"]'::jsonb,
    'https://appnova.internal/download/com.whatsapp.apk',
    '9f83c18b76c8137cd9e6931557d34199c0dae858db1ee6986cf339e76fef78a1',
    true, true, true,
    '["Messaging", "Calls", "Encrypted", "Meta"]'::jsonb
),
(
    'free-fire-max',
    'Free Fire MAX',
    'Garena International I',
    'Action',
    'game',
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=160&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1000&auto=format&fit=crop&q=80',
    4.4,
    '158M reviews',
    '100M+',
    '640.8 MB',
    '2.106.1',
    'Oct 30, 2026',
    'Android 5.0 and up',
    'com.dts.freefiremax',
    'Free Fire MAX delivers premium gameplay experience in Battle Royale with Ultra HD resolution.',
    '["New Bermuda map overhaul", "Clash Squad Season 27 ranked rewards"]'::jsonb,
    '["https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80"]'::jsonb,
    'https://appnova.internal/download/com.dts.freefiremax.apk',
    '9182370912bcaf81928371908230918237190823719028371092837190823701',
    true, true, true,
    '["Battle Royale", "Action", "Multiplayer"]'::jsonb
)
ON CONFLICT (id) DO NOTHING;
