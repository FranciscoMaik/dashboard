import { Bell, Search } from "lucide-react";
import type { Metadata } from "next";
import { CampaignsRanking } from "./components/campaigns-ranking";
import { ClickEvolutionChart } from "./components/click-evolution-chart";
import { DetailedLogsTable } from "./components/detailed-logs-table";
import { FiltersBar } from "./components/filters-bar";
import { KpiCards } from "./components/kpi-cards";

export const metadata: Metadata = {
  title: "Dashboard Marketing - Análise de Logs",
  description: "Acompanhe os cliques em campanhas de marketing em tempo real.",
};

export default function CampaignLogsPage() {
  return (
    <div className="flex-1 w-full bg-surface-page min-h-screen">
      {/* Main Content Area */}
      <main className="space-y-6 max-w-screen-2xl mx-auto">
        {/* Page Title & Subtitle */}
        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-semibold tracking-tight text-text-primary">
            Análise de Logs de Campanha
          </h1>
          <p className="text-text-secondary text-base">
            Acompanhe os cliques em campanhas de marketing em tempo real.
          </p>
        </div>

        {/* Filters */}
        <FiltersBar />

        {/* KPI Cards */}
        <KpiCards />

        {/* Charts & Rankings */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <ClickEvolutionChart />
          </div>
          <div className="xl:col-span-1">
            <CampaignsRanking />
          </div>
        </div>

        {/* Detailed Logs Table */}
        <DetailedLogsTable />
      </main>
    </div>
  );
}
