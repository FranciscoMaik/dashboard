import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { topPages } from "./mock";

export default function TopFivePages() {
  return (
    <Card className="p-6 bg-surface-card shadow-card border-none rounded-card flex flex-col">
      <h3 className="text-lg font-bold text-text-primary tracking-tight mb-6">
        Top 5 Páginas
      </h3>
      <div className="flex flex-col gap-5 flex-1 justify-center">
        {topPages.map((page) => (
          <div key={page.path} className="flex flex-col gap-2">
            <div className="flex justify-between items-end text-sm font-semibold text-text-primary">
              <span>{page.path}</span>
              <span className="text-accent-primary">{page.visits}</span>
            </div>
            <div className="w-full h-1.5 bg-surface-page rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-primary"
                style={{ width: `${page.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <Button
        asChild
        variant="outline"
        className="w-full mt-8 rounded-button bg-blue-50 border-none text-accent-primary hover:bg-blue-100 hover:text-accent-hover font-bold tracking-wide"
      >
        <Link href="/dashboard/logs/ranking">VER RANKING COMPLETO</Link>
      </Button>
    </Card>
  );
}
