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
    name: "Emergency Fund",
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
    name: "New Car",
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
    name: "Retirement",
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
    if (confirm(`Are you sure you want to delete "${objective.name}"?`)) {
      setObjectives((prev) => prev.filter((o) => o.id !== objective.id));
    }
  };

  const shortTerm = objectives.filter((o) => o.type === "short");
  const mediumTerm = objectives.filter((o) => o.type === "medium");
  const longTerm = objectives.filter((o) => o.type === "long");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Objectives</h2>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-4 w-4" /> New Objective
        </Button>
      </div>

      {/* Short Term */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">
          Short Term (0-2 Years)
        </h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shortTerm.map((obj) => (
            <ObjectiveCard
              key={obj.id}
              objective={obj}
              onClick={handleEdit}
              onDelete={handleDelete}
            />
          ))}
          {shortTerm.length === 0 && (
            <p className="text-muted-foreground text-sm">
              No short term objectives.
            </p>
          )}
        </div>
      </section>

      {/* Medium Term */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">
          Medium Term (2-5 Years)
        </h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mediumTerm.map((obj) => (
            <ObjectiveCard
              key={obj.id}
              objective={obj}
              onClick={handleEdit}
              onDelete={handleDelete}
            />
          ))}
          {mediumTerm.length === 0 && (
            <p className="text-muted-foreground text-sm">
              No medium term objectives.
            </p>
          )}
        </div>
      </section>

      {/* Long Term */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-2">
          Long Term (5+ Years)
        </h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {longTerm.map((obj) => (
            <ObjectiveCard
              key={obj.id}
              objective={obj}
              onClick={handleEdit}
              onDelete={handleDelete}
            />
          ))}
          {longTerm.length === 0 && (
            <p className="text-muted-foreground text-sm">
              No long term objectives.
            </p>
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
