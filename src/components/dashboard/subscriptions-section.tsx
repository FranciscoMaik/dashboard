"use client";

import { Ban, CreditCard, DollarSign } from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";

const MOCK_SUBSCRIPTION_DATA = [
  { month: "Mar", realizadas: 42, canceladas: 5, receita: 18900 },
  { month: "Abr", realizadas: 38, canceladas: 8, receita: 20250 },
  { month: "Mai", realizadas: 55, canceladas: 6, receita: 22400 },
  { month: "Jun", realizadas: 61, canceladas: 4, receita: 25100 },
  { month: "Jul", realizadas: 48, canceladas: 10, receita: 24300 },
  { month: "Ago", realizadas: 67, canceladas: 7, receita: 28500 },
  { month: "Set", realizadas: 72, canceladas: 5, receita: 31200 },
  { month: "Out", realizadas: 58, canceladas: 9, receita: 29800 },
  { month: "Nov", realizadas: 83, canceladas: 6, receita: 34500 },
  { month: "Dez", realizadas: 91, canceladas: 4, receita: 38200 },
  { month: "Jan", realizadas: 78, canceladas: 8, receita: 36900 },
  { month: "Fev", realizadas: 95, canceladas: 3, receita: 41500 },
];

export function SubscriptionsSection() {
  const lastMonth = MOCK_SUBSCRIPTION_DATA[MOCK_SUBSCRIPTION_DATA.length - 1];
  const prevMonth = MOCK_SUBSCRIPTION_DATA[MOCK_SUBSCRIPTION_DATA.length - 2];

  const totalRealizadas = MOCK_SUBSCRIPTION_DATA.reduce(
    (sum, m) => sum + m.realizadas,
    0,
  );
  const totalCanceladas = MOCK_SUBSCRIPTION_DATA.reduce(
    (sum, m) => sum + m.canceladas,
    0,
  );

  const receitaGrowth =
    prevMonth.receita > 0
      ? (
          ((lastMonth.receita - prevMonth.receita) / prevMonth.receita) *
          100
        ).toFixed(1)
      : "0";

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-text-primary tracking-tight">
        Assinaturas
      </h3>

      <div className="grid gap-6 md:grid-cols-1 xl:grid-cols-7 items-stretch">
        {/* KPI Cards */}
        <div className="xl:col-span-3 grid gap-4 sm:grid-cols-3">
          {/* Assinaturas Realizadas */}
          <Card>
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
                  Realizadas
                </span>
                <div className="flex h-7 w-7 items-center justify-center rounded-card bg-accent-subtle">
                  <CreditCard className="h-3.5 w-3.5 text-accent-primary" />
                </div>
              </div>
              <p className="text-2xl font-bold tracking-tight text-text-primary tabular-nums">
                {totalRealizadas}
              </p>
              <p className="text-[11px] text-text-muted mt-1">
                {lastMonth.realizadas} neste mês
              </p>
            </CardContent>
          </Card>

          {/* Assinaturas Canceladas */}
          <Card>
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
                  Canceladas
                </span>
                <div className="flex h-7 w-7 items-center justify-center rounded-card bg-surface-page">
                  <Ban className="h-3.5 w-3.5 text-text-muted" />
                </div>
              </div>
              <p className="text-2xl font-bold tracking-tight text-text-primary tabular-nums">
                {totalCanceladas}
              </p>
              <p className="text-[11px] text-text-muted mt-1">
                {lastMonth.canceladas} neste mês
              </p>
            </CardContent>
          </Card>

          {/* Receita Mensal */}
          <Card>
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
                  Receita/mês
                </span>
                <div className="flex h-7 w-7 items-center justify-center rounded-card bg-accent-subtle">
                  <DollarSign className="h-3.5 w-3.5 text-accent-primary" />
                </div>
              </div>
              <p className="text-xl font-bold tracking-tight text-accent-primary tabular-nums">
                {formatCurrency(lastMonth.receita)}
              </p>
              <span className="text-[11px] font-semibold text-status-success">
                +{receitaGrowth}%
              </span>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Area Chart */}
        <Card className="xl:col-span-4 h-full">
          <CardContent className="pt-6 h-full flex flex-col">
            <h4 className="text-sm font-semibold text-text-primary tracking-tight mb-4">
              Evolução da Receita Mensal
            </h4>
            <div className="flex-1 min-h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={MOCK_SUBSCRIPTION_DATA}
                  margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.2} />
                      <stop
                        offset="100%"
                        stopColor="#4F46E5"
                        stopOpacity={0.01}
                      />
                    </linearGradient>
                  </defs>
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
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                    width={35}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E4E4E7",
                      borderRadius: "12px",
                      boxShadow: "0 2px 24px -6px rgba(0,0,0,0.03)",
                      fontSize: "12px",
                    }}
                    formatter={(value: number | undefined, name?: string) => [
                      name === "receita"
                        ? formatCurrency(value ?? 0)
                        : (value ?? 0),
                      name === "receita"
                        ? "Receita"
                        : name === "realizadas"
                          ? "Realizadas"
                          : "Canceladas",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="receita"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
