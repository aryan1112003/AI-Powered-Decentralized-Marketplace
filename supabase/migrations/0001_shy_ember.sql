/*
  # Create assets table and related functions

  1. New Tables
    - `assets`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `price` (numeric)
      - `image` (text)
      - `category` (enum: NFT, Data, Service)
      - `creator_id` (uuid, references auth.users)
      - `created_at` (timestamp)
      - `likes` (integer)
      - `views` (integer)

  2. Security
    - Enable RLS on `assets` table
    - Add policies for:
      - Anyone can view assets
      - Only authenticated users can create assets
      - Only creators can update their assets
*/

-- Create enum for asset categories
CREATE TYPE asset_category AS ENUM ('NFT', 'Data', 'Service');

-- Create assets table
CREATE TABLE IF NOT EXISTS assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  image text NOT NULL,
  category asset_category NOT NULL,
  creator_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  likes integer DEFAULT 0,
  views integer DEFAULT 0
);

-- Enable RLS
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view assets"
  ON assets
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create assets"
  ON assets
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update their own assets"
  ON assets
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = creator_id);