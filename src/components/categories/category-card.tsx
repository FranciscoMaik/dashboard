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
    <div className="rounded-2xl bg-surface-card text-text-primary shadow-card hover:shadow-card-hover transition-all duration-300">
      <div className="p-4 pb-2">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <h3 className="font-semibold text-base tracking-tight text-text-primary">
              {category.name}
            </h3>
            {isOverLimit ? (
              <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                Acima
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="bg-status-success/10 text-status-success border-status-success/20 text-[10px] px-1.5 py-0 font-medium"
              >
                OK
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-text-secondary mr-1 flex flex-col text-right">
              <strong className="text-text-primary text-sm tracking-tight">
                {formatCurrency(category.spent)}
              </strong>
              <span className="text-[10px] uppercase tracking-wider">
                / {formatCurrency(category.limit)}
              </span>
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-text-muted hover:text-text-primary hover:bg-surface-hover"
                >
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

        <div className="space-y-1 mb-2">
          <Progress
            value={percentage}
            className={`h-1.5 bg-surface-hover overflow-hidden rounded-full`}
            indicatorClassName={
              isOverLimit ? "bg-status-error" : "bg-accent-primary"
            }
          />
          <p className="text-[10px] text-text-muted font-medium text-right uppercase tracking-wider">
            {percentage.toFixed(0)}% Utilizado
          </p>
        </div>
      </div>

      <div className="px-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem
            value="subcategories"
            className="border-b-0 border-t border-border-default/50 pt-1"
          >
            <AccordionTrigger className="py-2 text-[11px] font-semibold uppercase tracking-wider text-text-secondary hover:no-underline flex-row-reverse justify-end gap-2">
              Subcategorias{" "}
              <span className="text-text-muted">
                ({category.subcategories.length})
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1 pb-3 pt-1">
                {category.subcategories.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between py-1.5 px-2 rounded-md bg-surface-hover/50 hover:bg-surface-hover transition-colors group"
                  >
                    <span className="text-[12px] font-medium text-text-primary capitalize">
                      {sub.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-text-secondary tabular-nums">
                        {formatCurrency(sub.spent)}
                      </span>
                      <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 text-text-muted hover:text-text-primary"
                          onClick={() => onEditSubcategory(category.id, sub)}
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 text-text-muted hover:text-status-error"
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
                  <p className="text-[11px] text-text-muted text-center py-2 font-medium">
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
