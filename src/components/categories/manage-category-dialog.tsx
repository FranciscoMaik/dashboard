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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialData
              ? `Editar ${type === "Category" ? "Categoria" : "Subcategoria"}`
              : `Adicionar ${type === "Category" ? "Categoria" : "Subcategoria"}`}
          </DialogTitle>
          <DialogDescription>
            {type === "Category"
              ? "Defina o nome e o limite de gastos para esta categoria."
              : "Defina o nome para esta subcategoria."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          {type === "Category" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="limit" className="text-right">
                Limite
              </Label>
              <Input
                id="limit"
                type="number"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
                className="col-span-3"
                placeholder="0.00"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
