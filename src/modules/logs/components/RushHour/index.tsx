import {
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card } from "@/components/ui/card";

import { peakHoursData } from "./mock";

export default function RushHour() {
  return (
    <Card className="p-6 bg-surface-card shadow-card border-none rounded-card flex flex-col">
      <div className="mb-2">
        <h3 className="text-lg font-bold text-text-primary tracking-tight">
          Horários de Pico
        </h3>
        <p className="text-sm text-text-secondary mt-1">
          Distribuição de quantidade de cliques por horários
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between flex-1 py-4">
        {/* Gráfico Donut */}
        <div className="h-[200px] w-[200px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={peakHoursData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
                cornerRadius={5}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div
                        style={{
                          backgroundColor: "#ffffff",
                          borderRadius: "8px",
                          padding: "8px 12px",
                          boxShadow:
                            "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#18181B",
                        }}
                      >
                        {payload[0].name}: {payload[0].value}%
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
          {/* Central Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold text-text-primary tracking-tighter">
              60%
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-text-muted mt-0.5">
              Manhã
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-4 w-full md:w-auto mt-6 md:mt-0 md:mr-6">
          {[
            {
              label: "Manhã (06h - 12h)",
              value: "60%",
              color: "bg-accent-primary",
            },
            {
              label: "Tarde (12h - 18h)",
              value: "25%",
              color: "bg-blue-300",
            },
            {
              label: "Noite (18h - 00h)",
              value: "15%",
              color: "bg-surface-page border border-border-default",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between md:justify-start gap-8"
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="text-sm font-semibold text-text-primary">
                  {item.label}
                </span>
              </div>
              <span className="text-sm text-text-muted font-medium">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
