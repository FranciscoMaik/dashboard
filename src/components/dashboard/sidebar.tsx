"use client";

import {
  ArrowRightLeft,
  BrainCircuit,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Layers,
  LayoutDashboard,
  LineChart,
  LogOut,
  Megaphone,
  MessageSquare,
  PieChart,
  SearchCode,
  ShieldAlert,
  Target,
  TrendingUp,
  User,
  Users,
  Wallet,
  History,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ElementType } from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getClientData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type NavItem = {
  title: string;
  href?: string;
  icon: ElementType;
  submenu?: {
    title: string;
    href: string;
    icon?: ElementType;
  }[];
};

const advisorItems: NavItem[] = [
  {
    title: "Visão Geral", // Overview
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Feedbacks",
    href: "/dashboard/feedbacks",
    icon: MessageSquare,
  },
  {
    title: "Clientes", // Clients
    href: "/dashboard/clients",
    icon: Users,
  },
  {
    title: "Campanhas",
    href: "/dashboard/campaigns",
    icon: Megaphone,
  },
  {
    title: "Auditoria",
    href: "/dashboard/audit",
    icon: ShieldAlert,
  },
  {
    title: "Logs", // Logs
    href: "/dashboard/logs",
    icon: History,
  },
];

const getClientItems = (clientId: string): NavItem[] => {
  const client = getClientData(clientId);
  const items: NavItem[] = [
    {
      title: "Dados Pessoais", // Personal Data
      href: `/dashboard/clients/${clientId}`,
      icon: Users,
    },
    {
      title: "Objetivos", // Objectives
      href: `/dashboard/clients/${clientId}/objectives`,
      icon: Target,
    },
  ];

  if (client.hasOpenFinance) {
    items.push({
      title: "Análise Financeira", // Financial Analysis Group
      icon: TrendingUp,
      submenu: [
        {
          title: "Visão Geral",
          href: `/dashboard/clients/${clientId}/analysis`,
          icon: LineChart,
        },
        {
          title: "Transações", // Transactions
          href: `/dashboard/clients/${clientId}/transactions`,
          icon: ArrowRightLeft,
        },
        {
          title: "Análise de Categorias", // Category Analysis
          href: `/dashboard/clients/${clientId}/category-analysis`,
          icon: PieChart,
        },
      ],
    });
    // Base Categories
    items.push({
      title: "Categorias", // Categories
      href: `/dashboard/clients/${clientId}/categories`,
      icon: Layers,
    });
  }

  if (client.hasB3) {
    items.push({
      title: "Investimentos", // Investments
      href: `/dashboard/clients/${clientId}/investments`,
      icon: Wallet,
    });
  }

  return items;
};

const getAuditItems = (auditId: string): NavItem[] => {
  return [
    {
      title: "Visualização de PL",
      href: `/dashboard/audit/${auditId}/balance`,
      icon: PieChart,
    },
    {
      title: "Análise Financeira",
      href: `/dashboard/audit/${auditId}/analysis`,
      icon: LineChart,
    },
    {
      title: "Análise de IA",
      href: `/dashboard/audit/${auditId}/ai`,
      icon: BrainCircuit,
    },
    {
      title: "Consulta de Listagens",
      href: `/dashboard/audit/${auditId}/listings`,
      icon: SearchCode,
    },
  ];
};

