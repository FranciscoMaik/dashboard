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
    badge: "bg-amber-500/15 text-amber-500 border-amber-500/30",
    label: "🥇",
  },
  2: {
    badge: "bg-slate-400/15 text-slate-400 border-slate-400/30",
    label: "🥈",
  },
  3: {
    badge: "bg-orange-600/15 text-orange-600 border-orange-600/30",
    label: "🥉",
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
      <div className="flex items-center justify-between px-6 pt-6">
        <div className="flex items-center gap-2 font-semibold leading-none">
          <Trophy className="h-5 w-5 text-amber-500" />
          Top 10 Transações
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVisible((v) => !v)}
          className="text-muted-foreground hover:text-foreground"
        >
          {isVisible ? (
            <>
              Ocultar <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              Exibir <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
      {isVisible && (
        <CardContent className="p-0 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="divide-y divide-border">
            {ranked.map((transaction, index) => {
              const rank = index + 1;
              const isExpense = transaction.type === "expense";
              const style = RANK_STYLES[rank];

              return (
                <div
                  key={transaction.id}
                  className={cn(
                    "flex items-center gap-4 px-6 py-3 transition-colors hover:bg-muted/50",
                    rank <= 3 && "bg-muted/20",
                  )}
                >
                  {/* Rank Badge */}
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-bold",
                      style
                        ? style.badge
                        : "bg-muted/50 text-muted-foreground border-border",
                    )}
                  >
                    {style ? style.label : rank}
                  </div>

                  {/* Type Icon */}
                  <div className="shrink-0">
                    {isExpense ? (
                      <ArrowDownCircle className="h-4 w-4 text-red-500" />
                    ) : (
                      <ArrowUpCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>

                  {/* Transaction Info */}
                  <div className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-center sm:gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-sm">
                        {transaction.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {transaction.category}
                        {transaction.subcategory && (
                          <span className="mx-1">·</span>
                        )}
                        {transaction.subcategory}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 mt-1 sm:mt-0">
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(transaction.date)}
                      </span>
                      <span
                        className={cn(
                          "text-sm font-semibold whitespace-nowrap tabular-nums",
                          isExpense ? "text-red-500" : "text-green-500",
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
