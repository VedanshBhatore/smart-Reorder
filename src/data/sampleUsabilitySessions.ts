import { getFlowOrder } from "../lib/counterbalance";
import { computeSUS } from "../lib/sus";
import type { TestSession } from "../lib/session";
import { createTestSession } from "../lib/session";

// SAMPLE DATA — fabricated for demo purposes only. Replace by running real
// sessions through /test and importing the export on /results.
// Directionally modeled on the case study's hypothesis (Flow B faster, fewer
// taps, higher SUS) but every number here is made up, not measured.

interface Spec {
  id: string;
  n: number;
  aSeconds: number;
  aTaps: number;
  aMistaps: number;
  aSus: number[];
  bSeconds: number;
  bTaps: number;
  bMistaps: number;
  bSus: number[];
  preference: "A" | "B" | "no-preference";
  reason: string;
  gaveUpA?: boolean;
}

const agree: number[] = [4, 2, 4, 2, 4, 2, 4, 2, 4, 2]; // a fairly positive, consistent SUS pattern
const mild: number[] = [3, 3, 3, 3, 4, 2, 3, 3, 4, 2];
const great: number[] = [5, 1, 5, 1, 5, 2, 5, 1, 5, 1];

const specs: Spec[] = [
  { id: "P01", n: 1, aSeconds: 58, aTaps: 22, aMistaps: 4, aSus: mild, bSeconds: 19, bTaps: 7, bMistaps: 0, bSus: great, preference: "B", reason: "Way fewer steps, found the swap easily." },
  { id: "P02", n: 2, aSeconds: 64, aTaps: 25, aMistaps: 6, aSus: mild, bSeconds: 22, bTaps: 8, bMistaps: 1, bSus: great, preference: "B", reason: "Reordering felt instant." },
  { id: "P03", n: 3, aSeconds: 71, aTaps: 27, aMistaps: 5, aSus: agree, bSeconds: 25, bTaps: 9, bMistaps: 0, bSus: agree, preference: "B", reason: "Liked seeing everything pre-selected." },
  { id: "P04", n: 4, aSeconds: 49, aTaps: 20, aMistaps: 3, aSus: agree, bSeconds: 17, bTaps: 7, bMistaps: 0, bSus: great, preference: "B", reason: "Less digging through menus." },
  { id: "P05", n: 5, aSeconds: 80, aTaps: 30, aMistaps: 8, aSus: mild, bSeconds: 28, bTaps: 10, bMistaps: 1, bSus: agree, preference: "B", reason: "A felt like a scavenger hunt for the substitute." },
  { id: "P06", n: 6, aSeconds: 55, aTaps: 21, aMistaps: 4, aSus: agree, bSeconds: 21, bTaps: 8, bMistaps: 0, bSus: agree, preference: "A", reason: "Prefers picking items manually each time." },
  { id: "P07", n: 7, aSeconds: 67, aTaps: 24, aMistaps: 5, aSus: mild, bSeconds: 24, bTaps: 9, bMistaps: 1, bSus: agree, preference: "B", reason: "Quantity steppers were easy." },
  { id: "P08", n: 8, aSeconds: 90, aTaps: 33, aMistaps: 9, aSus: mild, bSeconds: 26, bTaps: 10, bMistaps: 1, bSus: agree, preference: "B", reason: "Didn't have to search for the substitute item." },
  { id: "P09", n: 9, aSeconds: 62, aTaps: 23, aMistaps: 4, aSus: agree, bSeconds: 20, bTaps: 8, bMistaps: 0, bSus: great, preference: "B", reason: "Noticeably faster, felt confident." },
  { id: "P10", n: 10, aSeconds: 75, aTaps: 11, aMistaps: 9, aSus: mild, bSeconds: 23, bTaps: 9, bMistaps: 0, bSus: agree, preference: "B", reason: "Gave up looking for past orders in A; B was obvious.", gaveUpA: true },
  { id: "P11", n: 11, aSeconds: 60, aTaps: 22, aMistaps: 3, aSus: agree, bSeconds: 18, bTaps: 7, bMistaps: 0, bSus: great, preference: "no-preference", reason: "Both fine once I knew where to look." },
  { id: "P12", n: 12, aSeconds: 69, aTaps: 26, aMistaps: 6, aSus: mild, bSeconds: 27, bTaps: 11, bMistaps: 2, bSus: agree, preference: "B", reason: "Still preferred B overall." },
];

function buildSession(spec: Spec): TestSession {
  const order = getFlowOrder(spec.n);
  let session = createTestSession(spec.id, spec.n, order);

  const resultA = {
    ...session.results.A,
    startedAt: 0,
    endedAt: spec.aSeconds * 1000,
    taps: spec.aTaps,
    mistaps: spec.aMistaps,
    completed: !spec.gaveUpA,
    gaveUp: !!spec.gaveUpA,
    susAnswers: spec.aSus,
    susScore: computeSUS(spec.aSus),
  };
  const resultB = {
    ...session.results.B,
    startedAt: 0,
    endedAt: spec.bSeconds * 1000,
    taps: spec.bTaps,
    mistaps: spec.bMistaps,
    completed: true,
    gaveUp: false,
    susAnswers: spec.bSus,
    susScore: computeSUS(spec.bSus),
  };

  session = {
    ...session,
    results: { A: resultA, B: resultB },
    preference: { choice: spec.preference, reason: spec.reason },
    completedAt: "2026-11-01T12:00:00.000Z",
  };
  return session;
}

export const sampleUsabilitySessions: TestSession[] = specs.map(buildSession);
