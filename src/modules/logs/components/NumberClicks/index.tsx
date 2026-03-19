import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";

import { volumeData } from "./mock";

export default function NumberClicks() {
  return (
    <Card className="p-6 lg:col-span-2 bg-surface-card shadow-card border-none rounded-card flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-bold text-text-primary tracking-tight">
            Volume de Cliques ao Longo do Tempo
          </h3>
          <p className="text-sm text-text-secondary mt-1">
            Análise de cliques de usuários por mês
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-surface-page border border-border-default px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-accent-primary" />
            <span className="text-xs font-semibold text-text-secondary">
              Cliques
            </span>
          </div>
        </div>
      </div>
      <div className="h-[250px] w-full mt-auto">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={volumeData}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f4f4f5"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#a1a1aa", fontWeight: 600 }}
              dy={10}
            />
            <YAxis hide domain={[0, "dataMax + 50000"]} />
            <Tooltip
              cursor={{ fill: "#f4f4f5" }}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                fontSize: "12px",
                fontWeight: 600,
              }}
              formatter={(value: any) =>
                new Intl.NumberFormat("pt-BR").format(value as number)
              }
            />
            <Bar dataKey="cliques" radius={[4, 4, 0, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
