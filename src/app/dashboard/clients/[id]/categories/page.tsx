"use client";

import { PieChart as PieChartIcon, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CategoryCard } from "@/components/categories/category-card";
import { ManageCategoryDialog } from "@/components/categories/manage-category-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Mock data integration
const mockCategories = [
  {
    id: "1",
    name: "Alimentação",
    limit: 2000,
    spent: 1850.5,
    subcategories: [
      { id: "1a", name: "Supermercado", spent: 1200 },
      { id: "1b", name: "Restaurantes", spent: 650.5 },
    ],
  },
  {
    id: "2",
    name: "Moradia",
    limit: 3000,
    spent: 3050,
    subcategories: [
      { id: "2a", name: "Aluguel", spent: 2500 },
      { id: "2b", name: "Condomínio", spent: 550 },
    ],
  },
  {
    id: "3",
    name: "Transporte",
    limit: 800,
    spent: 450,
    subcategories: [{ id: "3a", name: "Combustível", spent: 450 }],
  },
  {
    id: "4",
    name: "Lazer",
    limit: 1000,
    spent: 0,
    subcategories: [],
  },
];

interface Subcategory {
  id: string;
  name: string;
  spent: number;
}

interface Category {
  id: string;
  name: string;
  limit: number;
  spent: number;
  subcategories: Subcategory[];
}

export default function ClientCategoriesPage() {
  // Local state for categories (initialized from mock)
  // In a real app this would be synced with backend
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"Category" | "Subcategory">(
    "Category",
  );
  const [editingItem, setEditingItem] = useState<
    { id: string; name: string; limit?: number } | undefined
  >(undefined);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [showChart, setShowChart] = useState(false);

  // Prepare data for the donut chart
  const chartData = useMemo(() => {
    return categories
      .map((cat) => ({
        name: cat.name,
        value: cat.spent,
      }))
      .filter((c) => c.value > 0); // Only show categories with actual expenses
  }, [categories]);

  // Design System accent palette for the chart
  const COLORS = [
    "#4F46E5",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
    "#3B82F6",
    "#14B8A6",
  ];

  const handleCreateCategory = () => {
    setDialogMode("Category");
    setEditingItem(undefined);
    setSelectedCategoryId(null);
    setIsDialogOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setDialogMode("Category");
    setEditingItem({
      id: category.id,
      name: category.name,
      limit: category.limit,
    });
    setIsDialogOpen(true);
  };

  const handleAddSubcategory = (categoryId: string) => {
    setDialogMode("Subcategory");
    setEditingItem(undefined);
    setSelectedCategoryId(categoryId);
    setIsDialogOpen(true);
  };

  const handleEditSubcategory = (categoryId: string, sub: Subcategory) => {
    setDialogMode("Subcategory");
    setEditingItem({ id: sub.id, name: sub.name });
    setSelectedCategoryId(categoryId);
    setIsDialogOpen(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (confirm("Tem certeza que deseja excluir esta categoria?")) {
      setCategories((prev) => prev.filter((c) => c.id !== categoryId));
    }
  };

  const handleDeleteSubcategory = (categoryId: string, subId: string) => {
    if (confirm("Tem certeza que deseja excluir esta subcategoria?")) {
      setCategories((prev) =>
        prev.map((c) => {
          if (c.id === categoryId) {
            return {
              ...c,
              subcategories: c.subcategories.filter((s) => s.id !== subId),
            };
          }
          return c;
        }),
      );
    }
  };

  const handleSave = (data: { name: string; limit?: number }) => {
    if (editingItem) {
      // Edit Mode
      if (dialogMode === "Category") {
        setCategories((prev) =>
          prev.map((c) =>
            c.id === editingItem.id
              ? { ...c, name: data.name, limit: data.limit || 0 }
              : c,
          ),
        );
      } else {
        setCategories((prev) =>
          prev.map((c) => {
            if (c.id === selectedCategoryId) {
              return {
                ...c,
                subcategories: c.subcategories.map((s) =>
                  s.id === editingItem.id ? { ...s, name: data.name } : s,
                ),
              };
            }
            return c;
          }),
        );
      }
    } else {
      // Create Mode
      if (dialogMode === "Category") {
        const newCategory: Category = {
          id: `cat_${Date.now()}`,
          name: data.name,
          limit: data.limit || 0,
          spent: 0,
          subcategories: [],
        };
        setCategories([...categories, newCategory]);
      } else {
        const newSub: Subcategory = {
          id: `sub_${Date.now()}`,
          name: data.name,
          spent: 0,
        };
        setCategories((prev) =>
          prev.map((c) => {
            if (c.id === selectedCategoryId) {
              return { ...c, subcategories: [...c.subcategories, newSub] };
            }
            return c;
          }),
        );
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary">
            Categorias
          </h2>
          <p className="text-text-secondary mt-1">
            Gerencie limites de gastos e o uso mensal.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="bg-surface-card border-border-default hover:bg-surface-hover text-text-primary"
            onClick={() => setShowChart(!showChart)}
          >
            <PieChartIcon className="mr-2 h-4 w-4" />
            {showChart ? "Ocultar Gráfico" : "Mostrar Gráfico"}
          </Button>
          <Button onClick={handleCreateCategory}>
            <Plus className="mr-2 h-4 w-4" /> Adicionar Categoria
          </Button>
        </div>
      </div>

      {showChart && chartData.length > 0 && (
        <Card className="bg-surface-card border-border-default shadow-card border-none rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-6">
            Gastos por Categoria
          </h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number | undefined) =>
                    new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(value || 0)
                  }
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    borderColor: "hsl(var(--border))",
                    borderRadius: "12px",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                    border: "none",
                    color: "var(--color-text-primary)",
                  }}
                  itemStyle={{
                    color: "var(--color-text-primary)",
                    fontWeight: 500,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {showChart && chartData.length === 0 && (
        <Card className="bg-surface-card border-border-default shadow-card border-none rounded-2xl p-8 text-center bg-surface-hover/30">
          <p className="text-text-muted">
            Nenhum gasto registrado para gerar o gráfico.
          </p>
        </Card>
      )}

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onEditCategory={handleEditCategory}
            onDeleteCategory={handleDeleteCategory}
            onAddSubcategory={handleAddSubcategory}
            onEditSubcategory={handleEditSubcategory}
            onDeleteSubcategory={handleDeleteSubcategory}
          />
        ))}

        {categories.length === 0 && (
          <div className="col-span-full text-center py-12 text-text-muted border border-border-default rounded-2xl border-dashed bg-surface-card">
            Nenhuma categoria encontrada. Crie uma para começar.
          </div>
        )}
      </div>

      <ManageCategoryDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSave}
        initialData={editingItem}
        type={dialogMode}
      />
    </div>
  );
}
