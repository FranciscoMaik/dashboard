import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  PiggyBank,
  Wallet,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";

interface AnalyticsSummaryProps {
  revenues: number;
  expenses: number;
  balance: number;
  deposits: number;
  withdrawals: number;
}

function SummaryCard({
  label,
  value,
  icon: Icon,
  variant = "neutral",
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  variant?: "positive" | "negative" | "accent" | "neutral";
}) {
  const valueColor =
    variant === "positive"
      ? "text-status-success"
      : variant === "negative"
        ? "text-status-error"
        : variant === "accent"
          ? "text-accent-primary"
          : "text-text-primary";

  const isAccent = variant === "accent";

  return (
    <Card className={isAccent ? "bg-accent-primary border-none" : ""}>
      <CardContent className="pt-5 pb-5">
        <div className="flex items-center justify-between mb-3">
          <span
            className={`text-xs font-medium uppercase tracking-wide ${isAccent ? "text-white/70" : "text-text-muted"}`}
          >
            {label}
          </span>
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-card ${isAccent ? "bg-white/15" : "bg-surface-page"}`}
          >
            <Icon
              className={`h-3.5 w-3.5 ${isAccent ? "text-white/80" : "text-text-muted"}`}
            />
          </div>
        </div>
        <p
          className={`text-xl font-bold tracking-tight tabular-nums ${isAccent ? "text-white" : valueColor}`}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

export function AnalyticsSummary({
  revenues,
  expenses,
  balance,
  deposits,
  withdrawals,
}: AnalyticsSummaryProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <SummaryCard
        label="Receitas"
        value={`+${formatCurrency(revenues)}`}
        icon={ArrowUp}
        variant="positive"
      />
      <SummaryCard
        label="Despesas"
        value={`-${formatCurrency(expenses)}`}
        icon={ArrowDown}
        variant="negative"
      />
      <SummaryCard
        label="Saldo"
        value={formatCurrency(balance)}
        icon={Wallet}
        variant="accent"
      />
      <SummaryCard
        label="Depósitos"
        value={formatCurrency(deposits)}
        icon={PiggyBank}
      />
      <SummaryCard
        label="Saques"
        value={`-${formatCurrency(withdrawals)}`}
        icon={DollarSign}
      />
    </div>
  );
}
