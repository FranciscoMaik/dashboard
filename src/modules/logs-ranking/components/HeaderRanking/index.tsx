import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeaderRanking() {
  return (
    <div className="flex flex-col gap-4">
      <Button
        asChild
        variant="ghost"
        className="w-fit p-0 h-auto hover:bg-transparent text-text-muted hover:text-text-primary transition-colors flex items-center gap-2"
      >
        <Link href="/dashboard/logs">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium tracking-tight">
            Voltar para Logs
          </span>
        </Link>
      </Button>

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          Ranking Completo de Páginas Acessadas
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Visão consolidada de todas as páginas acessadas na plataforma de
          acordo com o total de cliques.
        </p>
      </div>
    </div>
  );
}
