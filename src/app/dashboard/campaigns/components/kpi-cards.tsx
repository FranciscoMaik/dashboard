import {
  MousePointerClick,
  TrendingDown,
  TrendingUp,
  UserMinus,
} from "lucide-react";

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1: Total Clicks */}
      <div className="relative p-6 bg-surface-card border border-border-default rounded-card shadow-card flex flex-col justify-between hover:shadow-hover transition-shadow overflow-hidden">
        <div className="flex items-center justify-between mb-4 relative z-10">
          <span className="text-sm font-medium text-text-secondary">
            Total de Cliques
          </span>
          <MousePointerClick
            className="w-5 h-5 text-text-muted"
            strokeWidth={1.5}
          />
        </div>
        <div className="flex items-baseline gap-3 relative z-10">
          <span className="text-3xl font-bold tracking-tight text-text-primary">
            45.2K
          </span>
          <span className="flex items-center text-sm font-medium text-status-success bg-status-success/10 px-2 py-0.5 rounded-full">
            <TrendingUp className="w-3 h-3 mr-1" />
            12%
          </span>
        </div>
      </div>

      {/* Card 2: Unique Clicks */}
      <div className="relative p-6 bg-surface-card border border-border-default rounded-card shadow-card flex flex-col justify-between hover:shadow-hover transition-shadow overflow-hidden">
        <div className="flex items-center justify-between mb-4 relative z-10">
          <span className="text-sm font-medium text-text-secondary">
            Cliques Únicos
          </span>
          <UserMinus className="w-5 h-5 text-text-muted" strokeWidth={1.5} />
        </div>
        <div className="flex items-baseline gap-3 relative z-10">
          <span className="text-3xl font-bold tracking-tight text-text-primary">
            32.8K
          </span>
          <span className="flex items-center text-sm font-medium text-status-success bg-status-success/10 px-2 py-0.5 rounded-full">
            <TrendingUp className="w-3 h-3 mr-1" />
            8%
          </span>
        </div>
      </div>

      {/* Card 3: Conversion Rate */}
      <div className="relative p-6 bg-surface-card border border-border-default rounded-card shadow-card flex flex-col justify-between hover:shadow-hover transition-shadow overflow-hidden">
        <div className="flex items-center justify-between mb-4 relative z-10">
          <span className="text-sm font-medium text-text-secondary">
            Taxa de Conversão
          </span>
          <TrendingUp className="w-5 h-5 text-text-muted" strokeWidth={1.5} />
        </div>
        <div className="flex items-baseline gap-3 relative z-10">
          <span className="text-3xl font-bold tracking-tight text-text-primary">
            4.2%
          </span>
          <span className="flex items-center text-sm font-medium text-status-error bg-status-error/10 px-2 py-0.5 rounded-full">
            <TrendingDown className="w-3 h-3 mr-1" />
            1.5%
          </span>
        </div>
      </div>
    </div>
  );
}
