/*
  # Advanced Platform Features Schema Update

  1. New Tables
    - `onboarding_chats`
      - Stores AI onboarding chat sessions and responses
    - `section_animations`
      - Tracks glitch animation preferences and timing
    - `ab_test_analytics`
      - Stores A/B test results with Google Sheets integration

  2. Security
    - Enable RLS on all tables
    - Add policies for secure access
*/

-- Create onboarding chats table
CREATE TABLE IF NOT EXISTS onboarding_chats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  user_name text,
  industry text,
  interests text[],
  chat_history jsonb NOT NULL DEFAULT '[]'::jsonb,
  completion_status text CHECK (completion_status IN ('in_progress', 'completed', 'abandoned')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create section animations table
CREATE TABLE IF NOT EXISTS section_animations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_name text NOT NULL,
  animation_type text NOT NULL,
  glitch_frequency integer DEFAULT 20, -- seconds
  enabled boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create ab test analytics table
CREATE TABLE IF NOT EXISTS ab_test_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id text NOT NULL,
  variant text NOT NULL CHECK (variant IN ('A', 'B')),
  session_id text NOT NULL,
  user_email text,
  completion_status boolean DEFAULT false,
  engagement_duration integer, -- seconds
  conversion_type text,
  google_sheets_sync_status text DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE onboarding_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_animations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_test_analytics ENABLE ROW LEVEL SECURITY;

-- Policies for onboarding_chats
CREATE POLICY "Allow insert chat sessions"
  ON onboarding_chats
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow users to read their own chats"
  ON onboarding_chats
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

-- Policies for section_animations
CREATE POLICY "Allow admins to manage animations"
  ON section_animations
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' LIKE '%@neurobotsystems.ai');

-- Policies for ab_test_analytics
CREATE POLICY "Allow insert test results"
  ON ab_test_analytics
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow admins to read analytics"
  ON ab_test_analytics
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' LIKE '%@neurobotsystems.ai');

-- Insert default section animations
INSERT INTO section_animations (section_name, animation_type) VALUES
  ('About NeuroBotSystems.ai', 'glitch-reveal'),
  ('How It Works', 'glitch-reveal'),
  ('Our Services', 'glitch-reveal'),
  ('Client Portal Preview', 'glitch-reveal'),
  ('Get Started', 'glitch-reveal'),
  ('Chatbot Demo', 'glitch-reveal')
ON CONFLICT DO NOTHING;