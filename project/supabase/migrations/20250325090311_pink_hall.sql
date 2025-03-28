/*
  # Reward System Schema

  1. New Tables
    - `user_rewards`
      - Tracks claimed rewards and their status
    - `reward_templates`
      - Stores reward definitions and requirements
    - `reward_history`
      - Logs all reward-related activities

  2. Security
    - Enable RLS on all tables
    - Add policies for secure access
*/

-- Create reward templates table
CREATE TABLE IF NOT EXISTS reward_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  points_required integer NOT NULL,
  reward_type text NOT NULL CHECK (reward_type IN ('discount', 'pdf', 'badge', 'feature')),
  content_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create user rewards table
CREATE TABLE IF NOT EXISTS user_rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  template_id uuid REFERENCES reward_templates(id),
  claimed_at timestamptz NOT NULL DEFAULT now(),
  points_spent integer NOT NULL,
  status text NOT NULL CHECK (status IN ('active', 'completed', 'expired')),
  expiration_date timestamptz,
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Create reward history table
CREATE TABLE IF NOT EXISTS reward_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  reward_id uuid REFERENCES user_rewards(id),
  action text NOT NULL,
  points_change integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE reward_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_history ENABLE ROW LEVEL SECURITY;

-- Policies for reward_templates
CREATE POLICY "Allow view templates"
  ON reward_templates
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for user_rewards
CREATE POLICY "Allow users to view own rewards"
  ON user_rewards
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

CREATE POLICY "Allow users to claim rewards"
  ON user_rewards
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'email' = user_email);

-- Policies for reward_history
CREATE POLICY "Allow users to view own history"
  ON reward_history
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email);

-- Insert default reward templates
INSERT INTO reward_templates (name, description, points_required, reward_type, content_url) VALUES
  ('Automation Mastery Guide', 'Exclusive PDF guide with pro automation tips', 50, 'pdf', 'https://assets.neurobotsystems.ai/guides/mastery.pdf'),
  ('Automation Pioneer Badge', 'Show off your automation expertise', 100, 'badge', null),
  ('5% Package Discount', 'Save on your next automation package', 200, 'discount', null),
  ('10% Retainer Discount', 'Save on monthly retainer fees', 400, 'discount', null),
  ('Hall of Fame Feature', 'Get featured on our Hall of Fame', 500, 'feature', null)
ON CONFLICT DO NOTHING;