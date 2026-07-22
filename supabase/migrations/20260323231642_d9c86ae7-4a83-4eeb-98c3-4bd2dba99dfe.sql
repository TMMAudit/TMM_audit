-- Drop the authenticated-only SELECT policy and replace with one that includes anon
-- This is MVP; the admin page has a client-side password gate
DROP POLICY IF EXISTS "Authenticated users can read submissions" ON public.diagnostic_submissions;

CREATE POLICY "Allow reading submissions"
  ON public.diagnostic_submissions
  FOR SELECT
  TO anon, authenticated
  USING (true);