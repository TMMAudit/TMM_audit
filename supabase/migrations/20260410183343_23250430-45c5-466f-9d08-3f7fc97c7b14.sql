
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  email TEXT,
  stripe_session_id TEXT,
  amount_cents INTEGER,
  currency TEXT DEFAULT 'usd',
  status TEXT NOT NULL DEFAULT 'completed',
  metadata JSONB DEFAULT '{}'::jsonb
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert payments"
  ON public.payments FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can read payments"
  ON public.payments FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
