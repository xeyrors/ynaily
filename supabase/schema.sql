-- Profiles
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  username text UNIQUE,
  avatar_url text,
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin', 'curator')),
  created_at timestamptz DEFAULT now()
);

-- Thumbnails
CREATE TABLE thumbnails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id text UNIQUE,
  video_url text,
  title text NOT NULL,
  video_title text,
  channel_name text,
  thumbnail_url text NOT NULL,
  category text,
  style_tags text[],
  analysis text,
  likes_count integer DEFAULT 0,
  views_count integer DEFAULT 0,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  featured boolean DEFAULT false,
  submitted_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_thumbnails_status ON thumbnails(status);
CREATE INDEX idx_thumbnails_category ON thumbnails(category);
CREATE INDEX idx_thumbnails_featured ON thumbnails(featured);

-- Likes (Phase 2)
CREATE TABLE likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thumbnail_id uuid REFERENCES thumbnails(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(thumbnail_id, user_id)
);

CREATE INDEX idx_likes_thumbnail ON likes(thumbnail_id);
CREATE INDEX idx_likes_user ON likes(user_id);

-- RLS Policies
ALTER TABLE thumbnails ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Public can read approved thumbnails
CREATE POLICY "Public can view approved thumbnails"
  ON thumbnails FOR SELECT
  USING (status = 'approved');

-- Authenticated users can submit thumbnails
CREATE POLICY "Authenticated users can submit thumbnails"
  ON thumbnails FOR INSERT
  WITH CHECK (auth.uid() = submitted_by)
  WITH CHECK (status = 'pending');

-- Admin/curator can do anything
CREATE POLICY "Admins can manage thumbnails"
  ON thumbnails FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'curator')
    )
  );

-- Public can read profiles
CREATE POLICY "Public can view profiles"
  ON profiles FOR SELECT
  USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Users can manage their own likes
CREATE POLICY "Users can view own likes"
  ON likes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own likes"
  ON likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own likes"
  ON likes FOR DELETE
  USING (auth.uid() = user_id);

-- Storage bucket for thumbnails
INSERT INTO storage.buckets (id, name, public)
VALUES ('thumbnails', 'thumbnails', true);

CREATE POLICY "Public can view thumbnails"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'thumbnails');

CREATE POLICY "Authenticated users can upload thumbnails"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'thumbnails' AND auth.role() = 'authenticated');
