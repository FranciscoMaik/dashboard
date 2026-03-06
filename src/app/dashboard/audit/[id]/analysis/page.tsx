"use client";

import { AuditAnalysisHeader } from "@/components/audit/audit-analysis-header";
import { AuditAnalysisTimeline } from "@/components/audit/audit-analysis-timeline";

export default function AuditAnalysisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto pb-10">
      <AuditAnalysisHeader auditedCount={42} />
      <AuditAnalysisTimeline />
    </div>
  );
}
