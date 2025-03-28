/*
  # Add Audit Expiration and Feedback Features

  1. New Tables
    - `audit_settings`
      - Stores configurable settings like expiration time
    - `chatbot_feedback`
      - Stores user feedback on chatbot demos
  
  2. Changes
    - Add expiration_date to saved_audits table
    - Add status column to saved_audits table
  
  3. Security
    - Enable RLS on new tables
    - Add appropriate policies
*/

-- Add expiration and status to saved_audits
ALTER TABLE saved_audits 
ADD COLUMN expiration_date timestamptz NOT NULL DEFAULT (now() + interval '7 days'),
ADD COLUMN status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'expired'));

-- Create audit settings table
CREATE TABLE IF NOT EXISTS audit_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text UNIQUE NOT NULL,
  setting_value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create chatbot feedback table
CREATE TABLE IF NOT EXISTS chatbot_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text,
  demo_type text NOT NULL,
  rating int NOT NULL CHECK (rating >= 1 AND rating <= 5),
  feedback_text text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE audit_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE chatbot_feedback ENABLE ROW LEVEL SECURITY;

-- Policies for audit_settings
CREATE POLICY "Allow admins full access to settings"
  ON audit_settings
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' LIKE '%@neurobotsystems.ai');

-- Policies for chatbot_feedback
CREATE POLICY "Allow insert feedback"
  ON chatbot_feedback
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow admins to read feedback"
  ON chatbot_feedback
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' LIKE '%@neurobotsystems.ai');

-- Insert default expiration setting
INSERT INTO audit_settings (setting_key, setting_value) 
VALUES ('audit_expiration_days', '7'::jsonb)
ON CONFLICT (setting_key) DO NOTHING;