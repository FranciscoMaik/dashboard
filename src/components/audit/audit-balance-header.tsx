"use client";

import { TrendingUp, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

export function AuditBalanceHeader({ auditedCount }: { auditedCount: number }) {
  return (
    <Card className="bg-surface-card rounded-card shadow-card p-6 border border-border-default flex items-center justify-between">
      <div className="flex flex-col gap-1 tracking-tight">
        <h2 className="text-xl font-bold flex items-center gap-2 text-text-primary">
          <TrendingUp className="w-5 h-5 text-accent-primary" />
          Visualizações de PL ({auditedCount} usuário(s) consultado(s))
        </h2>
        <p className="text-sm text-text-muted">
          Acompanhe o volume de Patrimônio Líquido pesquisado pelo acesso
          interno.
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent-subtle flex items-center justify-center shrink-0 border border-accent-primary/10">
            <Users className="w-5 h-5 text-accent-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">
              Total Analisado
            </span>
            <span className="text-2xl font-bold text-text-primary leading-none">
              R$ 12,7M
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
