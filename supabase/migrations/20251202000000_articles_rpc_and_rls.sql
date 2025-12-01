ALTER TABLE public.articles
  DROP CONSTRAINT IF EXISTS articles_user_id_fkey;

ALTER TABLE public.articles
  ADD CONSTRAINT articles_user_id_fkey
  FOREIGN KEY (user_id)
  REFERENCES public.profiles(id)
  ON DELETE CASCADE;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.get_articles(
  p_page INTEGER DEFAULT 1,
  p_page_size INTEGER DEFAULT 10,
  p_status article_status DEFAULT NULL,
  p_category TEXT DEFAULT NULL,
  p_search TEXT DEFAULT NULL,
  p_user_id UUID DEFAULT NULL,
  p_sort_by TEXT DEFAULT 'created_at',
  p_sort_order TEXT DEFAULT 'desc'
)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  user_info JSONB,
  title TEXT,
  summary TEXT,
  content TEXT,
  cover_image TEXT,
  article_images TEXT[],
  category TEXT,
  tags TEXT[],
  status article_status,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  total_count BIGINT
) AS $$
DECLARE
  v_offset INTEGER;
  v_total_count BIGINT;
  v_is_admin BOOLEAN;
BEGIN
  v_offset := (p_page - 1) * p_page_size;
  v_is_admin := public.is_admin();

  SELECT COUNT(*) INTO v_total_count
  FROM public.articles a
  INNER JOIN public.profiles p ON a.user_id = p.id
  WHERE
    (v_is_admin OR a.user_id = auth.uid())
    AND (NOT v_is_admin OR p_user_id IS NULL OR a.user_id = p_user_id)
    AND (p_status IS NULL OR a.status = p_status)
    AND (p_category IS NULL OR a.category = p_category)
    AND (
      p_search IS NULL OR
      a.title ILIKE '%' || p_search || '%' OR
      a.summary ILIKE '%' || p_search || '%' OR
      a.content ILIKE '%' || p_search || '%' OR
      p_search = ANY(a.tags) OR
      p.email ILIKE '%' || p_search || '%' OR
      p.full_name ILIKE '%' || p_search || '%'
    );

  RETURN QUERY
  SELECT
    a.id,
    a.user_id,
    jsonb_build_object(
      'id', p.id,
      'email', p.email,
      'full_name', p.full_name,
      'avatar_url', p.avatar_url,
      'role', p.role,
      'created_at', p.created_at,
      'updated_at', p.updated_at
    ) AS user_info,
    a.title,
    a.summary,
    a.content,
    a.cover_image,
    a.article_images,
    a.category,
    a.tags,
    a.status,
    a.published_at,
    a.created_at,
    a.updated_at,
    v_total_count
  FROM public.articles a
  INNER JOIN public.profiles p ON a.user_id = p.id
  WHERE
    (v_is_admin OR a.user_id = auth.uid())
    AND (NOT v_is_admin OR p_user_id IS NULL OR a.user_id = p_user_id)
    AND (p_status IS NULL OR a.status = p_status)
    AND (p_category IS NULL OR a.category = p_category)
    AND (
      p_search IS NULL OR
      a.title ILIKE '%' || p_search || '%' OR
      a.summary ILIKE '%' || p_search || '%' OR
      a.content ILIKE '%' || p_search || '%' OR
      p_search = ANY(a.tags) OR
      p.email ILIKE '%' || p_search || '%' OR
      p.full_name ILIKE '%' || p_search || '%'
    )
  ORDER BY
    CASE WHEN p_sort_by = 'created_at' AND p_sort_order = 'desc' THEN a.created_at END DESC,
    CASE WHEN p_sort_by = 'created_at' AND p_sort_order = 'asc' THEN a.created_at END ASC,
    CASE WHEN p_sort_by = 'updated_at' AND p_sort_order = 'desc' THEN a.updated_at END DESC,
    CASE WHEN p_sort_by = 'updated_at' AND p_sort_order = 'asc' THEN a.updated_at END ASC,
    CASE WHEN p_sort_by = 'title' AND p_sort_order = 'desc' THEN a.title END DESC,
    CASE WHEN p_sort_by = 'title' AND p_sort_order = 'asc' THEN a.title END ASC,
    CASE WHEN p_sort_by = 'published_at' AND p_sort_order = 'desc' THEN a.published_at END DESC,
    CASE WHEN p_sort_by = 'published_at' AND p_sort_order = 'asc' THEN a.published_at END ASC
  LIMIT p_page_size
  OFFSET v_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.get_public_articles(
  p_page INTEGER DEFAULT 1,
  p_page_size INTEGER DEFAULT 10,
  p_category TEXT DEFAULT NULL,
  p_search TEXT DEFAULT NULL,
  p_tags TEXT[] DEFAULT NULL,
  p_sort_by TEXT DEFAULT 'published_at',
  p_sort_order TEXT DEFAULT 'desc'
)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  user_info JSONB,
  title TEXT,
  summary TEXT,
  content TEXT,
  cover_image TEXT,
  article_images TEXT[],
  category TEXT,
  tags TEXT[],
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE,
  total_count BIGINT
) AS $$
DECLARE
  v_offset INTEGER;
  v_total_count BIGINT;
