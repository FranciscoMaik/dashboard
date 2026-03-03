"use client";

import { SearchCode } from "lucide-react";
import { Card } from "@/components/ui/card";

export function AuditListingsHeader({
  totalSearches,
}: {
  totalSearches: number;
}) {
  return (
    <Card className="bg-surface-card rounded-card shadow-card p-6 border border-border-default flex items-center justify-between">
      <div className="flex flex-col gap-1 tracking-tight">
        <h2 className="text-xl font-bold flex items-center gap-2 text-text-primary">
          <SearchCode className="w-5 h-5 text-accent-primary" />
          Consultas de Listagem ({totalSearches})
        </h2>
        <p className="text-sm text-text-muted">
          Acompanhe o histórico de pesquisas realizadas por este usuário em
          listagens externas.
        </p>
      </div>
    </Card>
  );
}
