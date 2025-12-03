import { articleService } from "@/server/services/article.service";
import {
  createArticleSchema,
  deleteArticleSchema,
  getArticleByIdSchema,
  getArticlesSchema,
  getPublicArticlesSchema,
  publishArticleSchema,
  updateArticleSchema,
  updateArticleStatusSchema,
} from "@/types/article";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const articleRouter = createTRPCRouter({
  create: protectedProcedure
    .input(createArticleSchema)
    .mutation(({ ctx, input }) => {
      return articleService.create(ctx, input);
    }),

  getArticles: protectedProcedure
    .input(getArticlesSchema)
    .query(({ ctx, input }) => {
      return articleService.getArticles(ctx, input);
    }),

  getPublicArticles: publicProcedure
    .input(getPublicArticlesSchema)
    .query(({ ctx, input }) => {
      return articleService.getPublicArticles(ctx, input);
    }),

  getById: publicProcedure
    .input(getArticleByIdSchema)
    .query(({ ctx, input }) => {
      return articleService.getById(ctx, input.id);
    }),
  update: protectedProcedure
    .input(updateArticleSchema)
    .mutation(({ ctx, input }) => {
      return articleService.update(ctx, input);
    }),

  updateStatus: protectedProcedure
    .input(updateArticleStatusSchema)
    .mutation(({ ctx, input }) => {
      return articleService.updateStatus(ctx, input.id, input.status);
    }),

  publish: protectedProcedure
    .input(publishArticleSchema)
    .mutation(({ ctx, input }) => {
      return articleService.publish(ctx, input.id);
    }),

  delete: protectedProcedure
    .input(deleteArticleSchema)
    .mutation(({ ctx, input }) => {
      return articleService.delete(ctx, input.id);
    }),
});
