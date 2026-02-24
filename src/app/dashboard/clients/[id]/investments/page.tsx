"use client";

import { Wallet } from "lucide-react";
import { useState } from "react";
import {
  AssetClassCards,
  type AssetType,
} from "@/components/investments/asset-class-cards";
import { type Asset, AssetTable } from "@/components/investments/asset-table";
import {
  EditRecommendedPortfolioDialog,
  type PortfolioTarget,
} from "@/components/investments/edit-recommended-portfolio-dialog";
import { PortfolioComparison } from "@/components/investments/portfolio-comparison";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";

// Mock Data
const mockAssets: Asset[] = [
  {
    id: "1",
    type: "fixed",
    name: "Tesouro Direto 2026",
    maturity: "2026-05-15",
    grossValue: 10500,
    netValue: 10250,
  },
  {
    id: "2",
    type: "fixed",
    name: "CDB Banco X",
    maturity: "2025-12-01",
    grossValue: 5200,
    netValue: 5100,
  },
  {
    id: "3",
    type: "variable",
    ticker: "AAPL",
    sector: "Tecnologia",
    quantity: 50,
    totalValue: 8750,
  },
  {
    id: "4",
    type: "variable",
    ticker: "MSFT",
    sector: "Tecnologia",
    quantity: 30,
    totalValue: 12400,
  },
  {
    id: "5",
    type: "variable",
    ticker: "KO",
    sector: "Consumo",
    quantity: 100,
    totalValue: 5800,
  },
  {
    id: "6",
    type: "reits",
    ticker: "HGLG11",
    sector: "Logística",
    quantity: 200,
    totalValue: 32000,
  },
  {
    id: "7",
    type: "reits",
    ticker: "KNIP11",
    sector: "Papel",
    quantity: 150,
    totalValue: 14500,
  },
];

/* ─── SVG: Patrimônio Scene (pilares com fio de fibra óptica) ─── */
function PatrimonioScene() {
  return (
    <svg
      className="absolute bottom-0 right-6 w-[220px] h-[130px] pointer-events-none opacity-50"
      viewBox="0 0 220 130"
      fill="none"
      aria-hidden="true"
    >
      <line
        x1="20"
        y1="120"
        x2="200"
        y2="120"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="0.5"
      />
      <rect
        x="30"
        y="70"
        width="22"
        height="50"
        rx="2"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.8"
        fill="rgba(255,255,255,0.05)"
      />
      <rect
        x="72"
        y="45"
        width="22"
        height="75"
        rx="2"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.8"
        fill="rgba(255,255,255,0.05)"
      />
      <rect
        x="114"
        y="30"
        width="22"
        height="90"
        rx="2"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.8"
        fill="rgba(255,255,255,0.05)"
      />
      <rect
        x="156"
        y="15"
        width="22"
        height="105"
        rx="2"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.8"
        fill="rgba(255,255,255,0.05)"
      />
      <path
        d="M41 70 C 56 60, 68 50, 83 45 C 98 40, 110 35, 125 30 C 140 25, 152 20, 167 15"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="41" cy="70" r="2" fill="rgba(255,255,255,0.8)" />
      <circle cx="83" cy="45" r="2" fill="rgba(255,255,255,0.8)" />
      <circle cx="125" cy="30" r="2" fill="rgba(255,255,255,0.8)" />
      <circle cx="167" cy="15" r="3" fill="white" />
    </svg>
  );
}

export default function ClientInvestmentsPage() {
  const [selectedType, setSelectedType] = useState<AssetType | null>(null);

  const [recommendedTargets, setRecommendedTargets] = useState<PortfolioTarget>(
    {
      fixed: 40,
      variable: 40,
      reits: 20,
    },
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const calculateTotal = (type: AssetType) => {
    return mockAssets
      .filter((a) => a.type === type)
      .reduce(
        (sum, a) =>
          sum + (a.type === "fixed" ? a.netValue || 0 : a.totalValue || 0),
        0,
      );
  };

  const fixedTotal = calculateTotal("fixed");
  const variableTotal = calculateTotal("variable");
  const reitsTotal = calculateTotal("reits");
  const grandTotal = fixedTotal + variableTotal + reitsTotal;

  const currentComposition = {
    fixed: grandTotal > 0 ? (fixedTotal / grandTotal) * 100 : 0,
    variable: grandTotal > 0 ? (variableTotal / grandTotal) * 100 : 0,
    reits: grandTotal > 0 ? (reitsTotal / grandTotal) * 100 : 0,
  };

  return (
    <div className="space-y-8 max-w-screen-2xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-text-primary">
          Investimentos
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Visão consolidada da carteira do cliente
        </p>
      </div>

      {/* Total Equity — Hero Card */}
      <Card className="relative overflow-hidden bg-accent-primary border-none">
        <PatrimonioScene />
        <CardContent className="relative z-10 pt-6 pb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-card bg-white/15">
              <Wallet className="h-4 w-4 text-white/80" />
            </div>
            <span className="text-xs font-medium uppercase tracking-wide text-white/70">
              Patrimônio Total
            </span>
          </div>
          <p className="text-4xl font-bold tracking-tight text-white tabular-nums">
            {formatCurrency(grandTotal)}
          </p>
          <p className="text-xs text-white/50 mt-2">
            Visão consolidada de todas as contas conectadas + entradas manuais.
          </p>
        </CardContent>
      </Card>

      {/* Portfolio Comparison + Asset Cards — 2-col layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-text-primary tracking-tight mb-4">
              Alocação por Classe de Ativo
            </h3>
            <AssetClassCards
              fixedTotal={fixedTotal}
              variableTotal={variableTotal}
              reitsTotal={reitsTotal}
              selected={selectedType}
              onSelect={setSelectedType}
            />
          </div>

          {/* Dynamic Table Section */}
          {selectedType && (
            <div key={selectedType} className="space-y-4">
              <h3 className="text-sm font-semibold text-text-primary tracking-tight">
                Detalhes de{" "}
                {selectedType === "reits"
                  ? "Fundos Imobiliários"
                  : selectedType === "fixed"
                    ? "Renda Fixa"
                    : "Renda Variável"}
              </h3>
              <AssetTable type={selectedType} assets={mockAssets} />
            </div>
          )}
        </div>

        {/* Right Sidebar — Portfolio Comparison */}
        <div>
          <PortfolioComparison
            current={currentComposition}
            recommended={recommendedTargets}
            onEditRecommended={() => setIsEditModalOpen(true)}
          />
        </div>
      </div>

      <EditRecommendedPortfolioDialog
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentTargets={recommendedTargets}
        onSave={setRecommendedTargets}
      />
    </div>
  );
}
