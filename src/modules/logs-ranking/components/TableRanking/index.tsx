import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { rankingData } from "./mock";

export function TableRanking() {
  return (
    <Card className="bg-surface-card rounded-card shadow-card border-none overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-border-subtle hover:bg-transparent">
            <TableHead className="w-[100px] text-text-muted text-xs uppercase font-bold tracking-widest px-6 py-4">
              Posição
            </TableHead>
            <TableHead className="text-text-muted text-xs uppercase font-bold tracking-widest px-6 py-4">
              Página Acessada
            </TableHead>
            <TableHead className="text-right text-text-muted text-xs uppercase font-bold tracking-widest px-6 py-4">
              Total de Cliques
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rankingData.map((item, index) => (
            <TableRow
              key={item.id}
              className="border-border-subtle hover:bg-surface-hover transition-colors"
            >
              <TableCell className="px-6 py-4 text-text-secondary font-medium text-sm">
                {index + 1}º
              </TableCell>
              <TableCell className="px-6 py-4 font-semibold text-text-primary tracking-tight">
                {item.path}
              </TableCell>
              <TableCell className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-3">
                  <span className="font-bold text-accent-primary">
                    {item.visits}
                  </span>
                  <span className="text-xs text-text-muted w-12 text-right">
                    ({item.percentage}%)
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
