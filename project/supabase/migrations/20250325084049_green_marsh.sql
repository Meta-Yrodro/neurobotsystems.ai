/*
  # Leaderboard Actions and Feedback Schema

  1. New Tables
    - `leaderboard_actions`
      - Tracks user activity for leaderboard scoring
    - `feedback_messages`
      - Stores global feedback bar messages
  
  2. Security
    - Enable RLS on all tables
    - Add policies for secure access
*/

-- Create leaderboard actions table
CREATE TABLE IF NOT EXISTS leaderboard_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  action_type text NOT NULL,
  points integer NOT NULL,
  timestamp timestamptz NOT NULL DEFAULT now()
);

-- Create feedback messages table
CREATE TABLE IF NOT EXISTS feedback_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_type text NOT NULL,
  message_template text NOT NULL,
  conditions jsonb NOT NULL,
  priority integer DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE leaderboard_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_messages ENABLE ROW LEVEL SECURITY;

-- Policies for leaderboard_actions
CREATE POLICY "Allow insert actions"
  ON leaderboard_actions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow users to view own actions"
  ON leaderboard_actions
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

-- Policies for feedback_messages
CREATE POLICY "Allow view messages"
  ON feedback_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert default feedback messages
INSERT INTO feedback_messages (message_type, message_template, conditions, priority) VALUES
  ('welcome_back', 'Welcome back, {name}! You''ve saved {count} audits.', 
   '{"has_audits": true}', 1),
  ('level_up', 'Almost there! {remaining_xp} XP until your next badge!',
   '{"near_level": true}', 2),
  ('leaderboard', '🔥 You''re #{position} on the leaderboard this week!',
   '{"in_top_10": true}', 3)
ON CONFLICT DO NOTHING;