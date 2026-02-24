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

export function MostAccessedScreens() {
  const maxViews = MOCK_SCREENS[0].views;

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
          {MOCK_SCREENS.map((screen, index) => {
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
          })}
        </div>
      </CardContent>
    </Card>
  );
}
