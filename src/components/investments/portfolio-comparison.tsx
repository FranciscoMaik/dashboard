import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { PortfolioTarget } from "./edit-recommended-portfolio-dialog";

interface PortfolioComparisonProps {
  current: {
    fixed: number;
    variable: number;
    reits: number;
  };
  recommended: PortfolioTarget;
  onEditRecommended: () => void;
}

const CLASSES = [
  { key: "fixed" as const, label: "Renda Fixa" },
  { key: "variable" as const, label: "Renda Variável" },
  { key: "reits" as const, label: "Fundos Imobiliários" },
];

export function PortfolioComparison({
  current,
  recommended,
  onEditRecommended,
}: PortfolioComparisonProps) {
  const getDifference = (curr: number, rec: number) => {
    const diff = curr - rec;
    if (diff > 0) return `+${diff.toFixed(1)}%`;
    if (diff < 0) return `${diff.toFixed(1)}%`;
    return "0%";
  };

  const getStatusColor = (curr: number, rec: number) => {
    const diff = Math.abs(curr - rec);
    if (diff <= 5) return "text-status-success";
    if (diff <= 15) return "text-status-warning";
    return "text-status-error";
  };

  return (
    <Card>
      <CardContent className="pt-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6 pb-5 border-b border-border-subtle">
          <div>
            <h3 className="text-sm font-semibold text-text-primary tracking-tight">
              Análise de Carteira
            </h3>
            <p className="text-xs text-text-muted mt-1">Atual vs Recomendada</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onEditRecommended}
            className="border-border-default text-text-secondary hover:bg-accent-subtle hover:text-accent-primary rounded-button transition-colors"
          >
            <Settings2 className="mr-2 h-3.5 w-3.5" />
            Editar Alvo
          </Button>
        </div>

        {/* Asset Classes */}
        <div className="space-y-6">
          {CLASSES.map(({ key, label }) => (
            <div key={key} className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-xs font-medium text-text-muted uppercase tracking-wide">
                  {label}
                </span>
                <span
                  className={`text-xs font-bold tabular-nums ${getStatusColor(current[key], recommended[key])}`}
                >
                  {getDifference(current[key], recommended[key])}
                </span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="w-16 text-[11px] text-text-secondary font-medium tabular-nums">
                    Atual {current[key].toFixed(0)}%
                  </span>
                  <Progress
                    value={current[key]}
                    className="h-2 bg-surface-page"
                    indicatorClassName="bg-accent-primary"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-16 text-[11px] text-text-muted font-medium tabular-nums">
                    Meta {recommended[key]}%
                  </span>
                  <Progress
                    value={recommended[key]}
                    className="h-1 bg-surface-page"
                    indicatorClassName="bg-accent-primary/40"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
