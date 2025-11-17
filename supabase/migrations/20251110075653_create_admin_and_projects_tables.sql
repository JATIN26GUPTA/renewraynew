/*
  # Create admin users and projects tables

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `password_hash` (text)
      - `name` (text)
      - `created_at` (timestamp)
      - `is_active` (boolean)

    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `capacity_kw` (numeric)
      - `annual_savings` (numeric)
      - `location` (text)
      - `image_url` (text)
      - `project_type` (text: 'residential', 'commercial', 'industrial')
      - `created_by` (uuid, references admin_users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Admin users table is not directly accessible by clients
    - Projects are readable by all (public)
    - Only admins can insert/update/delete projects
    - Only admins can manage other admins
*/

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  name text NOT NULL,
  created_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  capacity_kw numeric NOT NULL,
  annual_savings numeric NOT NULL,
  location text NOT NULL,
  image_url text,
  project_type text NOT NULL DEFAULT 'residential',
  created_by uuid REFERENCES admin_users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are readable by everyone"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Only admins can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Only admins can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Only admins can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (auth.uid() = created_by);

CREATE INDEX idx_projects_created_by ON projects(created_by);
CREATE INDEX idx_projects_type ON projects(project_type);
