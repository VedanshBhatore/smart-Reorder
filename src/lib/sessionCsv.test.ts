import { describe, expect, it } from "vitest";
import { csvToSessions, jsonToSessions, sessionsToCsv, sessionsToJson } from "./sessionCsv";
import { createTestSession } from "./session";
import type { TestSession } from "./session";

function sampleSession(): TestSession {
  let s = createTestSession("P01", 1, ["A", "B"]);
  s = {
    ...s,
    results: {
      A: { startedAt: 0, endedAt: 42_000, taps: 18, mistaps: 3, completed: true, gaveUp: false, susAnswers: null, susScore: 72.5 },
      B: { startedAt: 0, endedAt: 15_000, taps: 6, mistaps: 0, completed: true, gaveUp: false, susAnswers: null, susScore: 90 },
    },
    preference: { choice: "B", reason: "fewer taps" },
    completedAt: "2026-11-10T10:00:00.000Z",
  };
  return s;
}

describe("CSV round trip", () => {
  it("preserves the numbers that matter through export and re-import", () => {
    const original = sampleSession();
    const csv = sessionsToCsv([original]);
    const [restored] = csvToSessions(csv);

    expect(restored.participantId).toBe("P01");
    expect(restored.participantNumber).toBe(1);
    expect(restored.order).toEqual(["A", "B"]);
    expect(restored.results.A.taps).toBe(18);
    expect(restored.results.A.mistaps).toBe(3);
    expect(restored.results.A.susScore).toBe(72.5);
    expect(restored.results.A.endedAt! - restored.results.A.startedAt!).toBe(42_000);
    expect(restored.results.B.endedAt! - restored.results.B.startedAt!).toBe(15_000);
    expect(restored.preference).toEqual({ choice: "B", reason: "fewer taps" });
  });

  it("round-trips cleanly through CSV for a batch of sessions", () => {
    const sessions = [sampleSession(), { ...sampleSession(), participantId: "P02", participantNumber: 2 }];
    const csv = sessionsToCsv(sessions);
    const restored = csvToSessions(csv);
    expect(restored).toHaveLength(2);
    expect(restored.map((s) => s.participantId)).toEqual(["P01", "P02"]);
  });
});

describe("JSON round trip", () => {
  it("preserves the full session object exactly", () => {
    const original = sampleSession();
    const json = sessionsToJson([original]);
    const [restored] = jsonToSessions(json);
    expect(restored).toEqual(original);
  });

  it("rejects a JSON payload that isn't an array", () => {
    expect(() => jsonToSessions(JSON.stringify({ not: "an array" }))).toThrow();
  });
});
