import { createAdminClient } from "@/lib/supabase/admin";
import type { Database } from "@/types/supabase";
import { TRPCError } from "@trpc/server";
import type { Context } from "../api/trpc";

export const agentJobService = {
  async createJob(
    ctx: Context,
    input: {
      query: string;
    }
  ) {
    if (!ctx.auth) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to create a job",
      });
    }

    const { data, error } = await ctx.supabase
      .from("agent_jobs")
      .insert({
        user_id: ctx.auth.id,
        query: input.query,
        status: "QUEUED",
        progress: 0,
      })
      .select()
      .single();

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to create job: ${error.message}`,
      });
    }

    return data;
  },

  async getJobs(ctx: Context, input: { limit?: number; offset?: number }) {
    if (!ctx.auth) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to view jobs",
      });
    }

    const limit = input.limit || 20;
    const offset = input.offset || 0;

    const { data, error, count } = await ctx.supabase
      .from("agent_jobs")
      .select("*", { count: "exact" })
      .eq("user_id", ctx.auth.id)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to fetch jobs: ${error.message}`,
      });
    }

    return {
      jobs: data,
      total: count || 0,
    };
  },

  async getJobById(ctx: Context, input: { id: string }) {
    if (!ctx.auth) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to view a job",
      });
    }

    const { data, error } = await ctx.supabase
      .from("agent_jobs")
      .select("*")
      .eq("id", input.id)
      .eq("user_id", ctx.auth.id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Job not found",
        });
      }
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to fetch job: ${error.message}`,
      });
    }

    return data;
  },

  async updateJobInngestRunId(jobId: string, inngestRunId: string) {
    const supabase = createAdminClient();

    const { error } = await supabase
      .from("agent_jobs")
      .update({
        inngest_run_id: inngestRunId,
        started_at: new Date().toISOString(),
      })
      .eq("id", jobId);

    if (error) {
      throw new Error(
        `Failed to update job with Inngest run ID: ${error.message}`
      );
    }
  },

  async cancelJob(ctx: Context, input: { id: string }) {
    if (!ctx.auth) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to cancel a job",
      });
    }

    const { data, error } = await ctx.supabase
      .from("agent_jobs")
      .update({
        status: "FAILED" as Database["public"]["Enums"]["agent_job_status"],
        error_message: "Cancelled by user",
        completed_at: new Date().toISOString(),
      })
      .eq("id", input.id)
      .eq("user_id", ctx.auth.id)
      .select()
      .single();

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to cancel job: ${error.message}`,
      });
    }

    return data;
  },
};
