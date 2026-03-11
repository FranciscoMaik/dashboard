import {
  Car,
  Clock,
  GraduationCap,
  Home,
  Plane,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";

export type ObjectiveType = "short" | "medium" | "long";

export interface Objective {
  id: string;
  name: string;
  type: ObjectiveType;
  startDate: string;
  endDate: string;
  monthlyContribution: number;
  totalValue: number;
  currentAmount: number;
  iconName: "car" | "home" | "travel" | "education" | "wealth";
}

interface ObjectiveCardProps {
  objective: Objective;
  onClick: (objective: Objective) => void;
  onDelete: (objective: Objective) => void;
}

const iconMap = {
  car: Car,
  home: Home,
  travel: Plane,
  education: GraduationCap,
  wealth: TrendingUp,
};

export function ObjectiveCard({
  objective,
  onClick,
  onDelete,
}: ObjectiveCardProps) {
  const Icon = iconMap[objective.iconName] || TrendingUp;

  const progressPercent = Math.min(
    100,
    Math.round((objective.currentAmount / objective.totalValue) * 100),
  );

  const getMonthsRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const months =
      (end.getFullYear() - now.getFullYear()) * 12 +
      (end.getMonth() - now.getMonth());
    return Math.max(0, months);
  };

  const formatTimeRemaining = (totalMonths: number) => {
    if (totalMonths <= 0) return "Prazo atingido";
    if (totalMonths < 12) return `Faltam ${totalMonths} meses`;

    const years = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;

    const yearStr = years === 1 ? "1 ano" : `${years} anos`;
    const monthStr =
      remainingMonths === 0
        ? ""
        : remainingMonths === 1
          ? " e 1 mês"
          : ` e ${remainingMonths} meses`;

    return `Restam ${yearStr}${monthStr}`;
  };

  const monthsRemaining = getMonthsRemaining(objective.endDate);
  const timeRemainingStr = formatTimeRemaining(monthsRemaining);

  return (
    <Card
      className="cursor-pointer transition-all bg-surface-card border-none shadow-card hover:shadow-card-hover group relative rounded-2xl"
      onClick={() => onClick(objective)}
    >
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3 border-b border-border-default/50">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-accent-subtle rounded-xl text-accent-primary group-hover:bg-accent-primary group-hover:text-white transition-colors mt-0.5">
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <CardTitle className="text-lg font-semibold text-text-primary tracking-tight">
              {objective.name}
            </CardTitle>
            <span className="text-[10px] font-bold tracking-widest uppercase text-text-secondary mt-0.5">
              {objective.type === "short"
                ? "Curto Prazo"
                : objective.type === "medium"
                  ? "Médio Prazo"
                  : "Longo Prazo"}
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-text-muted hover:text-status-error opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(objective);
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-6 pt-5">
        {/* Simplified Status Header */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-text-secondary flex items-center gap-1.5 font-medium">
            <Clock className="h-4 w-4 text-accent-primary" />
            {timeRemainingStr}
          </span>
          <span className="text-text-muted font-mono">
            {progressPercent}% Concluído
          </span>
        </div>

        {/* Clean Progress Bar Component */}
        <div className="w-full bg-surface-hover rounded-full h-2.5 relative overflow-hidden shadow-inner">
          <div
            className="absolute top-0 left-0 h-full bg-accent-primary transition-all duration-1000 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Actionable Metrics directly on the card */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex flex-col gap-1 p-3 rounded-xl bg-surface-hover/50">
            <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">
              Alocado
            </span>
            <span className="font-medium text-text-primary text-base">
              {formatCurrency(objective.currentAmount)}
            </span>
          </div>

          <div className="flex flex-col gap-1 p-3 rounded-xl bg-surface-hover/50">
            <span className="text-xs text-text-muted uppercase tracking-wider font-semibold">
              Alvo Total
            </span>
            <span className="font-bold text-accent-primary text-base">
              {formatCurrency(objective.totalValue)}
            </span>
          </div>
        </div>

        {/* Footnote about cadence */}
        <div className="text-sm font-medium border-t border-border-default/30 pt-4 flex justify-between items-center text-text-secondary">
          <span>Aporte Mensal:</span>
          <span className="text-text-primary font-semibold tabular-nums">
            {formatCurrency(objective.monthlyContribution)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
