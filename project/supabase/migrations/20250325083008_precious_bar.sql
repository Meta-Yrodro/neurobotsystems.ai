/*
  # Enhanced Onboarding Experience Schema

  1. New Tables
    - `onboarding_progress`
      - Tracks user progress through onboarding flow
      - Stores XP and completion metrics
    - `onboarding_feedback`
      - Collects user feedback and suggestions
    - `animation_preferences`
      - Stores per-section animation settings

  2. Security
    - Enable RLS on all tables
    - Add policies for secure access
*/

-- Create onboarding progress table
CREATE TABLE IF NOT EXISTS onboarding_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  user_email text,
  current_step integer NOT NULL DEFAULT 1,
  total_steps integer NOT NULL DEFAULT 5,
  xp_points integer NOT NULL DEFAULT 0,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create onboarding feedback table
CREATE TABLE IF NOT EXISTS onboarding_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  user_email text,
  rating text NOT NULL CHECK (rating IN ('😎', '🙂', '😐', '😕')),
  feedback_text text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create animation preferences table
CREATE TABLE IF NOT EXISTS animation_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_name text NOT NULL,
  animation_type text NOT NULL CHECK (animation_type IN ('on-scroll', 'always-on')),
  repeat_interval integer, -- in seconds, for always-on
  enabled boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE onboarding_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE animation_preferences ENABLE ROW LEVEL SECURITY;

-- Policies for onboarding_progress
CREATE POLICY "Allow insert progress"
  ON onboarding_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow users to read own progress"
  ON onboarding_progress
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

-- Policies for onboarding_feedback
CREATE POLICY "Allow insert feedback"
  ON onboarding_feedback
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow admins to read feedback"
  ON onboarding_feedback
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' LIKE '%@neurobotsystems.ai');

-- Policies for animation_preferences
CREATE POLICY "Allow admins to manage animations"
  ON animation_preferences
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' LIKE '%@neurobotsystems.ai');

-- Insert default animation preferences
INSERT INTO animation_preferences (section_name, animation_type) VALUES
  ('hero', 'always-on'),
  ('about', 'on-scroll'),
  ('services', 'on-scroll'),
  ('testimonials', 'on-scroll'),
  ('pricing', 'on-scroll'),
  ('contact', 'on-scroll')
ON CONFLICT DO NOTHING;