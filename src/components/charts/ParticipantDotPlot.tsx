import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { flowColor } from "./colors";

interface Point {
  id: string;
  value: number;
}

interface ParticipantDotPlotProps {
  title: string;
  unit: string; // e.g. "s" or "taps"
  pointsA: Point[];
  pointsB: Point[];
  formatValue?: (v: number) => string;
}

/** Deterministic horizontal jitter so overlapping values fan out instead of stacking exactly. */
function jitter(index: number): number {
  const step = 0.09;
  const sign = index % 2 === 0 ? 1 : -1;
  return sign * step * Math.ceil(index / 2);
}

function toScatterData(points: Point[], baseX: number) {
  return points.map((p, i) => ({ x: baseX + jitter(i), y: p.value, id: p.id }));
}

export function ParticipantDotPlot({ title, unit, pointsA, pointsB, formatValue }: ParticipantDotPlotProps) {
  const fmt = formatValue ?? ((v: number) => `${v}`);
  const dataA = toScatterData(pointsA, 0);
  const dataB = toScatterData(pointsB, 1);

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-ink-900">{title}</h3>
        <div className="flex items-center gap-3 text-xs font-medium text-ink-500">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: flowColor.A }} /> Flow A
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: flowColor.B }} /> Flow B
          </span>
        </div>
      </div>
      <div className="mt-2 h-64 w-full">
        <ResponsiveContainer>
          <ScatterChart margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
            <CartesianGrid stroke="#e1e0d9" vertical={false} />
            <XAxis
              type="number"
              dataKey="x"
              domain={[-0.6, 1.6]}
              ticks={[0, 1]}
              tickFormatter={(v) => (v === 0 ? "Flow A" : v === 1 ? "Flow B" : "")}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={{ stroke: "#c3c2b7" }}
              tickLine={false}
            />
            <YAxis
              type="number"
              dataKey="y"
              unit={unit}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={{ stroke: "#c3c2b7" }}
              tickLine={false}
              width={48}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const p = payload[0].payload as { id: string; y: number };
                return (
                  <div className="rounded-lg border border-ink-300 bg-white px-2.5 py-1.5 text-xs shadow-md">
                    <div className="font-semibold text-ink-900">{p.id}</div>
                    <div className="text-ink-500">{fmt(p.y)}</div>
                  </div>
                );
              }}
            />
            <Scatter data={dataA} fill={flowColor.A} stroke="#fff" strokeWidth={2} r={5} />
            <Scatter data={dataB} fill={flowColor.B} stroke="#fff" strokeWidth={2} r={5} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
