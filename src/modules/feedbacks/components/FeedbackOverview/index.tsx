"use client";

import { KPIs } from "../KPIs";
import { SentimentChart } from "../SentimentChart";

interface FeedbackOverviewProps {
  satisfactionScore?: number;
  pendingCount?: number;
  totalFeedbacks?: number;
}

export function FeedbackOverview({
  satisfactionScore,
  pendingCount,
  totalFeedbacks,
}: FeedbackOverviewProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <SentimentChart totalFeedbacks={totalFeedbacks} />
      <KPIs satisfactionScore={satisfactionScore} pendingCount={pendingCount} />
    </div>
  );
}
