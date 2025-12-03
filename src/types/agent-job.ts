import { z } from "zod";

export const createAgentJobSchema = z.object({
  query: z.string().min(5, "Query must be at least 5 characters"),
});

export const getAgentJobsSchema = z.object({
  limit: z.number().min(1).max(100).optional(),
  offset: z.number().min(0).optional(),
});

export const getAgentJobByIdSchema = z.object({
  id: z.string().uuid("Invalid job ID"),
});

export const cancelAgentJobSchema = z.object({
  id: z.string().uuid("Invalid job ID"),
});

export type CreateAgentJobInput = z.infer<typeof createAgentJobSchema>;
export type GetAgentJobsInput = z.infer<typeof getAgentJobsSchema>;
export type GetAgentJobByIdInput = z.infer<typeof getAgentJobByIdSchema>;
export type CancelAgentJobInput = z.infer<typeof cancelAgentJobSchema>;
