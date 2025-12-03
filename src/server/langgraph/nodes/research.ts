import type { AgentStateType } from "../state";
import { updateJobStatus } from "../tools/database.tool";
import { scrapeNews, type ScraperResult } from "../tools/scraper.tool";

const MAX_RETRIES = 3;
const MIN_ARTICLES_REQUIRED = 3;

export async function researchNode(
  state: AgentStateType
): Promise<Partial<AgentStateType>> {
  try {
    await updateJobStatus({
      jobId: state.jobId,
      status: "RESEARCHING",
      currentStep: "Searching for relevant articles and information",
      progress: 40,
    });

    const queries = state.searchQueries!;
    let allResults: ScraperResult[] = [];

    queries.forEach((q, i) => console.log(`   ${i + 1}. "${q}"`));

    for (let i = 0; i < queries.length; i++) {
      const query = queries[i];
      console.log(
        `\n🔎 Executing query ${i + 1}/${queries.length}: "${query}"`
      );

      try {
        const results = await scrapeNews(query, 5);

        if (results && results.length > 0) {
          allResults = [...allResults, ...results];
          console.log(`✅ Found ${results.length} articles`);

          // Log details about images found
          const articlesWithImages = results.filter(
            (r) => r.main_image || (r.images && r.images.length > 0)
          );
          console.log(
            `   📸 Articles with images: ${articlesWithImages.length}/${results.length}`
          );
        } else {
          console.log(`⚠️  No results for this query`);
        }
      } catch (error) {
        console.error(`❌ Query failed:`, error);
        // Continue with next query
      }
    }

    const uniqueResults = allResults.filter(
      (article, index, self) =>
        index === self.findIndex((a) => a.url === article.url)
    );

    const totalImages = uniqueResults.reduce((sum, article) => {
      let count = 0;
      if (article.main_image) count++;
      if (article.images) count += article.images.length;
      return sum + count;
    }, 0);

    if (uniqueResults.length >= MIN_ARTICLES_REQUIRED) {
      await updateJobStatus({
        jobId: state.jobId,
        researchData: uniqueResults as any,
        currentStep: `Found ${uniqueResults.length} relevant articles`,
        progress: 60,
      });

      return {
        researchData: uniqueResults,
        researchSuccess: true,
        shouldRephrase: false,
      };
    } else {
      const attempts = state.searchAttempts || 0;

      if (attempts < MAX_RETRIES) {
        console.log(
          `Insufficient results (${uniqueResults.length}). Will rephrase and retry...`
        );

        await updateJobStatus({
          jobId: state.jobId,
          currentStep: `Found only ${uniqueResults.length} articles. Retrying with different queries...`,
          progress: 30,
        });

        return {
          researchData: uniqueResults,
          researchSuccess: false,
          shouldRephrase: true,
        };
      } else {
        // Max retries reached
        console.error(
          `Max retries (${MAX_RETRIES}) reached. Insufficient articles found.`
        );

        await updateJobStatus({
          jobId: state.jobId,
          status: "FAILED",
          errorMessage: `Could not find enough relevant articles after ${MAX_RETRIES} attempts. Found ${uniqueResults.length} articles.`,
        });

        return {
          error: `Could not find enough relevant articles after ${MAX_RETRIES} attempts`,
          completed: true,
        };
      }
    }
  } catch (error) {
    console.error("Research failed:", error);

    await updateJobStatus({
      jobId: state.jobId,
      status: "FAILED",
      errorMessage: `Research failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
    });

    return {
      error: `Research failed: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      completed: true,
    };
  }
}
