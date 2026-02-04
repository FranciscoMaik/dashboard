"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Objective, ObjectiveType } from "./objective-card";

interface ObjectiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  objective?: Objective | null; // If null, it's create mode
}

export function ObjectiveModal({
  isOpen,
  onClose,
  objective,
}: ObjectiveModalProps) {
  const isEditing = !!objective;

  // Form State
  const [formData, setFormData] = useState<Partial<Objective>>({
    name: "",
    type: "short",
    startDate: "",
    endDate: "",
    monthlyContribution: 0,
    currentAmount: 0,
    totalValue: 0,
    iconName: "wealth",
  });

  useEffect(() => {
    if (objective) {
      setFormData(objective);
    } else {
      // Reset for create mode
      setFormData({
        name: "",
        type: "short",
        startDate: "",
        endDate: "",
        monthlyContribution: 0,
        currentAmount: 0,
        totalValue: 0,
        iconName: "wealth",
      });
    }
  }, [objective, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API
    console.log("Submitting Objective:", formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Objetivo" : "Novo Objetivo"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Atualize os detalhes do seu objetivo financeiro."
              : "Defina um novo objetivo financeiro para acompanhar."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Tipo
            </Label>
            <Select
              value={formData.type}
              onValueChange={(val: ObjectiveType) =>
                setFormData({ ...formData, type: val })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short">Curto Prazo</SelectItem>
                <SelectItem value="medium">Médio Prazo</SelectItem>
                <SelectItem value="long">Longo Prazo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="start" className="text-right">
              Início
            </Label>
            <Input
              id="start"
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="end" className="text-right">
              Fim
            </Label>
            <Input
              id="end"
              type="date"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="monthly" className="text-right">
              Mensal
            </Label>
            <Input
              id="monthly"
              type="number"
              value={formData.monthlyContribution}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  monthlyContribution: Number(e.target.value),
                })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="current" className="text-right">
              Atual
            </Label>
            <Input
              id="current"
              type="number"
              value={formData.currentAmount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  currentAmount: Number(e.target.value),
                })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="total" className="text-right">
              Total
            </Label>
            <Input
              id="total"
              type="number"
              value={formData.totalValue}
              onChange={(e) =>
                setFormData({ ...formData, totalValue: Number(e.target.value) })
              }
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            <Button type="submit">Salvar alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
