"use client";

import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface FeedbackFiltersProps {
  filterStatus: string;
  filterDate: string;
  onFilterStatusChange: (value: string) => void;
  onFilterDateChange: (value: string) => void;
  onClearFilters: () => void;
  uniqueDates: string[];
}

export function FeedbackFilters({
  filterStatus,
  filterDate,
  onFilterStatusChange,
  onFilterDateChange,
  onClearFilters,
  uniqueDates,
}: FeedbackFiltersProps) {
  const hasActiveFilters = filterStatus !== "todos" || filterDate !== "todos";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "rounded-button border text-text-secondary bg-surface-page hover:bg-surface-hover hover:text-text-primary gap-2 h-10",
            hasActiveFilters
              ? "border-accent-primary text-accent-primary bg-accent-subtle hover:bg-accent-subtle"
              : "border-border-default",
          )}
        >
          <Filter className="h-4 w-4" />
          <span className="font-semibold tracking-wide">
            Filtrar {hasActiveFilters && "Ativo"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[280px] p-4 rounded-card border-border-default shadow-float"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
            <h4 className="font-bold text-text-primary text-sm">Filtros</h4>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-[11px] font-semibold text-text-muted hover:text-text-primary"
                onClick={onClearFilters}
              >
                Limpar
              </Button>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Status
            </span>
            <Select value={filterStatus} onValueChange={onFilterStatusChange}>
              <SelectTrigger className="w-full rounded-button h-9">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="Resolvido">Resolvido</SelectItem>
                <SelectItem value="Em Progresso">Em Progresso</SelectItem>
                <SelectItem value="Recebido">Recebido</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Data
            </span>
            <Select value={filterDate} onValueChange={onFilterDateChange}>
              <SelectTrigger className="w-full rounded-button h-9">
                <SelectValue placeholder="Selecione a data" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas as Datas</SelectItem>
                {uniqueDates.map((date) => (
                  <SelectItem key={date} value={date}>
                    {date}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
