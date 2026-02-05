"use client";

import {
  ArrowDownCircle,
  ArrowUpCircle,
  Edit2,
  Eye,
  EyeOff,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
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
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>Transação</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="text-right">Valor</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((transaction) => {
            const isExpense = transaction.type === "expense";
            const isIgnored = transaction.ignored;

            return (
              <TableRow
                key={transaction.id}
                className={cn(isIgnored && "opacity-50 bg-muted/50")}
              >
                <TableCell>
                  {isExpense ? (
                    <ArrowDownCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <ArrowUpCircle className="h-5 w-5 text-green-500" />
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span
                      className={cn(
                        "font-medium",
                        isIgnored && "line-through text-muted-foreground",
                      )}
                    >
                      {transaction.name}
                    </span>
                    {isIgnored && (
                      <span className="text-xs text-muted-foreground">
                        Desconsiderado
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col text-sm">
                    <span>{transaction.category}</span>
                    <span className="text-xs text-muted-foreground">
                      {transaction.subcategory}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  {formatDate(transaction.date)}
                </TableCell>
                <TableCell className="text-right font-medium">
                  <span
                    className={cn(
                      isExpense ? "text-red-500" : "text-green-500",
                      isIgnored && "text-muted-foreground",
                    )}
                  >
                    {isExpense ? "-" : "+"}
                    {formatCurrency(transaction.amount)}
                  </span>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
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
    </div>
  );
}
