"use client";

// Mock data structured grouped by date to match the new requirement
const mockAnalysisData = [
  {
    date: "03 de Mar de 2026",
    logs: [
      {
        id: "a1",
        userName: "helton luiz medeiros zanatta",
        email: "heltonzanatta@gmail.com",
        cpf: "78036267934",
        totalReceita: 648070.05,
        totalDespesa: 623480.32,
        saldo: 24589.73,
        mediaReceitaMensal: 162017.51,
        mediaDespesaMensal: 155870.08,
        consultationCount: 4,
        lastConsultation: "03/03/2026 14:33:12",
        ip: "172.16.238.7",
      },
    ],
  },
  {
    date: "02 de Mar de 2026",
    logs: [
      {
        id: "a2",
        userName: "gabriel bernardes",
        email: "bernardes8g@gmail.com",
        cpf: "43077018870",
        totalReceita: 586039.32,
        totalDespesa: 358275.93,
        saldo: 227763.39,
        mediaReceitaMensal: 48836.61,
        mediaDespesaMensal: 29856.33,
        consultationCount: 2,
        lastConsultation: "02/03/2026 17:07:49",
        ip: "172.20.0.18",
      },
    ],
  },
  {
    date: "26 de Fev de 2026",
    logs: [
      {
        id: "a3",
        userName: "andre luiz pereira",
        email: "andluizpereira@gmail.com",
        cpf: "---",
        totalReceita: 341925.33,
        totalDespesa: 290803.61,
        saldo: 51121.72,
        mediaReceitaMensal: 26301.95,
        mediaDespesaMensal: 22369.51,
        consultationCount: 12,
        lastConsultation: "26/02/2026 09:20:59",
        ip: "172.20.0.18",
      },
      {
        id: "a4",
        userName: "andre luis pereira dos santos",
        email: "pereirasantosandreluis@gmail.com",
        cpf: "---",
        totalReceita: 0.0,
        totalDespesa: 0.0,
        saldo: 0.0,
        mediaReceitaMensal: 0.0,
        mediaDespesaMensal: 0.0,
        consultationCount: 1,
        lastConsultation: "26/02/2026 09:03:10",
        ip: "172.20.0.18",
      },
      {
        id: "a5",
        userName: "eduardo zanatta",
        email: "eduardo@imepel.com.br",
        cpf: "95102019953",
        totalReceita: 1133052.46,
        totalDespesa: 557571.34,
        saldo: 575481.12,
        mediaReceitaMensal: 283263.11,
        mediaDespesaMensal: 139392.83,
        consultationCount: 23,
        lastConsultation: "26/02/2026 09:02:34",
        ip: "172.20.0.18",
      },
    ],
  },
  {
    date: "25 de Fev de 2026",
    logs: [
      {
        id: "a6",
        userName: "thiago oliveira",
        email: "thiagooliveira363644@gmail.com",
        cpf: "50021083851",
        totalReceita: 12261.15,
        totalDespesa: 23063.12,
        saldo: -10801.97,
        mediaReceitaMensal: 3065.29,
        mediaDespesaMensal: 5765.78,
        consultationCount: 1,
        lastConsultation: "25/02/2026 18:23:36",
        ip: "172.20.0.18",
      },
      {
        id: "a7",
        userName: "thiago henrique",
        email: "thiago190604@gmail.com",
        cpf: "---",
        totalReceita: 0.0,
        totalDespesa: 0.0,
        saldo: 0.0,
        mediaReceitaMensal: 0.0,
        mediaDespesaMensal: 0.0,
        consultationCount: 2,
        lastConsultation: "25/02/2026 18:13:24",
        ip: "172.20.0.18",
      },
      {
        id: "a8",
        userName: "guilherme casarini mello",
        email: "guilhermecasarinimello2@gmail.com",
        cpf: "37993633869",
        totalReceita: 49789.15,
        totalDespesa: 44903.85,
        saldo: 4885.3,
        mediaReceitaMensal: 12447.29,
        mediaDespesaMensal: 11225.96,
        consultationCount: 13,
        lastConsultation: "25/02/2026 17:50:24",
        ip: "172.20.0.18",
      },
      {
        id: "a9",
        userName: "iraci oliveira marques pereira",
        email: "iraci.marques@hotmail.com",
        cpf: "26811989840",
        totalReceita: 26139.95,
        totalDespesa: 61095.74,
        saldo: -34955.79,
        mediaReceitaMensal: 6534.99,
        mediaDespesaMensal: 15273.93,
        consultationCount: 5,
        lastConsultation: "25/02/2026 10:09:27",
        ip: "172.20.0.18",
      },
    ],
  },
];

