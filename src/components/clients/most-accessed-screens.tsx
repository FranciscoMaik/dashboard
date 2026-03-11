import {
  BarChart3,
  Eye,
  type LucideIcon,
  PieChart,
  Receipt,
  Settings,
  Target,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ScreenAccess {
  name: string;
  views: number;
  icon: LucideIcon;
}

const MOCK_SCREENS: ScreenAccess[] = [
  { name: "Análise Financeira", views: 142, icon: BarChart3 },
  { name: "Investimentos", views: 98, icon: PieChart },
  { name: "Transações", views: 76, icon: Receipt },
  { name: "Objetivos", views: 53, icon: Target },
  { name: "Categorias", views: 41, icon: Settings },
];

export function MostAccessedScreens({
  clientName = "Cliente",
  screens = MOCK_SCREENS,
}: {
  clientName?: string;
  screens?: ScreenAccess[];
}) {
  const hasScreens = screens.length > 0;
  const maxViews = hasScreens ? screens[0].views : 0;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-5">
          <div className="flex h-8 w-8 items-center justify-center rounded-card bg-accent-subtle">
            <Eye className="h-4 w-4 text-accent-primary" />
          </div>
          <h3 className="text-sm font-semibold text-text-primary tracking-tight">
            Telas Mais Acessadas
          </h3>
        </div>

        <div className="space-y-4">
          {!hasScreens ? (
            <div className="flex flex-col items-center justify-center text-center py-6 border border-dashed border-border-default rounded-card bg-surface-page/50">
              <div className="h-10 w-10 bg-surface-hover rounded-full flex items-center justify-center mb-3">
                <Eye className="h-5 w-5 text-text-muted" />
              </div>
              <p className="text-sm font-medium text-text-primary px-4">
                Nenhum histórico de navegação
              </p>
              <p className="text-[13px] text-text-muted mt-1 px-4 text-balance">
                O cliente{" "}
                <strong className="text-text-secondary">{clientName}</strong>{" "}
                ainda não possui acessos registrados nas telas do sistema.
              </p>
            </div>
          ) : (
            screens.map((screen, index) => {
              const Icon = screen.icon;
              const percentage = (screen.views / maxViews) * 100;

              return (
                <div key={screen.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold text-text-muted bg-surface-page border border-border-subtle">
                        {index + 1}
                      </span>
                      <Icon className="h-3.5 w-3.5 text-text-muted" />
                      <span className="text-sm text-text-primary font-medium">
                        {screen.name}
                      </span>
                    </div>
                    <span className="text-xs tabular-nums text-text-muted">
                      {screen.views}
                    </span>
                  </div>
                  <div className="h-1 w-full rounded-full bg-surface-page">
                    <div
                      className="h-1 rounded-full bg-accent-primary transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        opacity: 1 - index * 0.15,
                      }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
