"use client";

import { Button } from "@/components/ui/button";

interface FeedbackPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function FeedbackPagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPrevious,
  onNext,
}: FeedbackPaginationProps) {
  const start = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between border-t border-border-subtle p-6 gap-4">
      <p className="text-sm font-medium text-text-secondary">
        Mostrando <strong className="text-text-primary">{start}</strong> a{" "}
        <strong className="text-text-primary">{end}</strong> de{" "}
        <strong className="text-text-primary">{totalItems}</strong> resultados
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevious}
          disabled={currentPage === 1}
          className="rounded-button border border-border-default text-text-secondary bg-surface-page hover:bg-surface-hover hover:text-text-primary h-9 font-semibold"
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={end >= totalItems}
          className="rounded-button border border-border-default text-text-secondary bg-surface-page hover:bg-surface-hover hover:text-text-primary h-9 font-semibold"
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}
