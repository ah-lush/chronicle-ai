import type { AgentStateType } from "../state";
import { llm } from "../tools/llm.tool";
import { createArticle, updateJobStatus } from "../tools/database.tool";
import { z } from "zod";

const ArticleSchema = z.object({
  title: z.string().describe("The article title"),
  summary: z.string().describe("A brief summary of the article (2-3 sentences)"),
  content: z.string().describe("The full article content in markdown format"),
  tags: z.array(z.string()).describe("Relevant tags for the article"),
});

function getWordCountTarget(length?: string): string {
  switch (length) {
    case "short":
      return "500-800 words";
    case "long":
      return "1500-2000 words";
    case "medium":
    default:
      return "1000-1500 words";
  }
}

export async function writeArticleNode(state: AgentStateType): Promise<Partial<AgentStateType>> {
  console.log("Writing article...");

  try {
    await updateJobStatus({
      jobId: state.jobId,
      status: "WRITING",
      currentStep: "Writing the article based on research",
      progress: 70,
    });

    const analysis = state.analysisResult!;
    const researchData = state.researchData!;

    // Prepare research context
    const researchContext = researchData
      .map((article, i) => {
        return `
Source ${i + 1}: ${article.title}
URL: ${article.url}
Published: ${article.publish_date}
Content: ${article.content.substring(0, 1000)}...
`;
      })
      .join("\n---\n");

    const wordCount = getWordCountTarget(analysis.length);
    const tone = analysis.tone || "professional";

    const prompt = `You are a professional journalist. Write a comprehensive, well-researched article based on the following information:

Topic: ${analysis.topic}
Category: ${analysis.category}
Tone: ${tone}
Target Length: ${wordCount}
Keywords to include: ${analysis.keywords.join(", ")}
${analysis.additionalContext ? `Additional Context: ${analysis.additionalContext}` : ""}

Research Sources:
${researchContext}

Instructions:
1. Write an engaging, factual article based on the research provided
2. Use proper markdown formatting (headings, lists, emphasis)
3. Include all key information from the sources
4. Cite or reference the sources naturally in the text
5. Make it engaging and easy to read
6. Length should be approximately ${wordCount}
7. Use the ${tone} tone throughout

Respond with a JSON object:
{
  "title": "Article Title Here",
  "summary": "A 2-3 sentence summary",
  "content": "Full article content in markdown",
  "tags": ["tag1", "tag2", "tag3"]
}`;

    const response = await llm.invoke(prompt);
    const content = response.content as string;

    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || content.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : content;

    const article = ArticleSchema.parse(JSON.parse(jsonStr.trim()));

    console.log("Article written:", article.title);

    // Create article in database
    const createdArticle = await createArticle({
      userId: state.userId,
      title: article.title,
      summary: article.summary,
      content: article.content,
      category: analysis.category,
      tags: article.tags,
    });

    console.log("Article saved to database:", createdArticle.id);

    await updateJobStatus({
      jobId: state.jobId,
      articleId: createdArticle.id,
      currentStep: "Article written and saved",
      progress: 90,
    });

    return {
      articleData: {
        title: article.title,
        summary: article.summary,
        content: article.content,
        category: analysis.category,
        tags: article.tags,
      },
      articleId: createdArticle.id,
    };
  } catch (error) {
    console.error("Article writing failed:", error);

    await updateJobStatus({
      jobId: state.jobId,
      status: "FAILED",
      errorMessage: `Failed to write article: ${error instanceof Error ? error.message : "Unknown error"}`,
    });

    return {
      error: `Failed to write article: ${error instanceof Error ? error.message : "Unknown error"}`,
      completed: true,
    };
  }
}
