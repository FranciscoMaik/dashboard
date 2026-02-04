"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { month: "Jan", accounts: 45 },
  { month: "Fev", accounts: 52 },
  { month: "Mar", accounts: 48 },
  { month: "Abr", accounts: 61 },
  { month: "Mai", accounts: 55 },
  { month: "Jun", accounts: 67 },
  { month: "Jul", accounts: 72 },
  { month: "Ago", accounts: 84 },
  { month: "Set", accounts: 91 },
  { month: "Out", accounts: 102 },
  { month: "Nov", accounts: 115 },
  { month: "Dez", accounts: 128 },
];

export function AccountCreationChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Criação de Contas (Últimos 12 Meses)</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorAccounts" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1d63dd" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1d63dd" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="month"
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
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Area
                type="monotone"
                dataKey="accounts"
                stroke="#1d63dd"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorAccounts)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
