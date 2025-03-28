/*
  # User Avatars and Referral System

  1. New Tables
    - `user_profiles`
      - Stores user avatars and profile info
    - `referral_links`
      - Tracks referral codes and rewards
    - `referral_rewards`
      - Defines available rewards

  2. Security
    - Enable RLS on all tables
    - Add policies for secure access
*/

-- Create user profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL UNIQUE,
  display_name text,
  avatar_url text,
  initials text GENERATED ALWAYS AS (
    CASE 
      WHEN display_name IS NOT NULL THEN 
        LEFT(display_name, 1) || COALESCE(NULLIF(RIGHT(REGEXP_REPLACE(display_name, '^.* ', ''), 1), ''), '')
      ELSE 
        LEFT(SPLIT_PART(user_email, '@', 1), 2)
    END
  ) STORED,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create referral links table
CREATE TABLE IF NOT EXISTS referral_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  referral_code text NOT NULL UNIQUE DEFAULT nanoid(),
  clicks integer DEFAULT 0,
  successful_referrals integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create referral rewards table
CREATE TABLE IF NOT EXISTS referral_rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reward_type text NOT NULL,
  reward_name text NOT NULL,
  reward_description text NOT NULL,
  required_referrals integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_rewards ENABLE ROW LEVEL SECURITY;

-- Policies for user_profiles
CREATE POLICY "Allow users to view profiles"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow users to update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

-- Policies for referral_links
CREATE POLICY "Allow users to view own referral links"
  ON referral_links
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

CREATE POLICY "Allow users to create referral links"
  ON referral_links
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'email' = user_email);

-- Policies for referral_rewards
CREATE POLICY "Allow view rewards"
  ON referral_rewards
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert default referral rewards
INSERT INTO referral_rewards (reward_type, reward_name, reward_description, required_referrals) VALUES
  ('audit_boost', 'Premium Audit Boost', 'Get a detailed premium audit review', 1),
  ('badge', 'Referral Champion Badge', 'Exclusive badge for successful referrers', 3),
  ('discount', '20% Service Discount', 'Discount on your next automation package', 5)
ON CONFLICT DO NOTHING;