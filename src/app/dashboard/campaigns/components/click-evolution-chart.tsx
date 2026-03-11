"use client";

import { MoreVertical } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Mock data for the chart
const baseData = [
  { date: "Oct 18", clicks: 3200 },
  { date: "Oct 19", clicks: 3800 },
  { date: "Oct 20", clicks: 3400 },
  { date: "Oct 21", clicks: 4500 },
  { date: "Oct 22", clicks: 4100 },
  { date: "Oct 23", clicks: 5200 },
  { date: "Oct 24", clicks: 4900 },
];

export function ClickEvolutionChart() {
  const { theme } = useTheme();

  // A cor accent-primary usada no CSS (#1d63dd) para manter a fidelidade do design system
  const accentColor = "#1d63dd";
  const gridColor = theme === "dark" ? "#27272a" : "#e4e4e7"; // zinc-800 or zinc-200
  const textColor = theme === "dark" ? "#a1a1aa" : "#71717a"; // zinc-400 or zinc-500

  return (
    <div className="bg-surface-card border border-border-default rounded-card shadow-card p-6 flex flex-col h-[420px]">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-semibold tracking-tight text-text-primary">
          Evolução de Cliques
        </h2>
        <button
          type="button"
          className="text-text-muted hover:text-text-primary transition-colors"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={baseData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={accentColor} stopOpacity={0.2} />
                <stop offset="95%" stopColor={accentColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke={gridColor}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: textColor, fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: textColor, fontSize: 12, fontWeight: 500 }}
              tickFormatter={(value) =>
                `${value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}`
              }
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-surface-elevated border border-border-default shadow-float px-3 py-2 rounded-card">
                      <p className="text-xs font-semibold text-text-muted mb-1">
                        {label}
                      </p>
                      <p className="font-bold text-text-primary text-sm flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-accent-primary" />
                        {payload[0].value?.toLocaleString()} cliques
                      </p>
                    </div>
                  );
                }
                return null;
              }}
              cursor={{
                stroke: gridColor,
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />
            <Area
              type="monotone"
              dataKey="clicks"
              stroke={accentColor}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorClicks)"
              activeDot={{
                r: 6,
                fill: "var(--color-surface-card, #fff)",
                stroke: accentColor,
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
