import { ChatOpenAI } from "@langchain/openai";

export const createLLM = () => {
  return new ChatOpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    // modelName: "x-ai/grok-4-fast",
    // modelName: "google/gemini-2.0-flash-exp:free",
    modelName: "amazon/nova-2-lite-v1:free",
    configuration: {
      baseURL: "https://openrouter.ai/api/v1",
      defaultHeaders: {
        "HTTP-Referer":
          process.env.NEXT_PUBLIC_SITE_URL || "https://chronicle-ai.com",
        "X-Title": "Chronicle AI",
      },
    },
    temperature: 0.7,
  });
};

export const llm = createLLM();
