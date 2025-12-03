import { z } from "zod";
import { Database } from "./supabase";

export type Article = Database["public"]["Tables"]["articles"]["Row"];
export type ArticleInsert = Database["public"]["Tables"]["articles"]["Insert"];
export type ArticleUpdate = Database["public"]["Tables"]["articles"]["Update"];
export type ArticleStatus = Database["public"]["Enums"]["article_status"];

export type GetArticlesRPCResult =
  Database["public"]["Functions"]["get_articles"]["Returns"][0];
export type GetPublicArticlesRPCResult =
  Database["public"]["Functions"]["get_public_articles"]["Returns"][0];

export type UserInfo = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type ArticleWithUserInfo = Omit<GetArticlesRPCResult, "user_info"> & {
  user_info: UserInfo;
};

export type PublicArticleWithUserInfo = Omit<
  GetPublicArticlesRPCResult,
  "user_info"
> & {
  user_info: UserInfo;
};

export type ArticleDetail = Article & {
  user_info: UserInfo;
};

export const createArticleSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  summary: z
    .string()
    .min(1, "Summary is required")
    .max(500, "Summary must be less than 500 characters"),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().url("Must be a valid URL").nullable().optional(),
  articleImages: z.array(z.string().url("Must be a valid URL")).default([]),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()).default([]),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
});

export const articleFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  summary: z
    .string()
    .min(1, "Summary is required")
    .max(500, "Summary must be less than 500 characters"),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().url("Must be a valid URL").nullable().optional(),
  articleImages: z.array(z.string().url("Must be a valid URL")),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string()),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
});

export const updateArticleSchema = createArticleSchema.partial().extend({
  id: z.string().uuid("Invalid article ID"),
});

export const publishArticleSchema = z.object({
  id: z.string().uuid("Invalid article ID"),
});

export const getArticlesSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
  category: z.string().optional(),
  search: z.string().optional(),
  userId: z.string().uuid().optional(),
  sortBy: z
    .enum(["created_at", "updated_at", "title", "published_at"])
    .default("created_at"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const getPublicArticlesSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  category: z.string().optional(),
  search: z.string().optional(),
  tags: z.array(z.string()).optional(),
  sortBy: z
    .enum(["created_at", "published_at", "title"])
    .default("published_at"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const getArticleByIdSchema = z.object({
  id: z.string().uuid("Invalid article ID"),
});

export const deleteArticleSchema = z.object({
  id: z.string().uuid("Invalid article ID"),
});

export type CreateArticleInput = z.infer<typeof createArticleSchema>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;
export type PublishArticleInput = z.infer<typeof publishArticleSchema>;
export type GetArticlesInput = z.infer<typeof getArticlesSchema>;
export type GetPublicArticlesInput = z.infer<typeof getPublicArticlesSchema>;
export type GetArticleByIdInput = z.infer<typeof getArticleByIdSchema>;
export type DeleteArticleInput = z.infer<typeof deleteArticleSchema>;

export type ArticleFormInput = {
  title: string;
  summary: string;
  content: string;
  coverImage?: string | null;
  articleImages: string[];
  category: string;
  tags: string[];
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
};

export type ArticleWithAuthor = Article & {
  author: {
    id: string;
    fullName: string | null;
    avatarUrl: string | null;
  };
};

export type PaginatedArticles = {
  articles: Article[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type PaginatedArticlesWithUserInfo = {
  articles: ArticleWithUserInfo[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type PaginatedPublicArticles = {
  articles: PublicArticleWithUserInfo[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
