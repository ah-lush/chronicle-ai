import type { Context } from "@/server/api/trpc";
import type {
  ArticleDetail,
  ArticleWithUserInfo,
  CreateArticleInput,
  GetArticlesInput,
  GetPublicArticlesInput,
  PaginatedArticlesWithUserInfo,
  PaginatedPublicArticles,
  PublicArticleWithUserInfo,
  UpdateArticleInput,
  UserInfo,
} from "@/types/article";
import { TRPCError } from "@trpc/server";

export const articleService = {
  async create(ctx: Context, input: CreateArticleInput) {
    if (!ctx.auth) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to create an article",
      });
    }

    const { data, error } = await ctx.supabase
      .from("articles")
      .insert({
        user_id: ctx.auth.id,
        title: input.title,
        summary: input.summary,
        content: input.content,
        cover_image: input.coverImage || null,
        article_images: input.articleImages || [],
        category: input.category,
        tags: input.tags || [],
        status: input.status,
        published_at:
          input.status === "PUBLISHED" ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }

    return data;
  },

  async getArticles(
    ctx: Context,
    input: GetArticlesInput
  ): Promise<PaginatedArticlesWithUserInfo> {
    if (!ctx.auth) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to view articles",
      });
    }

    const { page, limit, status, category, search, userId, sortBy, sortOrder } =
      input;

    const { data, error } = await ctx.supabase.rpc("get_articles", {
      p_page: page,
      p_page_size: limit,
      p_status: status,
      p_category: category,
      p_search: search,
      p_user_id: userId,
      p_sort_by: sortBy,
      p_sort_order: sortOrder,
    });

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }

    if (!data || data.length === 0) {
      return {
        articles: [],
        pagination: {
          page,
          limit,
          total: 0,
          totalPages: 0,
        },
      };
    }

    const total = Number(data[0]?.total_count || 0);
    const totalPages = Math.ceil(total / limit);

    const articles: ArticleWithUserInfo[] = data.map((article) => ({
      ...article,
      user_info: article.user_info as UserInfo,
    }));

    return {
      articles,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  },

  async getPublicArticles(
    ctx: Context,
    input: GetPublicArticlesInput
  ): Promise<PaginatedPublicArticles> {
    const { page, limit, category, search, tags, sortBy, sortOrder } = input;

    const { data, error } = await ctx.supabase.rpc("get_public_articles", {
      p_page: page,
      p_page_size: limit,
      p_category: category,
      p_search: search,
      p_tags: tags,
      p_sort_by: sortBy,
      p_sort_order: sortOrder,
    });

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }

    if (!data || data.length === 0) {
      return {
        articles: [],
        pagination: {
          page,
          limit,
          total: 0,
          totalPages: 0,
        },
      };
    }

    const total = Number(data[0]?.total_count || 0);
    const totalPages = Math.ceil(total / limit);

    const articles: PublicArticleWithUserInfo[] = data.map((article) => ({
      ...article,
      user_info: article.user_info as UserInfo,
    }));

    return {
      articles,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  },

  async getById(ctx: Context, id: string): Promise<ArticleDetail> {
    const { data, error } = await ctx.supabase.rpc("get_article_by_id", {
      p_article_id: id,
    });

    if (error || !data || data.length === 0) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Article not found",
      });
    }

    const article = data[0];

    return {
      ...article,
      user_info: article.user_info as UserInfo,
    };
  },

  async update(ctx: Context, input: UpdateArticleInput) {
    if (!ctx.auth) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to update an article",
      });
    }

    const { data: existing, error: fetchError } = await ctx.supabase
      .from("articles")
      .select("user_id")
      .eq("id", input.id)
      .single();

    if (fetchError || !existing) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Article not found",
      });
    }

    if (existing.user_id !== ctx.auth.id) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You don't have permission to update this article",
      });
    }

    const updateData: Record<string, unknown> = {};

    if (input.title !== undefined) updateData.title = input.title;
    if (input.summary !== undefined) updateData.summary = input.summary;
    if (input.content !== undefined) updateData.content = input.content;
    if (input.coverImage !== undefined)
      updateData.cover_image = input.coverImage;
    if (input.articleImages !== undefined)
      updateData.article_images = input.articleImages;
    if (input.category !== undefined) updateData.category = input.category;
    if (input.tags !== undefined) updateData.tags = input.tags;
    if (input.status !== undefined) {
      updateData.status = input.status;
      if (input.status === "PUBLISHED" && existing.user_id === ctx.auth.id) {
        updateData.published_at = new Date().toISOString();
      }
    }

    const { data, error } = await ctx.supabase
      .from("articles")
      .update(updateData)
      .eq("id", input.id)
      .select()
      .single();

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }

    return data;
  },

  async publish(ctx: Context, id: string) {
    if (!ctx.auth) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to publish an article",
      });
    }

    const { data: existing, error: fetchError } = await ctx.supabase
      .from("articles")
      .select("user_id")
      .eq("id", id)
      .single();

    if (fetchError || !existing) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Article not found",
      });
    }

    if (existing.user_id !== ctx.auth.id) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You don't have permission to publish this article",
      });
    }

    const { data, error } = await ctx.supabase
      .from("articles")
      .update({
        status: "PUBLISHED",
        published_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }

    return data;
  },

  async delete(ctx: Context, id: string) {
    if (!ctx.auth) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to delete an article",
      });
    }

    const { data: existing, error: fetchError } = await ctx.supabase
      .from("articles")
      .select("user_id")
      .eq("id", id)
      .single();

    if (fetchError || !existing) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Article not found",
      });
    }

    if (existing.user_id !== ctx.auth.id) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: "You don't have permission to delete this article",
      });
    }

    const { error } = await ctx.supabase.from("articles").delete().eq("id", id);

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      });
    }

    return { success: true };
  },
};
