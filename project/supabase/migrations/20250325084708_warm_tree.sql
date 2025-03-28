/*
  # Social Sharing and Visibility Features

  1. New Tables
    - `social_shares`
      - Tracks certificate and badge shares
      - Stores share metrics and platforms
    - `hall_of_fame`
      - Stores top users and their achievements
    - `badge_popups`
      - Manages unseen badge notifications

  2. Security
    - Enable RLS on all tables
    - Add policies for secure access
*/

-- Create social shares table
CREATE TABLE IF NOT EXISTS social_shares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  share_type text NOT NULL CHECK (share_type IN ('certificate', 'badge')),
  platform text NOT NULL CHECK (platform IN ('linkedin', 'twitter', 'facebook')),
  content_id text NOT NULL,
  share_url text,
  share_count integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create hall of fame table
CREATE TABLE IF NOT EXISTS hall_of_fame (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  rank integer NOT NULL,
  total_points integer NOT NULL DEFAULT 0,
  badges_earned integer NOT NULL DEFAULT 0,
  featured_badge text,
  featured_achievement text,
  last_active timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create badge popups table
CREATE TABLE IF NOT EXISTS badge_popups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  badge_id text NOT NULL,
  badge_name text NOT NULL,
  seen boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE social_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE hall_of_fame ENABLE ROW LEVEL SECURITY;
ALTER TABLE badge_popups ENABLE ROW LEVEL SECURITY;

-- Policies for social_shares
CREATE POLICY "Allow users to view own shares"
  ON social_shares
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

CREATE POLICY "Allow insert shares"
  ON social_shares
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policies for hall_of_fame
CREATE POLICY "Allow view hall of fame"
  ON hall_of_fame
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for badge_popups
CREATE POLICY "Allow users to view own popups"
  ON badge_popups
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

CREATE POLICY "Allow update own popups"
  ON badge_popups
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);