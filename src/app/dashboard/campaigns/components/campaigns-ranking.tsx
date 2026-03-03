"use client";

import { Trophy } from "lucide-react";

// Mock data based on UTM requirements
const mockRanking = [
  {
    id: 1,
    campaign: "black_friday_2023",
    source: "google",
    medium: "cpc",
    clicks: 12450,
  },
  {
    id: 2,
    campaign: "q4_retargeting",
    source: "instagram",
    medium: "stories",
    clicks: 8320,
  },
  {
    id: 3,
    campaign: "newsletter_oct",
    source: "rd_station",
    medium: "email",
    clicks: 5120,
  },
  {
    id: 4,
    campaign: "influencer_br",
    source: "tiktok",
    medium: "video",
    clicks: 3900,
  },
  {
    id: 5,
    campaign: "brand_awareness",
    source: "youtube",
    medium: "display",
    clicks: 2100,
  },
  {
    id: 6,
    campaign: "organic_social",
    source: "linkedin",
    medium: "post",
    clicks: 1250,
  },
];

export function CampaignsRanking() {
  const maxClicks = Math.max(...mockRanking.map((item) => item.clicks));

  return (
    <div className="bg-surface-card border border-border-default rounded-card shadow-card p-6 flex flex-col h-[420px]">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <h2 className="text-lg font-semibold tracking-tight text-text-primary flex items-center gap-2">
          <Trophy className="w-5 h-5 text-accent-primary" />
          Top Campanhas
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 flex flex-col gap-5">
        {mockRanking.map((item, index) => {
          const percentage = (item.clicks / maxClicks) * 100;
          return (
            <div key={item.id} className="flex flex-col gap-2.5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 overflow-hidden">
                  <div className="flex shrink-0 w-6 h-6 items-center justify-center bg-surface-page border border-border-default rounded-full text-xs font-bold text-text-secondary mt-0.5">
                    {index + 1}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="font-semibold text-text-primary text-sm truncate tracking-tight cursor-default">
                      {item.campaign}
                    </span>
                    <div className="flex items-center gap-1.5 mt-1 opacity-80">
                      <span className="text-[10px] font-medium text-text-secondary bg-surface-hover border border-border-subtle px-1.5 py-0.5 rounded uppercase tracking-wider">
                        {item.source}
                      </span>
                      <span className="text-text-muted text-[10px]">
                        &bull;
                      </span>
                      <span className="text-[10px] font-medium text-text-secondary bg-surface-hover border border-border-subtle px-1.5 py-0.5 rounded uppercase tracking-wider">
                        {item.medium}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <span className="font-bold text-text-primary text-sm">
                    {item.clicks.toLocaleString("pt-BR")}
                  </span>
                  <span className="text-[9px] text-text-muted uppercase tracking-wider font-semibold">
                    Cliques Únicos
                  </span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-surface-page border border-border-subtle rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent-primary rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
