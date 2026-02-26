import { AlertCircle, Check } from "lucide-react";
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

export interface PortfolioTarget {
  fixed: number;
  variable: number;
  reits: number;
}

interface EditRecommendedPortfolioDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentTargets: PortfolioTarget;
  onSave: (targets: PortfolioTarget) => void;
}

const FIELDS: { key: keyof PortfolioTarget; label: string }[] = [
  { key: "fixed", label: "Renda Fixa" },
  { key: "variable", label: "Renda Variável" },
  { key: "reits", label: "Fundos Imobiliários" },
];

export function EditRecommendedPortfolioDialog({
  isOpen,
  onClose,
  currentTargets,
  onSave,
}: EditRecommendedPortfolioDialogProps) {
  const [targets, setTargets] = useState<PortfolioTarget>(currentTargets);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTargets(currentTargets);
      setError(null);
    }
  }, [isOpen, currentTargets]);

  const total = targets.fixed + targets.variable + targets.reits;

  const handleSave = () => {
    if (total !== 100) {
      setError(
        `A soma dos percentuais deve ser exatamente 100%. Atualmente é ${total}%.`,
      );
      return;
    }
    setError(null);
    onSave(targets);
    onClose();
  };

  const handleNumberChange = (key: keyof PortfolioTarget, value: string) => {
    const parsed = parseInt(value, 10);
    setTargets({
      ...targets,
      [key]: Number.isNaN(parsed) ? 0 : parsed,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-text-primary tracking-tight">
            Editar Carteira Recomendada
          </DialogTitle>
          <DialogDescription className="text-text-muted text-xs">
            Defina o alvo percentual de alocação para cada classe. A soma deve
            resultar em 100%.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {FIELDS.map(({ key, label }) => (
            <div key={key} className="space-y-2">
              <Label
                htmlFor={key}
                className="text-xs text-text-muted uppercase tracking-wide"
              >
                {label}
              </Label>
              <div className="relative">
                <Input
                  id={key}
                  type="number"
                  min="0"
                  max="100"
                  value={targets[key]}
                  onChange={(e) => handleNumberChange(key, e.target.value)}
                  className="pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">
                  %
                </span>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
            <span className="text-xs text-text-muted uppercase tracking-wide">
              Total Acumulado
            </span>
            <span
              className={`text-lg font-bold tabular-nums ${total === 100 ? "text-status-success" : "text-status-error"}`}
            >
              {total}%
            </span>
          </div>

          {error && (
            <div className="py-2.5 px-3 rounded-card bg-status-error/10 text-status-error flex items-center animate-in fade-in">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span className="ml-2 text-xs font-medium">{error}</span>
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
            disabled={total !== 100}
            className="bg-accent-primary hover:bg-accent-hover text-white font-semibold tracking-tight rounded-button"
          >
            <Check className="mr-2 h-4 w-4" />
            Salvar Meta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
