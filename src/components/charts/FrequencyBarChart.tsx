import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts";
import type { FieldDistribution } from "../../lib/surveyCsv";

// Single-hue sequential bar — this chart's job is magnitude by category for
// one variable, not telling series apart, so every bar takes the same hue.
const barHue = "#2a78d6";

export function FrequencyBarChart({ field }: { field: FieldDistribution }) {
  const data = field.counts.map((c) => ({
    name: c.label,
    count: c.count,
    pct: field.total > 0 ? Math.round((c.count / field.total) * 100) : 0,
  }));

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-semibold text-ink-900">{field.shortLabel}</h3>
        {field.type === "likert" && field.mean !== undefined && (
          <span className="text-xs font-semibold text-ink-500">mean {field.mean.toFixed(1)} / 5</span>
        )}
      </div>
      <p className="text-xs text-ink-500">{field.total} responses</p>
      <div className="mt-2 w-full" style={{ height: Math.max(120, data.length * 34) }}>
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical" margin={{ top: 4, right: 48, bottom: 4, left: 4 }}>
            <CartesianGrid stroke="#e1e0d9" horizontal={false} />
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={190}
              tick={{ fill: "#6b7280", fontSize: 11 }}
              axisLine={{ stroke: "#c3c2b7" }}
              tickLine={false}
            />
            <Bar dataKey="count" fill={barHue} radius={[0, 4, 4, 0]} barSize={16} isAnimationActive={false}>
              <LabelList
                dataKey="pct"
                position="right"
                formatter={(v: unknown) => `${v}%`}
                fill="#16181d"
                fontSize={11}
                fontWeight={600}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
