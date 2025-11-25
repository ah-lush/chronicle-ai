import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';
import { mockArticles } from '@/lib/mock-data';

const articleQuerySchema = z.object({
  slug: z.string(),
});

const createArticleSchema = z.object({
  title: z.string().min(1).max(255),
  excerpt: z.string().min(1).max(500),
  content: z.string().min(1),
  coverImage: z.string().url(),
  category: z.string(),
  tags: z.array(z.string()).optional(),
});

export const articleRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ limit: z.number().default(10), offset: z.number().default(0) }).optional())
    .query(({ input }) => {
      const articles = mockArticles.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
      const limit = input?.limit ?? 10;
      const offset = input?.offset ?? 0;
      return {
        items: articles.slice(offset, offset + limit),
        total: articles.length,
        hasMore: offset + limit < articles.length,
      };
    }),

  getBySlug: publicProcedure.input(articleQuerySchema).query(({ input }) => {
    const article = mockArticles.find((a) => a.slug === input.slug);
    if (!article) throw new Error('Article not found');

    const related = mockArticles
      .filter(
        (a) => a.category === article.category && a.id !== article.id
      )
      .slice(0, 3);

    return {
      ...article,
      relatedArticles: related,
    };
  }),

  getByCategory: publicProcedure
    .input(
      z.object({
        category: z.string(),
        limit: z.number().default(10),
        offset: z.number().default(0),
      })
    )
    .query(({ input }) => {
      const articles = mockArticles
        .filter((a) => a.category === input.category)
        .sort(
          (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );

      return {
        items: articles.slice(input.offset, input.offset + input.limit),
        total: articles.length,
        hasMore: input.offset + input.limit < articles.length,
      };
    }),

  getFeatured: publicProcedure.query(() => {
    return mockArticles.filter((a) => a.featured).slice(0, 4);
  }),

  getTrending: publicProcedure
    .input(z.object({ limit: z.number().default(10) }).optional())
    .query(({ input }) => {
      return mockArticles
        .sort((a, b) => b.views - a.views)
        .slice(0, input?.limit ?? 10);
    }),

  create: protectedProcedure
    .input(createArticleSchema)
    .mutation(({ input }) => {
      const slug = input.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const newArticle = {
        id: Math.random().toString(36).slice(2),
        slug,
        ...input,
        author: {
          id: '1',
          name: 'Current User',
          email: 'user@example.com',
        },
        sourceType: 'user-posted' as const,
        publishedAt: new Date(),
        updatedAt: new Date(),
        views: 0,
        readTime: Math.ceil(input.content.split(' ').length / 200),
        featured: false,
        status: 'draft' as const,
      };

      return newArticle;
    }),
});
