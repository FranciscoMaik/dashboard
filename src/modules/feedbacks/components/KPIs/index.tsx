import { Clock, ThumbsUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface KPIsProps {
  satisfactionScore?: number;
  pendingCount?: number;
  scoreGrowth?: string;
}

export function KPIs({
  satisfactionScore = 4.8,
  pendingCount = 12,
  scoreGrowth = "+12% vs mês anterior",
}: KPIsProps) {
  return (
    <div className="flex flex-col gap-6">
      <SatisfactionCard score={satisfactionScore} growth={scoreGrowth} />
      <PendingCard count={pendingCount} />
    </div>
  );
}

function SatisfactionCard({
  score,
  growth,
}: {
  score: number;
  growth: string;
}) {
  return (
    <Card className="bg-surface-card rounded-card shadow-card border-none p-6 h-full flex flex-row items-center gap-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-subtle rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-110 transition-transform duration-700 ease-out pointer-events-none" />
      <div className="h-[72px] w-[72px] rounded-[24px] bg-accent-subtle flex items-center justify-center shrink-0 shadow-sm border border-accent-primary/10 relative z-10">
        <ThumbsUp className="h-[30px] w-[30px] text-accent-primary stroke-[1.5px]" />
      </div>
      <div className="flex flex-col gap-1.5 relative z-10">
        <p className="text-sm font-semibold tracking-wide text-text-secondary">
          Satisfação Geral
        </p>
        <div className="flex items-baseline gap-1">
          <h2 className="text-[40px] leading-none font-bold tracking-tight text-text-primary">
            {score}
          </h2>
          <span className="text-xl font-medium text-text-muted">/5.0</span>
        </div>
        <div className="bg-status-success/10 text-status-success px-3 py-1 rounded-full text-xs font-semibold tracking-wide flex items-center shadow-sm w-fit">
          {growth}
        </div>
      </div>
    </Card>
  );
}

function PendingCard({ count }: { count: number }) {
  return (
    <Card className="bg-surface-card rounded-card shadow-card border-none p-6 h-full flex flex-row items-center gap-6 relative overflow-hidden group">
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-status-warning/5 rounded-full -mr-16 -mb-16 opacity-50 group-hover:scale-110 transition-transform duration-700 ease-out pointer-events-none" />
      <div className="h-[72px] w-[72px] rounded-[24px] bg-status-warning/10 flex items-center justify-center shrink-0 shadow-sm border border-status-warning/20 relative z-10">
        <Clock className="h-[30px] w-[30px] text-status-warning stroke-[1.5px]" />
      </div>
      <div className="flex flex-col gap-1.5 relative z-10">
        <p className="text-sm font-semibold tracking-wide text-text-secondary">
          Pendentes
        </p>
        <h2 className="text-[40px] leading-none font-bold tracking-tight text-text-primary">
          {count}
        </h2>
      </div>
    </Card>
  );
}
