-- Create diagnostic_submissions table
CREATE TABLE public.diagnostic_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  first_name TEXT NOT NULL,
  email TEXT NOT NULL,
  business_name TEXT,
  responses JSONB NOT NULL,
  total_score INTEGER NOT NULL,
  stage TEXT NOT NULL,
  ai_tier TEXT NOT NULL,
  section_scores JSONB NOT NULL,
  constraint_name TEXT NOT NULL
);

-- Enable RLS
ALTER TABLE public.diagnostic_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (public diagnostic tool)
CREATE POLICY "Anyone can submit diagnostics"
  ON public.diagnostic_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users can read (admin access)
CREATE POLICY "Authenticated users can read submissions"
  ON public.diagnostic_submissions
  FOR SELECT
  TO authenticated
  USING (true);