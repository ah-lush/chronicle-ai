import type { AgentStateType } from "../state";

export function shouldContinueAfterResearch(state: AgentStateType): string {
  if (state.error) {
    return "end";
  }

  if (state.researchSuccess) {
    return "write";
  }

  if (state.shouldRephrase) {
    return "rephrase";
  }

  return "end";
}

export function shouldEnd(state: AgentStateType): string {
  if (state.completed || state.error) {
    return "end";
  }

  return "continue";
}
