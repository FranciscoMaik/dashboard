"use client";

import {
  EngagedCustomers,
  HeaderLogs,
  KPIs,
  NumberClicks,
  RushHour,
  TopFivePages,
} from "@/modules/logs/components";

export default function LogsPage() {
  return (
    <div className="space-y-6 max-w-screen-2xl mx-auto pb-12">
      <HeaderLogs />

      <KPIs />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <NumberClicks />

        <TopFivePages />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 relative">
        <EngagedCustomers />

        <RushHour />
      </div>
    </div>
  );
}
