import {
  Baby,
  Calendar,
  Clock,
  FileText,
  KeyRound,
  Mail,
  Phone,
  Sparkles,
  TrendingUp,
  User,
  Wallet,
  Zap,
} from "lucide-react";

import { BalanceChart } from "@/components/clients/balance-chart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getClientData } from "@/lib/mock-data";

export default async function ClientProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = getClientData(id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center gap-4">
          <Avatar size="lg" className="h-16 w-16">
            <AvatarImage src="" />
            <AvatarFallback className="text-xl">
              {client.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .substring(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-3xl font-bold tracking-tight">{client.name}</h2>
        </div>
        <div className="flex gap-2">
          {client.hasOpenFinance && (
            <Badge variant="secondary" className="text-lg py-1">
              Open Finance
            </Badge>
          )}
          {client.hasB3 && (
            <Badge variant="outline" className="text-lg py-1">
              B3 Conectada
            </Badge>
          )}
          {client.hasLifePlan && (
            <Badge className="text-lg py-1 bg-indigo-600 hover:bg-indigo-700 border-transparent text-white">
              Plano de Vida
            </Badge>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Informações de Contato
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{client.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{client.phone}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Atividade</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Último Login:</span>
              <span>{client.lastLogin}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Criado em {client.createdAt}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Dados Demográficos
            </CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Idade:</span>
              <span>{client.age} anos</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Baby className="h-4 w-4 text-muted-foreground" />
              <span>{client.childrenCount} Filhos</span>
            </div>
          </CardContent>
        </Card>

        {/* B3 Net Worth (Full Width if no chart, else 1 col) */}
        {client.hasB3 && (
          <Card className="col-span-1 md:col-span-2 lg:col-span-3 border-primary/20 bg-primary/5">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-lg font-medium pr-2">
                Patrimônio Líquido (B3)
              </CardTitle>
              <Wallet className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{client.netWorth}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Total de ativos vinculados via integração B3.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Open Finance Balance History (Full Width) */}
        {client.hasOpenFinance && (
          <Card className="col-span-1 md:col-span-2 lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg font-medium">
                  Histórico de Saldo (12 Meses)
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Saldo consolidado Open Finance.
                </p>
              </div>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-4">
              <BalanceChart data={client.balanceHistory} />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Actions Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button className="flex-1 text-lg h-12" size="lg">
          <KeyRound className="mr-2 h-5 w-5" />
          Redefinir Senha
        </Button>
        <Button className="flex-1 text-lg h-12" size="lg">
          <FileText className="mr-2 h-5 w-5" />
          Enviar Relatório de Status
        </Button>
        <Button
          className="flex-1 text-lg h-12 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          size="lg"
          disabled={client.hasLifePlan}
        >
          {client.hasLifePlan ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="flex items-center w-full justify-center h-full">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Plano de Vida Ativo
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Cliente já possui Plano de Vida ativo</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Ativar Módulo Plano de Vida
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