export function AuditAnalysisTimeline() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Math.abs(value));
  };

  const getColorClass = (value: number, isExpense: boolean = false) => {
    if (value === 0) return "text-text-muted";
    if (isExpense) return "text-status-error"; // Despesas sempre ficam vermelhas
    if (value < 0) return "text-status-error"; // Saldos negativos ficam vermelhos
    return "text-status-success"; // Receitas positivas ou saldo positivo ficam em verde
  };

  return (
    <div className="flex flex-col gap-8">
      {mockAnalysisData.map((dayGroup) => (
        <div key={dayGroup.date} className="flex flex-col gap-4">
          <div className="flex items-center gap-2 px-2">
            <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
              {dayGroup.date}
            </h3>
            <div className="h-px flex-1 bg-border-default ml-2" />
          </div>

          <div className="bg-surface-card border border-border-default rounded-card shadow-card overflow-hidden">
            <div className="grid grid-cols-12 gap-2 p-4 border-b border-border-default bg-surface-page/30 text-[10px] font-semibold tracking-wider uppercase text-text-muted w-[1000px] xl:w-full">
              <div className="col-span-3 lg:col-span-2">Usuário Analisado</div>
              <div className="col-span-1 text-right">Total Receita</div>
              <div className="col-span-1 text-right">Total Despesa</div>
              <div className="col-span-1 text-right">Saldo</div>
              <div className="col-span-2 lg:col-span-1 text-right">
                Média Receita M.
              </div>
              <div className="col-span-2 lg:col-span-1 text-right">
                Média Despesa M.
              </div>
              <div className="col-span-1 text-center">Consultas</div>
              <div className="col-span-1">Última Consulta</div>
              <div className="col-span-2 text-right">IP(s)</div>
            </div>

            <div className="flex flex-col divide-y divide-border-subtle custom-scrollbar overflow-x-auto min-w-[1000px] xl:min-w-0">
              {dayGroup.logs.map((log) => (
                <div
                  key={log.id}
                  className="grid grid-cols-12 gap-2 p-4 items-center hover:bg-surface-hover/50 transition-colors bg-white group w-[1000px] xl:w-full"
                >
                  <div className="col-span-3 lg:col-span-2 flex flex-col gap-0.5 border-r border-border-subtle pr-2">
                    <span className="text-[13px] font-semibold text-text-primary capitalize tracking-tight group-hover:text-accent-primary transition-colors">
                      {log.userName}
                    </span>
                    <span className="text-[11px] text-text-muted">
                      {log.email}
                    </span>
                    <span className="text-[10px] text-text-muted uppercase tracking-wide">
                      CPF: {log.cpf}
                    </span>
                  </div>

                  <div className="col-span-1 text-right flex items-center justify-end font-semibold text-sm border-r border-border-subtle pr-2">
                    <span className={getColorClass(log.totalReceita, false)}>
                      {formatCurrency(log.totalReceita)}
                    </span>
                  </div>

                  <div className="col-span-1 text-right flex items-center justify-end font-semibold text-sm border-r border-border-subtle pr-2">
                    <span className={getColorClass(log.totalDespesa, true)}>
                      {log.totalDespesa > 0 && "-"}
                      {formatCurrency(log.totalDespesa)}
                    </span>
                  </div>

                  <div className="col-span-1 text-right flex items-center justify-end font-bold text-[15px] border-r border-border-subtle pr-2">
                    <span className={getColorClass(log.saldo, false)}>
                      {log.saldo < 0 && "-"}
                      {formatCurrency(log.saldo)}
                    </span>
                  </div>

                  <div className="col-span-2 lg:col-span-1 text-right flex flex-col items-end justify-center border-r border-border-subtle pr-2">
                    <span className="text-[10px] text-text-muted uppercase font-semibold">
                      Média
                    </span>
                    <span
                      className={`text-[13px] font-medium ${getColorClass(log.mediaReceitaMensal, false)}`}
                    >
                      {formatCurrency(log.mediaReceitaMensal)}
                    </span>
                  </div>

                  <div className="col-span-2 lg:col-span-1 text-right flex flex-col items-end justify-center border-r border-border-subtle pr-2">
                    <span className="text-[10px] text-text-muted uppercase font-semibold">
                      Média
                    </span>
                    <span
                      className={`text-[13px] font-medium ${getColorClass(log.mediaDespesaMensal, true)}`}
                    >
                      {log.mediaDespesaMensal > 0 && "-"}
                      {formatCurrency(log.mediaDespesaMensal)}
                    </span>
                  </div>

                  <div className="col-span-1 flex justify-center border-r border-border-subtle pr-2">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold bg-accent-subtle text-accent-primary border border-accent-primary/20">
                      {log.consultationCount} vez(es)
                    </span>
                  </div>

                  <div className="col-span-1 flex flex-col text-xs text-text-secondary border-r border-border-subtle px-2">
                    <span className="font-medium text-[13px]">
                      {log.lastConsultation.split(" ")[0]}
                    </span>
                    <span className="text-text-muted">
                      {log.lastConsultation.split(" ")[1]}
                    </span>
                  </div>

                  <div className="col-span-2 text-right flex items-center justify-end text-xs text-text-muted font-mono tracking-tighter">
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
