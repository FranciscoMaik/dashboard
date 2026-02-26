"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type Period = "1W" | "1M" | "3M" | "6M" | "12M";

interface DateRangeFilterProps {
  selected: Period;
  onSelect: (period: Period) => void;
}

const periods: { label: string; value: Period }[] = [
  { label: "1 Semana", value: "1W" },
  { label: "1 Mês", value: "1M" },
  { label: "3 Meses", value: "3M" },
  { label: "6 Meses", value: "6M" },
  { label: "12 Meses", value: "12M" },
];

export function DateRangeFilter({ selected, onSelect }: DateRangeFilterProps) {
  return (
    <div className="flex items-center space-x-1 bg-surface-page p-1 rounded-card border border-border-subtle">
      {periods.map((period) => (
        <Button
          key={period.value}
          variant={selected === period.value ? "secondary" : "ghost"}
          size="sm"
          onClick={() => onSelect(period.value)}
          className={cn(
            "text-xs sm:text-sm transition-all rounded-button",
            selected === period.value
              ? "bg-surface-card shadow-card text-text-primary font-medium"
              : "text-text-muted hover:text-text-secondary",
          )}
        >
          {period.label}
        </Button>
      ))}
    </div>
  );
}
