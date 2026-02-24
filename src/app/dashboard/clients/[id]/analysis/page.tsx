"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
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
import { TopTransactionsRanking } from "@/components/analytics/top-transactions-ranking";
import { TransactionNavigator } from "@/components/analytics/transaction-navigator";
import { Button } from "@/components/ui/button";
import type { Transaction } from "@/lib/mock-data";
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

const MOCK_TOP_TRANSACTIONS: Record<Period, Transaction[]> = {
  "1W": [
    {
      id: "tr_w1",
      date: "2026-02-23",
      name: "Aluguel Apartamento",
      amount: 3500,
      type: "expense",
      category: "Habitação",
      subcategory: "Aluguel",
      ignored: false,
    },
    {
      id: "tr_w2",
      date: "2026-02-22",
      name: "Salário Mensal",
      amount: 8500,
      type: "income",
      category: "Renda",
      subcategory: "Salário",
      ignored: false,
    },
    {
      id: "tr_w3",
      date: "2026-02-21",
      name: "Supermercado Extra",
      amount: 890,
      type: "expense",
      category: "Alimentação",
      subcategory: "Mercado",
      ignored: false,
    },
    {
      id: "tr_w4",
      date: "2026-02-20",
      name: "Posto Shell",
      amount: 320,
      type: "expense",
      category: "Transporte",
      subcategory: "Combustível",
      ignored: false,
    },
    {
      id: "tr_w5",
      date: "2026-02-19",
      name: "Freelance Design",
      amount: 2200,
      type: "income",
      category: "Renda",
      subcategory: "Freelance",
      ignored: false,
    },
    {
      id: "tr_w6",
      date: "2026-02-18",
      name: "Restaurante Outback",
      amount: 280,
      type: "expense",
      category: "Alimentação",
      subcategory: "Restaurantes",
      ignored: false,
    },
    {
      id: "tr_w7",
      date: "2026-02-18",
      name: "Netflix",
      amount: 55,
      type: "expense",
      category: "Lazer",
      subcategory: "Streaming",
      ignored: false,
    },
    {
      id: "tr_w8",
      date: "2026-02-17",
      name: "Uber",
      amount: 45,
      type: "expense",
      category: "Transporte",
      subcategory: "Uber/Táxi",
      ignored: false,
    },
    {
      id: "tr_w9",
      date: "2026-02-17",
      name: "Farmácia Drogasil",
      amount: 175,
      type: "expense",
      category: "Saúde",
      subcategory: "Farmácia",
      ignored: false,
    },
    {
      id: "tr_w10",
      date: "2026-02-17",
      name: "Padaria Dona Flor",
      amount: 62,
      type: "expense",
      category: "Alimentação",
      subcategory: "Padaria",
      ignored: false,
    },
  ],
  "1M": [
    {
      id: "tr_m1",
      date: "2026-02-10",
      name: "Salário Mensal",
      amount: 8500,
      type: "income",
      category: "Renda",
      subcategory: "Salário",
      ignored: false,
    },
    {
      id: "tr_m2",
      date: "2026-02-05",
      name: "Aluguel Apartamento",
      amount: 3500,
      type: "expense",
      category: "Habitação",
      subcategory: "Aluguel",
      ignored: false,
    },
    {
      id: "tr_m3",
      date: "2026-02-08",
      name: "Dividendos ITUB4",
      amount: 1850,
      type: "income",
      category: "Renda",
      subcategory: "Dividendos",
      ignored: false,
    },
    {
      id: "tr_m4",
      date: "2026-02-01",
      name: "Plano de Saúde",
      amount: 1200,
      type: "expense",
      category: "Saúde",
      subcategory: "Plano",
      ignored: false,
    },
    {
      id: "tr_m5",
      date: "2026-02-12",
      name: "Supermercado Pão de Açúcar",
      amount: 1100,
      type: "expense",
      category: "Alimentação",
      subcategory: "Mercado",
      ignored: false,
    },
    {
      id: "tr_m6",
      date: "2026-02-15",
      name: "Escola Infantil",
      amount: 980,
      type: "expense",
      category: "Educação",
      subcategory: "Mensalidade",
      ignored: false,
    },
    {
      id: "tr_m7",
      date: "2026-02-03",
      name: "Conta de Luz",
      amount: 450,
      type: "expense",
      category: "Habitação",
      subcategory: "Contas",
      ignored: false,
    },
    {
      id: "tr_m8",
      date: "2026-02-14",
      name: "Manutenção Carro",
      amount: 680,
      type: "expense",
      category: "Transporte",
      subcategory: "Manutenção",
      ignored: false,
    },
    {
      id: "tr_m9",
      date: "2026-02-07",
      name: "Cashback Nubank",
      amount: 320,
      type: "income",
      category: "Renda",
      subcategory: "Cashback",
      ignored: false,
    },
    {
      id: "tr_m10",
      date: "2026-02-11",
      name: "Shopping Iguatemi",
      amount: 750,
      type: "expense",
      category: "Compras",
      subcategory: "Vestuário",
      ignored: false,
    },
  ],
  "3M": [
    {
      id: "tr_3m1",
      date: "2026-01-10",
      name: "Bônus Anual",
      amount: 15000,
      type: "income",
      category: "Renda",
      subcategory: "Bônus",
      ignored: false,
    },
    {
      id: "tr_3m2",
      date: "2025-12-20",
      name: "IPVA 2026",
      amount: 4200,
      type: "expense",
      category: "Transporte",
      subcategory: "Impostos",
      ignored: false,
    },
    {
      id: "tr_3m3",
      date: "2026-02-05",
      name: "Aluguel Apartamento",
      amount: 3500,
      type: "expense",
      category: "Habitação",
      subcategory: "Aluguel",
      ignored: false,
    },
    {
      id: "tr_3m4",
      date: "2026-01-15",
      name: "Salário Mensal",
      amount: 8500,
      type: "income",
      category: "Renda",
      subcategory: "Salário",
      ignored: false,
    },
    {
      id: "tr_3m5",
      date: "2025-12-05",
      name: "Viagem Natal",
      amount: 5800,
      type: "expense",
      category: "Lazer",
      subcategory: "Viagem",
      ignored: false,
    },
    {
      id: "tr_3m6",
      date: "2026-01-20",
      name: "Dividendos FIIs",
      amount: 2400,
      type: "income",
      category: "Renda",
      subcategory: "Dividendos",
      ignored: false,
    },
    {
      id: "tr_3m7",
      date: "2025-12-15",
      name: "Presente Natal",
      amount: 2100,
      type: "expense",
      category: "Compras",
      subcategory: "Presentes",
      ignored: false,
    },
    {
      id: "tr_3m8",
      date: "2026-02-01",
      name: "Plano de Saúde",
      amount: 1200,
      type: "expense",
      category: "Saúde",
      subcategory: "Plano",
      ignored: false,
    },
    {
      id: "tr_3m9",
      date: "2026-01-08",
      name: "Curso Online",
      amount: 1500,
      type: "expense",
      category: "Educação",
      subcategory: "Cursos",
      ignored: false,
    },
    {
      id: "tr_3m10",
      date: "2025-12-28",
      name: "Eletrodoméstico",
      amount: 3200,
      type: "expense",
      category: "Compras",
      subcategory: "Eletrônicos",
      ignored: false,
    },
  ],
  "6M": [
    {
      id: "tr_6m1",
      date: "2025-10-10",
      name: "Bônus Semestral",
      amount: 22000,
      type: "income",
      category: "Renda",
      subcategory: "Bônus",
      ignored: false,
    },
    {
      id: "tr_6m2",
      date: "2025-09-15",
      name: "Reforma Banheiro",
      amount: 8500,
      type: "expense",
      category: "Habitação",
      subcategory: "Reforma",
      ignored: false,
    },
    {
      id: "tr_6m3",
      date: "2025-11-20",
      name: "Salário Mensal",
      amount: 8500,
      type: "income",
      category: "Renda",
      subcategory: "Salário",
      ignored: false,
    },
    {
      id: "tr_6m4",
      date: "2025-12-20",
      name: "Viagem Natal",
      amount: 5800,
      type: "expense",
      category: "Lazer",
      subcategory: "Viagem",
      ignored: false,
    },
    {
      id: "tr_6m5",
      date: "2025-10-05",
      name: "Notebook Dell",
      amount: 5200,
      type: "expense",
      category: "Compras",
      subcategory: "Eletrônicos",
      ignored: false,
    },
    {
      id: "tr_6m6",
      date: "2025-11-08",
      name: "Dividendos Ações",
      amount: 4800,
      type: "income",
      category: "Renda",
      subcategory: "Dividendos",
      ignored: false,
    },
    {
      id: "tr_6m7",
      date: "2026-01-10",
      name: "IPVA 2026",
      amount: 4200,
      type: "expense",
      category: "Transporte",
      subcategory: "Impostos",
      ignored: false,
    },
    {
      id: "tr_6m8",
      date: "2025-09-25",
      name: "Seguro Auto",
      amount: 3800,
      type: "expense",
      category: "Transporte",
      subcategory: "Seguro",
      ignored: false,
    },
    {
      id: "tr_6m9",
      date: "2025-12-05",
      name: "Aluguel Apartamento",
      amount: 3500,
      type: "expense",
      category: "Habitação",
      subcategory: "Aluguel",
      ignored: false,
    },
    {
      id: "tr_6m10",
      date: "2025-10-18",
      name: "Freelance Consultoria",
      amount: 6000,
      type: "income",
      category: "Renda",
      subcategory: "Freelance",
      ignored: false,
    },
  ],
  "12M": [
    {
      id: "tr_12m1",
      date: "2025-04-15",
      name: "PLR Empresa",
      amount: 35000,
      type: "income",
      category: "Renda",
      subcategory: "PLR",
      ignored: false,
    },
    {
      id: "tr_12m2",
      date: "2025-06-20",
      name: "Bônus Semestral",
      amount: 22000,
      type: "income",
      category: "Renda",
      subcategory: "Bônus",
      ignored: false,
    },
    {
      id: "tr_12m3",
      date: "2025-05-10",
      name: "Entrada Carro",
      amount: 18000,
      type: "expense",
      category: "Transporte",
      subcategory: "Veículo",
      ignored: false,
    },
    {
      id: "tr_12m4",
      date: "2025-07-01",
      name: "Venda Investimento",
      amount: 12000,
      type: "income",
      category: "Renda",
      subcategory: "Investimentos",
      ignored: false,
    },
    {
      id: "tr_12m5",
      date: "2025-09-15",
      name: "Reforma Banheiro",
      amount: 8500,
      type: "expense",
      category: "Habitação",
      subcategory: "Reforma",
      ignored: false,
    },
    {
      id: "tr_12m6",
      date: "2025-11-20",
      name: "Salário Mensal",
      amount: 8500,
      type: "income",
      category: "Renda",
      subcategory: "Salário",
      ignored: false,
    },
    {
      id: "tr_12m7",
      date: "2025-08-05",
      name: "Viagem Europa",
      amount: 14500,
      type: "expense",
      category: "Lazer",
      subcategory: "Viagem",
      ignored: false,
    },
    {
      id: "tr_12m8",
      date: "2025-03-22",
      name: "Dividendos Anuais",
      amount: 7200,
      type: "income",
      category: "Renda",
      subcategory: "Dividendos",
      ignored: false,
    },
    {
      id: "tr_12m9",
      date: "2025-10-05",
      name: "Notebook Dell",
      amount: 5200,
      type: "expense",
      category: "Compras",
      subcategory: "Eletrônicos",
      ignored: false,
    },
    {
      id: "tr_12m10",
      date: "2025-12-20",
      name: "Viagem Natal",
      amount: 5800,
      type: "expense",
      category: "Lazer",
      subcategory: "Viagem",
      ignored: false,
    },
  ],
};

