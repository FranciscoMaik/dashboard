import { Bot, Landmark, TrendingUp, UserPlus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const STATS = [
  {
    label: "Usuários com IA",
    value: "1.247",
    change: "+12%",
    positive: true,
    icon: Bot,
  },
  {
    label: "Novas Contas",
    value: "384",
    change: "+8.2%",
    positive: true,
    icon: UserPlus,
  },
  {
    label: "Open Finance",
    value: "892",
    change: "+15%",
    positive: true,
    icon: Landmark,
  },
  {
    label: "B3 Conectadas",
    value: "1.065",
    change: "+5.4%",
    positive: true,
    icon: TrendingUp,
  },
];

export function OverviewStatsRow() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STATS.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
                  {stat.label}
                </span>
                <div className="flex h-7 w-7 items-center justify-center rounded-card bg-accent-subtle">
                  <Icon className="h-3.5 w-3.5 text-accent-primary" />
                </div>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-bold tracking-tight text-text-primary tabular-nums">
                  {stat.value}
                </p>
                <span className="text-xs font-semibold text-status-success mb-0.5">
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
