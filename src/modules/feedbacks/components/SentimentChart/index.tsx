"use client";

import { useTheme } from "next-themes";
import {
  Bar,
  BarChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";

const sentimentData = [
  { name: "Bons", count: 112, fill: "#1d63dd" },
  { name: "Médios", count: 22, fill: "#1d63dd80" },
  { name: "Ruins", count: 8, fill: "#1d63dd26" },
];

interface BarShapeProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
}

function BarShape(props: BarShapeProps) {
  const { x = 0, y = 0, width = 0, height = 0, fill } = props;
  return (
    <Rectangle
      x={x}
      y={y}
      width={width}
      height={height}
      fill={fill}
      className="transition-all duration-300 hover:opacity-80 cursor-pointer"
    />
  );
}

interface SentimentChartProps {
  totalFeedbacks?: number;
  growth?: string;
}

export function SentimentChart({
  totalFeedbacks = 142,
  growth = "+12% vs mês anterior",
}: SentimentChartProps) {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? "#a1a1aa" : "#71717a";

  return (
    <Card className="bg-surface-card rounded-card shadow-card border-none p-6 relative overflow-hidden group flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6 z-10">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-text-primary text-lg tracking-tight">
            Distribuição de Sentimento
          </h3>
          <p className="text-sm text-text-secondary">
            Total de {totalFeedbacks} feedbacks este mês
          </p>
        </div>
        <div className="bg-status-success/10 text-status-success px-3 py-1 rounded-full text-xs font-semibold tracking-wide flex items-center shadow-sm">
          {growth}
        </div>
      </div>

      <div className="flex-1 w-full min-h-[200px]">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={sentimentData}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: textColor, fontSize: 12, fontWeight: 600 }}
              dy={8}
            />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: "transparent" }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-surface-elevated border border-border-default shadow-float px-3 py-2 rounded-card">
                      <p className="text-xs font-semibold text-text-muted mb-1">
                        {label}
                      </p>
                      <p className="font-bold text-text-primary text-sm flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: payload[0].payload.fill }}
                        />
                        {payload[0].value} feedbacks
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={50}>
              {sentimentData.map((entry, index) => (
                <BarShape
                  // biome-ignore lint/suspicious/noArrayIndexKey: the sentiment data order is static
                  key={`cell-${index}`}
                  fill={entry.fill}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
