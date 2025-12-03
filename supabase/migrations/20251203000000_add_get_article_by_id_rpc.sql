CREATE OR REPLACE FUNCTION public.get_article_by_id(p_article_id UUID)
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
  updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
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
    a.updated_at
  FROM public.articles a
  INNER JOIN public.profiles p ON a.user_id = p.id
  WHERE a.id = p_article_id
    AND (a.status = 'PUBLISHED' OR a.user_id = auth.uid() OR public.is_admin());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.get_article_by_id IS 'Fetch a single article by ID with user info. Returns published articles or user''s own articles';