BEGIN
  v_offset := (p_page - 1) * p_page_size;

  SELECT COUNT(*) INTO v_total_count
  FROM public.articles a
  INNER JOIN public.profiles p ON a.user_id = p.id
  WHERE
    a.status = 'PUBLISHED'
    AND (p_category IS NULL OR a.category = p_category)
    AND (
      p_search IS NULL OR
      a.title ILIKE '%' || p_search || '%' OR
      a.summary ILIKE '%' || p_search || '%' OR
      a.content ILIKE '%' || p_search || '%' OR
      p_search = ANY(a.tags)
    )
    AND (
      p_tags IS NULL OR
      p_tags && a.tags
    );

  RETURN QUERY
  SELECT
    a.id,
    a.user_id,
    jsonb_build_object(
      'id', p.id,
      'email', p.email,
      'full_name', p.full_name,
      'avatar_url', p.avatar_url,
      'role', p.role,
      'created_at', p.created_at,
      'updated_at', p.updated_at
    ) AS user_info,
    a.title,
    a.summary,
    a.content,
    a.cover_image,
    a.article_images,
    a.category,
    a.tags,
    a.published_at,
    a.created_at,
    v_total_count
  FROM public.articles a
  INNER JOIN public.profiles p ON a.user_id = p.id
  WHERE
    a.status = 'PUBLISHED'
    AND (p_category IS NULL OR a.category = p_category)
    AND (
      p_search IS NULL OR
      a.title ILIKE '%' || p_search || '%' OR
      a.summary ILIKE '%' || p_search || '%' OR
      a.content ILIKE '%' || p_search || '%' OR
      p_search = ANY(a.tags)
    )
    AND (
      p_tags IS NULL OR
      p_tags && a.tags
    )
  ORDER BY
    CASE WHEN p_sort_by = 'published_at' AND p_sort_order = 'desc' THEN a.published_at END DESC,
    CASE WHEN p_sort_by = 'published_at' AND p_sort_order = 'asc' THEN a.published_at END ASC,
    CASE WHEN p_sort_by = 'created_at' AND p_sort_order = 'desc' THEN a.created_at END DESC,
    CASE WHEN p_sort_by = 'created_at' AND p_sort_order = 'asc' THEN a.created_at END ASC,
    CASE WHEN p_sort_by = 'title' AND p_sort_order = 'desc' THEN a.title END DESC,
    CASE WHEN p_sort_by = 'title' AND p_sort_order = 'asc' THEN a.title END ASC
  LIMIT p_page_size
  OFFSET v_offset;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP POLICY IF EXISTS "Users can view their own articles" ON public.articles;
DROP POLICY IF EXISTS "Users can view published articles" ON public.articles;
DROP POLICY IF EXISTS "Users can insert their own articles" ON public.articles;
DROP POLICY IF EXISTS "Users can update their own articles" ON public.articles;
DROP POLICY IF EXISTS "Users can delete their own articles" ON public.articles;

CREATE POLICY "Users can view their own articles"
  ON public.articles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all articles"
  ON public.articles
  FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Anyone can view published articles"
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


CREATE POLICY "Admins can update all articles"
  ON public.articles
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Users can delete their own articles"
  ON public.articles
  FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can delete all articles"
  ON public.articles
  FOR DELETE
  USING (public.is_admin());

CREATE INDEX IF NOT EXISTS idx_articles_tags ON public.articles USING GIN (tags);

CREATE INDEX IF NOT EXISTS idx_articles_status_published_at
  ON public.articles(status, published_at DESC)
  WHERE status = 'PUBLISHED';

CREATE INDEX IF NOT EXISTS idx_articles_user_status
  ON public.articles(user_id, status, created_at DESC);


COMMENT ON FUNCTION public.is_admin() IS 'Helper function to check if current user has admin role';
COMMENT ON FUNCTION public.get_articles IS 'Fetch articles with role-based access: users see their own, admins see all (with optional user_id filter)';
COMMENT ON FUNCTION public.get_public_articles IS 'Fetch published articles for public display with pagination and filters';
