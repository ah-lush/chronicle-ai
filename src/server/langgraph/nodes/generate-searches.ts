import type { AgentStateType } from "../state";
import { llm } from "../tools/llm.tool";
import { updateJobStatus } from "../tools/database.tool";
import { z } from "zod";

const SearchQueriesSchema = z.object({
  queries: z.array(z.string()).describe("An array of search queries to find relevant articles"),
});

export async function generateSearchesNode(state: AgentStateType): Promise<Partial<AgentStateType>> {
  console.log("Generating search queries...");

  try {
    await updateJobStatus({
      jobId: state.jobId,
      status: "SEARCHING",
      currentStep: "Generating search queries to find relevant information",
      progress: 20,
    });

    const analysis = state.analysisResult!;
    const attempt = state.searchAttempts || 0;

    let prompt = `Generate 3-5 effective search queries to find recent news articles about: "${analysis.topic}"

Keywords to consider: ${analysis.keywords.join(", ")}
Category: ${analysis.category}

Create diverse queries that will help gather comprehensive information. Include:
1. The main topic/person name
2. Recent news or updates
3. Relevant context or related topics

Respond with a JSON object:
{
  "queries": ["query1", "query2", "query3"]
}`;

    if (attempt > 0) {
      prompt += `\n\nNote: Previous search attempt ${attempt} failed or returned insufficient results. Try different phrasing or broader/narrower terms.`;
    }

    const response = await llm.invoke(prompt);
    const content = response.content as string;

    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : content;

    const result = SearchQueriesSchema.parse(JSON.parse(jsonStr.trim()));

    console.log("Search queries generated:", result.queries);

    await updateJobStatus({
      jobId: state.jobId,
      searchQueries: result.queries,
    });

    return {
      searchQueries: result.queries,
      searchAttempts: attempt + 1,
    };
  } catch (error) {
    console.error("Search query generation failed:", error);

    await updateJobStatus({
      jobId: state.jobId,
      status: "FAILED",
      errorMessage: `Failed to generate search queries: ${error instanceof Error ? error.message : "Unknown error"}`,
    });

    return {
      error: `Failed to generate search queries: ${error instanceof Error ? error.message : "Unknown error"}`,
      completed: true,
    };
  }
}
