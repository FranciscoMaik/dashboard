import { Clock, ThumbsUp } from "lucide-react";
import { Card } from "@/components/ui/card";

export function FeedbackOverview() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sentiment Distribution - Central Stage emphasis */}
      <Card className="bg-surface-card rounded-card shadow-card border-none p-6 lg:col-span-2 flex flex-col h-[320px] relative overflow-hidden group">
        <div className="flex justify-between items-start mb-6 z-10">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-text-primary text-lg tracking-tight">
              Distribuição de Sentimento
            </h3>
            <p className="text-sm text-text-secondary">
              Total de 142 feedbacks este mês
            </p>
          </div>
          <div className="bg-status-success/10 text-status-success px-3 py-1 rounded-full text-xs font-semibold tracking-wide flex items-center shadow-sm">
            +12% vs mês anterior
          </div>
        </div>

        {/* Custom SVG Narrative Diagram - "Cartography of Sentiment" */}
        <div className="flex-1 w-full relative -mt-4">
          <svg
            className="w-full h-full"
            viewBox="0 0 600 200"
            preserveAspectRatio="none"
            role="img"
            aria-label="Gráfico de Barras de Distribuição de Sentimento"
          >
            <title>Distribuição de Sentimento</title>

            {/* Subtle Guidelines */}
            <path
              d="M 0 50 L 600 50 M 0 100 L 600 100 M 0 150 L 600 150"
              stroke="currentColor"
              className="text-border-subtle"
              strokeWidth="1"
              strokeDasharray="4 4"
              fill="none"
            />

            {/* Base line */}
            <path
              d="M 0 200 L 600 200"
              stroke="currentColor"
              className="text-border-subtle"
              strokeWidth="1"
              fill="none"
            />

            {/* Bar: Bons */}
            <g className="group/bar transition-all duration-300 cursor-default">
              <rect x="80" y="0" width="100" height="200" fill="transparent" />
              <rect
                x="110"
                y="40"
                width="40"
                height="160"
                fill="#1d63dd"
                rx="4"
                className="transition-all duration-500 group-hover/bar:fill-accent-hover"
              />
              <text
                x="130"
                y="25"
                fill="#18181B"
                fontSize="15"
                fontWeight="bold"
                textAnchor="middle"
                className="opacity-0 group-hover/bar:opacity-100 transition-opacity duration-300"
              >
                112
              </text>
            </g>

            {/* Bar: Médios */}
            <g className="group/bar transition-all duration-300 cursor-default">
              <rect x="250" y="0" width="100" height="200" fill="transparent" />
              <rect
                x="280"
                y="140"
                width="40"
                height="60"
                fill="#1d63dd"
                fillOpacity="0.5"
                rx="4"
                className="transition-all duration-500 group-hover/bar:fillOpacity-100 group-hover/bar:fill-accent-hover"
              />
              <text
                x="300"
                y="125"
                fill="#18181B"
                fontSize="15"
                fontWeight="bold"
                textAnchor="middle"
                className="opacity-0 group-hover/bar:opacity-100 transition-opacity duration-300"
              >
                22
              </text>
            </g>

            {/* Bar: Ruins */}
            <g className="group/bar transition-all duration-300 cursor-default">
              <rect x="420" y="0" width="100" height="200" fill="transparent" />
              <rect
                x="450"
                y="175"
                width="40"
                height="25"
                fill="#1d63dd"
                fillOpacity="0.15"
                rx="4"
                className="transition-all duration-500 group-hover/bar:fillOpacity-100 group-hover/bar:fill-accent-hover"
              />
              <text
                x="470"
                y="160"
                fill="#18181B"
                fontSize="15"
                fontWeight="bold"
                textAnchor="middle"
                className="opacity-0 group-hover/bar:opacity-100 transition-opacity duration-300"
              >
                8
              </text>
            </g>
          </svg>
        </div>

        {/* Labels underneath */}
        <div className="flex justify-between w-full mt-2 px-12 md:px-24 text-[13px] font-semibold tracking-wide text-text-secondary z-10">
          <span>Bons</span>
          <span>Médios</span>
          <span>Ruins</span>
        </div>
      </Card>

      <div className="flex flex-col gap-6">
        {/* Overall Satisfaction */}
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
                4.8
              </h2>
              <span className="text-xl font-medium text-text-muted">/5.0</span>
            </div>
          </div>
        </Card>

        {/* Pending Card */}
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
              12
            </h2>
          </div>
        </Card>
      </div>
    </div>
  );
}
