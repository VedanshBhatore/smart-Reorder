import { useMemo } from "react";
import { Link } from "react-router-dom";
import { SampleDataBadge } from "../../../components/SampleDataBadge";
import { StatPair } from "../../../components/charts/StatPair";
import { ParticipantDotPlot } from "../../../components/charts/ParticipantDotPlot";
import { TwoFlowBarChart } from "../../../components/charts/TwoFlowBarChart";
import { PreferenceBar } from "../../../components/charts/PreferenceBar";
import { sampleUsabilitySessions } from "../../../data/sampleUsabilitySessions";
import { DIRECTIONAL_THRESHOLD, summarizeFlow, summarizePreference } from "../../../lib/resultsAnalysis";
import { loadSessions } from "../../../lib/session";

function formatSeconds(ms: number): string {
  return Number.isFinite(ms) ? `${(ms / 1000).toFixed(1)}s` : "—";
}

export function Validation() {
  const realSessions = loadSessions();
  const usingSample = realSessions.length === 0;
  const sessions = usingSample ? sampleUsabilitySessions : realSessions;

  const summaryA = useMemo(() => summarizeFlow(sessions, "A"), [sessions]);
  const summaryB = useMemo(() => summarizeFlow(sessions, "B"), [sessions]);
  const preference = useMemo(() => summarizePreference(sessions), [sessions]);
  const completedCount = Math.min(summaryA.timesMs.length, summaryB.timesMs.length);

  return (
    <section id="validation" className="scroll-mt-20 py-16">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-basket-600">06 · Validation</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
            Before vs after, with real participants
          </h2>
        </div>
        {usingSample && <SampleDataBadge />}
      </div>
      <p className="mt-3 max-w-2xl text-sm text-ink-700">
        Every participant ran both flows (order counterbalanced) via the built-in moderator tool at{" "}
        <code>/test</code>, which captured time-to-checkout, taps, mis-taps, completion, and a standard SUS
        questionnaire for each flow, plus a head-to-head preference at the end.
      </p>

      {completedCount < DIRECTIONAL_THRESHOLD && (
        <p className="mt-4 rounded-xl border border-dashed border-accent-500 bg-accent-500/10 p-3 text-sm text-accent-600">
          Only {completedCount} participant{completedCount === 1 ? "" : "s"} completed both flows — below the{" "}
          {DIRECTIONAL_THRESHOLD} needed for statistical significance. Treat this as directional.
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
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

      <div className="mt-4">
        <ParticipantDotPlot
          title="Time to checkout, per participant"
          unit="s"
          pointsA={toTimePoints(sessions, "A")}
          pointsB={toTimePoints(sessions, "B")}
          formatValue={(v) => `${v.toFixed(1)}s`}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TwoFlowBarChart
          title="Completion rate"
          valueA={summaryA.completionRate * 100}
          valueB={summaryB.completionRate * 100}
          formatValue={(v) => `${Math.round(v)}%`}
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

      <p className="mt-4 text-sm text-ink-500">
        Full per-participant table, CSV/JSON export, and the moderator tool live at{" "}
        <Link to="/results" className="text-basket-600 underline">
          /results
        </Link>
        .
      </p>
    </section>
  );
}

function toTimePoints(sessions: ReturnType<typeof loadSessions>, flow: "A" | "B") {
  return sessions
    .map((s) => {
      const r = s.results[flow];
      if (r.startedAt === null || r.endedAt === null || !r.completed) return null;
      return { id: s.participantId, value: (r.endedAt - r.startedAt) / 1000 };
    })
    .filter((p): p is { id: string; value: number } => p !== null);
}
