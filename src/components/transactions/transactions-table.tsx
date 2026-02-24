"use client";

import {
  ArrowDownCircle,
  ArrowUpCircle,
  Edit2,
  Eye,
  EyeOff,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/formatters";
import type { Transaction } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface TransactionsTableProps {
  data: Transaction[];
  onIgnore: (id: string) => void;
  onEdit: (transaction: Transaction) => void;
}

export function TransactionsTable({
  data,
  onIgnore,
  onEdit,
}: TransactionsTableProps) {
  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border-subtle hover:bg-transparent">
            <TableHead className="w-[50px] text-text-muted text-xs uppercase tracking-wide" />
            <TableHead className="text-text-muted text-xs uppercase tracking-wide">
              Transação
            </TableHead>
            <TableHead className="text-text-muted text-xs uppercase tracking-wide">
              Categoria
            </TableHead>
            <TableHead className="text-text-muted text-xs uppercase tracking-wide">
              Data
            </TableHead>
            <TableHead className="text-right text-text-muted text-xs uppercase tracking-wide">
              Valor
            </TableHead>
            <TableHead className="w-[50px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((transaction) => {
            const isExpense = transaction.type === "expense";
            const isIgnored = transaction.ignored;

            return (
              <TableRow
                key={transaction.id}
                className={cn(
                  "border-b border-border-subtle hover:bg-surface-hover transition-colors",
                  isIgnored && "opacity-50",
                )}
              >
                <TableCell className="py-4">
                  {isExpense ? (
                    <ArrowDownCircle className="h-4 w-4 text-status-error" />
                  ) : (
                    <ArrowUpCircle className="h-4 w-4 text-status-success" />
                  )}
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex flex-col">
                    <span
                      className={cn(
                        "font-medium text-sm text-text-primary",
                        isIgnored && "line-through text-text-muted",
                      )}
                    >
                      {transaction.name}
                    </span>
                    {isIgnored && (
                      <span className="text-[10px] text-text-muted uppercase tracking-wide">
                        Desconsiderado
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-text-primary">
                      {transaction.category}
                    </span>
                    <span className="text-xs text-text-muted">
                      {transaction.subcategory}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-text-secondary py-4">
                  {formatDate(transaction.date)}
                </TableCell>
                <TableCell className="text-right py-4">
                  <span
                    className={cn(
                      "text-sm font-semibold tabular-nums",
                      isExpense ? "text-status-error" : "text-status-success",
                      isIgnored && "text-text-muted",
                    )}
                  >
                    {isExpense ? "−" : "+"}
                    {formatCurrency(transaction.amount)}
                  </span>
                </TableCell>
                <TableCell className="py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-text-muted hover:text-text-primary"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(transaction)}>
                        <Edit2 className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onIgnore(transaction.id)}
                      >
                        {isIgnored ? (
                          <>
                            <Eye className="mr-2 h-4 w-4" />
                            Considerar
                          </>
                        ) : (
                          <>
                            <EyeOff className="mr-2 h-4 w-4" />
                            Desconsiderar
                          </>
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
