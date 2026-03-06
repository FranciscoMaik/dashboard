"use client";

import { Download } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockLogs = [
  {
    id: "#LOG-8921",
    date: "24/10/2023 14:32:01",
    email: "joao.silva@exemplo.com",
    utm: "instagram_stories",
    utmColor: "text-blue-600 bg-blue-500/10 border-blue-500/20",
    device: "Mobile",
    deviceIcon: "📱",
    hasAppInstalled: true,
  },
  {
    id: "#LOG-8920",
    date: "24/10/2023 14:30:45",
    email: "anonimo@exemplo.com",
    isAnonymous: true,
    utm: "email_newsletter",
    utmColor: "text-purple-600 bg-purple-500/10 border-purple-500/20", // The image has a purple pill, but my instructions say NO PURPLE. I'll use zinc or accent-primary.
    device: "Desktop",
    deviceIcon: "🖥️",
    hasAppInstalled: false,
  },
  {
    id: "#LOG-8919",
    date: "24/10/2023 14:25:12",
    email: "maria.oliveira@exemplo.com",
    utm: "google_search",
    utmColor: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
    device: "Mobile",
    deviceIcon: "📱",
    hasAppInstalled: true,
  },
];

// Fixing the purple pill issue per DESIGN_SYSTEM.md (NO PURPLE)
const adjustedLogs = mockLogs.map((log) =>
  log.id === "#LOG-8920"
    ? { ...log, utmColor: "text-zinc-600 bg-zinc-500/10 border-zinc-500/20" }
    : log,
);

export function DetailedLogsTable() {
  return (
    <div className="bg-surface-card border border-border-default rounded-card shadow-card flex flex-col overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-border-subtle">
        <h2 className="text-lg font-semibold tracking-tight text-text-primary">
          Logs Detalhados
        </h2>
        <button
          type="button"
          className="flex items-center text-sm font-medium text-accent-primary hover:text-accent-hover transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar CSV
        </button>
      </div>

      <div className="flex-1 w-full overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border-subtle hover:bg-transparent">
              <TableHead className="text-text-secondary font-medium px-6 py-4">
                ID / Data
              </TableHead>
              <TableHead className="text-text-secondary font-medium px-6 py-4">
                E-mail
              </TableHead>
              <TableHead className="text-text-secondary font-medium px-6 py-4">
                Origem (UTM)
              </TableHead>
              <TableHead className="text-text-secondary font-medium px-6 py-4">
                Dispositivo
              </TableHead>
              <TableHead className="text-text-secondary font-medium px-6 py-4">
                App Instalado
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adjustedLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-text-primary">
                      {log.id}
                    </span>
                    <span className="text-xs text-text-muted mt-0.5">
                      {log.date}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span
                    className={`text-sm ${log.isAnonymous ? "text-text-muted italic" : "text-text-primary font-medium"}`}
                  >
                    {log.email}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 text-xs font-medium rounded-full border ${log.utmColor}`}
                  >
                    {log.utm}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <span className="text-base leading-none grayscale opacity-80">
                      {log.deviceIcon}
                    </span>
                    {log.device}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4">
                  {log.hasAppInstalled ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-accent-subtle text-accent-primary border border-accent-primary/20">
                      Sim
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-surface-hover text-text-secondary border border-border-default">
                      Não
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between p-4 px-6 border-t border-border-default bg-surface-page/50">
        <span className="text-sm text-text-muted">
          Mostrando 1-3 de 45.230 logs
        </span>
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="text-text-muted hover:text-text-primary disabled:opacity-50 transition-colors"
            disabled
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Página anterior"
              role="img"
            >
              <title>Página anterior</title>
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className="text-sm font-medium text-text-primary">
            1 <span className="text-text-muted font-normal">/ 1507</span>
          </span>
          <button
            type="button"
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Próxima página"
              role="img"
            >
              <title>Próxima página</title>
              <path
                d="M6 12L10 8L6 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
