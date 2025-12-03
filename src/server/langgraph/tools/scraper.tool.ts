import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

export interface ScraperResult {
  url: string;
  title: string;
  content: string;
  main_image: string;
  images: string[];
  publish_date: string;
  source: string;
}

export interface ScraperRequest {
  query: string;
  max_results?: number;
}

export async function scrapeNews(
  query: string,
  maxResults: number = 10
): Promise<ScraperResult[]> {
  const scraperUrl = process.env.SCRAPER_API_URL;

  if (!scraperUrl) {
    throw new Error("SCRAPER_API_URL environment variable is not set");
  }

  const response = await fetch(`${scraperUrl}/research`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      max_results: maxResults,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Scraper API returned ${response.status}: ${response.statusText}`
    );
  }

  const data = await response.json();
  return data as ScraperResult[];
}

export const scraperTool = new DynamicStructuredTool({
  name: "scrape_news",
  description: `Searches for and scrapes recent news articles related to a given query.
  Use this tool to gather information about current events, people, or topics.
  Returns a list of articles with their content, images, and metadata.
  If the scraper fails or returns no results, try rephrasing the query or using different keywords.`,
  schema: z.object({
    query: z
      .string()
      .describe("The search query to find relevant news articles"),
    max_results: z
      .number()
      .optional()
      .default(10)
      .describe("Maximum number of articles to retrieve (default: 10)"),
  }),
  func: async ({ query, max_results }) => {
    const results = await scrapeNews(query, max_results);
    return JSON.stringify(results);
  },
});
