"use client";

import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { CategoryCard } from "@/components/categories/category-card";
import { ManageCategoryDialog } from "@/components/categories/manage-category-dialog";
import { Button } from "@/components/ui/button";
import { getClientData } from "@/lib/mock-data";

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
  const params = useParams();
  const clientId = params.id as string;
  const clientData = getClientData(clientId);

  // Local state for categories (initialized from mock)
  // In a real app this would be synced with backend
  const [categories, setCategories] = useState<Category[]>(
    clientData.categories || [],
  );
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Categorias</h2>
          <p className="text-muted-foreground">
            Gerencie limites de gastos e uso.
          </p>
        </div>
        <Button onClick={handleCreateCategory}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Categoria
        </Button>
      </div>

      <div className="grid gap-6">
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
          <div className="text-center py-12 text-muted-foreground border rounded-lg border-dashed">
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
