"use client";

import { HeaderRanking, TableRanking } from "@/modules/logs-ranking/components";

export default function LogsRankingPage() {
  return (
    <div className="flex-1 w-full bg-surface-page min-h-screen">
      <div className="mx-auto w-full max-w-screen-2xl p-6 lg:p-8 space-y-8">
        <HeaderRanking />
        <TableRanking />
      </div>
    </div>
  );
}
