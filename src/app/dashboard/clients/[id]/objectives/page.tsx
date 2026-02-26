"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import {
  type Objective,
  ObjectiveCard,
} from "@/components/objectives/objective-card";
import { ObjectiveModal } from "@/components/objectives/objective-modal";
import { Button } from "@/components/ui/button";

// Mock Data
const mockObjectives: Objective[] = [
  {
    id: "1",
    name: "Reserva de Emergência",
    type: "short",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    monthlyContribution: 500,
    currentAmount: 1500,
    totalValue: 6000,
    iconName: "wealth",
  },
  {
    id: "2",
    name: "Carro Novo",
    type: "medium",
    startDate: "2024-06-01",
    endDate: "2026-06-01",
    monthlyContribution: 800,
    currentAmount: 5000,
    totalValue: 20000,
    iconName: "car",
  },
  {
    id: "3",
    name: "Aposentadoria",
    type: "long",
    startDate: "2024-01-01",
    endDate: "2050-01-01",
    monthlyContribution: 1000,
    currentAmount: 45000,
    totalValue: 500000,
    iconName: "home", // Using home as proxy for stability/retirement
  },
];

export default function ClientObjectivesPage() {
  const [objectives, setObjectives] = useState<Objective[]>(mockObjectives);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedObjective, setSelectedObjective] = useState<Objective | null>(
    null,
  );

  const handleCreate = () => {
    setSelectedObjective(null);
    setIsModalOpen(true);
  };

  const handleEdit = (objective: Objective) => {
    setSelectedObjective(objective);
    setIsModalOpen(true);
  };

  const handleDelete = (objective: Objective) => {
    if (confirm(`Tem certeza que deseja excluir "${objective.name}"?`)) {
      setObjectives((prev) => prev.filter((o) => o.id !== objective.id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Objetivos</h2>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" /> Novo Objetivo
        </Button>
      </div>

      {/* Objectives Grid */}
      <section>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {objectives.map((obj) => (
            <ObjectiveCard
              key={obj.id}
              objective={obj}
              onClick={handleEdit}
              onDelete={handleDelete}
            />
          ))}
          {objectives.length === 0 && (
            <div className="col-span-full py-12 text-center text-text-secondary bg-surface-card rounded-2xl border border-border-default border-dashed">
              <p className="text-sm">
                Nenhum objetivo cadastrado para este cliente.
              </p>
            </div>
          )}
        </div>
      </section>

      <ObjectiveModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        objective={selectedObjective}
      />
    </div>
  );
}
