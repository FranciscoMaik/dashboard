"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";

interface EvolutionData {
  name: string; // Period name (e.g. Month)
  revenue: number;
  expenses: number;
  balance: number;
}

interface EvolutionChartProps {
  data: EvolutionData[];
}

export function EvolutionChart({ data }: EvolutionChartProps) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Evolução</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => formatCurrency(value)}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                name="Receita"
                stroke="#10b981" // emerald-500
                strokeWidth={2}
                dot={{ fill: "#10b981" }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                name="Despesas"
                stroke="#ef4444" // red-500
                strokeWidth={2}
                dot={{ fill: "#ef4444" }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="balance"
                name="Saldo"
                stroke="#3b82f6" // blue-500
                strokeWidth={2}
                dot={{ fill: "#3b82f6" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
