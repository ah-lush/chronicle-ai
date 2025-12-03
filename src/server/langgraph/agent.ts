import { StateGraph, END } from "@langchain/langgraph";
import { AgentState, type AgentStateType } from "./state";
import { analyzeNode } from "./nodes/analyze";
import { generateSearchesNode } from "./nodes/generate-searches";
import { researchNode } from "./nodes/research";
import { rephraseNode } from "./nodes/rephrase";
import { writeArticleNode } from "./nodes/write-article";
import { selectImageNode } from "./nodes/select-image";
import { shouldContinueAfterResearch } from "./edges/conditionals";

export async function createArticleAgent() {
  // Create the graph
  const workflow = new StateGraph(AgentState)
    // Add nodes
    .addNode("analyze", analyzeNode)
    .addNode("generate_searches", generateSearchesNode)
    .addNode("research", researchNode)
    .addNode("rephrase", rephraseNode)
    .addNode("write_article", writeArticleNode)
    .addNode("select_image", selectImageNode)
    // Add edges
    .addEdge("__start__", "analyze")
    .addEdge("analyze", "generate_searches")
    .addEdge("generate_searches", "research")
    .addConditionalEdges("research", shouldContinueAfterResearch, {
      write: "write_article",
      rephrase: "rephrase",
      end: END,
    })
    .addEdge("rephrase", "generate_searches")
    .addEdge("write_article", "select_image")
    .addEdge("select_image", END);

  return workflow.compile();
}

export async function runArticleAgent(input: {
  userPrompt: string;
  userId: string;
  jobId: string;
}) {
  const agent = await createArticleAgent();

  const initialState: Partial<AgentStateType> = {
    userPrompt: input.userPrompt,
    userId: input.userId,
    jobId: input.jobId,
    searchAttempts: 0,
    researchSuccess: false,
    shouldRephrase: false,
    completed: false,
    error: null,
  };

  console.log("Starting article generation agent...");
  console.log("Input:", input);

  const result = await agent.invoke(initialState);

  console.log("Agent completed");

  return result;
}
