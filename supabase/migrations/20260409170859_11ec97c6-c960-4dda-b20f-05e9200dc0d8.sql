
CREATE TABLE public.assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  first_name text NOT NULL,
  email text NOT NULL,
  business_name text,
  industry text,
  responses jsonb NOT NULL,
  section1_raw integer NOT NULL,
  section1_pct numeric NOT NULL,
  section1_tier text NOT NULL,
  section2_raw integer NOT NULL,
  section2_pct numeric NOT NULL,
  section2_tier text NOT NULL,
  composite_raw integer NOT NULL,
  composite_pct numeric NOT NULL,
  composite_tier text NOT NULL,
  s1_one_thing text,
  s1_one_thing_unlock text,
  s2_one_thing text,
  s2_one_thing_unlock text,
  lowest_s1_domain text,
  lowest_s2_domain text
);

ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit assessments"
  ON public.assessments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read assessments"
  ON public.assessments
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
