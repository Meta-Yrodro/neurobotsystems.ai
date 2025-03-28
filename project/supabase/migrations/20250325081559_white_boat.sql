/*
  # Create Activities Table

  1. New Tables
    - `user_activities`
      - Tracks all user interactions and form submissions
      - Stores timestamps, actions, and related data
  
  2. Security
    - Enable RLS
    - Add policies for secure access
*/

-- Create user activities table if it doesn't exist
CREATE TABLE IF NOT EXISTS user_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp timestamptz NOT NULL DEFAULT now(),
  user_email text NOT NULL,
  action text NOT NULL,
  page text NOT NULL,
  details jsonb DEFAULT '{}'::jsonb
);

-- Enable RLS
ALTER TABLE user_activities ENABLE ROW LEVEL SECURITY;

-- Policies for user_activities
CREATE POLICY "Allow admins to read all activities"
  ON user_activities
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' LIKE '%@neurobotsystems.ai');

CREATE POLICY "Allow users to read their own activities"
  ON user_activities
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

CREATE POLICY "Allow insert from client"
  ON user_activities
  FOR INSERT
  TO authenticated
  WITH CHECK (true);