"use client";

import { Home, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function KPIs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6 flex flex-col gap-2 relative overflow-hidden bg-surface-card shadow-card border-none rounded-card">
        <p className="text-[10px] uppercase font-bold tracking-widest text-text-muted">
          Total de Cliques
        </p>
        <div className="flex flex-row items-end gap-3 mt-1">
          <h3 className="text-4xl font-bold text-text-primary tracking-tighter">
            284.192
          </h3>
          <div className="flex items-center text-status-success font-semibold text-sm mb-1 pb-1">
            <TrendingUp className="w-3.5 h-3.5 mr-1 stroke-3" />
            <span>12%</span>
          </div>
        </div>
        <div className="mt-4 pt-1 w-full bg-linear-to-r from-blue-100 to-blue-300 h-10 rounded-sm opacity-50" />
      </Card>
      <Card className="p-6 flex flex-col gap-4 relative overflow-hidden bg-surface-card shadow-card border-none rounded-card">
        <p className="text-[10px] uppercase font-bold tracking-widest text-text-muted">
          Principal Destino
        </p>
        <div className="flex items-center gap-4 mt-1">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
            <Home className="w-6 h-6 text-accent-primary" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-text-primary tracking-tight">
              Home Page
            </h3>
            <p className="text-xs text-text-muted">42% de todas as sessões</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
