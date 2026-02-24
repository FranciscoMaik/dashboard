import { RotateCw } from "lucide-react";
import { AgeDistributionTable } from "@/components/dashboard/age-distribution-table";
import { AssetAllocationCard } from "@/components/dashboard/asset-allocation-card";
import { ClientGrowthCard } from "@/components/dashboard/client-growth-card";
import { OverviewDateFilter } from "@/components/dashboard/overview-date-filter";
import { RatingsSummary } from "@/components/dashboard/ratings-summary";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="max-w-screen-2xl mx-auto space-y-8 pb-12">
      {/* Header with Title, Date Filter, and Refresh */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary">
            Visão Geral
          </h2>
          <p className="text-text-secondary text-sm mt-1">
            Acompanhe a solidez e a evolução do seu patrimônio.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
          <OverviewDateFilter />
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 bg-surface-card border-border-default hover:bg-surface-hover"
          >
            <RotateCw className="h-4 w-4 text-text-secondary" />
            <span className="sr-only">Atualizar Dados</span>
          </Button>
        </div>
      </div>

      {/* Charts Section 1: Growth Chart and Assets Under Management */}
      <div className="grid gap-6 md:grid-cols-1 xl:grid-cols-7 items-stretch">
        <div className="md:col-span-1 xl:col-span-4">
          <ClientGrowthCard />
        </div>
        <div className="md:col-span-1 xl:col-span-3">
          <AssetAllocationCard />
        </div>
      </div>

      {/* Secondary Row: Ratings and Demographics */}
      <div className="grid gap-6 md:grid-cols-1 xl:grid-cols-7 items-stretch">
        <div className="md:col-span-1 xl:col-span-3">
          <RatingsSummary />
        </div>
        <div className="md:col-span-1 xl:col-span-4">
          <AgeDistributionTable />
        </div>
      </div>
    </div>
  );
}
