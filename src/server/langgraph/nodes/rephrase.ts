import type { AgentStateType } from "../state";

export async function rephraseNode(_state: AgentStateType): Promise<Partial<AgentStateType>> {
  console.log("Rephrase node - routing back to generate new searches");

  // This node doesn't do any processing, it just resets the flag
  // The actual rephrasing happens in generate-searches node based on searchAttempts
  return {
    shouldRephrase: false,
  };
}
