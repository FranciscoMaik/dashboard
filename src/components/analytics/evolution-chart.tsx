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
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";

interface EvolutionData {
  name: string;
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
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-5">
          <h3 className="text-sm font-semibold text-text-primary tracking-tight">
            Evolução
          </h3>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
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
              />
              <YAxis
                stroke="#A1A1AA"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => formatCurrency(value)}
                width={95}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#E4E4E7",
                  borderRadius: "12px",
                  boxShadow: "0 2px 24px -6px rgba(0,0,0,0.03)",
                  fontSize: "12px",
                }}
                formatter={(value: number | undefined) =>
                  formatCurrency(value ?? 0)
                }
              />
              <Legend wrapperStyle={{ fontSize: "12px", color: "#52525B" }} />
              <Line
                type="monotone"
                dataKey="revenue"
                name="Receita"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: "#10B981", r: 3 }}
                activeDot={{ r: 5, stroke: "#10B981", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                name="Despesas"
                stroke="#EF4444"
                strokeWidth={2}
                dot={{ fill: "#EF4444", r: 3 }}
                activeDot={{ r: 5, stroke: "#EF4444", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="balance"
                name="Saldo"
                stroke="#4F46E5"
                strokeWidth={2.5}
                dot={{ fill: "#4F46E5", r: 3 }}
                activeDot={{ r: 6, stroke: "#4F46E5", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
