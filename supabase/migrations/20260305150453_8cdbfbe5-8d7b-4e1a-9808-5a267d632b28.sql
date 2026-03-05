
-- Add user_id column to career_assessments
ALTER TABLE public.career_assessments ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop old permissive policies
DROP POLICY IF EXISTS "Allow public insert on career_assessments" ON public.career_assessments;
DROP POLICY IF EXISTS "Allow public select on career_assessments" ON public.career_assessments;

-- Create user-specific RLS policies
CREATE POLICY "Users can insert own assessments"
ON public.career_assessments FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own assessments"
ON public.career_assessments FOR SELECT TO authenticated
USING (auth.uid() = user_id);