const MOCK_EVOLUTION = [
  { name: "Jan", revenue: 14000, expenses: 9000, balance: 5000 },
  { name: "Fev", revenue: 15000, expenses: 11000, balance: 4000 },
  { name: "Mar", revenue: 13500, expenses: 9500, balance: 4000 },
  { name: "Abr", revenue: 16000, expenses: 12000, balance: 4000 },
  { name: "Mai", revenue: 14500, expenses: 10500, balance: 4000 },
  { name: "Jun", revenue: 18000, expenses: 11500, balance: 6500 },
];

const MOCK_TOP_EXPENSES = [
  { name: "Habitação", value: 4500 },
  { name: "Alimentação", value: 2800 },
  { name: "Transporte", value: 1500 },
  { name: "Lazer", value: 1200 },
  { name: "Compras", value: 950 },
  { name: "Saúde", value: 800 },
  { name: "Utilidades", value: 650 },
  { name: "Educação", value: 500 },
  { name: "Pets", value: 300 },
  { name: "Outros", value: 200 },
];

export default function ClientAnalysisPage() {
  const params = useParams();
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("3M");

  const client = getClientData(params.id as string);

  const summaryData = MOCK_SUMMARY[selectedPeriod] || MOCK_SUMMARY["3M"];

  const chartData =
    selectedPeriod === "1W" ? MOCK_EVOLUTION.slice(-1) : MOCK_EVOLUTION;

  return (
    <div className="space-y-8 max-w-screen-2xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">
            Análise Financeira
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Panorama financeiro do período selecionado
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DateRangeFilter
            selected={selectedPeriod}
            onSelect={setSelectedPeriod}
          />
          <Button
            variant="outline"
            asChild
            className="border-border-default text-text-secondary hover:bg-surface-hover rounded-button"
          >
            <Link
              href={`/dashboard/clients/${params.id}/transactions?period=${selectedPeriod}`}
            >
              Open Finance <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Summary Cards */}
        <AnalyticsSummary {...summaryData} />

        {/* Connected Banks Section */}
        {client.connectedBanks && client.connectedBanks.length > 0 && (
          <ConnectedBanks banks={client.connectedBanks} />
        )}

        {/* Charts Grid */}
        <div className="grid gap-6 md:grid-cols-5">
          <EvolutionChart data={chartData} />
          <TopExpensesChart data={MOCK_TOP_EXPENSES} />
        </div>

        {/* Top Transactions Ranking */}
        <TopTransactionsRanking
          data={
            MOCK_TOP_TRANSACTIONS[selectedPeriod] || MOCK_TOP_TRANSACTIONS["3M"]
          }
        />

        {/* Transaction Drill-down */}
        <TransactionNavigator
          clientId={params.id as string}
          period={selectedPeriod}
        />
      </div>
    </div>
  );
}
