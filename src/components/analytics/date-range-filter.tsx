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
    <div className="flex items-center space-x-2 bg-muted/30 p-1 rounded-lg">
      {periods.map((period) => (
        <Button
          key={period.value}
          variant={selected === period.value ? "secondary" : "ghost"}
          size="sm"
          onClick={() => onSelect(period.value)}
          className={cn(
            "text-xs sm:text-sm transition-all",
            selected === period.value &&
              "bg-background shadow-sm text-foreground font-medium",
          )}
        >
          {period.label}
        </Button>
      ))}
    </div>
  );
}
