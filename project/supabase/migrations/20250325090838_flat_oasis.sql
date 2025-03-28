/*
  # Admin Control System Schema

  1. New Tables
    - `user_roles`
      - Stores user role assignments
    - `admin_activity_log`
      - Tracks admin actions and page views
    - `preview_tokens`
      - Manages admin preview access

  2. Security
    - Enable RLS on all tables
    - Add policies for secure access
*/

-- Create user roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL UNIQUE,
  role text NOT NULL CHECK (role IN ('admin', 'user')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create admin activity log table
CREATE TABLE IF NOT EXISTS admin_activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_email text NOT NULL,
  action text NOT NULL,
  page_path text,
  preview_mode boolean DEFAULT false,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create preview tokens table
CREATE TABLE IF NOT EXISTS preview_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token text NOT NULL UNIQUE,
  page_path text NOT NULL,
  created_by text NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE preview_tokens ENABLE ROW LEVEL SECURITY;

-- Policies for user_roles
CREATE POLICY "Allow admins to manage roles"
  ON user_roles
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'neurobotsystems.ai@gmail.com');

-- Policies for admin_activity_log
CREATE POLICY "Allow admins to view logs"
  ON admin_activity_log
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'neurobotsystems.ai@gmail.com');

CREATE POLICY "Allow admins to create logs"
  ON admin_activity_log
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'email' = 'neurobotsystems.ai@gmail.com');

-- Policies for preview_tokens
CREATE POLICY "Allow admins to manage preview tokens"
  ON preview_tokens
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'neurobotsystems.ai@gmail.com');

-- Insert admin user
INSERT INTO user_roles (user_email, role) 
VALUES ('neurobotsystems.ai@gmail.com', 'admin')
ON CONFLICT (user_email) DO NOTHING;