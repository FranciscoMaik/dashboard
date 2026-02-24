import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export function PortfolioComparison({
  current,
  recommended,
  onEditRecommended,
}: PortfolioComparisonProps) {
  // Helpers to calculate visual differences
  const getDifference = (curr: number, rec: number) => {
    const diff = curr - rec;
    if (diff > 0) return `+${diff.toFixed(1)}%`;
    if (diff < 0) return `${diff.toFixed(1)}%`;
    return "0%";
  };

  const getStatusColor = (curr: number, rec: number) => {
    const diff = Math.abs(curr - rec);
    if (diff <= 5) return "text-status-success"; // Within 5% is acceptable
    if (diff <= 15) return "text-status-warning";
    return "text-status-error";
  };

  return (
    <Card className="bg-surface-card border-none shadow-card rounded-2xl mb-8">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 border-b border-border-default/50">
        <div className="flex flex-col">
          <CardTitle className="text-xl font-bold text-text-primary tracking-tight">
            Análise de Carteira (Atual vs Recomendada)
          </CardTitle>
          <p className="text-sm text-text-secondary mt-1">
            Compare o percentual real alocado do cliente com a sua estratégia
            alvo.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onEditRecommended}
          className="bg-surface-hover border-border-default text-text-primary hover:bg-accent-subtle hover:text-accent-primary transition-colors"
        >
          <Settings2 className="mr-2 h-4 w-4" />
          Editar Alvo
        </Button>
      </CardHeader>

      <CardContent className="grid gap-8 pt-6">
        {/* Fixed Income */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              Renda Fixa
            </h4>
            <div className="text-right">
              <span
                className={`text-sm font-bold ml-3 ${getStatusColor(current.fixed, recommended.fixed)}`}
              >
                {getDifference(current.fixed, recommended.fixed)}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="w-20 text-xs text-text-secondary font-medium whitespace-nowrap">
                Atual ({current.fixed.toFixed(1)}%)
              </div>
              <Progress
                value={current.fixed}
                className="h-2.5 bg-surface-hover"
                indicatorClassName="bg-blue-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-20 text-xs text-text-secondary font-medium whitespace-nowrap">
                Meta ({recommended.fixed}%)
              </div>
              <Progress
                value={recommended.fixed}
                className="h-1.5 bg-surface-hover opacity-60"
                indicatorClassName="bg-blue-300"
              />
            </div>
          </div>
        </div>

        {/* Variable Income */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              Renda Variável
            </h4>
            <div className="text-right">
              <span
                className={`text-sm font-bold ml-3 ${getStatusColor(current.variable, recommended.variable)}`}
              >
                {getDifference(current.variable, recommended.variable)}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="w-20 text-xs text-text-secondary font-medium whitespace-nowrap">
                Atual ({current.variable.toFixed(1)}%)
              </div>
              <Progress
                value={current.variable}
                className="h-2.5 bg-surface-hover"
                indicatorClassName="bg-emerald-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-20 text-xs text-text-secondary font-medium whitespace-nowrap">
                Meta ({recommended.variable}%)
              </div>
              <Progress
                value={recommended.variable}
                className="h-1.5 bg-surface-hover opacity-60"
                indicatorClassName="bg-emerald-300"
              />
            </div>
          </div>
        </div>

        {/* REITs */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
              Fundos Imobiliários
            </h4>
            <div className="text-right">
              <span
                className={`text-sm font-bold ml-3 ${getStatusColor(current.reits, recommended.reits)}`}
              >
                {getDifference(current.reits, recommended.reits)}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="w-20 text-xs text-text-secondary font-medium whitespace-nowrap">
                Atual ({current.reits.toFixed(1)}%)
              </div>
              <Progress
                value={current.reits}
                className="h-2.5 bg-surface-hover"
                indicatorClassName="bg-indigo-500"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-20 text-xs text-text-secondary font-medium whitespace-nowrap">
                Meta ({recommended.reits}%)
              </div>
              <Progress
                value={recommended.reits}
                className="h-1.5 bg-surface-hover opacity-60"
                indicatorClassName="bg-indigo-300"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
