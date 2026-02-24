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
} from "lucide-react";

import { BalanceChart } from "@/components/clients/balance-chart";
import { MostAccessedScreens } from "@/components/clients/most-accessed-screens";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getClientData } from "@/lib/mock-data";

/* ─── SVG Cartografia Topográfica (Textura Ambiente) ─── */
function TopographyTexture() {
  return (
    <svg
      className="absolute top-0 right-0 w-[500px] h-[300px] pointer-events-none"
      viewBox="0 0 500 300"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M350 280 C 320 240, 280 220, 250 200 C 220 180, 200 150, 230 120 C 260 90, 310 80, 360 70 C 410 60, 450 50, 500 40"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-text-primary opacity-[0.03]"
      />
      <path
        d="M380 290 C 350 250, 300 230, 270 210 C 240 190, 220 160, 250 130 C 280 100, 330 90, 380 80 C 430 70, 470 60, 500 55"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-text-primary opacity-[0.025]"
      />
      <path
        d="M400 300 C 370 260, 330 245, 300 225 C 270 205, 245 175, 275 145 C 305 115, 350 105, 400 95 C 450 85, 480 75, 500 70"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-text-primary opacity-[0.02]"
      />
      <path
        d="M420 300 C 400 275, 360 260, 330 245 C 300 225, 275 200, 300 170 C 325 140, 370 130, 420 115 C 465 102, 490 90, 500 85"
        stroke="currentColor"
        strokeWidth="0.5"
        className="text-text-primary opacity-[0.015]"
      />
    </svg>
  );
}

/* ─── SVG: Cena Narrativa de Patrimônio (Pilares com fio de fibra óptica) ─── */
function PatrimonioScene() {
  return (
    <svg
      className="absolute bottom-0 right-4 w-[200px] h-[120px] pointer-events-none opacity-60"
      viewBox="0 0 200 120"
      fill="none"
      aria-hidden="true"
    >
      {/* Grid isométrico base */}
      <line
        x1="20"
        y1="110"
        x2="180"
        y2="110"
        stroke="#E4E4E7"
        strokeWidth="0.5"
      />
      <line
        x1="40"
        y1="115"
        x2="160"
        y2="115"
        stroke="#F4F4F5"
        strokeWidth="0.5"
      />

      {/* Pilares (wireframe 3D) */}
      <rect
        x="35"
        y="60"
        width="20"
        height="50"
        rx="1"
        stroke="#D4D4D8"
        strokeWidth="0.8"
        fill="#F4F4F5"
        fillOpacity="0.1"
      />
      <rect
        x="75"
        y="40"
        width="20"
        height="70"
        rx="1"
        stroke="#D4D4D8"
        strokeWidth="0.8"
        fill="#F4F4F5"
        fillOpacity="0.1"
      />
      <rect
        x="115"
        y="25"
        width="20"
        height="85"
        rx="1"
        stroke="#D4D4D8"
        strokeWidth="0.8"
        fill="#F4F4F5"
        fillOpacity="0.1"
      />
      <rect
        x="155"
        y="15"
        width="20"
        height="95"
        rx="1"
        stroke="#D4D4D8"
        strokeWidth="0.8"
        fill="#F4F4F5"
        fillOpacity="0.1"
      />

      {/* Fio de fibra óptica (accent) conectando os topos */}
      <path
        d="M45 60 C 60 55, 70 45, 85 40 C 100 35, 110 30, 125 25 C 140 20, 150 18, 165 15"
        stroke="#1d63dd"
        strokeWidth="1.5"
        strokeLinecap="round"
        filter="url(#glow)"
      />
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Pontos nos topos dos pilares */}
      <circle cx="45" cy="60" r="2.5" fill="#1d63dd" fillOpacity="0.8" />
      <circle cx="85" cy="40" r="2.5" fill="#1d63dd" fillOpacity="0.8" />
      <circle cx="125" cy="25" r="2.5" fill="#1d63dd" fillOpacity="0.8" />
      <circle cx="165" cy="15" r="3" fill="#1d63dd" />
    </svg>
  );
}

/* ─── Info Row Reutilizável ─── */
function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border-subtle last:border-0">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="h-4 w-4 text-text-muted" />}
        <span className="text-sm text-text-secondary">{label}</span>
      </div>
      <span className="text-sm font-medium text-text-primary">{value}</span>
    </div>
  );
}

