"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  DateRangeFilter,
  type Period,
} from "@/components/analytics/date-range-filter";
import { EditTransactionDialog } from "@/components/transactions/edit-transaction-dialog";
import {
  type TransactionFilter,
  TransactionsSummary,
} from "@/components/transactions/transactions-summary";
import { TransactionsTable } from "@/components/transactions/transactions-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getClientData,
  getTransactions,
  type Transaction,
} from "@/lib/mock-data";

export default function TransactionsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const clientId = params.id as string;
  const client = getClientData(clientId);

  // Initialize state from URL params
  const initialPeriod = (searchParams.get("period") as Period) || "3M";
  const initialCategory = searchParams.get("category") || "all";
  const initialSubcategory = searchParams.get("subcategory") || "all";

  const [period, setPeriod] = useState<Period>(initialPeriod);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubcategory, setSelectedSubcategory] =
    useState(initialSubcategory);
  const [typeFilter, setTypeFilter] = useState<TransactionFilter>("all");

  // Local state for transactions to support ignoring/editing
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    setTransactions(getTransactions(clientId));
  }, [clientId]);

  // Sync URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    params.set("period", period);
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (selectedSubcategory !== "all")
      params.set("subcategory", selectedSubcategory);

    router.replace(`?${params.toString()}`);
  }, [period, selectedCategory, selectedSubcategory, router]);

  const filteredTransactions = useMemo(() => {
    let filtered = transactions;

    // Filter by Period
    const now = new Date();
    const cutoffDate = new Date();

    switch (period) {
      case "1W":
        cutoffDate.setDate(now.getDate() - 7);
        break;
      case "1M":
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case "3M":
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      case "6M":
        cutoffDate.setMonth(now.getMonth() - 6);
        break;
      case "12M":
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
    }

    filtered = filtered.filter((t) => new Date(t.date) >= cutoffDate);

    // Filter by Category
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter((t) => t.category === selectedCategory);
    }

    // Filter by Subcategory
    if (selectedSubcategory && selectedSubcategory !== "all") {
      filtered = filtered.filter((t) => t.subcategory === selectedSubcategory);
    }

    // Filter by Type (from clickable cards)
    if (typeFilter !== "all") {
      filtered = filtered.filter((t) => t.type === typeFilter);
    }

    // Sort by date desc
    return filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [transactions, period, selectedCategory, selectedSubcategory, typeFilter]);

  const handleIgnore = (id: string) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ignored: !t.ignored } : t)),
    );
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsEditOpen(true);
  };

  const handleSaveEdit = (updatedTransaction: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === updatedTransaction.id ? updatedTransaction : t,
      ),
    );
  };

  // Extract unique categories/subcategories for filters
  const categories = Array.from(new Set(transactions.map((t) => t.category)));
  const subcategories = Array.from(
    new Set(
      transactions
        .filter(
          (t) => selectedCategory === "all" || t.category === selectedCategory,
        )
        .map((t) => t.subcategory),
    ),
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href={`/dashboard/clients/${clientId}/analysis`}>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-card text-text-muted hover:text-text-primary hover:bg-surface-hover"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary">
              Transações
            </h1>
            <p className="text-sm text-text-muted mt-0.5">
              {filteredTransactions.length} transações encontradas
            </p>
          </div>
        </div>

        <DateRangeFilter selected={period} onSelect={setPeriod} />
      </div>

      {/* Summary Cards (Clickable Filters) */}
      <TransactionsSummary
        transactions={transactions.filter((t) => {
          const now = new Date();
          const cutoffDate = new Date();
          switch (period) {
            case "1W":
              cutoffDate.setDate(now.getDate() - 7);
              break;
            case "1M":
              cutoffDate.setMonth(now.getMonth() - 1);
              break;
            case "3M":
              cutoffDate.setMonth(now.getMonth() - 3);
              break;
            case "6M":
              cutoffDate.setMonth(now.getMonth() - 6);
              break;
            case "12M":
              cutoffDate.setFullYear(now.getFullYear() - 1);
              break;
          }
          return new Date(t.date) >= cutoffDate;
        })}
        period={period}
        activeFilter={typeFilter}
        onFilterChange={setTypeFilter}
      />

      {/* Category Filters */}
      <div className="flex gap-3">
        <Select
          value={selectedCategory}
          onValueChange={(val) => {
            setSelectedCategory(val);
            setSelectedSubcategory("all");
          }}
        >
          <SelectTrigger className="w-[200px] border-border-default text-text-primary rounded-button">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas Categorias</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedSubcategory}
          onValueChange={setSelectedSubcategory}
        >
          <SelectTrigger className="w-[200px] border-border-default text-text-primary rounded-button">
            <SelectValue placeholder="Subcategoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas Subcategorias</SelectItem>
            {subcategories.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Transactions Table */}
      <TransactionsTable
        data={filteredTransactions}
        onIgnore={handleIgnore}
        onEdit={handleEdit}
      />

      <EditTransactionDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        transaction={editingTransaction}
        onSave={handleSaveEdit}
        categories={categories}
        subcategories={subcategories}
      />
    </div>
  );
}
