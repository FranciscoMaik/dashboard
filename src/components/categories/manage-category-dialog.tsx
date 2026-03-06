import { Tag } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Utility for formatting numbers precisely like BRL decimal (without the R$ prefix)
const formatCurrencyInput = (value: number | undefined | null) => {
  if (value === undefined || value === null) return "";
  if (value === 0) return "0,00";
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const parseCurrencyString = (value: string | number) => {
  if (typeof value === "number") return value;
  const numericString = value.replace(/\D/g, "");
  if (!numericString) return 0;
  return parseInt(numericString, 10) / 100;
};

interface ManageCategoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; limit?: number }) => void;
  initialData?: { name: string; limit?: number };
  type: "Category" | "Subcategory";
}

export function ManageCategoryDialog({
  isOpen,
  onClose,
  onSave,
  initialData,
  type,
}: ManageCategoryDialogProps) {
  const [name, setName] = useState("");
  const [limit, setLimit] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(initialData?.name || "");
      setLimit(initialData?.limit?.toString() || "");
    }
  }, [isOpen, initialData]);

  const handleSave = () => {
    onSave({
      name,
      limit: type === "Category" && limit ? parseFloat(limit) : undefined,
    });
    onClose();
  };

  const isCategory = type === "Category";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-surface-elevated shadow-float border-none p-6 gap-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-subtle">
            <Tag className="h-6 w-6 text-accent-primary" />
          </div>
          <div className="flex flex-col gap-1">
            <DialogTitle className="text-xl font-semibold text-text-primary tracking-tight">
              {initialData
                ? `Editar ${isCategory ? "Categoria" : "Subcategoria"}`
                : `Adicionar ${isCategory ? "Categoria" : "Subcategoria"}`}
            </DialogTitle>
            <p className="text-[14px] text-text-secondary">
              {isCategory
                ? "Defina o nome e o limite de gastos para esta categoria."
                : "Defina o nome para esta subcategoria."}
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-sm font-semibold text-text-secondary"
            >
              Nome do objetivo
            </Label>
            <Input
              id="name"
              value={name}
              placeholder="Ex: Alimentação, Lazer..."
              onChange={(e) => setName(e.target.value)}
              className="bg-surface-page border-border-default text-text-primary rounded-input focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20 h-10 w-full font-medium"
            />
          </div>
          {isCategory && (
            <div className="space-y-2">
              <Label
                htmlFor="limit"
                className="text-sm font-semibold text-text-secondary"
              >
                Limite (R$)
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-text-primary font-medium">
                  R$
                </span>
                <Input
                  id="limit"
                  type="text"
                  placeholder="0,00"
                  value={formatCurrencyInput(limit ? parseFloat(limit) : 0)}
                  onChange={(e) =>
                    setLimit(parseCurrencyString(e.target.value).toString())
                  }
                  className="pl-9 bg-surface-page border-border-default text-text-primary rounded-input focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20 h-10 w-full font-medium"
                />
              </div>
            </div>
          )}
        </div>

        <div className="pt-5 border-t border-border-subtle flex justify-end gap-3 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
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
