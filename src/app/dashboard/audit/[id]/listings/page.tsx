"use client";

import { AuditListingsHeader } from "@/components/audit/audit-listings-header";
import { AuditListingsTimeline } from "@/components/audit/audit-listings-timeline";

export default function AuditListingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto pb-10">
      <AuditListingsHeader totalSearches={275} />
      <AuditListingsTimeline />
    </div>
  );
}
