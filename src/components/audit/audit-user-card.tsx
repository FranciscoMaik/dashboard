import { ChevronRight, Clock, DollarSign, Mail, Search } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AuditUserCardProps {
  id: string;
  name: string;
  email: string;
  totalPlRef: number;
  totalSearches: number;
  lastConsultation: string;
  accessLevel?: string;
}

export function AuditUserCard({
  id,
  name,
  email,
  totalPlRef,
  totalSearches,
  lastConsultation,
  accessLevel = "Padrão",
}: AuditUserCardProps) {
  return (
    <Card className="bg-surface-card rounded-card shadow-card hover:shadow-hover border-none transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-1 ring-border-default ring-offset-2 ring-offset-surface-card shrink-0">
              <AvatarImage src="" />
              <AvatarFallback className="bg-accent-subtle text-accent-primary font-semibold text-sm">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1 items-start">
              <CardTitle className="text-lg font-semibold tracking-tight text-text-primary">
                {name}
              </CardTitle>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase border bg-surface-hover text-text-secondary border-border-default">
                {accessLevel}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-text-muted pb-4">
        <div className="flex items-center gap-2.5">
          <Mail className="h-4 w-4 shrink-0 text-text-secondary" />
          <span className="truncate">{email}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <DollarSign className="h-4 w-4 shrink-0 text-text-secondary" />
          <span className="truncate">
            PL Pesquisado:{" "}
            <strong className="text-text-primary font-medium">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalPlRef)}
            </strong>
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <Search className="h-4 w-4 shrink-0 text-text-secondary" />
          <span className="truncate">
            Buscas realizadas:{" "}
            <strong className="text-text-primary font-medium">
              {totalSearches}
            </strong>
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <Clock className="h-4 w-4 shrink-0 text-text-secondary" />
          <span className="truncate">
            Última consulta:{" "}
            <strong className="text-text-primary font-medium">
              {lastConsultation}
            </strong>
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/dashboard/audit/${id}`} className="w-full">
          <Button className="w-full justify-between group rounded-button border border-border-default bg-surface-page text-text-secondary hover:text-text-primary hover:bg-surface-hover shadow-none transition-colors h-9">
            Ver Detalhes
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
