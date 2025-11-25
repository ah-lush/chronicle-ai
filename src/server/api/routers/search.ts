import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { mockArticles } from '@/lib/mock-data';

export const searchRouter = createTRPCRouter({
  articles: publicProcedure
    .input(
      z.object({
        query: z.string(),
        category: z.string().optional(),
        limit: z.number().default(20),
        offset: z.number().default(0),
      })
    )
    .query(({ input }) => {
      const query = input.query.toLowerCase();

      let results = mockArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.excerpt.toLowerCase().includes(query) ||
          article.tags.some((tag) => tag.toLowerCase().includes(query))
      );

      if (input.category) {
        results = results.filter((a) => a.category === input.category);
      }

      results = results.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );

      return {
        items: results.slice(input.offset, input.offset + input.limit),
        total: results.length,
        hasMore: input.offset + input.limit < results.length,
      };
    }),

  suggestions: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(({ input }) => {
      const query = input.query.toLowerCase();
      const suggestions = new Set<string>();

      mockArticles.forEach((article) => {
        if (article.title.toLowerCase().includes(query)) {
          suggestions.add(article.title);
        }
        article.tags.forEach((tag) => {
          if (tag.toLowerCase().includes(query)) {
            suggestions.add(tag);
          }
        });
      });

      return Array.from(suggestions).slice(0, 5);
    }),
});
