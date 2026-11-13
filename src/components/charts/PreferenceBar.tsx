import { flowColor, noPreferenceColor } from "./colors";
import type { PreferenceSplit } from "../../lib/resultsAnalysis";

export function PreferenceBar({ split }: { split: PreferenceSplit }) {
  const { A, B, noPreference, total } = split;
  const segments = [
    { label: "Preferred Flow A", value: A, color: flowColor.A },
    { label: "Preferred Flow B", value: B, color: flowColor.B },
    { label: "No preference", value: noPreference, color: noPreferenceColor },
  ].filter((s) => s.value > 0);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-ink-900">Which did participants prefer?</h3>
      {total === 0 ? (
        <p className="mt-2 text-sm text-ink-500">No preference responses yet.</p>
      ) : (
        <>
          <div className="mt-3 flex h-6 w-full overflow-hidden rounded-full bg-ink-100">
            {segments.map((s, i) => (
              <div
                key={s.label}
                style={{
                  width: `${(s.value / total) * 100}%`,
                  background: s.color,
                  marginLeft: i === 0 ? 0 : 2,
                }}
                title={`${s.label}: ${s.value}`}
              />
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-ink-700">
            {segments.map((s) => (
              <span key={s.label} className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                {s.label} — {s.value} ({Math.round((s.value / total) * 100)}%)
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
