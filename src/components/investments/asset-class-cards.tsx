import { Building2, Landmark, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export function AssetClassCards({
  fixedTotal,
  variableTotal,
  reitsTotal,
  selected,
  onSelect,
}: AssetClassCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card
        className={cn(
          "cursor-pointer transition-all hover:bg-surface-hover hover:shadow-card-hover bg-surface-card border-none shadow-card rounded-2xl",
          selected === "fixed" && "ring-2 ring-blue-500",
        )}
        onClick={() => onSelect("fixed")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Renda Fixa</CardTitle>
          <Landmark className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-text-primary">
            {formatCurrency(fixedTotal)}
          </div>
          <p className="text-xs text-text-muted mt-1">
            Tesouro, CDBs, Debêntures
          </p>
        </CardContent>
      </Card>

      <Card
        className={cn(
          "cursor-pointer transition-all hover:bg-surface-hover hover:shadow-card-hover bg-surface-card border-none shadow-card rounded-2xl",
          selected === "variable" && "ring-2 ring-emerald-500",
        )}
        onClick={() => onSelect("variable")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Renda Variável</CardTitle>
          <TrendingUp className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-text-primary">
            {formatCurrency(variableTotal)}
          </div>
          <p className="text-xs text-text-muted mt-1">Ações, ETFs, Opções</p>
        </CardContent>
      </Card>

      <Card
        className={cn(
          "cursor-pointer transition-all hover:bg-surface-hover hover:shadow-card-hover bg-surface-card border-none shadow-card rounded-2xl",
          selected === "reits" && "ring-2 ring-indigo-500",
        )}
        onClick={() => onSelect("reits")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Fundos Imobiliários
          </CardTitle>
          <Building2 className="h-4 w-4 text-indigo-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-text-primary">
            {formatCurrency(reitsTotal)}
          </div>
          <p className="text-xs text-text-muted mt-1">FIIs</p>
        </CardContent>
      </Card>
    </div>
  );
}
