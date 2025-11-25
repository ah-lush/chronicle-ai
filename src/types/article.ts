export type ArticleStatus = 'draft' | 'published' | 'pending';
export type SourceType = 'ai-generated' | 'user-posted';

export interface ExternalSource {
  title: string;
  url: string;
  favicon?: string;
}

export interface Author {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: Author;
  category: string;
  tags: string[];
  sourceType: SourceType;
  sources?: ExternalSource[];
  publishedAt: Date;
  updatedAt: Date;
  views: number;
  readTime: number;
  featured: boolean;
  status: ArticleStatus;
}

export interface ArticleWithRelated extends Article {
  relatedArticles: Article[];
}
