"use client";

import {
  ChevronLeft,
  Layers,
  LayoutDashboard,
  LogOut,
  Moon,
  Sun,
  Target,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { getClientData } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const advisorItems = [
  {
    title: "Visão Geral",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Clientes",
    href: "/dashboard/clients",
    icon: Users,
  },
];

const getClientItems = (clientId: string) => {
  try {
    const client = getClientData(clientId);
    if (!client) return [];

    const items = [
      {
        title: "Dados Pessoais",
        href: `/dashboard/clients/${clientId}`,
        icon: Users,
      },
      {
        title: "Objetivos",
        href: `/dashboard/clients/${clientId}/objectives`,
        icon: Target,
      },
    ];

    if (client.hasOpenFinance) {
      items.push(
        {
          title: "Análise Financeira",
          href: `/dashboard/clients/${clientId}/analysis`,
          icon: TrendingUp,
        },
        {
          title: "Categorias",
          href: `/dashboard/clients/${clientId}/categories`,
          icon: Layers,
        },
      );
    }

    if (client.hasB3) {
      items.push({
        title: "Investimentos",
        href: `/dashboard/clients/${clientId}/investments`,
        icon: Wallet,
      });
    }

    return items;
  } catch (error) {
    return [];
  }
};

export function Header() {
  const { setTheme, theme } = useTheme();
  const pathname = usePathname();

  // Check if we are in a client context
  const clientMatch = pathname.match(/^\/dashboard\/clients\/([^/]+)/);
  const isClientContext = !!clientMatch && pathname !== "/dashboard/clients";
  const clientId = clientMatch ? clientMatch[1] : null;

  const items =
    isClientContext && clientId ? getClientItems(clientId) : advisorItems;

  return (
    <header className="flex h-16 items-center justify-between border-b border-border-default bg-surface-page/80 backdrop-blur-md px-8 sticky top-0 z-50">
      <div className="flex items-center gap-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-accent-primary flex items-center justify-center shadow-sm">
            <span className="text-white font-bold tracking-tighter text-lg">
              M
            </span>
          </div>
          <span className="font-semibold text-text-primary tracking-tight text-lg hidden md:block">
            Mundo Invest
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {isClientContext && (
            <>
              <Link href="/dashboard/clients">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-text-secondary hover:text-text-primary h-8 px-2"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Voltar
                </Button>
              </Link>
              <div className="w-px h-4 bg-border-default mx-2"></div>
            </>
          )}

          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className={cn(
                    "h-8 gap-2",
                    isActive
                      ? "bg-accent-subtle text-accent-primary shadow-none"
                      : "text-text-secondary hover:text-text-primary hover:bg-surface-hover shadow-none bg-transparent",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="text-text-secondary hover:text-text-primary hover:bg-surface-hover"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="text-text-secondary hover:text-text-primary hover:bg-surface-hover gap-2 shadow-none"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
