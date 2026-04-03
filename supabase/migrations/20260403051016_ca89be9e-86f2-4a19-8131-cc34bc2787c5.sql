
-- Create students table
CREATE TABLE public.students (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT DEFAULT '',
  github_username TEXT NOT NULL,
  leetcode_username TEXT NOT NULL,
  department TEXT NOT NULL DEFAULT 'CSE',
  year INTEGER NOT NULL DEFAULT 3,
  cluster TEXT NOT NULL DEFAULT 'Beginner',
  cpi NUMERIC NOT NULL DEFAULT 0,
  leetcode_total_solved INTEGER DEFAULT 0,
  leetcode_easy INTEGER DEFAULT 0,
  leetcode_medium INTEGER DEFAULT 0,
  leetcode_hard INTEGER DEFAULT 0,
  leetcode_streak INTEGER DEFAULT 0,
  leetcode_ranking INTEGER DEFAULT 0,
  github_total_commits INTEGER DEFAULT 0,
  github_total_repos INTEGER DEFAULT 0,
  github_total_prs INTEGER DEFAULT 0,
  github_total_stars INTEGER DEFAULT 0,
  github_languages JSONB DEFAULT '[]',
  last_refreshed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Public read access (faculty dashboard)
CREATE POLICY "Students are viewable by everyone"
  ON public.students FOR SELECT USING (true);

-- Service role can insert/update (edge functions)
CREATE POLICY "Service role can manage students"
  ON public.students FOR ALL
  USING (true)
  WITH CHECK (true);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
