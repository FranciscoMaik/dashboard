"use client";

import { ShieldAlert } from "lucide-react";
import { use } from "react";
import { Card } from "@/components/ui/card";

export default function AuditDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);

  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto h-[calc(100vh-8rem)] flex items-center justify-center">
      <Card className="bg-surface-card rounded-card shadow-card flex flex-col items-center justify-center text-center p-12 max-w-md w-full border-dashed border border-border-default">
        <div className="h-16 w-16 bg-accent-subtle rounded-full flex items-center justify-center mb-6">
          <ShieldAlert className="h-8 w-8 text-accent-primary" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-text-primary mb-2">
          Auditoria: {unwrappedParams.id}
        </h2>
        <p className="text-sm text-text-muted">
          Este é o painel de auditoria do usuário selecionado. Utilize o menu
          lateral para navegar entre a visualização de PL, análises financeiras
          e as consultas de IA.
        </p>
      </Card>
    </div>
  );
}
