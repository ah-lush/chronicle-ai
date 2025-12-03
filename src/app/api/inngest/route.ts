import { inngest } from "@/inngest/client";
import { helloWorld } from "@/inngest/functions/helloworld";
import { aiArticleGeneration } from "@/inngest/functions/ai-article-generation";
import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [helloWorld, aiArticleGeneration],
});
