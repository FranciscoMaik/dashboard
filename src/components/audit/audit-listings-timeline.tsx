"use client";

// Mock data structured matching the image columns: Data/Hora, Tipo Busca, Valor Buscado, Resultados, IP
const mockListingsData = [
  {
    date: "03 de Mar de 2026",
    logs: [
      {
        id: "l1",
        time: "14:15:37",
        searchType: "Busca por E-mail + Período",
        searchedValue: "heltonzanatta@gmail.com | Pe...",
        resultsCount: 1,
        ip: "172.16.238.7",
      },
      {
        id: "l2",
        time: "14:15:02",
        searchType: "Período Personalizado",
        searchedValue: "2025-12-03 até 2026-03-03",
        resultsCount: 3252,
        ip: "172.16.238.7",
      },
      {
        id: "l3",
        time: "08:20:38",
        searchType: "Busca por E-mail + Período",
        searchedValue: "heltonzanatta@gmail.com | Pe...",
        resultsCount: 1,
        ip: "172.16.238.7",
      },
      {
        id: "l4",
        time: "08:20:13",
        searchType: "Busca por Nome + Período",
        searchedValue: "helton zanatta | Período: 2025...",
        resultsCount: 0,
        ip: "172.16.238.7",
      },
      {
        id: "l5",
        time: "08:20:01",
        searchType: "Período Personalizado",
        searchedValue: "2025-12-03 até 2026-03-03",
        resultsCount: 3236,
        ip: "172.16.238.7",
      },
    ],
  },
  {
    date: "02 de Mar de 2026",
    logs: [
      {
        id: "l6",
        time: "17:42:14",
        searchType: "Busca por E-mail + Período",
        searchedValue: "heltonzanatta@gmail.com | Pe...",
        resultsCount: 0,
        ip: "172.20.0.18",
      },
      {
        id: "l7",
        time: "17:41:58",
        searchType: "Período Personalizado",
        searchedValue: "2025-12-02 até 2026-03-02",
        resultsCount: 3217,
        ip: "172.20.0.18",
      },
      {
        id: "l8",
        time: "17:41:02",
        searchType: "Busca por Nome + Período",
        searchedValue: "helton | Período: 2025-12-02 a...",
        resultsCount: 61,
        ip: "172.20.0.18",
      },
      {
        id: "l9",
        time: "17:40:53",
        searchType: "Busca por Nome + Período",
        searchedValue: "heltonzanatta@gmail.com | Pe...",
        resultsCount: 0,
        ip: "172.20.0.18",
      },
      {
        id: "l10",
        time: "17:40:45",
        searchType: "Busca por E-mail + Período",
        searchedValue: "heltonzanatta@gmail.com | Pe...",
        resultsCount: 0,
        ip: "172.20.0.18",
      },
    ],
  },
];

export function AuditListingsTimeline() {
  return (
    <div className="flex flex-col gap-8">
      {mockListingsData.map((dayGroup) => (
        <div key={dayGroup.date} className="flex flex-col gap-4">
          <div className="flex items-center gap-2 px-2">
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
              {dayGroup.date}
            </h3>
            <div className="h-px flex-1 bg-border-default ml-2" />
          </div>

          <div className="bg-surface-card border border-border-default rounded-card shadow-card overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-border-subtle bg-surface-page/30 text-[10px] font-semibold tracking-wider uppercase text-text-muted">
              <div className="col-span-2">Data/Hora</div>
              <div className="col-span-3">Tipo de Busca</div>
              <div className="col-span-4">Valor Buscado</div>
              <div className="col-span-2 text-center">Resultados</div>
              <div className="col-span-1 text-right">IP</div>
            </div>

            <div className="flex flex-col divide-y divide-border-subtle custom-scrollbar overflow-x-auto min-w-[800px] xl:min-w-0">
              {dayGroup.logs.map((log) => (
                <div
                  key={log.id}
                  className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-surface-hover/50 transition-colors bg-white group min-w-[800px] xl:min-w-0"
                >
                  <div className="col-span-2 flex flex-col text-[13px] border-r border-border-subtle pr-4">
                    <span className="font-semibold text-text-primary">
                      {dayGroup.date.split(" ")[0]}/
                      {dayGroup.date.split(" ")[2]}/
                      {dayGroup.date.split(" ")[4]}
                    </span>
                    <span className="text-text-muted text-xs">{log.time}</span>
                  </div>

                  <div className="col-span-3 border-r border-border-subtle pr-4">
                    <span className="inline-flex items-center px-2 py-1 rounded bg-surface-page text-text-secondary border border-border-default text-[11px] font-semibold tracking-wide">
                      {log.searchType}
                    </span>
                  </div>

                  <div className="col-span-4 flex items-center border-r border-border-subtle pr-4">
                    <span className="text-[13px] font-semibold text-text-primary truncate">
                      {log.searchedValue}
                    </span>
                  </div>

                  <div className="col-span-2 flex justify-center border-r border-border-subtle px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border transition-colors ${
                        log.resultsCount > 0
                          ? "bg-accent-subtle text-accent-primary border-accent-primary/20"
                          : "bg-surface-page text-text-muted border-border-default"
                      }`}
                    >
                      {log.resultsCount} resultado(s)
                    </span>
                  </div>

                  <div className="col-span-1 text-right flex items-center justify-end text-[11px] text-text-muted font-mono tracking-tight">
                    {log.ip}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
