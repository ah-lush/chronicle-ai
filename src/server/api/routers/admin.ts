import { z } from 'zod';
import { createTRPCRouter, adminProcedure } from '../trpc';
import { mockArticles } from '@/lib/mock-data';

export const adminRouter = createTRPCRouter({
  getStats: adminProcedure.query(() => {
    return {
      totalArticles: mockArticles.length,
      publishedArticles: mockArticles.filter((a) => a.status === 'published').length,
      pendingArticles: mockArticles.filter((a) => a.status === 'pending').length,
      totalViews: mockArticles.reduce((sum, a) => sum + a.views, 0),
      aiGeneratedCount: mockArticles.filter((a) => a.sourceType === 'ai-generated').length,
      userPostedCount: mockArticles.filter((a) => a.sourceType === 'user-posted').length,
    };
  }),

  getAllArticles: adminProcedure
    .input(
      z.object({
        status: z.enum(['draft', 'published', 'pending']).optional(),
        limit: z.number().default(20),
        offset: z.number().default(0),
      })
    )
    .query(({ input }) => {
      let articles = mockArticles;

      if (input.status) {
        articles = articles.filter((a) => a.status === input.status);
      }

      articles = articles.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );

      return {
        items: articles.slice(input.offset, input.offset + input.limit),
        total: articles.length,
        hasMore: input.offset + input.limit < articles.length,
      };
    }),

  updateArticleStatus: adminProcedure
    .input(
      z.object({
        articleId: z.string(),
        status: z.enum(['draft', 'published', 'pending']),
      })
    )
    .mutation(({ input }) => {
      const article = mockArticles.find((a) => a.id === input.articleId);
      if (!article) throw new Error('Article not found');

      return {
        ...article,
        status: input.status,
        updatedAt: new Date(),
      };
    }),

  deleteArticle: adminProcedure
    .input(z.object({ articleId: z.string() }))
    .mutation(({ input }) => {
      const index = mockArticles.findIndex((a) => a.id === input.articleId);
      if (index === -1) throw new Error('Article not found');

      const article = mockArticles[index];
      mockArticles.splice(index, 1);
      return article;
    }),
});
