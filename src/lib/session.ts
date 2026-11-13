import type { FlowId } from "./counterbalance";
import type { FlowMetrics } from "./metrics";
import { createFlowMetrics } from "./metrics";

export interface FlowResult extends FlowMetrics {
  susAnswers: number[] | null; // 10 Likert answers, 1-5
  susScore: number | null; // 0-100
}

export function createFlowResult(): FlowResult {
  return { ...createFlowMetrics(), susAnswers: null, susScore: null };
}

export type PreferenceChoice = FlowId | "no-preference";

export interface TestSession {
  participantId: string;
  participantNumber: number;
  order: [FlowId, FlowId];
  results: Record<FlowId, FlowResult>;
  preference: { choice: PreferenceChoice; reason: string } | null;
  startedAt: string; // ISO timestamp, when the session was created
  completedAt: string | null; // ISO timestamp, when preference was submitted
}

export function createTestSession(
  participantId: string,
  participantNumber: number,
  order: [FlowId, FlowId]
): TestSession {
  return {
    participantId,
    participantNumber,
    order,
    results: { A: createFlowResult(), B: createFlowResult() },
    preference: null,
    startedAt: new Date().toISOString(),
    completedAt: null,
  };
}

const SESSIONS_KEY = "basket.usability.sessions.v1";

export { SESSIONS_KEY };
