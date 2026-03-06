"use client";

import { BrainCircuit } from "lucide-react";
import { use } from "react";
import { Card } from "@/components/ui/card";

export default function AuditAiPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);

  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto h-[calc(100vh-8rem)] flex items-center justify-center">
      <Card className="bg-surface-card rounded-card shadow-card flex flex-col items-center justify-center text-center p-12 max-w-md w-full border-dashed border border-border-default">
        <div className="h-16 w-16 bg-accent-subtle rounded-full flex items-center justify-center mb-6">
          <BrainCircuit className="h-8 w-8 text-accent-primary" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-text-primary mb-2">
          Análise de Inteligência Artificial
        </h2>
        <p className="text-sm text-text-muted">
          Página em construção para o usuário {unwrappedParams.id}.
        </p>
      </Card>
    </div>
  );
}
