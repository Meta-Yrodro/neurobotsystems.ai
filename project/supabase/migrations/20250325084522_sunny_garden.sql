/*
  # Enhanced Gamification Features

  1. New Tables
    - `realtime_leaderboard`
      - Stores current user rankings and scores
      - Updates automatically via triggers
    - `level_up_notifications`
      - Tracks email notifications for level ups
    - `printable_certificates`
      - Stores certificate templates and user achievements

  2. Security
    - Enable RLS on all tables
    - Add policies for secure access
*/

-- Create realtime leaderboard table
CREATE TABLE IF NOT EXISTS realtime_leaderboard (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  current_rank integer,
  previous_rank integer,
  total_points integer NOT NULL DEFAULT 0,
  last_action text,
  last_action_time timestamptz NOT NULL DEFAULT now(),
  rank_change_direction text GENERATED ALWAYS AS (
    CASE 
      WHEN current_rank < previous_rank THEN '🔼'
      WHEN current_rank > previous_rank THEN '🔽'
      ELSE '='
    END
  ) STORED
);

-- Create level up notifications table
CREATE TABLE IF NOT EXISTS level_up_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  new_level integer NOT NULL,
  badge_name text,
  notification_sent boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create printable certificates table
CREATE TABLE IF NOT EXISTS printable_certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  certificate_type text NOT NULL,
  achievement_name text NOT NULL,
  earned_date timestamptz NOT NULL DEFAULT now(),
  template_data jsonb NOT NULL,
  pdf_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE realtime_leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE level_up_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE printable_certificates ENABLE ROW LEVEL SECURITY;

-- Policies for realtime_leaderboard
CREATE POLICY "Allow view leaderboard"
  ON realtime_leaderboard
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow update own rank"
  ON realtime_leaderboard
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

-- Policies for level_up_notifications
CREATE POLICY "Allow view own notifications"
  ON level_up_notifications
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

CREATE POLICY "Allow insert notifications"
  ON level_up_notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policies for printable_certificates
CREATE POLICY "Allow view own certificates"
  ON printable_certificates
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

CREATE POLICY "Allow create certificates"
  ON printable_certificates
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Function to update leaderboard ranks
CREATE OR REPLACE FUNCTION update_leaderboard_ranks()
RETURNS TRIGGER AS $$
BEGIN
  -- Store previous rank
  UPDATE realtime_leaderboard
  SET previous_rank = current_rank
  WHERE user_email = NEW.user_email;
  
  -- Calculate new ranks for all users
  WITH ranked AS (
    SELECT 
      user_email,
      ROW_NUMBER() OVER (ORDER BY total_points DESC) as new_rank
    FROM realtime_leaderboard
  )
  UPDATE realtime_leaderboard l
  SET current_rank = r.new_rank
  FROM ranked r
  WHERE l.user_email = r.user_email;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update ranks on point changes
CREATE TRIGGER update_ranks_trigger
AFTER UPDATE OF total_points ON realtime_leaderboard
FOR EACH ROW
EXECUTE FUNCTION update_leaderboard_ranks();