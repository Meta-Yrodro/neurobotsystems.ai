/*
  # Advanced Gamification Schema

  1. New Tables
    - `industry_badges`
      - Stores industry-specific badges and achievements
    - `user_progression`
      - Tracks user level and progress
    - `easter_eggs`
      - Tracks hidden features and unlocks
    - `feedback_bar_messages`
      - Stores dynamic feedback messages

  2. Security
    - Enable RLS on all tables
    - Add policies for secure access
*/

-- Create industry badges table
CREATE TABLE IF NOT EXISTS industry_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  industry text NOT NULL,
  badge_name text NOT NULL,
  badge_icon text NOT NULL,
  badge_description text,
  animation_type text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create user progression table
CREATE TABLE IF NOT EXISTS user_progression (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  current_level integer NOT NULL DEFAULT 1,
  xp_points integer NOT NULL DEFAULT 0,
  completed_steps text[] DEFAULT ARRAY[]::text[],
  next_milestone text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create easter eggs table
CREATE TABLE IF NOT EXISTS easter_eggs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  egg_name text NOT NULL,
  trigger_condition jsonb NOT NULL,
  reward_type text NOT NULL,
  reward_content text NOT NULL,
  discovered_by text[],
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create feedback bar messages table
CREATE TABLE IF NOT EXISTS feedback_bar_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_type text NOT NULL,
  message_template text NOT NULL,
  trigger_condition text NOT NULL,
  priority integer DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE industry_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progression ENABLE ROW LEVEL SECURITY;
ALTER TABLE easter_eggs ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_bar_messages ENABLE ROW LEVEL SECURITY;

-- Policies for industry_badges
CREATE POLICY "Allow view badges"
  ON industry_badges
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for user_progression
CREATE POLICY "Allow users to view own progression"
  ON user_progression
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

CREATE POLICY "Allow update own progression"
  ON user_progression
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

-- Policies for easter_eggs
CREATE POLICY "Allow view discovered eggs"
  ON easter_eggs
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = ANY(discovered_by));

-- Policies for feedback_bar_messages
CREATE POLICY "Allow view messages"
  ON feedback_bar_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert default industry badges
INSERT INTO industry_badges (industry, badge_name, badge_icon, badge_description, animation_type) VALUES
  ('automotive', 'Automotive Innovator', '🚗', 'Pioneering automation in the automotive industry', 'bounce'),
  ('tech', 'Tech Optimizer', '💻', 'Streamlining tech operations with AI', 'glow'),
  ('real_estate', 'Real Estate Automator', '🏡', 'Revolutionizing real estate processes', 'pulse'),
  ('lead_gen', 'Lead Gen Master', '📊', 'Mastering automated lead generation', 'shine'),
  ('general', 'AI Curious Explorer', '🤖', 'Taking the first steps into AI automation', 'float')
ON CONFLICT DO NOTHING;

-- Insert default easter eggs
INSERT INTO easter_eggs (egg_name, trigger_condition, reward_type, reward_content) VALUES
  ('Super User', 
   '{"chatbot_views": 3, "onboarding_complete": true, "cta_clicks": 3}', 
   'pdf', 
   'https://docs.neurobotsystems.ai/secret-toolkit.pdf'),
  ('Early Adopter',
   '{"pages_viewed": ["home", "learn", "start"], "scroll_depth": 90}',
   'video',
   'https://videos.neurobotsystems.ai/exclusive-tips')
ON CONFLICT DO NOTHING;

-- Insert default feedback messages
INSERT INTO feedback_bar_messages (message_type, message_template, trigger_condition, priority) VALUES
  ('welcome_back', 'Welcome back, {name}. You''ve saved {count} audit(s).', 'has_saved_audits', 1),
  ('level_up', 'You''re one step away from unlocking your next badge!', 'near_level_up', 2),
  ('leaderboard', '🔥 This week''s automation leaderboard: You''re #{position}!', 'in_top_10', 3)
ON CONFLICT DO NOTHING;