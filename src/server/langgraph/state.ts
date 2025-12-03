import { Annotation } from "@langchain/langgraph";
import type { ScraperResult } from "./tools/scraper.tool";

export interface ArticleData {
  title: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  coverImage?: string;
  articleImages?: string[];
}

export const AgentState = Annotation.Root({
  // Input
  userPrompt: Annotation<string>({
    reducer: (prev, next) => next ?? prev,
  }),
  userId: Annotation<string>({
    reducer: (prev, next) => next ?? prev,
  }),
  jobId: Annotation<string>({
    reducer: (prev, next) => next ?? prev,
  }),

  // Analysis
  analysisResult: Annotation<{
    topic: string;
    category: string;
    keywords: string[];
    tone?: string;
    length?: string;
    additionalContext?: string;
  }>({
    reducer: (prev, next) => next ?? prev,
  }),

  // Search
  searchQueries: Annotation<string[]>({
    reducer: (prev, next) => next ?? prev,
  }),
  searchAttempts: Annotation<number>({
    reducer: (prev, next) => (next !== undefined ? next : prev ?? 0),
  }),

  // Research
  researchData: Annotation<ScraperResult[]>({
    reducer: (prev, next) => next ?? prev,
  }),
  researchSuccess: Annotation<boolean>({
    reducer: (prev, next) => next ?? prev ?? false,
  }),

  // Article
  articleData: Annotation<ArticleData | null>({
    reducer: (prev, next) => next ?? prev,
  }),
  articleId: Annotation<string | null>({
    reducer: (prev, next) => next ?? prev,
  }),

  // Control flow
  shouldRephrase: Annotation<boolean>({
    reducer: (prev, next) => next ?? prev ?? false,
  }),
  error: Annotation<string | null>({
    reducer: (prev, next) => next ?? prev,
  }),
  completed: Annotation<boolean>({
    reducer: (prev, next) => next ?? prev ?? false,
  }),
});

export type AgentStateType = typeof AgentState.State;
