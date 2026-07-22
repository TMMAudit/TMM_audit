CREATE TABLE public.assessment_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  first_name text,
  last_name text,
  email text,
  business_name text,
  industry text,
  responses jsonb NOT NULL DEFAULT '{}'::jsonb,
  current_question_index integer NOT NULL DEFAULT 0,
  current_screen text NOT NULL DEFAULT 'landing',
  completed boolean NOT NULL DEFAULT false,
  completed_assessment_id uuid,
  user_agent text,
  referrer text
);

CREATE INDEX idx_assessment_sessions_updated_at ON public.assessment_sessions (updated_at DESC);
CREATE INDEX idx_assessment_sessions_email ON public.assessment_sessions (email);
CREATE INDEX idx_assessment_sessions_completed ON public.assessment_sessions (completed);

ALTER TABLE public.assessment_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert sessions"
  ON public.assessment_sessions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update sessions by id"
  ON public.assessment_sessions FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can read sessions"
  ON public.assessment_sessions FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE OR REPLACE FUNCTION public.touch_assessment_sessions_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_assessment_sessions_updated
  BEFORE UPDATE ON public.assessment_sessions
  FOR EACH ROW EXECUTE FUNCTION public.touch_assessment_sessions_updated_at();