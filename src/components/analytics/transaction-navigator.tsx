"use client";

import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TransactionNavigatorProps {
  clientId: string;
  period: string;
}

export function TransactionNavigator({
  clientId,
  period,
}: TransactionNavigatorProps) {
  const [category, setCategory] = useState<string>("");
  const [subcategory, setSubcategory] = useState<string>("");

  const queryParams = new URLSearchParams({
    period: period,
  });

  if (category) queryParams.set("category", category);
  if (subcategory) queryParams.set("subcategory", subcategory);

  const href = `/dashboard/clients/${clientId}/transactions?${queryParams.toString()}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          Buscar Transações
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="grid w-full gap-2">
          <Label>Categoria</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="housing">Habitação</SelectItem>
              <SelectItem value="transport">Transporte</SelectItem>
              <SelectItem value="food">Alimentação</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid w-full gap-2">
          <Label>Subcategoria</Label>
          <Select value={subcategory} onValueChange={setSubcategory}>
            <SelectTrigger>
              <SelectValue placeholder="Selecionar Subcategoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rent">Aluguel</SelectItem>
              <SelectItem value="fuel">Combustível</SelectItem>
              <SelectItem value="groceries">Mercado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full sm:w-auto" asChild>
          <Link href={href}>
            Ver Transações <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
