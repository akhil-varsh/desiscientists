/*
  # Initial Schema Setup

  1. New Tables
    - profiles
      - id (uuid, references auth.users)
      - username (text)
      - avatar_url (text)
      - created_at (timestamp)
    - files
      - id (uuid)
      - name (text)
      - file_url (text)
      - user_id (uuid, references profiles)
      - created_at (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users PRIMARY KEY,
  username text UNIQUE,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create files table
CREATE TABLE IF NOT EXISTS files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  file_url text NOT NULL,
  user_id uuid REFERENCES profiles(id) NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own files"
  ON files
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upload their own files"
  ON files
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create a trigger to create a profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();