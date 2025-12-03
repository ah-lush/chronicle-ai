import { createTRPCRouter, protectedProcedure } from "../trpc";
import { agentJobService } from "@/server/services/agent-job.service";
import {
  createAgentJobSchema,
  getAgentJobsSchema,
  getAgentJobByIdSchema,
  cancelAgentJobSchema,
} from "@/types/agent-job";
import { inngest } from "@/inngest/client";

export const aiRouter = createTRPCRouter({
  createJob: protectedProcedure
    .input(createAgentJobSchema)
    .mutation(async ({ ctx, input }) => {
      // Create job in database
      const job = await agentJobService.createJob(ctx, input);

      // Trigger Inngest function
      await inngest.send({
        name: "ai/article.generate",
        data: {
          jobId: job.id,
          userId: ctx.auth.id,
          query: input.query,
        },
      });

      return job;
    }),

  getJobs: protectedProcedure
    .input(getAgentJobsSchema)
    .query(({ ctx, input }) => {
      return agentJobService.getJobs(ctx, input);
    }),

  getJobById: protectedProcedure
    .input(getAgentJobByIdSchema)
    .query(({ ctx, input }) => {
      return agentJobService.getJobById(ctx, input);
    }),

  cancelJob: protectedProcedure
    .input(cancelAgentJobSchema)
    .mutation(({ ctx, input }) => {
      return agentJobService.cancelJob(ctx, input);
    }),
});
