"use client";

import { AuditBalanceHeader } from "@/components/audit/audit-balance-header";
import { AuditBalanceTimeline } from "@/components/audit/audit-balance-timeline";

export default function AuditBalancePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto pb-10">
      <AuditBalanceHeader auditedCount={18} />
      <AuditBalanceTimeline />
    </div>
  );
}