export default async function ClientProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = getClientData(id);

  const initials = client.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-8 max-w-screen-2xl mx-auto">
      {/* ─── Hero Header with Topography ─── */}
      <div className="relative overflow-hidden rounded-card bg-surface-card shadow-card px-8 py-10">
        <TopographyTexture />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <Avatar
              size="lg"
              className="h-20 w-20 ring-2 ring-accent-subtle ring-offset-2 ring-offset-surface-card"
            >
              <AvatarImage src="" />
              <AvatarFallback className="text-2xl font-semibold bg-accent-subtle text-accent-primary">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-text-primary">
                {client.name}
              </h1>
              <div className="flex flex-wrap gap-2">
                {client.hasOpenFinance && (
                  <Badge className="bg-surface-page border border-border-default text-text-secondary rounded-full px-3 py-1 text-[11px] font-medium tracking-wide uppercase">
                    Open Finance
                  </Badge>
                )}
                {client.hasB3 && (
                  <Badge className="bg-surface-page border border-border-default text-text-secondary rounded-full px-3 py-1 text-[11px] font-medium tracking-wide uppercase">
                    B3 Conectada
                  </Badge>
                )}
                {client.hasLifePlan && (
                  <Badge className="bg-accent-subtle border border-accent-primary/20 text-accent-primary rounded-full px-3 py-1 text-[11px] font-medium tracking-wide uppercase">
                    Plano de Vida
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-text-muted uppercase tracking-wide">
                Último acesso
              </p>
              <p className="text-sm font-medium text-text-primary mt-0.5">
                {client.lastLogin}
              </p>
            </div>
            <div className="w-px h-10 bg-border-default" />
            <div className="text-right">
              <p className="text-xs text-text-muted uppercase tracking-wide">
                Cliente desde
              </p>
              <p className="text-sm font-medium text-text-primary mt-0.5">
                {client.createdAt}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Content Grid ─── */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column — Personal Data */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact + Demographics in a 2-col sub-grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Contact Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-card bg-accent-subtle">
                    <User className="h-4 w-4 text-accent-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary tracking-tight">
                    Informações de Contato
                  </h3>
                </div>
                <div className="space-y-0">
                  <InfoRow icon={User} label="CPF" value={client.cpf} />
                  <InfoRow icon={Mail} label="E-mail" value={client.email} />
                  <InfoRow icon={Phone} label="Telefone" value={client.phone} />
                </div>
              </CardContent>
            </Card>

            {/* Demographics Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-card bg-accent-subtle">
                    <User className="h-4 w-4 text-accent-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary tracking-tight">
                    Dados Demográficos
                  </h3>
                </div>
                <div className="space-y-0">
                  <InfoRow
                    icon={Calendar}
                    label="Idade"
                    value={`${client.age} anos`}
                  />
                  <InfoRow
                    icon={Baby}
                    label="Filhos"
                    value={`${client.childrenCount}`}
                  />
                  <InfoRow
                    icon={Clock}
                    label="Último Login"
                    value={client.lastLogin}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* B3 Net Worth — Narrative Card */}
          {client.hasB3 && (
            <Card className="relative overflow-hidden">
              <PatrimonioScene />
              <CardContent className="relative z-10 pt-6">
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-card bg-accent-subtle">
                    <Wallet className="h-4 w-4 text-accent-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary tracking-tight">
                    Patrimônio Líquido (B3)
                  </h3>
                </div>
                <div className="space-y-1">
                  <p className="text-4xl font-bold tracking-tight text-text-primary">
                    {client.netWorth}
                  </p>
                  <p className="text-sm text-text-muted">
                    Total de ativos vinculados via integração B3.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Open Finance Balance History */}
          {client.hasOpenFinance && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-card bg-accent-subtle">
                      <TrendingUp className="h-4 w-4 text-accent-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary tracking-tight">
                        Histórico de Saldo (12 Meses)
                      </h3>
                      <p className="text-xs text-text-muted">
                        Saldo consolidado Open Finance.
                      </p>
                    </div>
                  </div>
                </div>
                <BalanceChart data={client.balanceHistory} />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column — Activity & Access */}
        <div className="space-y-6">
          {/* Most Accessed Screens */}
          <MostAccessedScreens />

          {/* Quick Actions */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-card bg-accent-subtle">
                  <Sparkles className="h-4 w-4 text-accent-primary" />
                </div>
                <h3 className="text-sm font-semibold text-text-primary tracking-tight">
                  Ações Rápidas
                </h3>
              </div>
              <div className="space-y-3">
                <Button
                  className="w-full justify-start h-11 bg-surface-page border border-border-default text-text-primary hover:bg-surface-hover shadow-none font-medium"
                  variant="outline"
                >
                  <KeyRound className="mr-3 h-4 w-4 text-text-muted" />
                  Redefinir Senha
                </Button>
                <Button
                  className="w-full justify-start h-11 bg-surface-page border border-border-default text-text-primary hover:bg-surface-hover shadow-none font-medium"
                  variant="outline"
                >
                  <FileText className="mr-3 h-4 w-4 text-text-muted" />
                  Enviar Relatório de Status
                </Button>
                {client.hasLifePlan ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          className="w-full justify-start h-11 bg-accent-subtle border border-accent-primary/20 text-accent-primary shadow-none font-medium cursor-default"
                          variant="outline"
                          disabled
                        >
                          <Sparkles className="mr-3 h-4 w-4" />
                          Plano de Vida Ativo
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Cliente já possui Plano de Vida ativo</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <Button className="w-full justify-start h-11 bg-accent-primary hover:bg-accent-hover text-white font-semibold tracking-tight">
                    <Sparkles className="mr-3 h-4 w-4" />
                    Ativar Módulo Plano de Vida
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
