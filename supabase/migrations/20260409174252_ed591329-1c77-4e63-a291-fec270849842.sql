
ALTER TABLE public.assessments DROP COLUMN IF EXISTS s1_one_thing;
ALTER TABLE public.assessments DROP COLUMN IF EXISTS s1_one_thing_unlock;
ALTER TABLE public.assessments DROP COLUMN IF EXISTS s2_one_thing;
ALTER TABLE public.assessments DROP COLUMN IF EXISTS s2_one_thing_unlock;

ALTER TABLE public.assessments ADD COLUMN s1_one_thing_domain text;
ALTER TABLE public.assessments ADD COLUMN s1_one_thing_statement text;
ALTER TABLE public.assessments ADD COLUMN s2_one_thing_domain text;
ALTER TABLE public.assessments ADD COLUMN s2_one_thing_statement text;
