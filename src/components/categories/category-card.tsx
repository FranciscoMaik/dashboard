import { Edit2, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/formatters";

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

interface CategoryCardProps {
  category: Category;
  onEditCategory: (category: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
  onAddSubcategory: (categoryId: string) => void;
  onEditSubcategory: (categoryId: string, subcategory: Subcategory) => void;
  onDeleteSubcategory: (categoryId: string, subcategoryId: string) => void;
}

export function CategoryCard({
  category,
  onEditCategory,
  onDeleteCategory,
  onAddSubcategory,
  onEditSubcategory,
  onDeleteSubcategory,
}: CategoryCardProps) {
  const percentage = Math.min((category.spent / category.limit) * 100, 100);
  const isOverLimit = category.spent > category.limit;

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6 pb-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h3 className="font-semibold text-lg">{category.name}</h3>
            {isOverLimit ? (
              <Badge variant="destructive">Acima do Limite</Badge>
            ) : (
              <Badge
                variant="outline"
                className="bg-green-500/10 text-green-600 border-green-200"
              >
                OK
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground mr-2">
              <strong>{formatCurrency(category.spent)}</strong> /{" "}
              {formatCurrency(category.limit)}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onEditCategory(category)}>
                  <Edit2 className="mr-2 h-4 w-4" /> Editar Categoria
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAddSubcategory(category.id)}>
                  <Plus className="mr-2 h-4 w-4" /> Adicionar Subcategoria
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600"
                  onClick={() => onDeleteCategory(category.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Excluir Categoria
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="space-y-1 mb-4">
          <Progress
            value={percentage}
            className={`h-2 ${isOverLimit ? "bg-red-100" : ""}`}
            indicatorClassName={isOverLimit ? "bg-red-500" : "bg-primary"}
          />
          <p className="text-xs text-muted-foreground text-right">
            {percentage.toFixed(0)}% usado
          </p>
        </div>
      </div>

      <div className="px-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="subcategories" className="border-b-0">
            <AccordionTrigger className="py-2 text-sm text-muted-foreground hover:no-underline">
              Ver Subcategorias ({category.subcategories.length})
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pb-4">
                {category.subcategories.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between p-2 rounded-md bg-muted/50"
                  >
                    <span className="text-sm font-medium">{sub.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        {formatCurrency(sub.spent)}
                      </span>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => onEditSubcategory(category.id, sub)}
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-red-500 hover:text-red-600"
                          onClick={() =>
                            onDeleteSubcategory(category.id, sub.id)
                          }
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {category.subcategories.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-2">
                    Nenhuma subcategoria ainda.
                  </p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
