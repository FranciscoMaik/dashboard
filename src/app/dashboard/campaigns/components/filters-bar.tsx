"use client";

import { ChevronDown } from "lucide-react";

export function FiltersBar() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-surface-card border border-border-subtle rounded-card shadow-card">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-text-secondary bg-surface-page border border-border-default rounded-button hover:bg-surface-hover transition-colors cursor-pointer"
        >
          Últimos 7 dias
        </button>
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-accent-primary bg-accent-subtle border border-transparent rounded-button transition-colors cursor-pointer"
        >
          Últimos 30 dias
        </button>
        <button
          type="button"
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-text-secondary bg-surface-page border border-border-default rounded-button hover:bg-surface-hover transition-colors cursor-pointer"
        >
          Este Mês
        </button>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-text-secondary">
          Campanha
        </span>
        <button
          type="button"
          className="min-w-[200px] flex items-center justify-between px-3 py-1.5 text-sm text-text-primary bg-surface-page border border-border-default rounded-button hover:border-accent-primary focus:ring-1 focus:ring-accent-primary/20 transition-all outline-none"
        >
          Promoção de Verão
          <ChevronDown className="w-4 h-4 text-text-muted" />
        </button>
      </div>
    </div>
  );
}
