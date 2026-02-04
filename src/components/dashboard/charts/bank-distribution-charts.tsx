"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const creditData = [
  { name: "Nubank", value: 45000 },
  { name: "Itaú", value: 32000 },
  { name: "Bradesco", value: 21000 },
  { name: "C6 Bank", value: 18000 },
  { name: "Santander", value: 12000 },
];

const checkingData = [
  { name: "Itaú", value: 55000 },
  { name: "Bradesco", value: 42000 },
  { name: "Nubank", value: 28000 },
  { name: "Inter", value: 22000 },
  { name: "BB", value: 19000 },
];

const COLORS = ["#8b5cf6", "#f97316", "#ef4444", "#3b82f6", "#10b981"];

export function BankDistributionCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2 col-span-4 lg:col-span-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Crédito por Banco
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={creditData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {creditData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number | undefined) =>
                    `$${(value || 0).toLocaleString()}`
                  }
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Conta Corrente por Banco
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={checkingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {checkingData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number | undefined) =>
                    `$${(value || 0).toLocaleString()}`
                  }
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
