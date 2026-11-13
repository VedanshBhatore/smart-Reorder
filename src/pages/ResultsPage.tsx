import { useMemo, useRef, useState } from "react";
import { SampleDataBadge } from "../components/SampleDataBadge";
import { StatPair } from "../components/charts/StatPair";
import { ParticipantDotPlot } from "../components/charts/ParticipantDotPlot";
import { TwoFlowBarChart } from "../components/charts/TwoFlowBarChart";
import { PreferenceBar } from "../components/charts/PreferenceBar";
import { sampleUsabilitySessions } from "../data/sampleUsabilitySessions";
import { DIRECTIONAL_THRESHOLD, summarizeFlow, summarizePreference } from "../lib/resultsAnalysis";
import { loadSessions, replaceAllSessions, type TestSession } from "../lib/session";
import { csvToSessions, downloadTextFile, jsonToSessions, sessionsToCsv, sessionsToJson } from "../lib/sessionCsv";

function formatSeconds(ms: number): string {
  if (!Number.isFinite(ms)) return "—";
  return `${(ms / 1000).toFixed(1)}s`;
}

function formatPct(p: number): string {
  if (!Number.isFinite(p)) return "—";
  return `${Math.round(p * 100)}%`;
}

export function ResultsPage() {
  const [realSessions, setRealSessions] = useState<TestSession[]>(() => loadSessions());
  const [previewSample, setPreviewSample] = useState(realSessions.length === 0);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const usingSample = realSessions.length === 0 || previewSample;
  const sessions = realSessions.length > 0 && !previewSample ? realSessions : sampleUsabilitySessions;

  const summaryA = useMemo(() => summarizeFlow(sessions, "A"), [sessions]);
  const summaryB = useMemo(() => summarizeFlow(sessions, "B"), [sessions]);
  const preference = useMemo(() => summarizePreference(sessions), [sessions]);

  const completedCount = Math.min(summaryA.timesMs.length, summaryB.timesMs.length);
  const isDirectional = completedCount < DIRECTIONAL_THRESHOLD;

  function refresh() {
    setRealSessions(loadSessions());
  }

  async function handleImport(file: File) {
    setImportError(null);
    try {
      const text = await file.text();
      const imported = file.name.toLowerCase().endsWith(".json")
        ? jsonToSessions(text)
        : csvToSessions(text);
      const existing = loadSessions();
      const byId = new Map(existing.map((s) => [s.participantId, s]));
      for (const s of imported) byId.set(s.participantId, s);
      replaceAllSessions([...byId.values()]);
      refresh();
      setPreviewSample(false);
    } catch (err) {
      setImportError(err instanceof Error ? err.message : "Could not read that file.");
    }
  }

  function clearRealData() {
    if (!confirm("Clear all saved usability sessions from this browser? This can't be undone.")) return;
    replaceAllSessions([]);
    refresh();
    setPreviewSample(true);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-semibold text-ink-900">Usability results</h1>
        {usingSample && <SampleDataBadge />}
      </div>
      <p className="mb-6 max-w-2xl text-sm text-ink-500">
        Flow A (current-style reorder) vs Flow B (Smart Reorder), from moderated sessions run on{" "}
        <code className="rounded bg-ink-100 px-1 py-0.5">/test</code>.
      </p>

      <div className="mb-6 flex flex-wrap items-center gap-2 rounded-2xl bg-white p-4 shadow-sm">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="rounded-full border border-basket-500 px-3 py-1.5 text-sm font-semibold text-basket-600"
        >
          Import CSV / JSON
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImport(file);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          disabled={realSessions.length === 0}
          onClick={() => downloadTextFile("basket-usability-sessions.csv", sessionsToCsv(realSessions), "text/csv")}
          className="rounded-full border border-ink-300 px-3 py-1.5 text-sm font-semibold text-ink-700 disabled:opacity-40"
        >
          Export CSV
        </button>
        <button
          type="button"
          disabled={realSessions.length === 0}
          onClick={() => downloadTextFile("basket-usability-sessions.json", sessionsToJson(realSessions), "application/json")}
          className="rounded-full border border-ink-300 px-3 py-1.5 text-sm font-semibold text-ink-700 disabled:opacity-40"
        >
          Export JSON
        </button>

        <div className="ml-auto flex items-center gap-2">
          {realSessions.length > 0 && (
            <label className="flex items-center gap-1.5 text-xs font-medium text-ink-500">
              <input
                type="checkbox"
                checked={previewSample}
                onChange={(e) => setPreviewSample(e.target.checked)}
                className="accent-basket-600"
              />
              Preview with sample data instead
            </label>
          )}
          {realSessions.length > 0 && (
            <button type="button" onClick={clearRealData} className="text-xs font-semibold text-red-600 underline">
              Clear saved sessions
            </button>
          )}
        </div>
      </div>

      {importError && (
        <p className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{importError}</p>
      )}

      {isDirectional && (
        <p className="mb-6 rounded-xl border border-dashed border-accent-500 bg-accent-500/10 p-3 text-sm text-accent-600">
          Only {completedCount} participant{completedCount === 1 ? "" : "s"} completed both flows —
          below the {DIRECTIONAL_THRESHOLD} needed for statistical significance. Treat these results
          as directional, not conclusive.
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatPair
          label="Median time to checkout"
          valueA={formatSeconds(summaryA.medianTimeMs)}
          valueB={formatSeconds(summaryB.medianTimeMs)}
          subA={`range ${formatSeconds(summaryA.spreadTimeMs[0])}–${formatSeconds(summaryA.spreadTimeMs[1])}`}
          subB={`range ${formatSeconds(summaryB.spreadTimeMs[0])}–${formatSeconds(summaryB.spreadTimeMs[1])}`}
        />
        <StatPair
          label="Median taps to checkout"
          valueA={Number.isFinite(summaryA.medianTaps) ? `${summaryA.medianTaps}` : "—"}
          valueB={Number.isFinite(summaryB.medianTaps) ? `${summaryB.medianTaps}` : "—"}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ParticipantDotPlot
          title="Time to checkout, per participant"
          unit="s"
          pointsA={toPoints(sessions, "A", "time")}
          pointsB={toPoints(sessions, "B", "time")}
          formatValue={(v) => `${v.toFixed(1)}s`}
        />
        <ParticipantDotPlot
          title="Taps to checkout, per participant"
          unit=""
          pointsA={toPoints(sessions, "A", "taps")}
          pointsB={toPoints(sessions, "B", "taps")}
          formatValue={(v) => `${v} taps`}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TwoFlowBarChart
          title="Completion rate"
          valueA={summaryA.completionRate * 100}
          valueB={summaryB.completionRate * 100}
          formatValue={(v) => formatPct(v / 100)}
          domainMax={100}
        />
        <TwoFlowBarChart
          title="Mean SUS score (0–100)"
          valueA={summaryA.meanSus}
          valueB={summaryB.meanSus}
          formatValue={(v) => (Number.isFinite(v) ? v.toFixed(0) : "—")}
          domainMax={100}
        />
      </div>

      <div className="mt-4">
        <PreferenceBar split={preference} />
      </div>

      <SessionTable sessions={sessions} />
    </div>
  );
}

function toPoints(sessions: TestSession[], flow: "A" | "B", metric: "time" | "taps") {
  return sessions
    .map((s) => {
      const r = s.results[flow];
      if (metric === "taps") {
        if (r.startedAt === null) return null;
        return { id: s.participantId, value: r.taps };
      }
      if (r.startedAt === null || r.endedAt === null || !r.completed) return null;
      return { id: s.participantId, value: (r.endedAt - r.startedAt) / 1000 };
    })
    .filter((p): p is { id: string; value: number } => p !== null);
}

function SessionTable({ sessions }: { sessions: TestSession[] }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold text-ink-900">Per-participant data (table view)</h3>
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-ink-300 text-xs uppercase tracking-wide text-ink-500">
            <th className="py-2 pr-3">Participant</th>
            <th className="py-2 pr-3">Order</th>
            <th className="py-2 pr-3">A time</th>
            <th className="py-2 pr-3">A taps</th>
            <th className="py-2 pr-3">A SUS</th>
            <th className="py-2 pr-3">B time</th>
            <th className="py-2 pr-3">B taps</th>
            <th className="py-2 pr-3">B SUS</th>
            <th className="py-2 pr-3">Preference</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((s) => {
            const a = s.results.A;
            const b = s.results.B;
            const aTime = a.startedAt !== null && a.endedAt !== null ? (a.endedAt - a.startedAt) / 1000 : null;
            const bTime = b.startedAt !== null && b.endedAt !== null ? (b.endedAt - b.startedAt) / 1000 : null;
            return (
              <tr key={s.participantId} className="border-b border-ink-100 text-ink-700">
                <td className="py-1.5 pr-3 font-medium text-ink-900">{s.participantId}</td>
                <td className="py-1.5 pr-3">{s.order.join(" → ")}</td>
                <td className="py-1.5 pr-3 tabular-nums">
                  {aTime !== null ? `${aTime.toFixed(1)}s${a.gaveUp ? " (gave up)" : ""}` : "—"}
                </td>
                <td className="py-1.5 pr-3 tabular-nums">{a.taps}</td>
                <td className="py-1.5 pr-3 tabular-nums">{a.susScore ?? "—"}</td>
                <td className="py-1.5 pr-3 tabular-nums">
                  {bTime !== null ? `${bTime.toFixed(1)}s${b.gaveUp ? " (gave up)" : ""}` : "—"}
                </td>
                <td className="py-1.5 pr-3 tabular-nums">{b.taps}</td>
                <td className="py-1.5 pr-3 tabular-nums">{b.susScore ?? "—"}</td>
                <td className="py-1.5 pr-3">{s.preference?.choice ?? "—"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
