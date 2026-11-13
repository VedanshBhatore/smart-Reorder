import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { flowColor } from "./colors";

interface TwoFlowBarChartProps {
  title: string;
  valueA: number;
  valueB: number;
  formatValue: (v: number) => string;
  domainMax?: number;
}

export function TwoFlowBarChart({ title, valueA, valueB, formatValue, domainMax }: TwoFlowBarChartProps) {
  const data = [
    { name: "Flow A", value: valueA, fill: flowColor.A },
    { name: "Flow B", value: valueB, fill: flowColor.B },
  ];

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-ink-900">{title}</h3>
      <div className="mt-2 h-40 w-full">
        <ResponsiveContainer>
          <BarChart data={data} layout="vertical" margin={{ top: 4, right: 36, bottom: 4, left: 4 }}>
            <CartesianGrid stroke="#e1e0d9" horizontal={false} />
            <XAxis type="number" domain={[0, domainMax ?? "auto"]} hide />
            <YAxis
              type="category"
              dataKey="name"
              width={56}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={{ stroke: "#c3c2b7" }}
              tickLine={false}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24} isAnimationActive={false}>
              {data.map((d) => (
                <Cell key={d.name} fill={d.fill} />
              ))}
              <LabelList
                dataKey="value"
                position="right"
                formatter={(v: unknown) => formatValue(Number(v))}
                fill="#16181d"
                fontSize={12}
                fontWeight={600}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
