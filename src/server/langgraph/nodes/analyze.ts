import { z } from "zod";
import type { AgentStateType } from "../state";
import { updateJobStatus } from "../tools/database.tool";
import { llm } from "../tools/llm.tool";

const AnalysisSchema = z.object({
  topic: z.string().describe("The main topic or subject of the article"),
  category: z
    .string()
    .describe(
      "The category for the article (e.g., politics, technology, business)"
    ),
  keywords: z.array(z.string()).describe("Key terms and phrases to search for"),
  tone: z
    .string()
    .optional()
    .describe("The tone of the article (formal, casual, etc.)"),
  length: z.string().optional().describe("The desired length of the article"),
  additionalContext: z
    .string()
    .optional()
    .describe("Any additional context provided"),
});

export async function analyzeNode(
  state: AgentStateType
): Promise<Partial<AgentStateType>> {
  console.log("= Analyzing user prompt...");

  try {
    await updateJobStatus({
      jobId: state.jobId,
      status: "ANALYZING",
      currentStep: "Analyzing the prompt to understand requirements",
      progress: 10,
    });

    const prompt = `Analyze the following user prompt for an article generation request and extract the key information.

User Prompt: "${state.userPrompt}"

Extract:
1. The main topic or subject
2. The appropriate category (politics, technology, business, sports, entertainment, science, health, world, lifestyle)
3. Important keywords to search for
4. The tone if mentioned (formal, casual, technical, creative)
5. The length preference if mentioned (short, medium, long)
6. Any additional context

Respond with a JSON object matching this structure:
{
  "topic": "string",
  "category": "string",
  "keywords": ["string"],
  "tone": "string",
  "length": "string",
  "additionalContext": "string"
}`;

    const response = await llm.invoke(prompt);
    const content = response.content as string;

    const jsonMatch =
      content.match(/```json\n([\s\S]*?)\n```/) || content.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? jsonMatch[1] || jsonMatch[0] : content;

    const analysis = AnalysisSchema.parse(JSON.parse(jsonStr.trim()));

    console.log(" Analysis complete:", analysis);

    return {
      analysisResult: analysis,
    };
  } catch (error) {
    console.error("L Analysis failed:", error);

    await updateJobStatus({
      jobId: state.jobId,
      status: "FAILED",
      errorMessage: `Analysis failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    });

    return {
      error: `Analysis failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      completed: true,
    };
  }
}
