/*
  # Create asset interactions tables

  1. New Tables
    - `asset_likes`
      - `asset_id` (uuid, references assets)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamp)
    - `asset_views`
      - `asset_id` (uuid, references assets)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create asset_likes table
CREATE TABLE IF NOT EXISTS asset_likes (
  asset_id uuid REFERENCES assets ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (asset_id, user_id)
);

-- Create asset_views table
CREATE TABLE IF NOT EXISTS asset_views (
  asset_id uuid REFERENCES assets ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (asset_id, user_id)
);

-- Enable RLS
ALTER TABLE asset_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE asset_views ENABLE ROW LEVEL SECURITY;

-- Policies for asset_likes
CREATE POLICY "Users can like assets"
  ON asset_likes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view likes"
  ON asset_likes
  FOR SELECT
  TO public
  USING (true);

-- Policies for asset_views
CREATE POLICY "Users can view assets"
  ON asset_views
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can see views"
  ON asset_views
  FOR SELECT
  TO public
  USING (true);