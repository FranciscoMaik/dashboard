import { Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function HeaderLogs() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold tracking-tight text-text-primary">
          Análise de Navegação
        </h2>
        <span className="text-sm font-medium text-text-muted mt-1">
          Acompanhe o volume e comportamento de uso
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
        <div className="flex bg-[#f4f4f5] rounded-xl p-1 shadow-inner h-10 items-center">
          {["1 Mês", "3 Meses", "6 Meses", "12 Meses"].map((period) => (
            <button
              key={period}
              type="button"
              className={`px-4 h-full text-sm font-semibold rounded-lg transition-all flex items-center justify-center ${
                period === "3 Meses"
                  ? "bg-white shadow-sm text-text-primary"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
        <Button
          variant="outline"
          className="h-10 flex items-center gap-2 bg-white border-border-default rounded-xl px-4 text-text-secondary hover:text-text-primary hover:bg-surface-hover shadow-sm font-semibold text-sm"
        >
          <Calendar className="w-4 h-4" />
          Personalizado
        </Button>
      </div>
    </div>
  );
}
