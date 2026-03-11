"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export type Period = "1M" | "3M" | "6M" | "12M" | "CUSTOM";

interface DateRangeFilterProps {
  selected: Period;
  onSelect: (period: Period) => void;
  dateRange?: DateRange;
  onDateRangeChange?: (range: DateRange | undefined) => void;
}

const periods: { label: string; value: Period }[] = [
  { label: "1 Mês", value: "1M" },
  { label: "3 Meses", value: "3M" },
  { label: "6 Meses", value: "6M" },
  { label: "12 Meses", value: "12M" },
];

export function DateRangeFilter({
  selected,
  onSelect,
  dateRange,
  onDateRangeChange,
}: DateRangeFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center p-1 bg-surface-hover border border-border-default rounded-[10px] overflow-x-auto">
        {periods.map((period) => (
          <button
            key={period.value}
            type="button"
            onClick={() => onSelect(period.value)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-button whitespace-nowrap transition-all",
              selected === period.value
                ? "bg-surface-card text-text-primary shadow-sm"
                : "text-text-secondary hover:text-text-primary hover:bg-black/5",
            )}
          >
            {period.label}
          </button>
        ))}
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            onClick={() => onSelect("CUSTOM")}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-[10px] whitespace-nowrap transition-all border",
              selected === "CUSTOM"
                ? "bg-surface-card text-text-primary shadow-sm border-border-default"
                : "bg-surface-hover text-text-secondary border-transparent hover:text-text-primary hover:bg-black/5",
            )}
          >
            <CalendarIcon className="h-4 w-4" />
            {selected === "CUSTOM" && dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "dd/MM/yy")} -{" "}
                  {format(dateRange.to, "dd/MM/yy")}
                </>
              ) : (
                format(dateRange.from, "dd/MM/yy")
              )
            ) : (
              <span>Personalizado</span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={onDateRangeChange}
            numberOfMonths={2}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
