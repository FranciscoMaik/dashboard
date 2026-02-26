import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/formatters";
import type { AssetType } from "./asset-class-cards";

export interface Asset {
  id: string;
  type: AssetType;
  name?: string;
  netValue?: number;
  grossValue?: number;
  maturity?: string;
  ticker?: string;
  quantity?: number;
  totalValue?: number;
  sector?: string;
}

interface AssetTableProps {
  type: AssetType;
  assets: Asset[];
}

export function AssetTable({ type, assets }: AssetTableProps) {
  const filteredAssets = assets.filter((a) => a.type === type);

  if (type === "fixed") {
    return (
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border-subtle hover:bg-transparent">
              <TableHead className="text-text-muted text-xs uppercase tracking-wide">
                Nome do Ativo
              </TableHead>
              <TableHead className="text-text-muted text-xs uppercase tracking-wide">
                Vencimento
              </TableHead>
              <TableHead className="text-right text-text-muted text-xs uppercase tracking-wide">
                Valor Bruto
              </TableHead>
              <TableHead className="text-right text-text-muted text-xs uppercase tracking-wide">
                Valor Líquido
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssets.map((asset) => (
              <TableRow
                key={asset.id}
                className="border-b border-border-subtle hover:bg-surface-hover transition-colors"
              >
                <TableCell className="font-medium text-sm text-text-primary py-4">
                  {asset.name}
                </TableCell>
                <TableCell className="text-sm text-text-secondary py-4">
                  {asset.maturity ? formatDate(asset.maturity) : "—"}
                </TableCell>
                <TableCell className="text-right text-sm text-text-secondary tabular-nums py-4">
                  {formatCurrency(asset.grossValue || 0)}
                </TableCell>
                <TableCell className="text-right font-semibold text-sm text-accent-primary tabular-nums py-4">
                  {formatCurrency(asset.netValue || 0)}
                </TableCell>
              </TableRow>
            ))}
            {filteredAssets.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-8 text-text-muted text-sm"
                >
                  Nenhum ativo de renda fixa encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border-subtle hover:bg-transparent">
            <TableHead className="text-text-muted text-xs uppercase tracking-wide">
              Ticker
            </TableHead>
            <TableHead className="text-text-muted text-xs uppercase tracking-wide">
              Setor
            </TableHead>
            <TableHead className="text-right text-text-muted text-xs uppercase tracking-wide">
              Quantidade
            </TableHead>
            <TableHead className="text-right text-text-muted text-xs uppercase tracking-wide">
              Valor Total
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAssets.map((asset) => (
            <TableRow
              key={asset.id}
              className="border-b border-border-subtle hover:bg-surface-hover transition-colors"
            >
              <TableCell className="font-semibold text-sm text-text-primary py-4">
                {asset.ticker}
              </TableCell>
              <TableCell className="text-sm text-text-secondary py-4">
                {asset.sector}
              </TableCell>
              <TableCell className="text-right text-sm text-text-secondary tabular-nums py-4">
                {asset.quantity}
              </TableCell>
              <TableCell className="text-right font-semibold text-sm text-accent-primary tabular-nums py-4">
                {formatCurrency(asset.totalValue || 0)}
              </TableCell>
            </TableRow>
          ))}
          {filteredAssets.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-8 text-text-muted text-sm"
              >
                Nenhum ativo encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
