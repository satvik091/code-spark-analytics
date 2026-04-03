
-- Drop the overly permissive policy
DROP POLICY "Service role can manage students" ON public.students;

-- Only service_role can insert
CREATE POLICY "Service role can insert students"
  ON public.students FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Only service_role can update
CREATE POLICY "Service role can update students"
  ON public.students FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Only service_role can delete
CREATE POLICY "Service role can delete students"
  ON public.students FOR DELETE
  TO service_role
  USING (true);
