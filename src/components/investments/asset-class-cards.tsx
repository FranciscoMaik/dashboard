import { Building2, Landmark, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export type AssetType = "fixed" | "variable" | "reits";

interface AssetClassCardsProps {
  fixedTotal: number;
  variableTotal: number;
  reitsTotal: number;
  selected: AssetType | null;
  onSelect: (type: AssetType) => void;
}

const ASSET_CONFIG: {
  type: AssetType;
  label: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    type: "fixed",
    label: "Renda Fixa",
    subtitle: "Tesouro, CDBs, Debêntures",
    icon: Landmark,
  },
  {
    type: "variable",
    label: "Renda Variável",
    subtitle: "Ações, ETFs, Opções",
    icon: TrendingUp,
  },
  {
    type: "reits",
    label: "Fundos Imobiliários",
    subtitle: "FIIs",
    icon: Building2,
  },
];

export function AssetClassCards({
  fixedTotal,
  variableTotal,
  reitsTotal,
  selected,
  onSelect,
}: AssetClassCardsProps) {
  const totals: Record<AssetType, number> = {
    fixed: fixedTotal,
    variable: variableTotal,
    reits: reitsTotal,
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {ASSET_CONFIG.map(({ type, label, subtitle, icon: Icon }) => {
        const isActive = selected === type;

        return (
          <Card
            key={type}
            className={cn(
              "cursor-pointer transition-all duration-200",
              isActive
                ? "ring-2 ring-accent-primary shadow-hover"
                : "hover:shadow-hover",
            )}
            onClick={() => onSelect(type)}
          >
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
                  {label}
                </span>
                <div
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-card",
                    isActive ? "bg-accent-subtle" : "bg-surface-page",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-3.5 w-3.5",
                      isActive ? "text-accent-primary" : "text-text-muted",
                    )}
                  />
                </div>
              </div>
              <p className="text-2xl font-bold tracking-tight text-text-primary tabular-nums">
                {formatCurrency(totals[type])}
              </p>
              <p className="text-xs text-text-muted mt-1">{subtitle}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
