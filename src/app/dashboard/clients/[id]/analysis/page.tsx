"use client";

import { ArrowUpRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { AnalyticsSummary } from "@/components/analytics/analytics-summary";
import { ConnectedBanks } from "@/components/analytics/connected-banks";
import {
  DateRangeFilter,
  type Period,
} from "@/components/analytics/date-range-filter";
import { EvolutionChart } from "@/components/analytics/evolution-chart";
import { TopExpensesChart } from "@/components/analytics/top-expenses-chart";
import { TransactionNavigator } from "@/components/analytics/transaction-navigator";
import { Button } from "@/components/ui/button";
import { getClientData } from "@/lib/mock-data";

// Mock Data
const MOCK_SUMMARY = {
  "3M": {
    revenues: 45000,
    expenses: 32000,
    balance: 13000,
    deposits: 5000,
    withdrawals: 2000,
  },
  "1M": {
    revenues: 15000,
    expenses: 10500,
    balance: 4500,
    deposits: 1200,
    withdrawals: 500,
  },
  "1W": {
    revenues: 3500,
    expenses: 2100,
    balance: 1400,
    deposits: 0,
    withdrawals: 100,
  },
  "6M": {
    revenues: 90000,
    expenses: 65000,
    balance: 25000,
    deposits: 12000,
    withdrawals: 5000,
  },
  "12M": {
    revenues: 180000,
    expenses: 128000,
    balance: 52000,
    deposits: 25000,
    withdrawals: 12000,
  },
};

const MOCK_EVOLUTION = [
  { name: "Jan", revenue: 14000, expenses: 9000, balance: 5000 },
  { name: "Feb", revenue: 15000, expenses: 11000, balance: 4000 },
  { name: "Mar", revenue: 13500, expenses: 9500, balance: 4000 },
  { name: "Apr", revenue: 16000, expenses: 12000, balance: 4000 },
  { name: "May", revenue: 14500, expenses: 10500, balance: 4000 },
  { name: "Jun", revenue: 18000, expenses: 11500, balance: 6500 },
];

const MOCK_TOP_EXPENSES = [
  { name: "Housing", value: 4500 },
  { name: "Food", value: 2800 },
  { name: "Transport", value: 1500 },
  { name: "Leisure", value: 1200 },
  { name: "Shopping", value: 950 },
  { name: "Health", value: 800 },
  { name: "Utilities", value: 650 },
  { name: "Education", value: 500 },
  { name: "Pets", value: 300 },
  { name: "Others", value: 200 },
];

export default function ClientAnalysisPage() {
  const params = useParams();
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("3M");

  const client = getClientData(params.id as string);

  // Get data based on period (using mock fallback logic for simpler proto)
  const summaryData = MOCK_SUMMARY[selectedPeriod] || MOCK_SUMMARY["3M"];

  // In a real app, charts would also filter based on period
  // For now we use static mocks or a slice
  const chartData =
    selectedPeriod === "1W" ? MOCK_EVOLUTION.slice(-1) : MOCK_EVOLUTION;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">
          Financial Analysis
        </h2>

        <div className="flex items-center gap-4">
          <DateRangeFilter
            selected={selectedPeriod}
            onSelect={setSelectedPeriod}
          />
          <Button variant="outline">
            Open Finance <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
        {/* Summary Cards */}
        <AnalyticsSummary {...summaryData} />

        {/* Connected Banks Section */}
        {client.connectedBanks && client.connectedBanks.length > 0 && (
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-4">
              <ConnectedBanks banks={client.connectedBanks} />
            </div>
          </div>
        )}

        {/* Charts Grid */}
        <div className="grid gap-4 md:grid-cols-5">
          <EvolutionChart data={chartData} />
          <TopExpensesChart data={MOCK_TOP_EXPENSES} />
        </div>

        {/* Transaction Drill-down */}
        <TransactionNavigator />
      </div>
    </div>
  );
}
