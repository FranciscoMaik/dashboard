"use client";

// Mock data based on the provided image
const mockTimelineData = [
  {
    date: "09 de Fev de 2026",
    logs: [
      {
        id: "l1",
        userName: "diogo melo",
        email: "dilrafael@hotmail.com",
        cpf: "04624099451",
        plValue: 1458233.01,
        consultationCount: 1,
        lastConsultation: "09/02/2026 10:16:57",
        ip: "172.20.0.18",
      },
    ],
  },
  {
    date: "28 de Jan de 2026",
    logs: [
      {
        id: "l2",
        userName: "jp utfpr2019",
        email: "jp.utfpr2019@gmail.com",
        cpf: "13010716923",
        plValue: 0.0,
        consultationCount: 1,
        lastConsultation: "28/01/2026 17:46:59",
        ip: "172.20.0.18",
      },
    ],
  },
  {
    date: "24 de Jan de 2026",
    logs: [
      {
        id: "l3",
        userName: "waddas magalhães",
        email: "waddasoliveira@gmail.com",
        cpf: "43655508883",
        plValue: 0.0,
        consultationCount: 1,
        lastConsultation: "24/01/2026 14:38:18",
        ip: "172.20.0.18",
      },
      {
        id: "l4",
        userName: "glaucia pereira christo antonioli",
        email: "glauciapca23@hotmail.com",
        cpf: "---", // MOCK NO CPF
        plValue: 0.0,
        consultationCount: 1,
        lastConsultation: "24/01/2026 14:20:07",
        ip: "172.20.0.18",
      },
      {
        id: "l5",
        userName: "anderson ribeiro santos",
        email: "anderson8fg@gmail.com",
        cpf: "06203466638",
        plValue: 5911.22,
        consultationCount: 1,
        lastConsultation: "24/01/2026 09:56:51",
        ip: "172.20.0.18",
      },
    ],
  },
  {
    date: "22 de Jan de 2026",
    logs: [
      {
        id: "l6",
        userName: "jean carlos sampaio andrade",
        email: "jean.csa@hotmail.com",
        cpf: "---",
        plValue: 10789096.83,
        consultationCount: 1,
        lastConsultation: "22/01/2026 16:21:59",
        ip: "172.20.0.18",
      },
    ],
  },
  {
    date: "21 de Jan de 2026",
    logs: [
      {
        id: "l7",
        userName: "douglas lutz",
        email: "douglas@flutz.com.br",
        cpf: "02018235001",
        plValue: 482311.58,
        consultationCount: 1,
        lastConsultation: "21/01/2026 16:21:35",
        ip: "172.20.0.18",
      },
    ],
  },
];

export function AuditBalanceTimeline() {
  return (
    <div className="flex flex-col gap-8">
      {mockTimelineData.map((dayGroup) => (
        <div key={dayGroup.date} className="flex flex-col gap-4">
          <div className="flex items-center gap-2 px-2">
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
              {dayGroup.date}
            </h3>
            <div className="h-px flex-1 bg-border-default ml-2" />
          </div>

          <div className="bg-surface-card border border-border-default rounded-card shadow-card overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-4 border-b border-border-subtle bg-surface-page/30 text-xs font-semibold tracking-wider uppercase text-text-secondary">
              <div className="col-span-4">Usuário Consultado</div>
              <div className="col-span-2 text-right">Valor PL</div>
              <div className="col-span-2 text-center">Consultas</div>
              <div className="col-span-2">Última Consulta</div>
              <div className="col-span-2">IP(s)</div>
            </div>

            <div className="flex flex-col divide-y divide-border-subtle">
              {dayGroup.logs.map((log) => (
                <div
                  key={log.id}
                  className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-surface-hover/50 transition-colors"
                >
                  <div className="col-span-4 flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-text-primary capitalize tracking-tight">
                      {log.userName}
                    </span>
                    <span className="text-xs text-text-muted">{log.email}</span>
                    <span className="text-xs text-text-muted uppercase tracking-wide">
                      CPF: {log.cpf}
                    </span>
                  </div>

                  <div className="col-span-2 text-right">
                    <span
                      className={`text-sm font-semibold tracking-tight ${log.plValue > 0 ? "text-status-success" : "text-text-muted"}`}
                    >
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(log.plValue)}
                    </span>
                  </div>

                  <div className="col-span-2 flex justify-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-accent-subtle text-accent-primary border border-accent-primary/20">
                      {log.consultationCount} vez(es)
                    </span>
                  </div>

                  <div className="col-span-2 flex flex-col text-sm text-text-secondary">
                    <span>{log.lastConsultation.split(" ")[0]}</span>
                    <span className="text-text-muted text-xs">
                      {log.lastConsultation.split(" ")[1]}
                    </span>
                  </div>

                  <div className="col-span-2 text-sm text-text-muted font-mono">
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
