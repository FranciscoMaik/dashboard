"use client";

import { Clock, ThumbsUp } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Bar,
  BarChart,
  Cell,
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

export function FeedbackOverview() {
  const { theme } = useTheme();
  const textColor = theme === "dark" ? "#a1a1aa" : "#71717a";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sentiment Distribution - Central Stage emphasis */}
      <Card className="bg-surface-card rounded-card shadow-card border-none p-6 lg:col-span-2 flex flex-col h-[320px] relative overflow-hidden group">
        <div className="flex justify-between items-start mb-6 z-10">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-text-primary text-lg tracking-tight">
              Distribuição de Sentimento
            </h3>
            <p className="text-sm text-text-secondary">
              Total de 142 feedbacks este mês
            </p>
          </div>
          <div className="bg-status-success/10 text-status-success px-3 py-1 rounded-full text-xs font-semibold tracking-wide flex items-center shadow-sm">
            +12% vs mês anterior
          </div>
        </div>

        {/* Recharts Bar Chart */}
        <div className="flex-1 w-full relative mt-4 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sentimentData}
              margin={{ top: 20, right: 30, left: -20, bottom: 0 }}
            >
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: textColor, fontSize: 13, fontWeight: 600 }}
                dy={10}
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
              <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={60}>
                {sentimentData.map((entry, index) => (
                  <Cell
                    key={`cell-${
                      // biome-ignore lint/suspicious/noArrayIndexKey: the sentiment data order is static
                      index
                    }`}
                    fill={entry.fill}
                    className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="flex flex-col gap-6">
        {/* Overall Satisfaction */}
        <Card className="bg-surface-card rounded-card shadow-card border-none p-6 h-full flex flex-row items-center gap-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-subtle rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-110 transition-transform duration-700 ease-out pointer-events-none" />
          <div className="h-[72px] w-[72px] rounded-[24px] bg-accent-subtle flex items-center justify-center shrink-0 shadow-sm border border-accent-primary/10 relative z-10">
            <ThumbsUp className="h-[30px] w-[30px] text-accent-primary stroke-[1.5px]" />
          </div>
          <div className="flex flex-col gap-1.5 relative z-10">
            <p className="text-sm font-semibold tracking-wide text-text-secondary">
              Satisfação Geral
            </p>
            <div className="flex items-baseline gap-1">
              <h2 className="text-[40px] leading-none font-bold tracking-tight text-text-primary">
                4.8
              </h2>
              <span className="text-xl font-medium text-text-muted">/5.0</span>
            </div>
          </div>
        </Card>

        {/* Pending Card */}
        <Card className="bg-surface-card rounded-card shadow-card border-none p-6 h-full flex flex-row items-center gap-6 relative overflow-hidden group">
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-status-warning/5 rounded-full -mr-16 -mb-16 opacity-50 group-hover:scale-110 transition-transform duration-700 ease-out pointer-events-none" />
          <div className="h-[72px] w-[72px] rounded-[24px] bg-status-warning/10 flex items-center justify-center shrink-0 shadow-sm border border-status-warning/20 relative z-10">
            <Clock className="h-[30px] w-[30px] text-status-warning stroke-[1.5px]" />
          </div>
          <div className="flex flex-col gap-1.5 relative z-10">
            <p className="text-sm font-semibold tracking-wide text-text-secondary">
              Pendentes
            </p>
            <h2 className="text-[40px] leading-none font-bold tracking-tight text-text-primary">
              12
            </h2>
          </div>
        </Card>
      </div>
    </div>
  );
}
