"use client";

import {
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronDown,
  ChevronUp,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/lib/formatters";
import type { Transaction } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface TopTransactionsRankingProps {
  data: Transaction[];
}

const RANK_STYLES: Record<number, { badge: string; label: string }> = {
  1: {
    badge: "bg-accent-subtle text-accent-primary border-accent-primary/20",
    label: "1",
  },
  2: {
    badge: "bg-accent-subtle text-accent-primary/80 border-accent-primary/15",
    label: "2",
  },
  3: {
    badge: "bg-accent-subtle text-accent-primary/60 border-accent-primary/10",
    label: "3",
  },
};

export function TopTransactionsRanking({ data }: TopTransactionsRankingProps) {
  const [isVisible, setIsVisible] = useState(true);

  const ranked = [...data]
    .filter((t) => !t.ignored)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 10);

  if (ranked.length === 0) return null;

  return (
    <Card>
      <div className="flex items-center justify-between px-6 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-card bg-accent-subtle">
            <Trophy className="h-4 w-4 text-accent-primary" />
          </div>
          <h3 className="text-sm font-semibold text-text-primary tracking-tight">
            Top 10 Transações
          </h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible((v) => !v)}
          className="text-text-muted hover:text-text-primary text-xs"
        >
          {isVisible ? (
            <>
              Ocultar <ChevronUp className="ml-1 h-3.5 w-3.5" />
            </>
          ) : (
            <>
              Exibir <ChevronDown className="ml-1 h-3.5 w-3.5" />
            </>
          )}
        </Button>
      </div>
      {isVisible && (
        <CardContent className="p-0 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="divide-y divide-border-subtle">
            {ranked.map((transaction, index) => {
              const rank = index + 1;
              const isExpense = transaction.type === "expense";
              const style = RANK_STYLES[rank];

              return (
                <div
                  key={transaction.id}
                  className={cn(
                    "flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-surface-hover",
                    rank <= 3 && "bg-accent-subtle/30",
                  )}
                >
                  {/* Rank Badge */}
                  <div
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                      style
                        ? style.badge
                        : "bg-surface-page text-text-muted border-border-subtle",
                    )}
                  >
                    {style ? style.label : rank}
                  </div>

                  {/* Type Icon */}
                  <div className="shrink-0">
                    {isExpense ? (
                      <ArrowDownCircle className="h-4 w-4 text-status-error" />
                    ) : (
                      <ArrowUpCircle className="h-4 w-4 text-status-success" />
                    )}
                  </div>

                  {/* Transaction Info */}
                  <div className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-center sm:gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-sm text-text-primary">
                        {transaction.name}
                      </p>
                      <p className="text-xs text-text-muted">
                        {transaction.category}
                        {transaction.subcategory && (
                          <span className="mx-1">·</span>
                        )}
                        {transaction.subcategory}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 mt-1 sm:mt-0">
                      <span className="text-xs text-text-muted whitespace-nowrap">
                        {formatDate(transaction.date)}
                      </span>
                      <span
                        className={cn(
                          "text-sm font-semibold whitespace-nowrap tabular-nums",
                          isExpense
                            ? "text-status-error"
                            : "text-status-success",
                        )}
                      >
                        {isExpense ? "−" : "+"}
                        {formatCurrency(transaction.amount)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
