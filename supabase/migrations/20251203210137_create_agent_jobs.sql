CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TYPE agent_job_status AS ENUM (
  'QUEUED',
  'ANALYZING',
  'SEARCHING',
  'RESEARCHING',
  'WRITING',
  'REVIEWING',
  'COMPLETED',
  'FAILED'
);

CREATE TABLE IF NOT EXISTS public.agent_jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  query TEXT NOT NULL,
  status agent_job_status NOT NULL DEFAULT 'QUEUED',
  current_step TEXT,
  progress INTEGER DEFAULT 0,

  article_id UUID REFERENCES public.articles(id) ON DELETE SET NULL,

  search_queries TEXT[],
  research_data JSONB, 

  error_message TEXT,
  retry_count INTEGER DEFAULT 0,

  inngest_run_id TEXT UNIQUE,
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_agent_jobs_user_id ON public.agent_jobs(user_id);
CREATE INDEX idx_agent_jobs_status ON public.agent_jobs(status);
CREATE INDEX idx_agent_jobs_inngest_run_id ON public.agent_jobs(inngest_run_id);
CREATE INDEX idx_agent_jobs_created_at ON public.agent_jobs(created_at DESC);

ALTER TABLE public.agent_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own jobs"
  ON public.agent_jobs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own jobs"
  ON public.agent_jobs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can update jobs"
  ON public.agent_jobs FOR UPDATE
  USING (auth.role() = 'service_role');

CREATE TRIGGER agent_jobs_updated_at
  BEFORE UPDATE ON public.agent_jobs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
