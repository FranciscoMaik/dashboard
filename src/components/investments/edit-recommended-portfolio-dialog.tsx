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

export function EditRecommendedPortfolioDialog({
  isOpen,
  onClose,
  currentTargets,
  onSave,
}: EditRecommendedPortfolioDialogProps) {
  const [targets, setTargets] = useState<PortfolioTarget>(currentTargets);
  const [error, setError] = useState<string | null>(null);

  // Reset state when opening with new targets
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
          <DialogTitle>Editar Carteira Recomendada</DialogTitle>
          <DialogDescription>
            Defina o alvo percentual de alocação para cada classe de ativos
            deste cliente. A soma deve resultar em 100%.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="fixed"
                className="text-right col-span-1 font-medium text-text-secondary"
              >
                Renda Fixa
              </Label>
              <div className="col-span-3 relative">
                <Input
                  id="fixed"
                  type="number"
                  min="0"
                  max="100"
                  value={targets.fixed}
                  onChange={(e) => handleNumberChange("fixed", e.target.value)}
                  className="pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">
                  %
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="variable"
                className="text-right col-span-1 font-medium text-text-secondary"
              >
                Renda Variável
              </Label>
              <div className="col-span-3 relative">
                <Input
                  id="variable"
                  type="number"
                  min="0"
                  max="100"
                  value={targets.variable}
                  onChange={(e) =>
                    handleNumberChange("variable", e.target.value)
                  }
                  className="pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">
                  %
                </span>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="reits"
                className="text-right col-span-1 font-medium text-text-secondary"
              >
                Fundos Imobiliários
              </Label>
              <div className="col-span-3 relative">
                <Input
                  id="reits"
                  type="number"
                  min="0"
                  max="100"
                  value={targets.reits}
                  onChange={(e) => handleNumberChange("reits", e.target.value)}
                  className="pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm">
                  %
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2 pt-4 border-t border-border-default/50">
            <span className="text-sm font-medium text-text-secondary">
              Total Acumulado:
            </span>
            <span
              className={`text-lg font-bold tabular-nums ${total === 100 ? "text-status-success" : "text-status-error"}`}
            >
              {total}%
            </span>
          </div>

          {error && (
            <div className="py-2.5 px-3 rounded-lg bg-status-error/10 text-status-error flex items-center animate-in fade-in">
              <AlertCircle className="h-4 w-4" />
              <div className="ml-2 text-xs font-medium">{error}</div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={total !== 100}>
            <Check className="mr-2 h-4 w-4" />
            Salvar Meta
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
