import {
  Calendar,
  Car,
  GraduationCap,
  Home,
  Plane,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type ObjectiveType = "short" | "medium" | "long";

export interface Objective {
  id: string;
  name: string;
  type: ObjectiveType;
  startDate: string;
  endDate: string;
  monthlyContribution: number;
  totalValue: number;
  currentAmount: number;
  iconName: "car" | "home" | "travel" | "education" | "wealth";
}

interface ObjectiveCardProps {
  objective: Objective;
  onClick: (objective: Objective) => void;
  onDelete: (objective: Objective) => void;
}

const iconMap = {
  car: Car,
  home: Home,
  travel: Plane,
  education: GraduationCap,
  wealth: TrendingUp,
};

export function ObjectiveCard({
  objective,
  onClick,
  onDelete,
}: ObjectiveCardProps) {
  const Icon = iconMap[objective.iconName] || TrendingUp;

  const data = [
    { name: "Atual", value: objective.currentAmount },
    {
      name: "Restante",
      value: Math.max(0, objective.totalValue - objective.currentAmount),
    },
  ];

  const activeColor = "#1d63dd"; // Always use Primary Blue for Current amount
  const mutedColor = "#94a3b8"; // Slate-400
  const COLORS = [activeColor, mutedColor];

  const progressPercent = Math.round(
    (objective.currentAmount / objective.totalValue) * 100,
  );

  const getMonthsRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const months =
      (end.getFullYear() - now.getFullYear()) * 12 +
      (end.getMonth() - now.getMonth());
    return Math.max(0, months);
  };

  const monthsRemaining = getMonthsRemaining(objective.endDate);

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-all hover:bg-accent/5 relative group"
      onClick={() => onClick(objective)}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-full">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-lg font-medium">
            {objective.name}
          </CardTitle>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(objective);
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        {/* Progress Chart */}
        <div className="h-[120px] w-full relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={55}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${entry.name}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number | undefined) => [
                  `$${(value || 0).toLocaleString()}`,
                  "Valor",
                ]}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  color: "hsl(var(--foreground))",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-xl font-bold">{progressPercent}%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" /> Início
            </span>
            <span className="font-medium">{objective.startDate}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" /> Fim
            </span>
            <span className="font-medium">{objective.endDate}</span>
            <span className="text-xs text-muted-foreground">
              ({monthsRemaining} meses restantes)
            </span>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t">
          <div className="flex justify-between text-sm items-center">
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: activeColor }}
              />
              <span className="text-muted-foreground">Atual:</span>
            </div>
            <span className="font-semibold">
              ${objective.currentAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Mensal:</span>
            <span className="font-semibold text-green-600 dark:text-green-400">
              ${objective.monthlyContribution.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm items-center">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
              <span className="text-muted-foreground">Meta:</span>
            </div>
            <span className="font-bold text-primary">
              ${objective.totalValue.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
