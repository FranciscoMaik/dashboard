"use client";

import { PieChart as PieChartIcon, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { CategoryCard } from "@/components/categories/category-card";
import { ManageCategoryDialog } from "@/components/categories/manage-category-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Mock data
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
    subcategories: [
      { id: "3a", name: "Combustível", spent: 320 },
      { id: "3b", name: "Estacionamento", spent: 80 },
      { id: "3c", name: "Uber / 99", spent: 50 },
    ],
  },
  {
    id: "4",
    name: "Lazer",
    limit: 1000,
    spent: 720,
    subcategories: [
      { id: "4a", name: "Cinema / Teatro", spent: 180 },
      { id: "4b", name: "Viagens", spent: 400 },
      { id: "4c", name: "Hobbies", spent: 140 },
    ],
  },
  {
    id: "5",
    name: "Saúde",
    limit: 1500,
    spent: 980,
    subcategories: [
      { id: "5a", name: "Plano de Saúde", spent: 650 },
      { id: "5b", name: "Farmácia", spent: 180 },
      { id: "5c", name: "Academia", spent: 150 },
    ],
  },
  {
    id: "6",
    name: "Educação",
    limit: 2500,
    spent: 1900,
    subcategories: [
      { id: "6a", name: "Faculdade / Pós", spent: 1200 },
      { id: "6b", name: "Cursos Online", spent: 400 },
      { id: "6c", name: "Livros", spent: 300 },
    ],
  },
  {
    id: "7",
    name: "Vestuário",
    limit: 600,
    spent: 350,
    subcategories: [
      { id: "7a", name: "Roupas", spent: 250 },
      { id: "7b", name: "Calçados", spent: 100 },
    ],
  },
  {
    id: "8",
    name: "Assinaturas",
    limit: 400,
    spent: 385,
    subcategories: [
      { id: "8a", name: "Streaming (Netflix, Spotify)", spent: 85 },
      { id: "8b", name: "Software / Apps", spent: 150 },
      { id: "8c", name: "Jornais / Revistas", spent: 50 },
      { id: "8d", name: "Cloud / Armazenamento", spent: 100 },
    ],
  },
  {
    id: "9",
    name: "Pets",
    limit: 500,
    spent: 620,
    subcategories: [
      { id: "9a", name: "Ração / Petiscos", spent: 280 },
      { id: "9b", name: "Veterinário", spent: 250 },
      { id: "9c", name: "Banho / Tosa", spent: 90 },
    ],
  },
  {
    id: "10",
    name: "Outros",
    limit: 800,
    spent: 210,
    subcategories: [
      { id: "10a", name: "Presentes", spent: 130 },
      { id: "10b", name: "Doações", spent: 80 },
    ],
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

  const chartData = useMemo(() => {
    return categories
      .map((cat) => ({
        name: cat.name,
        value: cat.spent,
      }))
      .filter((c) => c.value > 0);
  }, [categories]);

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
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary">
            Categorias
          </h1>
          <p className="text-sm text-text-muted mt-1">
            Gerencie limites de gastos e o uso mensal.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-border-default text-text-secondary hover:bg-surface-hover rounded-button"
            onClick={() => setShowChart(!showChart)}
          >
            <PieChartIcon className="mr-2 h-4 w-4" />
            {showChart ? "Ocultar Gráfico" : "Mostrar Gráfico"}
          </Button>
          <Button
            onClick={handleCreateCategory}
            className="bg-accent-primary hover:bg-accent-hover text-white font-semibold tracking-tight rounded-button"
          >
            <Plus className="mr-2 h-4 w-4" /> Adicionar Categoria
          </Button>
        </div>
      </div>

      {/* Donut Chart */}
      {showChart && chartData.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-sm font-semibold text-text-primary tracking-tight mb-5">
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
                        key={entry.name}
                        fill="#1d63dd"
                        fillOpacity={1 - index * 0.2}
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
                      backgroundColor: "#FFFFFF",
                      borderColor: "#E4E4E7",
                      borderRadius: "12px",
                      boxShadow: "0 2px 24px -6px rgba(0,0,0,0.03)",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {showChart && chartData.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-sm text-text-muted">
              Nenhum gasto registrado para gerar o gráfico.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Category Grid */}
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
          <div className="col-span-full text-center py-12 text-text-muted text-sm border border-border-subtle border-dashed rounded-card">
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
