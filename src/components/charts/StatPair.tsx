import { flowColor } from "./colors";

interface StatPairProps {
  label: string;
  valueA: string;
  valueB: string;
  subA?: string;
  subB?: string;
}

/** Two stat tiles side by side — the headline number for a metric, Flow A vs Flow B. */
export function StatPair({ label, valueA, valueB, subA, subB }: StatPairProps) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-ink-500">{label}</div>
      <div className="mt-2 grid grid-cols-2 gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-ink-500">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: flowColor.A }} />
            Flow A
          </div>
          <div className="mt-0.5 text-2xl font-semibold text-ink-900">{valueA}</div>
          {subA && <div className="text-xs text-ink-500">{subA}</div>}
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-ink-500">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: flowColor.B }} />
            Flow B
          </div>
          <div className="mt-0.5 text-2xl font-semibold text-ink-900">{valueB}</div>
          {subB && <div className="text-xs text-ink-500">{subB}</div>}
        </div>
      </div>
    </div>
  );
}
