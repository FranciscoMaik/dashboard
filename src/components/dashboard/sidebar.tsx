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

  const items =
    isClientContext && clientId ? getClientItems(clientId) : advisorItems;

  return (
    <div
      className={cn(
        "flex h-full flex-col border-r bg-background transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div
        className={cn(
          "flex h-14 items-center border-b px-4",
          isCollapsed ? "justify-center" : "justify-between",
        )}
      >
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold overflow-hidden"
        >
          <PieChart className="h-6 w-6 shrink-0" />
          {!isCollapsed && <span className="whitespace-nowrap">Advisory</span>}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8", isCollapsed && "hidden")}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      {/* Toggle button when collapsed */}
      {isCollapsed && (
        <div className="flex justify-center py-2 border-b">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsCollapsed(false)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="flex-1 overflow-auto py-4">
        {isClientContext && !isCollapsed && (
          <div className="px-4 mb-2">
            <Link href="/dashboard/clients">
              <Button variant="outline" size="sm" className="w-full gap-2">
                <ChevronLeft className="h-3 w-3" />
                Voltar para Clientes
              </Button>
            </Link>
          </div>
        )}
        <nav className="grid items-start px-2 text-sm font-medium gap-1">
          {items.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={index} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-2",
                    isActive && "bg-secondary",
                    isCollapsed && "justify-center px-2",
                  )}
                  title={isCollapsed ? item.title : undefined}
                >
                  <Icon className="h-4 w-4" />
                  {!isCollapsed && <span>{item.title}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto border-t p-2">
        <Link href="/">
          <Button
            variant="outline"
            className={cn(
              "w-full gap-2",
              isCollapsed ? "justify-center px-2" : "justify-start",
            )}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && "Sair"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
