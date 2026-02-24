"use client";

import { Users } from "lucide-react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

const MOCK_LOGIN_DATA = [
  { month: "Mar", logins: 142 },
  { month: "Abr", logins: 168 },
  { month: "Mai", logins: 155 },
  { month: "Jun", logins: 190 },
  { month: "Jul", logins: 210 },
  { month: "Ago", logins: 198 },
  { month: "Set", logins: 225 },
  { month: "Out", logins: 240 },
  { month: "Nov", logins: 232 },
  { month: "Dez", logins: 258 },
  { month: "Jan", logins: 275 },
  { month: "Fev", logins: 290 },
];

export function LoginActivityCard() {
  const totalLogins = MOCK_LOGIN_DATA.reduce((sum, m) => sum + m.logins, 0);
  const avgMonthly = Math.round(totalLogins / MOCK_LOGIN_DATA.length);
  const lastMonth = MOCK_LOGIN_DATA[MOCK_LOGIN_DATA.length - 1];
  const prevMonth = MOCK_LOGIN_DATA[MOCK_LOGIN_DATA.length - 2];
  const growthPct =
    prevMonth.logins > 0
      ? (
          ((lastMonth.logins - prevMonth.logins) / prevMonth.logins) *
          100
        ).toFixed(1)
      : "0";

  return (
    <Card className="h-full">
      <CardContent className="pt-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-card bg-accent-subtle">
            <Users className="h-4 w-4 text-accent-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary tracking-tight">
              Logins de Usuários
            </h3>
            <p className="text-[11px] text-text-muted">Últimos 12 meses</p>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-surface-page rounded-card p-3">
            <p className="text-[10px] text-text-muted uppercase tracking-wide font-medium">
              Total
            </p>
            <p className="text-lg font-bold text-text-primary tabular-nums tracking-tight">
              {totalLogins.toLocaleString("pt-BR")}
            </p>
          </div>
          <div className="bg-surface-page rounded-card p-3">
            <p className="text-[10px] text-text-muted uppercase tracking-wide font-medium">
              Média/mês
            </p>
            <p className="text-lg font-bold text-text-primary tabular-nums tracking-tight">
              {avgMonthly}
            </p>
          </div>
          <div className="bg-surface-page rounded-card p-3">
            <p className="text-[10px] text-text-muted uppercase tracking-wide font-medium">
              Crescimento
            </p>
            <p className="text-lg font-bold text-status-success tabular-nums tracking-tight">
              +{growthPct}%
            </p>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="flex-1 min-h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={MOCK_LOGIN_DATA}
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            >
              <XAxis
                dataKey="month"
                stroke="#A1A1AA"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#A1A1AA"
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(79, 70, 229, 0.04)" }}
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E4E4E7",
                  borderRadius: "12px",
                  boxShadow: "0 2px 24px -6px rgba(0,0,0,0.03)",
                  fontSize: "12px",
                }}
                formatter={(value: number | undefined) => [
                  `${value ?? 0} logins`,
                  "Usuários",
                ]}
              />
              <Bar
                dataKey="logins"
                fill="#4F46E5"
                radius={[4, 4, 0, 0]}
                barSize={16}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
