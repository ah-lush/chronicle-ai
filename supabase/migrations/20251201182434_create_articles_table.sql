CREATE TYPE article_status AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

CREATE TABLE IF NOT EXISTS public.articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  article_images TEXT[] DEFAULT '{}',
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  status article_status NOT NULL DEFAULT 'DRAFT',
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_articles_user_id ON public.articles(user_id);

CREATE INDEX idx_articles_status ON public.articles(status);

CREATE INDEX idx_articles_category ON public.articles(category);

CREATE INDEX idx_articles_published_at ON public.articles(published_at DESC);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own articles"
  ON public.articles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view published articles"
  ON public.articles
  FOR SELECT
  USING (status = 'PUBLISHED');

CREATE POLICY "Users can insert their own articles"
  ON public.articles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own articles"
  ON public.articles
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own articles"
  ON public.articles
  FOR DELETE
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION update_articles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION update_articles_updated_at();
