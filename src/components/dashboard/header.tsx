"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border-default bg-surface-page/80 backdrop-blur-md px-8 sticky top-0 z-50">
      <div className="flex items-center gap-6">
        {/* Minimalist context indicator or breadcrumbs could go here in the future if needed, for now we keep it clean */}
      </div>

      <div className="flex items-center gap-4">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className="text-text-secondary hover:text-text-primary hover:bg-surface-hover gap-2 shadow-none rounded-button h-9"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
