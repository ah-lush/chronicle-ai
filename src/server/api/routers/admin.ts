import { mockArticles } from "@/lib/mock-data";
import { z } from "zod";
import { adminProcedure, createTRPCRouter } from "../trpc";

export const adminRouter = createTRPCRouter({
  getStats: adminProcedure.query(() => {
    return {
      totalArticles: mockArticles.length,
      publishedArticles: mockArticles.filter((a) => a.status === "PUBLISHED")
        .length,
      pendingArticles: mockArticles.filter((a) => a.status === "ARCHIVED")
        .length,
      totalViews: mockArticles.reduce((sum, a) => sum + 1, 0),
      aiGeneratedCount: mockArticles.filter((a) => 0),
      userPostedCount: mockArticles.filter((a) => 0),
    };
  }),

  getAllArticles: adminProcedure
    .input(
      z.object({
        status: z.enum(["draft", "published", "pending"]).optional(),
        limit: z.number().default(20),
        offset: z.number().default(0),
      })
    )
    .query(({ input }) => {
      let articles = mockArticles;

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
        status: z.enum(["draft", "published", "pending"]),
      })
    )
    .mutation(({ input }) => {
      const article = mockArticles.find((a) => a.id === input.articleId);
      if (!article) throw new Error("Article not found");

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
      if (index === -1) throw new Error("Article not found");

      const article = mockArticles[index];
      mockArticles.splice(index, 1);
      return article;
    }),
});
