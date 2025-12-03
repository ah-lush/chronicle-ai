import { inngest } from "../client";
import { runArticleAgent } from "@/server/langgraph/agent";
import { agentJobService } from "@/server/services/agent-job.service";

export const aiArticleGeneration = inngest.createFunction(
  {
    id: "ai-article-generation",
    name: "AI Article Generation",
  },
  { event: "ai/article.generate" },
  async ({ event, step, logger }) => {
    const { jobId, userId, query } = event.data;

    logger.info(`🚀 Starting AI article generation`, {
      jobId,
      userId,
      query,
    });

    // Update job with Inngest run ID
    await step.run("update-job-inngest-id", async () => {
      logger.info("📝 Updating job with Inngest run ID");
      await agentJobService.updateJobInngestRunId(jobId, event.id || "unknown");
      return { updated: true };
    });

    // Run the LangGraph agent
    const result = await step.run("run-langgraph-agent", async () => {
      try {
        logger.info("🤖 Starting LangGraph agent execution");

        const agentResult = await runArticleAgent({
          userPrompt: query,
          userId,
          jobId,
        });

        logger.info("✅ Agent execution completed", {
          articleId: agentResult.articleId,
          hasError: !!agentResult.error,
        });

        return {
          success: true,
          articleId: agentResult.articleId || null,
          error: agentResult.error || null,
        };
      } catch (error) {
        logger.error("❌ Agent execution failed", { error });
        return {
          success: false,
          articleId: null,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    });

    if (result.success && result.articleId) {
      logger.info(`✨ Job completed successfully`, {
        jobId,
        articleId: result.articleId,
      });
      return {
        success: true,
        jobId,
        articleId: result.articleId,
      };
    } else {
      logger.error(`💥 Job failed`, {
        jobId,
        error: result.error,
      });
      return {
        success: false,
        jobId,
        error: result.error || "Unknown error",
      };
    }
  }
);
