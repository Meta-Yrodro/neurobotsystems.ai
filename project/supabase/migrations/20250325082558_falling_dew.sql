/*
  # Analytics and A/B Testing Features

  1. New Tables
    - `chatbot_poll_responses`
      - Stores user feedback from chatbot preference polls
    - `ab_test_results`
      - Tracks A/B test performance data
    - `onboarding_sessions`
      - Stores user onboarding flow data
  
  2. Security
    - Enable RLS on all tables
    - Add appropriate policies
*/

-- Create chatbot poll responses table
CREATE TABLE IF NOT EXISTS chatbot_poll_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  user_email text,
  selected_bot text NOT NULL,
  timestamp timestamptz NOT NULL DEFAULT now(),
  additional_feedback text
);

-- Create A/B test results table
CREATE TABLE IF NOT EXISTS ab_test_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  test_name text NOT NULL,
  variant text NOT NULL CHECK (variant IN ('A', 'B')),
  completion_status boolean DEFAULT false,
  engagement_time integer, -- in seconds
  messages_sent integer DEFAULT 0,
  timestamp timestamptz NOT NULL DEFAULT now()
);

-- Create onboarding sessions table
CREATE TABLE IF NOT EXISTS onboarding_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  user_name text,
  industry text,
  service_interest text,
  completion_status text CHECK (completion_status IN ('started', 'completed', 'abandoned')),
  created_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);

-- Enable RLS
ALTER TABLE chatbot_poll_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_sessions ENABLE ROW LEVEL SECURITY;

-- Policies for chatbot_poll_responses
CREATE POLICY "Allow insert poll responses"
  ON chatbot_poll_responses
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow admins to read poll responses"
  ON chatbot_poll_responses
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' LIKE '%@neurobotsystems.ai');

-- Policies for ab_test_results
CREATE POLICY "Allow insert test results"
  ON ab_test_results
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow admins to read test results"
  ON ab_test_results
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' LIKE '%@neurobotsystems.ai');

-- Policies for onboarding_sessions
CREATE POLICY "Allow insert onboarding sessions"
  ON onboarding_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow admins to read onboarding sessions"
  ON onboarding_sessions
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' LIKE '%@neurobotsystems.ai');