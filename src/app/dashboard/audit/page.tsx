"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { AuditUserCard } from "@/components/audit/audit-user-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for system users to audit
const mockAuditUsers = [
  {
    id: "usr001",
    name: "Ana Costa",
    email: "ana.costa@advisory.com",
    totalPlRef: 45000000.0,
    totalSearches: 134,
    lastConsultation: "Hoje às 14:32",
    accessLevel: "Master",
  },
  {
    id: "usr002",
    name: "Bruno Almeida",
    email: "bruno.a@advisory.com",
    totalPlRef: 12500000.5,
    totalSearches: 45,
    lastConsultation: "Ontem às 18:15",
    accessLevel: "Avançado",
  },
  {
    id: "usr003",
    name: "Carolina Mendes",
    email: "carolina.m@advisory.com",
    totalPlRef: 89000000.0,
    totalSearches: 412,
    lastConsultation: "Hoje às 09:10",
    accessLevel: "Avançado",
  },
  {
    id: "usr004",
    name: "Daniel Souza",
    email: "daniel.s@advisory.com",
    totalPlRef: 0,
    totalSearches: 0,
    lastConsultation: "Nenhuma pesquisa",
    accessLevel: "Padrão",
  },
];

export default function AuditPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("pl-desc");

  const filteredUsers = mockAuditUsers
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortOrder === "name-asc") return a.name.localeCompare(b.name);
      if (sortOrder === "pl-desc") return b.totalPlRef - a.totalPlRef;
      if (sortOrder === "searches-desc")
        return b.totalSearches - a.totalSearches;
      return 0;
    });

  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary">
            Auditoria de Sistema
          </h2>
          <p className="text-sm text-text-muted mt-1">
            Acompanhe a atividade e pesquisas financeiras dos usuários internos
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
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
              <SelectItem value="pl-desc">Maior PL Pesq.</SelectItem>
              <SelectItem value="searches-desc">Maior vol. Buscas</SelectItem>
              <SelectItem value="name-asc">Nome (A-Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredUsers.map((user) => (
          <AuditUserCard key={user.id} {...user} />
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center text-text-muted py-10 border border-border-subtle border-dashed rounded-card bg-surface-card shadow-sm">
          Nenhum usuário encontrado com sua busca.
        </div>
      )}
    </div>
  );
}
