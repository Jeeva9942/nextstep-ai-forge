CREATE TABLE public.career_assessments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  age TEXT,
  education TEXT,
  experience TEXT,
  role_title TEXT,
  skills TEXT[],
  interests TEXT[],
  goals TEXT,
  challenges TEXT,
  preferred_work_style TEXT,
  salary_expectation TEXT,
  ai_recommendation TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.career_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert on career_assessments" ON public.career_assessments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select on career_assessments" ON public.career_assessments
  FOR SELECT USING (true);