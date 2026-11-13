import Papa from "papaparse";
import type { FlowId } from "./counterbalance";
import type { PreferenceChoice, TestSession } from "./session";

// Flattened shape used for the CSV export/import — one row per session,
// with FlowA_* / FlowB_* columns so the file opens sensibly in a spreadsheet.
interface FlatRow {
  participantId: string;
  participantNumber: number;
  order: string; // "A,B" or "B,A"
  A_taps: number;
  A_mistaps: number;
  A_timeMs: number | "";
  A_completed: boolean;
  A_gaveUp: boolean;
  A_susScore: number | "";
  B_taps: number;
  B_mistaps: number;
  B_timeMs: number | "";
  B_completed: boolean;
  B_gaveUp: boolean;
  B_susScore: number | "";
  preferenceChoice: string;
  preferenceReason: string;
  startedAt: string;
  completedAt: string;
}

function elapsedOf(result: TestSession["results"][FlowId]): number | "" {
  if (result.startedAt === null || result.endedAt === null) return "";
  return result.endedAt - result.startedAt;
}

function toFlatRow(session: TestSession): FlatRow {
  const a = session.results.A;
  const b = session.results.B;
  return {
    participantId: session.participantId,
    participantNumber: session.participantNumber,
    order: session.order.join(","),
    A_taps: a.taps,
    A_mistaps: a.mistaps,
    A_timeMs: elapsedOf(a),
    A_completed: a.completed,
    A_gaveUp: a.gaveUp,
    A_susScore: a.susScore ?? "",
    B_taps: b.taps,
    B_mistaps: b.mistaps,
    B_timeMs: elapsedOf(b),
    B_completed: b.completed,
    B_gaveUp: b.gaveUp,
    B_susScore: b.susScore ?? "",
    preferenceChoice: session.preference?.choice ?? "",
    preferenceReason: session.preference?.reason ?? "",
    startedAt: session.startedAt,
    completedAt: session.completedAt ?? "",
  };
}

export function sessionsToCsv(sessions: TestSession[]): string {
  const rows = sessions.map(toFlatRow);
  return Papa.unparse(rows);
}

export function sessionsToJson(sessions: TestSession[]): string {
  return JSON.stringify(sessions, null, 2);
}

function toBool(value: unknown): boolean {
  return value === true || value === "true" || value === "TRUE" || value === "1" || value === 1;
}

function toNumOrNull(value: unknown): number | null {
  if (value === "" || value === null || value === undefined) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

/** Rebuilds TestSession objects from a FlatRow-shaped CSV (as produced by sessionsToCsv). */
export function csvToSessions(csvText: string): TestSession[] {
  const parsed = Papa.parse<Record<string, string>>(csvText, { header: true, skipEmptyLines: true });
  return parsed.data.map((row) => {
    const order = (row.order ?? "A,B").split(",") as [FlowId, FlowId];
    const timeA = toNumOrNull(row.A_timeMs);
    const timeB = toNumOrNull(row.B_timeMs);
    return {
      participantId: row.participantId,
      participantNumber: Number(row.participantNumber) || 0,
      order,
      results: {
        A: {
          startedAt: timeA !== null ? 0 : null,
          endedAt: timeA !== null ? timeA : null,
          taps: Number(row.A_taps) || 0,
          mistaps: Number(row.A_mistaps) || 0,
          completed: toBool(row.A_completed),
          gaveUp: toBool(row.A_gaveUp),
          susAnswers: null,
          susScore: toNumOrNull(row.A_susScore),
        },
        B: {
          startedAt: timeB !== null ? 0 : null,
          endedAt: timeB !== null ? timeB : null,
          taps: Number(row.B_taps) || 0,
          mistaps: Number(row.B_mistaps) || 0,
          completed: toBool(row.B_completed),
          gaveUp: toBool(row.B_gaveUp),
          susAnswers: null,
          susScore: toNumOrNull(row.B_susScore),
        },
      },
      preference: row.preferenceChoice
        ? { choice: row.preferenceChoice as PreferenceChoice, reason: row.preferenceReason ?? "" }
        : null,
      startedAt: row.startedAt || new Date().toISOString(),
      completedAt: row.completedAt || null,
    } as TestSession;
  });
}

export function jsonToSessions(jsonText: string): TestSession[] {
  const parsed = JSON.parse(jsonText);
  if (!Array.isArray(parsed)) throw new Error("Expected a JSON array of sessions");
  return parsed as TestSession[];
}

export function downloadTextFile(filename: string, contents: string, mime: string): void {
  const blob = new Blob([contents], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
