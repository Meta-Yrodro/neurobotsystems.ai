/*
  # Enhanced Badge and Animation Settings

  1. New Tables
    - `badge_animations`
      - Stores animation configurations for different badge levels
    - `celebration_events`
      - Tracks when and how celebrations are triggered
  
  2. Security
    - Enable RLS on all tables
    - Add policies for secure access
*/

-- Create badge animations table
CREATE TABLE IF NOT EXISTS badge_animations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  badge_type text NOT NULL,
  level integer NOT NULL CHECK (level BETWEEN 1 AND 5),
  animation_effect text NOT NULL,
  animation_duration decimal NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create celebration events table
CREATE TABLE IF NOT EXISTS celebration_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  event_type text NOT NULL CHECK (event_type IN ('level_up', 'badge_unlock', 'completion')),
  event_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE badge_animations ENABLE ROW LEVEL SECURITY;
ALTER TABLE celebration_events ENABLE ROW LEVEL SECURITY;

-- Policies for badge_animations
CREATE POLICY "Allow view animations"
  ON badge_animations
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for celebration_events
CREATE POLICY "Allow insert celebrations"
  ON celebration_events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow users to view own celebrations"
  ON celebration_events
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

-- Insert default badge animations
INSERT INTO badge_animations (badge_type, level, animation_effect, animation_duration) VALUES
  ('automotive', 1, 'glow', 2.0),
  ('automotive', 2, 'pulse', 1.5),
  ('automotive', 3, 'orbit', 3.0),
  ('automotive', 4, 'circuit', 2.5),
  ('automotive', 5, 'glitch', 2.0),
  ('tech', 1, 'glow', 2.0),
  ('tech', 2, 'pulse', 1.5),
  ('tech', 3, 'orbit', 3.0),
  ('tech', 4, 'circuit', 2.5),
  ('tech', 5, 'glitch', 2.0)
ON CONFLICT DO NOTHING;