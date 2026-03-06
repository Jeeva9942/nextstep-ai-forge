
-- Make user_id NOT NULL with default auth.uid() so RLS always works
ALTER TABLE public.career_assessments 
ALTER COLUMN user_id SET NOT NULL,
ALTER COLUMN user_id SET DEFAULT auth.uid();
