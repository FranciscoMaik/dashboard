"use client";

import { FileEdit } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Transaction } from "@/lib/mock-data";

interface EditTransactionDialogProps {
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updatedTransaction: Transaction) => void;
  categories: string[];
  subcategories: string[];
}

export function EditTransactionDialog({
  transaction,
  open,
  onOpenChange,
  onSave,
  categories,
  subcategories,
}: EditTransactionDialogProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  useEffect(() => {
    if (transaction) {
      setName(transaction.name);
      setCategory(transaction.category);
      setSubcategory(transaction.subcategory);
    }
  }, [transaction]);

  const handleSave = () => {
    if (!transaction) return;

    onSave({
      ...transaction,
      name,
      category,
      subcategory,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-surface-elevated shadow-float border-none p-6 gap-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-subtle">
            <FileEdit className="h-6 w-6 text-accent-primary" />
          </div>
          <div className="flex flex-col gap-1">
            <DialogTitle className="text-xl font-semibold text-text-primary tracking-tight">
              Editar transação
            </DialogTitle>
            <p className="text-[14px] text-text-secondary">
              Atualize os detalhes da transação selecionada.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-semibold text-text-secondary"
            >
              Nome da transação
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-surface-page border-border-default text-text-primary rounded-input focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20 h-10 w-full font-medium"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="category"
                className="text-sm font-semibold text-text-secondary"
              >
                Categoria
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-surface-page border-border-default text-text-primary rounded-input focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20 h-10 w-full font-medium">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent className="z-100">
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="subcategory"
                className="text-sm font-semibold text-text-secondary"
              >
                Subcategoria
              </Label>
              <Select value={subcategory} onValueChange={setSubcategory}>
                <SelectTrigger className="bg-surface-page border-border-default text-text-primary rounded-input focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20 h-10 w-full font-medium">
                  <SelectValue placeholder="Selecione a subcategoria" />
                </SelectTrigger>
                <SelectContent className="z-100">
                  {subcategories.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="pt-5 border-t border-border-subtle flex justify-end gap-3 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-button bg-surface-page border-border-default text-text-primary hover:bg-surface-hover font-semibold tracking-tight shadow-sm h-10 px-5"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            className="rounded-button bg-accent-primary hover:bg-accent-hover font-semibold tracking-tight shadow-sm text-white h-10 px-6"
          >
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
