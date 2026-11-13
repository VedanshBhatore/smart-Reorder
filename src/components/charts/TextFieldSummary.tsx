import type { FieldDistribution } from "../../lib/surveyCsv";

export function TextFieldSummary({ field }: { field: FieldDistribution }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-ink-900">{field.shortLabel}</h3>
      <p className="text-xs text-ink-500">{field.total} open-text responses</p>
      {field.sampleResponses && field.sampleResponses.length > 0 && (
        <ul className="mt-2 space-y-1.5">
          {field.sampleResponses.map((r, i) => (
            <li key={i} className="rounded-lg bg-ink-100 px-3 py-1.5 text-xs text-ink-700">
              "{r}"
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
