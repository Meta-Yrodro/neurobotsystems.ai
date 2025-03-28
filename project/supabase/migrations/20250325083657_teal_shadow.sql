/*
  # Gamification and Rewards Schema

  1. New Tables
    - `user_badges`
      - Stores earned badges and achievements
    - `reward_levels`
      - Tracks user progression and unlocks
    - `weekly_leaderboard`
      - Stores weekly engagement metrics
    - `user_rewards`
      - Tracks unlocked content and rewards

  2. Security
    - Enable RLS on all tables
    - Add policies for secure access
*/

-- Create user badges table
CREATE TABLE IF NOT EXISTS user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  badge_name text NOT NULL,
  badge_description text NOT NULL,
  badge_icon text NOT NULL,
  earned_date timestamptz NOT NULL DEFAULT now(),
  condition_met text NOT NULL
);

-- Create reward levels table
CREATE TABLE IF NOT EXISTS reward_levels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  current_level integer NOT NULL DEFAULT 1,
  level_name text NOT NULL,
  level_description text NOT NULL,
  unlocked_at timestamptz,
  next_level_xp integer NOT NULL,
  current_xp integer NOT NULL DEFAULT 0
);

-- Create weekly leaderboard table
CREATE TABLE IF NOT EXISTS weekly_leaderboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  week_start date NOT NULL,
  chatbot_interactions integer DEFAULT 0,
  form_submissions integer DEFAULT 0,
  audit_saves integer DEFAULT 0,
  call_bookings integer DEFAULT 0,
  page_depth_score integer DEFAULT 0,
  total_score integer GENERATED ALWAYS AS (
    chatbot_interactions * 10 +
    form_submissions * 20 +
    audit_saves * 30 +
    call_bookings * 40 +
    page_depth_score
  ) STORED,
  last_action_at timestamptz NOT NULL DEFAULT now()
);

-- Create user rewards table
CREATE TABLE IF NOT EXISTS user_rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  reward_type text NOT NULL CHECK (reward_type IN ('pdf', 'video', 'access')),
  reward_name text NOT NULL,
  unlock_condition text NOT NULL,
  unlocked_at timestamptz,
  content_url text NOT NULL
);

-- Enable RLS
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_rewards ENABLE ROW LEVEL SECURITY;

-- Policies for user_badges
CREATE POLICY "Users can view own badges"
  ON user_badges
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

CREATE POLICY "Allow badge inserts"
  ON user_badges
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policies for reward_levels
CREATE POLICY "Users can view own levels"
  ON reward_levels
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

CREATE POLICY "Allow level updates"
  ON reward_levels
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

-- Policies for weekly_leaderboard
CREATE POLICY "Anyone can view leaderboard"
  ON weekly_leaderboard
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own scores"
  ON weekly_leaderboard
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

-- Policies for user_rewards
CREATE POLICY "Users can view own rewards"
  ON user_rewards
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

CREATE POLICY "Allow reward unlocks"
  ON user_rewards
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

-- Insert default badges
INSERT INTO user_badges (user_email, badge_name, badge_description, badge_icon, condition_met) VALUES
  ('demo@example.com', '🚀 Onboarded', 'Completed the onboarding flow', '🚀', 'onboarding_complete'),
  ('demo@example.com', '🔍 Audit Ready', 'Saved or received first audit', '🔍', 'audit_saved'),
  ('demo@example.com', '🧠 System Starter', 'Engaged with all chatbot demos', '🧠', 'demos_complete'),
  ('demo@example.com', '💼 Client Activated', 'Booked a discovery call', '💼', 'call_booked'),
  ('demo@example.com', '🔁 Automation Deployed', 'Reached the Build service phase', '🔁', 'build_phase'),
  ('demo@example.com', '🏆 Inner Circle', 'On a monthly retainer plan', '🏆', 'retainer_active')
ON CONFLICT DO NOTHING;

-- Insert default rewards
INSERT INTO user_rewards (user_email, reward_type, reward_name, unlock_condition, content_url) VALUES
  ('demo@example.com', 'video', 'Behind the Scenes', 'complete_onboarding', 'https://videos.neurobotsystems.ai/behind-scenes'),
  ('demo@example.com', 'pdf', 'Automation Guide', 'save_audit', 'https://docs.neurobotsystems.ai/guide.pdf')
ON CONFLICT DO NOTHING;