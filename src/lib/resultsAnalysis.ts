import type { FlowId } from "./counterbalance";
import { elapsedMs, mean, median, spread } from "./metrics";
import type { TestSession } from "./session";

export interface FlowSummary {
  n: number;
  timesMs: number[]; // one per participant who completed, for dot-plots
  medianTimeMs: number;
  spreadTimeMs: [number, number];
  tapsPerParticipant: number[];
  medianTaps: number;
  completionRate: number; // 0–1, over all participants who ran this flow
  meanSus: number; // over participants who submitted SUS
  susScores: number[];
}

export function summarizeFlow(sessions: TestSession[], flowId: FlowId): FlowSummary {
  const results = sessions.map((s) => s.results[flowId]).filter((r) => r.startedAt !== null);
  const completed = results.filter((r) => r.completed);
  const timesMs = completed.map((r) => elapsedMs(r)).filter((t): t is number => t !== null);
  const tapsPerParticipant = results.map((r) => r.taps);
  const susScores = results.map((r) => r.susScore).filter((s): s is number => s !== null);

  return {
    n: results.length,
    timesMs,
    medianTimeMs: median(timesMs),
    spreadTimeMs: spread(timesMs),
    tapsPerParticipant,
    medianTaps: median(tapsPerParticipant),
    completionRate: results.length === 0 ? NaN : completed.length / results.length,
    meanSus: mean(susScores),
    susScores,
  };
}

export interface PreferenceSplit {
  A: number;
  B: number;
  noPreference: number;
  total: number;
}

export function summarizePreference(sessions: TestSession[]): PreferenceSplit {
  const withPref = sessions.filter((s) => s.preference !== null);
  return {
    A: withPref.filter((s) => s.preference?.choice === "A").length,
    B: withPref.filter((s) => s.preference?.choice === "B").length,
    noPreference: withPref.filter((s) => s.preference?.choice === "no-preference").length,
    total: withPref.length,
  };
}

/** Below this many completed sessions, the brief asks us to flag results as directional only. */
export const DIRECTIONAL_THRESHOLD = 10;
