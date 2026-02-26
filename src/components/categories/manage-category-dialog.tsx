import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-text-primary tracking-tight">
            {initialData
              ? `Editar ${isCategory ? "Categoria" : "Subcategoria"}`
              : `Adicionar ${isCategory ? "Categoria" : "Subcategoria"}`}
          </DialogTitle>
          <DialogDescription className="text-text-muted text-xs">
            {isCategory
              ? "Defina o nome e o limite de gastos para esta categoria."
              : "Defina o nome para esta subcategoria."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-xs text-text-muted uppercase tracking-wide"
            >
              Nome
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {isCategory && (
            <div className="space-y-2">
              <Label
                htmlFor="limit"
                className="text-xs text-text-muted uppercase tracking-wide"
              >
                Limite (R$)
              </Label>
              <Input
                id="limit"
                type="number"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                placeholder="0.00"
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-border-default text-text-secondary rounded-button"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="bg-accent-primary hover:bg-accent-hover text-white font-semibold tracking-tight rounded-button"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
