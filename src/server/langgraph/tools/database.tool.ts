import { createAdminClient } from "@/lib/supabase/admin";
import type { Database } from "@/types/supabase";

export interface CreateArticleParams {
  userId: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  coverImage?: string;
  articleImages?: string[];
  tags?: string[];
}

export interface UpdateJobParams {
  jobId: string;
  status?: Database["public"]["Enums"]["agent_job_status"];
  currentStep?: string;
  progress?: number;
  searchQueries?: string[];
  researchData?: any;
  articleId?: string;
  errorMessage?: string;
  retryCount?: number;
}

export async function createArticle(params: CreateArticleParams) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("articles")
    .insert({
      user_id: params.userId,
      title: params.title,
      summary: params.summary,
      content: params.content,
      category: params.category,
      cover_image: params.coverImage,
      article_images: params.articleImages || [],
      tags: params.tags || [],
      status: "DRAFT",
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create article: ${error.message}`);
  }

  return data;
}

export async function updateJobStatus(params: UpdateJobParams) {
  const supabase = createAdminClient();

  const updateData: any = {};

  if (params.status) updateData.status = params.status;
  if (params.currentStep !== undefined) updateData.current_step = params.currentStep;
  if (params.progress !== undefined) updateData.progress = params.progress;
  if (params.searchQueries) updateData.search_queries = params.searchQueries;
  if (params.researchData) updateData.research_data = params.researchData;
  if (params.articleId) updateData.article_id = params.articleId;
  if (params.errorMessage !== undefined) updateData.error_message = params.errorMessage;
  if (params.retryCount !== undefined) updateData.retry_count = params.retryCount;

  if (params.status === "COMPLETED") {
    updateData.completed_at = new Date().toISOString();
  }

  if (params.status && !updateData.started_at) {
    updateData.started_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("agent_jobs")
    .update(updateData)
    .eq("id", params.jobId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update job: ${error.message}`);
  }

  return data;
}

export async function getJob(jobId: string) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("agent_jobs")
    .select("*")
    .eq("id", jobId)
    .single();

  if (error) {
    throw new Error(`Failed to get job: ${error.message}`);
  }

  return data;
}