function NavGroup({
  item,
  pathname,
  isSidebarCollapsed,
  setSidebarExpanded,
}: {
  item: NavItem;
  pathname: string;
  isSidebarCollapsed: boolean;
  setSidebarExpanded: () => void;
}) {
  const isAnyChildActive = item.submenu?.some((sub) => pathname === sub.href);
  const [isOpen, setIsOpen] = useState(isAnyChildActive);

  // keep open if child is active
  useEffect(() => {
    if (isAnyChildActive) setIsOpen(true);
  }, [isAnyChildActive]);

  const Icon = item.icon;

  if (isSidebarCollapsed) {
    return (
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-center px-2 rounded-button h-10 transition-colors shadow-none mt-1",
          isAnyChildActive
            ? "bg-accent-subtle text-accent-primary"
            : "text-text-secondary hover:bg-surface-hover hover:text-text-primary",
        )}
        title={item.title}
        onClick={() => {
          setSidebarExpanded();
          setIsOpen(true);
        }}
      >
        <Icon
          className={cn(
            "h-[18px] w-[18px] shrink-0",
            isAnyChildActive ? "text-accent-primary" : "text-text-muted",
          )}
        />
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-1 mt-1">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-between items-center rounded-button h-10 transition-colors shadow-none",
          isAnyChildActive
            ? "text-accent-primary"
            : "text-text-secondary hover:bg-surface-hover hover:text-text-primary",
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <Icon
            className={cn(
              "h-[18px] w-[18px] shrink-0",
              isAnyChildActive ? "text-accent-primary" : "text-text-muted",
            )}
          />
          <span className="tracking-wide font-semibold">{item.title}</span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200 text-text-muted",
            isOpen && "rotate-180",
          )}
        />
      </Button>

      {isOpen && (
        <div className="flex flex-col gap-1 pl-9 mt-1">
          {item.submenu?.map((sub) => {
            const SubIcon = sub.icon;
            const isActive = pathname === sub.href;
            return (
              <Link key={sub.href} href={sub.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 rounded-button h-9 transition-colors shadow-none text-xs",
                    isActive
                      ? "bg-accent-subtle text-accent-primary font-semibold"
                      : "text-text-secondary hover:bg-surface-hover hover:text-text-primary",
                  )}
                >
                  {SubIcon && (
                    <SubIcon
                      className={cn(
                        "h-4 w-4 shrink-0",
                        isActive ? "text-accent-primary" : "text-text-muted",
                      )}
                    />
                  )}
                  <span className="tracking-wide">{sub.title}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Check if we are in a client context
  const clientMatch = pathname.match(/^\/dashboard\/clients\/([^/]+)/);
  const isClientContext = !!clientMatch && pathname !== "/dashboard/clients";
  const clientId = clientMatch ? clientMatch[1] : null;

  const client = clientId ? getClientData(clientId) : null;

  // Check if we are in an audit user context
  const auditMatch = pathname.match(/^\/dashboard\/audit\/([^/]+)/);
  const isAuditContext = !!auditMatch && pathname !== "/dashboard/audit";
  const auditId = auditMatch ? auditMatch[1] : null;

  const items =
    isClientContext && clientId
      ? getClientItems(clientId)
      : isAuditContext && auditId
        ? getAuditItems(auditId)
        : advisorItems;

  return (
    <div
      className={cn(
        "flex h-full flex-col border-r border-border-default bg-surface-card transition-all duration-300 z-50",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div
        className={cn(
          "flex h-16 shrink-0 items-center border-b border-border-default px-4",
          isCollapsed ? "justify-center" : "justify-between",
        )}
      >
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold overflow-hidden"
        >
          <div className="w-8 h-8 rounded-md bg-accent-primary flex shrink-0 items-center justify-center shadow-sm">
            <span className="text-white font-bold tracking-tighter text-lg">
              M
            </span>
          </div>
          {!isCollapsed && (
            <span className="whitespace-nowrap font-semibold text-text-primary tracking-tight text-lg">
              Mundo Invest
            </span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 text-text-muted hover:text-text-primary rounded-button",
            isCollapsed && "hidden",
          )}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      {/* Toggle button when collapsed */}
      {isCollapsed && (
        <div className="flex justify-center py-2 border-b border-border-default">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-text-muted hover:text-text-primary rounded-button"
            onClick={() => setIsCollapsed(false)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="flex-1 overflow-auto py-4 custom-scrollbar">
        {/* Client Context Header */}
        {isClientContext && !isCollapsed && client && (
          <div className="px-4 mb-4 space-y-4">
            <Link href="/dashboard/clients">
              <Button className="w-full gap-2 rounded-button bg-surface-page border border-border-default text-text-secondary hover:text-text-primary hover:bg-surface-hover shadow-none transition-colors h-9">
                <ChevronLeft className="h-3 w-3" />
                Voltar para Clientes
              </Button>
            </Link>

            <div className="flex items-center gap-3 bg-surface-page px-3 py-2.5 rounded-card border border-border-subtle">
              <div className="flex shrink-0 h-8 w-8 items-center justify-center rounded-full bg-accent-subtle">
                <User className="h-4 w-4 text-accent-primary" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-[10px] uppercase tracking-wide text-text-muted font-semibold">
                  Cliente Atual
                </span>
                <span className="text-sm font-bold text-text-primary truncate tracking-tight">
                  {client.name}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Audit Context Header */}
        {isAuditContext && !isCollapsed && auditId && (
          <div className="px-4 mb-4 space-y-4">
            <Link href="/dashboard/audit">
              <Button className="w-full gap-2 rounded-button bg-surface-page border border-border-default text-text-secondary hover:text-text-primary hover:bg-surface-hover shadow-none transition-colors h-9">
                <ChevronLeft className="h-3 w-3" />
                Voltar para Auditoria
              </Button>
            </Link>

            <div className="flex items-center gap-3 bg-surface-page px-3 py-2.5 rounded-card border border-border-subtle">
              <div className="flex shrink-0 h-8 w-8 items-center justify-center rounded-full bg-accent-subtle">
                <ShieldAlert className="h-4 w-4 text-accent-primary" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-[10px] uppercase tracking-wide text-text-muted font-semibold">
                  Usuário Auditado
                </span>
                <span className="text-sm font-bold text-text-primary truncate tracking-tight">
                  ID: {auditId}
                </span>
              </div>
            </div>
          </div>
        )}

        <nav className="grid items-start px-3 text-sm font-medium gap-1">
          {items.map((item) => {
            if (item.submenu) {
              return (
                <NavGroup
                  key={item.title}
                  item={item}
                  pathname={pathname}
                  isSidebarCollapsed={isCollapsed}
                  setSidebarExpanded={() => setIsCollapsed(false)}
                />
              );
            }

            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href || item.title} href={item.href || "#"}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 rounded-button h-10 transition-colors shadow-none mt-1",
                    isActive
                      ? "bg-accent-subtle text-accent-primary hover:bg-accent-subtle/80 hover:text-accent-primary"
                      : "text-text-secondary hover:bg-surface-hover hover:text-text-primary",
                    isCollapsed && "justify-center px-2",
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <Icon
                    className={cn(
                      "h-[18px] w-[18px] shrink-0",
                      isActive ? "text-accent-primary" : "text-text-muted",
                    )}
                  />
                  {!isCollapsed && (
                    <span className="tracking-wide">{item.title}</span>
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto border-t border-border-default p-3">
        <Link href="/">
          <Button
            variant="ghost"
            className={cn(
              "w-full gap-3 rounded-button h-10 shadow-none text-text-secondary hover:text-text-primary hover:bg-surface-hover",
              isCollapsed ? "justify-center px-2" : "justify-start",
            )}
          >
            <LogOut className="h-[18px] w-[18px] text-text-muted shrink-0" />
            {!isCollapsed && <span className="tracking-wide">Sair</span>}
          </Button>
        </Link>
      </div>
    </div>
  );
}
