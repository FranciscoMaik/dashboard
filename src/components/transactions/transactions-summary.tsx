"use client";

import { ArrowDown, ArrowUp, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import type { Transaction } from "@/lib/mock-data";

interface TransactionsSummaryProps {
  transactions: Transaction[];
  period: string; // "1W" | "1M" | "3M" | "6M" | "12M"
}

export function TransactionsSummary({
  transactions,
  period,
}: TransactionsSummaryProps) {
  // Filter active transactions (not ignored)
  const activeTransactions = transactions.filter((t) => !t.ignored);

  const totalIncome = activeTransactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = activeTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  // Determine divisor for averages
  let divisor = 1;
  switch (period) {
    case "1W":
      divisor = 0.25; // Aprrox 1/4 month
      break;
    case "1M":
      divisor = 1;
      break;
    case "3M":
      divisor = 3;
      break;
    case "6M":
      divisor = 6;
      break;
    case "12M":
      divisor = 12;
      break;
    default:
      divisor = 1;
  }

  const avgIncome = totalIncome / divisor;
  const avgExpense = totalExpense / divisor;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Entrada Média (Mensal)
          </CardTitle>
          <ArrowUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(avgIncome)}
          </div>
          <p className="text-xs text-muted-foreground">
            Baseado no período de {period}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Saída Média (Mensal)
          </CardTitle>
          <ArrowDown className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {formatCurrency(avgExpense)}
          </div>
          <p className="text-xs text-muted-foreground">
            Baseado no período de {period}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total de Entradas
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(totalIncome)}
          </div>
          <p className="text-xs text-muted-foreground">Soma total do período</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Saídas</CardTitle>
          <DollarSign className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {formatCurrency(totalExpense)}
          </div>
          <p className="text-xs text-muted-foreground">Soma total do período</p>
        </CardContent>
      </Card>
    </div>
  );
}
