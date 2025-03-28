/*
  # Activity Tracking and Audit Storage Schema

  1. New Tables
    - `user_activities`
      - Tracks all user interactions and form submissions
      - Stores timestamps, actions, and related data
    - `saved_audits`
      - Stores user-saved audit data
      - Includes secure access tokens
  
  2. Security
    - Enable RLS on both tables
    - Add policies for secure access
*/

-- Create user activities table
CREATE TABLE IF NOT EXISTS user_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp timestamptz NOT NULL DEFAULT now(),
  user_email text NOT NULL,
  action text NOT NULL,
  page text NOT NULL,
  details jsonb DEFAULT '{}'::jsonb
);

-- Create saved audits table
CREATE TABLE IF NOT EXISTS saved_audits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  audit_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  access_token text NOT NULL UNIQUE
);

-- Enable RLS
ALTER TABLE user_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_audits ENABLE ROW LEVEL SECURITY;

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

-- Policies for saved_audits
CREATE POLICY "Allow admins to read all audits"
  ON saved_audits
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' LIKE '%@neurobotsystems.ai');

CREATE POLICY "Allow users to read their own audits"
  ON saved_audits
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

CREATE POLICY "Allow insert from client"
  ON saved_audits
  FOR INSERT
  TO authenticated
  WITH CHECK (true);