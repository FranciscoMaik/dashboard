"use client";

import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Building,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  DateRangeFilter,
  type Period,
} from "@/components/analytics/date-range-filter";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";

// Helper function to mock realistic looking data points based on period
function getMockChartData(period: string, category: string) {
  if (category === "all") return [];

  let dataPoints = 6; // default points
  let getLabel = (i: number) => `Mês ${i + 1}`;

  if (period === "1 Mês") {
    dataPoints = 4;
    getLabel = (i: number) => `Semana ${i + 1}`;
  } else if (period === "3 Meses") {
    dataPoints = 3;
  } else if (period === "6 Meses") {
    dataPoints = 6;
  } else if (period === "12 Meses") {
    dataPoints = 12;
  }

  // Generate somewhat stable random data with an upward/downward trend
  const baseValue = Math.random() * 500 + 100;
  return Array.from({ length: dataPoints }).map((_, i) => ({
    name: getLabel(i),
    value: baseValue + Math.random() * 200 - 50 + i * 20,
  }));
}

function getMockTransactions(category: string) {
  if (category === "all") return [];
  const banks = ["Nubank", "Itaú", "Inter", "Bradesco"];
  return Array.from({ length: 15 })
    .map((_, i) => ({
      id: `tx-${i}`,
      name: `Compra no(a) Estabelecimento ${i + 1}`,
      date: `2024-03-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
      bank: banks[i % banks.length],
      value: Math.random() * 1000 + 50,
      subcategory: i % 3 === 0 ? "Restaurantes" : "Supermercado",
    }))
    .sort((a, b) => b.value - a.value);
}

export default function CategoryAnalysisPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("3M");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const chartData = useMemo(
    () => getMockChartData(selectedPeriod, selectedCategory),
    [selectedPeriod, selectedCategory],
  );

  const mockTransactions = useMemo(
    () => getMockTransactions(selectedCategory),
    [selectedCategory],
  );

  const highestExpense = mockTransactions[0];
  const lowestExpense = mockTransactions[mockTransactions.length - 1];
  const top10Transactions = mockTransactions.slice(0, 10);

  // Mocking categories for the dropdown to make it functional for visualization
  const categories: string[] = [
    "Alimentação",
    "Transporte",
    "Lazer",
    "Moradia",
  ];

  const summaryCards = [
    {
      label: "Média Mensal",
      value: formatCurrency(
        chartData.length > 0
          ? chartData.reduce((acc, curr) => acc + curr.value, 0) /
              chartData.length
          : 0,
      ),
      subtitle: `No período de ${selectedPeriod}`,
      icon: BarChart3,
    },
    {
      label: "Total Geral",
      value: formatCurrency(
        chartData.length > 0
          ? chartData.reduce((acc, curr) => acc + curr.value, 0)
          : 0,
      ),
      subtitle: "Soma do período",
      icon: Wallet,
    },
    {
      label: "Valor Mínimo",
      value: formatCurrency(
        chartData.length > 0 ? Math.min(...chartData.map((d) => d.value)) : 0,
      ),
      subtitle: "Em uma categoria",
      icon: ArrowDown,
    },
    {
      label: "Valor Máximo",
      value: formatCurrency(
        chartData.length > 0 ? Math.max(...chartData.map((d) => d.value)) : 0,
      ),
      subtitle: "Em uma categoria",
      icon: ArrowUp,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary">
              Análise de categorias
            </h1>
            <p className="text-sm text-text-muted mt-1">
              Selecione uma categoria para avaliar os gastos.
            </p>
          </div>
        </div>

        {/* Time Filters - Segmented Control */}
        <DateRangeFilter
          selected={selectedPeriod}
          onSelect={setSelectedPeriod}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Select
          value={selectedCategory}
          onValueChange={(val) => {
            setSelectedCategory(val);
          }}
        >
          <SelectTrigger className="w-full sm:w-[200px] border-border-default text-text-primary rounded-button bg-surface-card">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Nenhuma categoria</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card
              key={card.label}
              className="transition-all duration-200 hover:shadow-hover"
            >
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
                    {card.label}
                  </span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-card bg-surface-page">
                    <Icon className="h-3.5 w-3.5 text-text-muted" />
                  </div>
                </div>
                <p className="text-xl font-bold tracking-tight tabular-nums text-text-primary">
                  {card.value}
                </p>
                <p className="text-xs text-text-muted mt-1">{card.subtitle}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {selectedCategory === "all" ? (
        <div className="w-full h-[500px] rounded-card border border-border-default bg-surface-card flex flex-col items-center justify-center relative overflow-hidden">
          {/* Isometric blueprint grid for empty state */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
            <svg
              width="800"
              height="800"
              viewBox="0 0 400 400"
              className="text-text-primary"
              style={{ transform: "rotateX(60deg) rotateZ(45deg)" }}
            >
              <title>Blueprint Grid Background</title>
              <defs>
                <pattern
                  id="isometric-grid"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect
                width="800"
                height="800"
                fill="url(#isometric-grid)"
                transform="translate(-200, -200)"
              />
            </svg>
          </div>

          {/* Blueprint diamond */}
          <div className="relative z-10 flex flex-col items-center mb-6">
            <svg
              width="80"
              height="80"
              viewBox="0 0 100 100"
              className="text-accent-primary animate-pulse"
            >
              <title>Animated Blueprint Diamond</title>
              <path
                d="M50 10 L90 50 L50 90 L10 50 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              {/* Shadow under the diamond */}
              <path
                d="M50 85 L80 65 L50 95 L20 65 Z"
                fill="currentColor"
                className="opacity-20"
              />
            </svg>
          </div>

          <h3 className="text-xl font-semibold tracking-tight text-text-primary relative z-10">
            Nenhuma categoria selecionada
          </h3>
          <p className="text-sm text-text-muted mt-2 max-w-md text-center relative z-10">
            Selecione uma categoria nos filtros acima para visualizar a evolução
            de gastos neste período.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Chart Section */}
          <Card className="col-span-3">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-5">
                <h3 className="text-sm font-semibold text-text-primary tracking-tight">
                  Evolução - {selectedCategory}
                </h3>
              </div>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 15, right: 10, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#F4F4F5"
                    />
                    <XAxis
                      dataKey="name"
                      stroke="#A1A1AA"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis
                      stroke="#A1A1AA"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => formatCurrency(value)}
                      width={80}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FFFFFF",
                        borderColor: "#E4E4E7",
                        borderRadius: "12px",
                        boxShadow: "0 2px 24px -6px rgba(0,0,0,0.03)",
                        fontSize: "12px",
                      }}
                      formatter={(value: number | undefined) => [
                        formatCurrency(value ?? 0),
                        "Gasto",
                      ]}
                      labelStyle={{
                        color: "#52525B",
                        fontWeight: "600",
                        marginBottom: "0.25rem",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      name="Evolução"
                      stroke="#1d63dd"
                      strokeWidth={2.5}
                      dot={{ fill: "#1d63dd", r: 4 }}
                      activeDot={{ r: 6, stroke: "#1d63dd", strokeWidth: 2 }}
                      animationDuration={1500}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Section 1: Divisão Maior Gasto / Menor Gasto */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Maior Gasto */}
            <Card className="transition-all duration-200 hover:shadow-hover">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-button bg-[#EF4444]/10">
                      <TrendingUp className="h-5 w-5 text-[#EF4444]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary tracking-tight">
                        Maior gasto
                      </h3>
                      <p className="text-xs text-text-muted">Neste período</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight text-text-primary tabular-nums">
                    {highestExpense
                      ? formatCurrency(highestExpense.value)
                      : formatCurrency(0)}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-default">
                    <span className="text-sm font-medium text-text-primary truncate max-w-[150px]">
                      {highestExpense?.name}
                    </span>
                    <span className="text-xs text-text-muted">
                      {highestExpense?.date}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Menor Gasto */}
            <Card className="transition-all duration-200 hover:shadow-hover">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-button bg-[#10B981]/10">
                      <TrendingDown className="h-5 w-5 text-[#10B981]" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary tracking-tight">
                        Menor gasto
                      </h3>
                      <p className="text-xs text-text-muted">Neste período</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight text-text-primary tabular-nums">
                    {lowestExpense
                      ? formatCurrency(lowestExpense.value)
                      : formatCurrency(0)}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border-default">
                    <span className="text-sm font-medium text-text-primary truncate max-w-[150px]">
                      {lowestExpense?.name}
                    </span>
                    <span className="text-xs text-text-muted">
                      {lowestExpense?.date}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section 2: Top 10 Transações */}
          <Card className="overflow-hidden">
            <div className="px-6 py-5 border-b border-border-default">
              <h3 className="text-sm font-semibold text-text-primary tracking-tight">
                Top 10 Maiores Gastos
              </h3>
              <p className="text-xs text-text-muted mt-1">
                Transações mais altas da categoria neste período de análise
              </p>
            </div>
            <div className="divide-y divide-border-subtle">
              {top10Transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-surface-hover transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-page border border-border-default group-hover:bg-white transition-colors">
                      <Building className="h-4 w-4 text-text-muted" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary leading-none mb-1.5">
                        {tx.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-text-secondary">
                          {tx.bank}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-border-default"></span>
                        <span className="text-xs text-text-secondary">
                          {tx.subcategory}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-text-primary tabular-nums mb-1">
                      {formatCurrency(tx.value)}
                    </p>
                    <p className="text-xs text-text-muted">{tx.date}</p>
                  </div>
                </div>
              ))}
              {top10Transactions.length === 0 && (
                <div className="px-6 py-8 text-center">
                  <p className="text-sm text-text-muted">
                    Nenhuma transação encontrada
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
