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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";

// Mock Data
const mockAssets: Asset[] = [
  // Fixed Income
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
  // Variable
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
  // REITs
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

export default function ClientInvestmentsPage() {
  const [selectedType, setSelectedType] = useState<AssetType | null>(null);

  // Recommended Portfolio State (Mocked)
  const [recommendedTargets, setRecommendedTargets] = useState<PortfolioTarget>(
    {
      fixed: 40,
      variable: 40,
      reits: 20,
    },
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const calculateTotal = (type: AssetType) => {
    return (
      mockAssets
        .filter((a) => a.type === type)
        // Use netValue for fixed, totalValue for others
        .reduce(
          (sum, a) =>
            sum + (a.type === "fixed" ? a.netValue || 0 : a.totalValue || 0),
          0,
        )
    );
  };

  const fixedTotal = calculateTotal("fixed");
  const variableTotal = calculateTotal("variable");
  const reitsTotal = calculateTotal("reits");
  const grandTotal = fixedTotal + variableTotal + reitsTotal;

  // Calculate percentage composition for the comparison component
  const currentComposition = {
    fixed: grandTotal > 0 ? (fixedTotal / grandTotal) * 100 : 0,
    variable: grandTotal > 0 ? (variableTotal / grandTotal) * 100 : 0,
    reits: grandTotal > 0 ? (reitsTotal / grandTotal) * 100 : 0,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-text-primary">
          Investimentos
        </h2>
      </div>

      {/* Total Equity Summary */}
      <Card className="bg-accent-primary text-white border-none shadow-card rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium opacity-90">
            Patrimônio Total
          </CardTitle>
          <Wallet className="h-4 w-4 opacity-70" />
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{formatCurrency(grandTotal)}</div>
          <p className="text-xs opacity-70 mt-1">
            Visão consolidada de todas as contas conectadas + entradas manuais.
          </p>
        </CardContent>
      </Card>

      <PortfolioComparison
        current={currentComposition}
        recommended={recommendedTargets}
        onEditRecommended={() => setIsEditModalOpen(true)}
      />

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-text-primary">
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
        <div
          key={selectedType}
          className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold capitalize">
              Detalhes de{" "}
              {selectedType === "reits"
                ? "Fundos Imobiliários"
                : selectedType === "fixed"
                  ? "Renda Fixa"
                  : selectedType === "variable"
                    ? "Renda Variável"
                    : selectedType}
            </h3>
          </div>
          <AssetTable type={selectedType} assets={mockAssets} />
        </div>
      )}

      <EditRecommendedPortfolioDialog
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentTargets={recommendedTargets}
        onSave={setRecommendedTargets}
      />
    </div>
  );
}
