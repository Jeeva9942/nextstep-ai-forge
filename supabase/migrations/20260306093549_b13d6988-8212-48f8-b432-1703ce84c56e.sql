
-- Fix: drop restrictive policies and recreate as permissive
DROP POLICY IF EXISTS "Users can delete own assessments" ON public.career_assessments;
DROP POLICY IF EXISTS "Users can insert own assessments" ON public.career_assessments;
DROP POLICY IF EXISTS "Users can update own assessments" ON public.career_assessments;
DROP POLICY IF EXISTS "Users can view own assessments" ON public.career_assessments;

CREATE POLICY "Users can insert own assessments"
ON public.career_assessments FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own assessments"
ON public.career_assessments FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own assessments"
ON public.career_assessments FOR UPDATE TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own assessments"
ON public.career_assessments FOR DELETE TO authenticated
USING (auth.uid() = user_id);
