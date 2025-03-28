/*
  # Enhanced Onboarding Gamification Schema

  1. New Tables
    - `user_badges`
      - Stores earned badges and achievements
      - Tracks unlock conditions and timestamps
    - `leaderboard_stats`
      - Tracks user activity metrics for leaderboard
    - `unlockable_content`
      - Stores gated content like PDFs and videos
      - Tracks access conditions and user unlocks

  2. Security
    - Enable RLS on all tables
    - Add policies for secure access
*/

-- Create user badges table
CREATE TABLE IF NOT EXISTS user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  badge_type text NOT NULL,
  badge_name text NOT NULL,
  badge_description text,
  unlock_condition text,
  unlocked_at timestamptz NOT NULL DEFAULT now()
);

-- Create leaderboard stats table
CREATE TABLE IF NOT EXISTS leaderboard_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  activity_type text NOT NULL,
  activity_count integer DEFAULT 1,
  last_active timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create unlockable content table
CREATE TABLE IF NOT EXISTS unlockable_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type text NOT NULL,
  title text NOT NULL,
  description text,
  url text NOT NULL,
  unlock_condition text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create user unlocks table
CREATE TABLE IF NOT EXISTS user_unlocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  content_id uuid REFERENCES unlockable_content(id),
  unlocked_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE unlockable_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_unlocks ENABLE ROW LEVEL SECURITY;

-- Policies for user_badges
CREATE POLICY "Allow users to view own badges"
  ON user_badges
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

CREATE POLICY "Allow insert badges"
  ON user_badges
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policies for leaderboard_stats
CREATE POLICY "Allow view leaderboard"
  ON leaderboard_stats
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow update own stats"
  ON leaderboard_stats
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

-- Policies for unlockable_content
CREATE POLICY "Allow view unlockable content"
  ON unlockable_content
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for user_unlocks
CREATE POLICY "Allow users to view own unlocks"
  ON user_unlocks
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

CREATE POLICY "Allow insert unlocks"
  ON user_unlocks
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert default unlockable content
INSERT INTO unlockable_content (content_type, title, description, url, unlock_condition) VALUES
  ('video', 'Behind the Scenes of Our AI Stack', 'An exclusive look at how we build and deploy AI systems', 'https://videos.neurobotsystems.ai/behind-scenes', 'complete_onboarding'),
  ('pdf', 'Top 5 Automations Guide', 'Detailed guide on implementing key automations', 'https://docs.neurobotsystems.ai/top-5-guide.pdf', 'complete_onboarding')
ON CONFLICT DO NOTHING;