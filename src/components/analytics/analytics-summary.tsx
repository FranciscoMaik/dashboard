import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  PiggyBank,
  Wallet,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import { cn } from "@/lib/utils"; // Unused
import { formatCurrency } from "@/lib/formatters";

interface AnalyticsSummaryProps {
  revenues: number;
  expenses: number;
  balance: number;
  deposits: number;
  withdrawals: number;
}

export function AnalyticsSummary({
  revenues,
  expenses,
  balance,
  deposits,
  withdrawals,
}: AnalyticsSummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receitas</CardTitle>
          <ArrowUp className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            +{formatCurrency(revenues)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Despesas</CardTitle>
          <ArrowDown className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold text-red-600 dark:text-red-400">
            -{formatCurrency(expenses)}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary text-primary-foreground border-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium opacity-90">
            Saldo
          </CardTitle>
          <Wallet className="h-4 w-4 opacity-70" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold">{formatCurrency(balance)}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Depósitos</CardTitle>
          <PiggyBank className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {formatCurrency(deposits)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saques</CardTitle>
          <DollarSign className="h-4 w-4 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
            -{formatCurrency(withdrawals)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
