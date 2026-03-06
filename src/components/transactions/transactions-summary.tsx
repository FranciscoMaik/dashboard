"use client";

import { ArrowDown, ArrowUp, DollarSign, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import type { Transaction } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export type TransactionFilter = "all" | "income" | "expense";

interface TransactionsSummaryProps {
  transactions: Transaction[];
  period: string;
  activeFilter: TransactionFilter;
  onFilterChange: (filter: TransactionFilter) => void;
}

export function TransactionsSummary({
  transactions,
  period,
  activeFilter,
  onFilterChange,
}: TransactionsSummaryProps) {
  const activeTransactions = transactions.filter((t) => !t.ignored);

  const totalIncome = activeTransactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = activeTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  let divisor = 1;
  switch (period) {
    case "1W":
      divisor = 0.25;
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

  const cards = [
    {
      label: "Entrada Média",
      value: formatCurrency(avgIncome),
      subtitle: `Mensal · ${period}`,
      icon: ArrowUp,
      filter: "income" as TransactionFilter,
      valueColor: "text-status-success",
    },
    {
      label: "Saída Média",
      value: formatCurrency(avgExpense),
      subtitle: `Mensal · ${period}`,
      icon: ArrowDown,
      filter: "expense" as TransactionFilter,
      valueColor: "text-status-error",
    },
    {
      label: "Total Entradas",
      value: formatCurrency(totalIncome),
      subtitle: "Soma do período",
      icon: TrendingUp,
      filter: "income" as TransactionFilter,
      valueColor: "text-status-success",
    },
    {
      label: "Total Saídas",
      value: formatCurrency(totalExpense),
      subtitle: "Soma do período",
      icon: DollarSign,
      filter: "expense" as TransactionFilter,
      valueColor: "text-status-error",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const isActive = activeFilter === card.filter;

        return (
          <Card
            key={card.label}
            className={cn(
              "cursor-pointer transition-all duration-200",
              isActive
                ? "ring-2 ring-accent-primary shadow-hover"
                : "hover:shadow-hover",
            )}
            onClick={() => onFilterChange(isActive ? "all" : card.filter)}
          >
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium uppercase tracking-wide text-text-muted">
                  {card.label}
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
              <p
                className={cn(
                  "text-xl font-bold tracking-tight tabular-nums",
                  card.valueColor,
                )}
              >
                {card.value}
              </p>
              <p className="text-xs text-text-muted mt-1">{card.subtitle}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
