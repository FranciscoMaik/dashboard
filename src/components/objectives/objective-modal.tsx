"use client";

import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Target } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { Objective } from "./objective-card";

// Utility for formatting numbers precisely like BRL decimal (without the R$ prefix)
const formatCurrencyInput = (value: number | undefined | null) => {
  if (value === undefined || value === null) return "";
  if (value === 0) return "0,00";
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const parseCurrencyString = (value: string) => {
  const numericString = value.replace(/\D/g, "");
  if (!numericString) return 0;
  return parseInt(numericString, 10) / 100;
};

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
      <DialogContent className="sm:max-w-[650px] bg-surface-elevated shadow-float border-none p-6 gap-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-subtle">
            <Target className="h-6 w-6 text-accent-primary" />
          </div>
          <div className="flex flex-col gap-1">
            <DialogTitle className="text-xl font-semibold text-text-primary tracking-tight">
              {isEditing
                ? "Editar objetivo financeiro"
                : "Novo objetivo financeiro"}
            </DialogTitle>
            <p className="text-[14px] text-text-secondary">
              {isEditing
                ? "Atualize os detalhes do seu objetivo financeiro."
                : "Defina um novo objetivo para acompanhar e planejar suas finanças a longo prazo."}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-semibold text-text-secondary"
              >
                Nome do objetivo
              </Label>
              <Input
                id="name"
                placeholder="Ex: Viagem para o Japão, Carro Novo"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="bg-surface-page border-border-default text-text-primary rounded-input focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20 h-10 w-full font-medium"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="end"
                className="text-sm font-semibold text-text-secondary"
              >
                Data de conquista
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-10 justify-start text-left font-medium bg-surface-page border-border-default text-text-primary rounded-input hover:bg-surface-hover hover:text-text-primary",
                      !formData.endDate && "text-text-muted",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endDate ? (
                      format(parseISO(formData.endDate), "dd/MM/yyyy", {
                        locale: ptBR,
                      })
                    ) : (
                      <span>dd/mm/aaaa</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-[100]" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      formData.endDate ? parseISO(formData.endDate) : undefined
                    }
                    onSelect={(date) =>
                      setFormData({
                        ...formData,
                        endDate: date ? date.toISOString() : "",
                      })
                    }
                    initialFocus
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="total"
                className="text-sm font-semibold text-text-secondary"
              >
                Valor total
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-text-primary font-medium">
                  R$
                </span>
                <Input
                  id="total"
                  type="text"
                  placeholder="0,00"
                  value={formatCurrencyInput(formData.totalValue)}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      totalValue: parseCurrencyString(e.target.value),
                    })
                  }
                  className="pl-9 bg-surface-page border-border-default text-text-primary rounded-input focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20 h-10 w-full font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="monthly"
                className="text-sm font-semibold text-text-secondary"
              >
                Aporte mensal
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-text-primary font-medium">
                  R$
                </span>
                <Input
                  id="monthly"
                  type="text"
                  placeholder="0,00"
                  value={formatCurrencyInput(formData.monthlyContribution)}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      monthlyContribution: parseCurrencyString(e.target.value),
                    })
                  }
                  className="pl-9 bg-surface-page border-border-default text-text-primary rounded-input focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20 h-10 w-full font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="current"
                className="text-sm font-semibold text-text-secondary"
              >
                Valor guardado
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-text-primary font-medium">
                  R$
                </span>
                <Input
                  id="current"
                  type="text"
                  placeholder="0,00"
                  value={formatCurrencyInput(formData.currentAmount)}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentAmount: parseCurrencyString(e.target.value),
                    })
                  }
                  className="pl-9 bg-surface-page border-border-default text-text-primary rounded-input focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/20 h-10 w-full font-medium"
                />
              </div>
            </div>
          </div>

          <div className="pt-5 border-t border-border-subtle flex justify-end gap-3 mt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="rounded-button bg-surface-page border-border-default text-text-primary hover:bg-surface-hover font-semibold tracking-tight shadow-sm h-10 px-5"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="rounded-button bg-accent-primary hover:bg-accent-hover font-semibold tracking-tight shadow-sm text-white h-10 px-6"
            >
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
