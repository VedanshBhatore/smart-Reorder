import type { FlowId } from "./counterbalance";
import type { FlowMetrics } from "./metrics";
import { createFlowMetrics } from "./metrics";
import { readJSON, writeJSON } from "./storage";

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

export const SESSIONS_KEY = "basket.usability.sessions.v1";

export function loadSessions(): TestSession[] {
  return readJSON<TestSession[]>(SESSIONS_KEY, []);
}

/** Inserts the session, or overwrites the existing one with the same participantId. */
export function saveSession(session: TestSession): void {
  const sessions = loadSessions();
  const idx = sessions.findIndex((s) => s.participantId === session.participantId);
  if (idx >= 0) sessions[idx] = session;
  else sessions.push(session);
  writeJSON(SESSIONS_KEY, sessions);
}

export function replaceAllSessions(sessions: TestSession[]): void {
  writeJSON(SESSIONS_KEY, sessions);
}
