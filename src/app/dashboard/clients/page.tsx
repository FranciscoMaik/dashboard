"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { ClientCard } from "@/components/clients/client-card";
import { ExportClientsDialog } from "@/components/clients/export-clients-dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const mockClients = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    hasOpenFinance: true,
    hasB3: true,
    hasLifePlan: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    hasOpenFinance: false,
    hasB3: true,
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.j@example.com",
    phone: "+1 (555) 456-7890",
    hasOpenFinance: true,
    hasB3: false,
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice.b@example.com",
    phone: "+1 (555) 789-0123",
    hasOpenFinance: false,
    hasB3: false,
  },
];

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("name-asc");

  const filteredClients = mockClients
    .filter(
      (client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortOrder === "name-asc") return a.name.localeCompare(b.name);
      if (sortOrder === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary">
            Clientes
          </h2>
          <p className="text-sm text-text-muted mt-1">
            Gerencie seus clientes e portfólios
          </p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-muted" />
            <Input
              placeholder="Buscar por nome ou email..."
              className="pl-9 bg-surface-card border-border-default rounded-input text-text-primary shadow-sm focus-visible:ring-1 focus-visible:ring-accent-primary/20 focus-visible:border-accent-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger className="w-[180px] bg-surface-card border-border-default rounded-input text-text-primary shadow-sm focus:ring-1 focus:ring-accent-primary/20 focus:border-accent-primary">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Nome (A-Z)</SelectItem>
              <SelectItem value="name-desc">Nome (Z-A)</SelectItem>
            </SelectContent>
          </Select>
          <ExportClientsDialog clients={filteredClients} />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredClients.map((client) => (
          <ClientCard key={client.id} {...client} />
        ))}
      </div>
      {filteredClients.length === 0 && (
        <div className="text-center text-text-muted py-10 border border-border-subtle border-dashed rounded-card bg-surface-card shadow-sm">
          Nenhum cliente encontrado com sua busca.
        </div>
      )}
    </div>
  );
}
