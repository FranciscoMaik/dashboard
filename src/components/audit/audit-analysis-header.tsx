"use client";

import { PieChart, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

export function AuditAnalysisHeader({
  auditedCount,
}: {
  auditedCount: number;
}) {
  return (
    <Card className="bg-surface-card rounded-card shadow-card p-6 border border-border-default flex items-center justify-between">
      <div className="flex flex-col gap-1 tracking-tight">
        <h2 className="text-xl font-bold flex items-center gap-2 text-text-primary">
          <PieChart className="w-5 h-5 text-accent-primary" />
          Análises Financeira ({auditedCount} usuário(s) analisado(s))
        </h2>
        <p className="text-sm text-text-muted">
          Acompanhe o volume consolidado de receitas, despesas e saldo das
          análises do sistema.
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 border-r border-border-default pr-6">
          <div className="w-10 h-10 rounded-full bg-accent-subtle flex items-center justify-center shrink-0 border border-accent-primary/10">
            <Users className="w-5 h-5 text-accent-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
              Total Receitas
            </span>
            <span className="text-xl font-bold text-status-success leading-none">
              R$ 2.766.126,26
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1 border-r border-border-default pr-6">
          <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
            Total Despesas
          </span>
          <span className="text-xl font-bold text-status-error leading-none">
            -R$ 1.839.294,05
          </span>
        </div>

        <div className="flex flex-col gap-1 border-r border-border-default pr-6">
          <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
            Saldo Consolidado
          </span>
          <span className="text-xl font-bold text-status-success leading-none">
            R$ 926.832,21
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
            Receita Média
          </span>
          <span className="text-lg font-bold text-text-primary leading-none">
            R$ 89.230,00
          </span>
        </div>
      </div>
    </Card>
  );
}
