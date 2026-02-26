"use client";

import {
  ChevronLeft,
  ChevronRight,
  Layers,
  LayoutDashboard,
  LogOut,
  PieChart,
  Target,
  TrendingUp,
  User,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getClientData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const advisorItems = [
  {
    title: "Visão Geral", // Overview
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Clientes", // Clients
    href: "/dashboard/clients",
    icon: Users,
  },
];

const getClientItems = (clientId: string) => {
  const client = getClientData(clientId);
  const items = [
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
    items.push(
      {
        title: "Análise Financeira", // Financial Analysis
        href: `/dashboard/clients/${clientId}/analysis`,
        icon: TrendingUp,
      },
      {
        title: "Categorias", // Categories
        href: `/dashboard/clients/${clientId}/categories`,
        icon: Layers,
      },
    );
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

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Check if we are in a client context
  const clientMatch = pathname.match(/^\/dashboard\/clients\/([^/]+)/);
  const isClientContext = !!clientMatch;
  const clientId = clientMatch ? clientMatch[1] : null;

  const client = clientId ? getClientData(clientId) : null;

  const items =
    isClientContext && clientId ? getClientItems(clientId) : advisorItems;

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
        <nav className="grid items-start px-3 text-sm font-medium gap-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 rounded-button h-10 transition-colors shadow-none",
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
