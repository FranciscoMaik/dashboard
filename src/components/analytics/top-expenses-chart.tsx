"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";

interface CategoryData {
  name: string;
  value: number;
}

interface TopExpensesChartProps {
  data: CategoryData[];
}

export function TopExpensesChart({ data }: TopExpensesChartProps) {
  return (
    <Card className="col-span-2">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-5">
          <h3 className="text-sm font-semibold text-text-primary tracking-tight">
            Principais Categorias
          </h3>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#F4F4F5"
              />
              <XAxis type="number" hide />
              <YAxis
                dataKey="name"
                type="category"
                width={100}
                stroke="#A1A1AA"
                fontSize={12}
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
                formatter={(value: number | undefined) =>
                  formatCurrency(value || 0)
                }
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={18}>
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill="#4F46E5"
                    fillOpacity={1 - index * 0.08}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
