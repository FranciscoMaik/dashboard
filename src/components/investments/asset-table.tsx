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
  // Fixed Income Props
  name?: string;
  netValue?: number;
  grossValue?: number;
  maturity?: string;
  // Variable/REITs Props
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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary hover:bg-secondary">
              <TableHead>Nome do Ativo</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead className="text-right">Valor Bruto</TableHead>
              <TableHead className="text-right">Valor Líquido</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAssets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell className="font-medium">{asset.name}</TableCell>
                <TableCell>
                  {asset.maturity ? formatDate(asset.maturity) : "-"}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(asset.grossValue || 0)}
                </TableCell>
                <TableCell className="text-right font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(asset.netValue || 0)}
                </TableCell>
              </TableRow>
            ))}
            {filteredAssets.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-4 text-muted-foreground"
                >
                  Nenhum ativo de renda fixa encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  }

  // Variable or REITs
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary hover:bg-secondary">
            <TableHead>Ticker</TableHead>
            <TableHead>Setor</TableHead>
            <TableHead className="text-right">Quantidade</TableHead>
            <TableHead className="text-right">Valor Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAssets.map((asset) => (
            <TableRow key={asset.id}>
              <TableCell className="font-medium">{asset.ticker}</TableCell>
              <TableCell>{asset.sector}</TableCell>
              <TableCell className="text-right">{asset.quantity}</TableCell>
              <TableCell className="text-right font-bold text-green-600 dark:text-green-400">
                {formatCurrency(asset.totalValue || 0)}
              </TableCell>
            </TableRow>
          ))}
          {filteredAssets.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center py-4 text-muted-foreground"
              >
                Nenhum ativo encontrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
