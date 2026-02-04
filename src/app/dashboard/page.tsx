import { RotateCw } from "lucide-react";
import { AgeDistributionTable } from "@/components/dashboard/age-distribution-table";
import { AccountCreationChart } from "@/components/dashboard/charts/account-creation-chart";
import { BankDistributionCharts } from "@/components/dashboard/charts/bank-distribution-charts";
import { KpiGrid } from "@/components/dashboard/kpi-grid";
import { OverviewDateFilter } from "@/components/dashboard/overview-date-filter";
import { RatingsSummary } from "@/components/dashboard/ratings-summary";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header with Title, Date Filter, and Refresh */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight mr-auto">
          Visão Geral
        </h2>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <OverviewDateFilter />
          <Button variant="outline" size="icon" className="shrink-0">
            <RotateCw className="h-4 w-4" />
            <span className="sr-only">Atualizar Dados</span>
          </Button>
        </div>
      </div>

      {/* KPI Section */}
      <KpiGrid />

      {/* Charts Section 1: Account (Full Width/Large) and Bank Distribution */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
        <AccountCreationChart />
        <BankDistributionCharts />
      </div>

      {/* Charts Section 2: Ratings and Age Table */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
        <RatingsSummary />
        <AgeDistributionTable />
      </div>
    </div>
  );
}
