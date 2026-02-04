import { Building2, Landmark, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
          "cursor-pointer transition-all hover:bg-accent/5",
          selected === "fixed" && "border-primary ring-1 ring-primary",
        )}
        onClick={() => onSelect("fixed")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Renda Fixa</CardTitle>
          <Landmark className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${fixedTotal.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            Tesouro, CDBs, Debêntures
          </p>
        </CardContent>
      </Card>

      <Card
        className={cn(
          "cursor-pointer transition-all hover:bg-accent/5",
          selected === "variable" && "border-primary ring-1 ring-primary",
        )}
        onClick={() => onSelect("variable")}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Renda Variável</CardTitle>
          <TrendingUp className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            ${variableTotal.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Ações, ETFs, Opções</p>
        </CardContent>
      </Card>

      <Card
        className={cn(
          "cursor-pointer transition-all hover:bg-accent/5",
          selected === "reits" && "border-primary ring-1 ring-primary",
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
          <div className="text-2xl font-bold">
            ${reitsTotal.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">FIIs</p>
        </CardContent>
      </Card>
    </div>
  );
}
