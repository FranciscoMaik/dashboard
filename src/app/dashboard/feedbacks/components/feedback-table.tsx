"use client";

import { Download, Filter } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FeedbackDetailsModal } from "./feedback-details-modal";

// Mock data
const initialFeedbacks = [
  {
    id: "1",
    clientName: "Ana Silva",
    email: "ana.silva@email.com",
    initials: "AS",
    initialsColor: "bg-status-success/10 text-status-success", // Replaced purple to adhere to DESIGN_SYSTEM.md
    message: "Ótimo atendimento, muito rápido e eficiente!",
    date: "23/10/2023",
    sentiment: "Bom",
    status: "Resolvido",
  },
  {
    id: "2",
    clientName: "Carlos Souza",
    email: "carlos.souza@email.com",
    initials: "CS",
    initialsColor: "bg-[#BFDBFE] text-[#1D4ED8]",
    message: "O produto chegou com um pequeno defeito na embalagem...",
    date: "22/10/2023",
    sentiment: "Ruim",
    status: "Em Progresso",
  },
  {
    id: "3",
    clientName: "Beatriz Lima",
    email: "beatriz.lima@email.com",
    initials: "BL",
    initialsColor: "bg-[#FFEDD5] text-[#C2410C]",
    message: "Gostei do serviço, mas a entrega demorou um pouco.",
    date: "21/10/2023",
    sentiment: "Médio",
    status: "Recebido",
  },
  {
    id: "4",
    clientName: "João Mendes",
    email: "joao.mendes@email.com",
    initials: "JM",
    initialsColor: "bg-[#D1FAE5] text-[#047857]",
    message: "Qualidade excelente, comprarei novamente com certeza.",
    date: "20/10/2023",
    sentiment: "Bom",
    status: "Resolvido",
  },
  {
    id: "5",
    clientName: "Fernanda Costa",
    email: "fernanda.costa@email.com",
    initials: "FC",
    initialsColor: "bg-[#FCE7F3] text-[#BE185D]",
    message: "Tentei contato com suporte por 2 dias sem sucesso.",
    date: "19/10/2023",
    sentiment: "Ruim",
    status: "Em Progresso",
  },
];

const getSentimentDotColor = (sentiment: string) => {
  switch (sentiment) {
    case "Bom":
      return "bg-status-success";
    case "Médio":
      return "bg-status-warning";
    case "Ruim":
      return "bg-status-error";
    default:
      return "bg-border-default";
  }
};

const getSentimentTextColor = (sentiment: string) => {
  switch (sentiment) {
    case "Bom":
      return "text-status-success";
    case "Médio":
      return "text-status-warning";
    case "Ruim":
      return "text-status-error";
    default:
      return "text-text-secondary";
  }
};

// Returns styling for the status dropdown pill
const getStatusStyles = (status: string) => {
  switch (status) {
    case "Resolvido":
      return "border-status-success/30 text-status-success bg-status-success/5 hover:bg-status-success/10";
    case "Em Progresso":
      return "border-status-warning/30 text-status-warning bg-status-warning/5 hover:bg-status-warning/10";
    case "Recebido":
      return "border-border-default text-text-secondary bg-surface-page hover:bg-surface-hover";
    default:
      return "border-border-default text-text-secondary bg-surface-page";
  }
};

export function FeedbackTable() {
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks);
  const [selectedFeedback, setSelectedFeedback] = useState<
    (typeof initialFeedbacks)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter states
  const [filterStatus, setFilterStatus] = useState<string>("todos");
  const [filterDate, setFilterDate] = useState<string>("todos");

  const handleRowClick = (feedback: (typeof initialFeedbacks)[0]) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  const handleStatusChange = (status: string) => {
    if (!selectedFeedback) return;

    setFeedbacks((prev) =>
      prev.map((f) => (f.id === selectedFeedback.id ? { ...f, status } : f)),
    );

    setSelectedFeedback((prev) => (prev ? { ...prev, status } : null));
  };

  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter((feedback) => {
      const matchStatus =
        filterStatus === "todos" || feedback.status === filterStatus;
      const matchDate = filterDate === "todos" || feedback.date === filterDate;
      return matchStatus && matchDate;
    });
  }, [filterStatus, filterDate, feedbacks]);

  // Extract unique dates for the filter options
  const uniqueDates = useMemo(() => {
    const dates = feedbacks.map((f) => f.date);
    return Array.from(new Set(dates));
  }, [feedbacks]);

  return (
    <>
      <Card className="bg-surface-card rounded-card shadow-card border-none flex flex-col w-full overflow-hidden">
        {/* Header operations */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 gap-4 border-b border-border-subtle">
          <h3 className="text-lg font-bold text-text-primary tracking-tight">
            Feedbacks Recentes
          </h3>
          <div className="flex items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "rounded-button border text-text-secondary bg-surface-page hover:bg-surface-hover hover:text-text-primary gap-2 h-10 flex-1 sm:flex-none",
                    filterStatus !== "todos" || filterDate !== "todos"
                      ? "border-accent-primary text-accent-primary bg-accent-subtle hover:bg-accent-subtle"
                      : "border-border-default",
                  )}
                >
                  <Filter className="h-4 w-4" />
                  <span className="font-semibold tracking-wide">
                    Filtrar{" "}
                    {(filterStatus !== "todos" || filterDate !== "todos") &&
                      "Ativo"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="w-[280px] p-4 rounded-card border-border-default shadow-float"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-border-subtle pb-3">
                    <h4 className="font-bold text-text-primary text-sm">
                      Filtros
                    </h4>
                    {(filterStatus !== "todos" || filterDate !== "todos") && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-[11px] font-semibold text-text-muted hover:text-text-primary"
                        onClick={() => {
                          setFilterStatus("todos");
                          setFilterDate("todos");
                        }}
                      >
                        Limpar
                      </Button>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Status
                    </span>
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger className="w-full rounded-button h-9">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos os Status</SelectItem>
                        <SelectItem value="Resolvido">Resolvido</SelectItem>
                        <SelectItem value="Em Progresso">
                          Em Progresso
                        </SelectItem>
                        <SelectItem value="Recebido">Recebido</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-1.5 mb-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                      Data
                    </span>
                    <Select value={filterDate} onValueChange={setFilterDate}>
                      <SelectTrigger className="w-full rounded-button h-9">
                        <SelectValue placeholder="Selecione a data" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todas as Datas</SelectItem>
                        {uniqueDates.map((date) => (
                          <SelectItem key={date} value={date}>
                            {date}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Button className="rounded-button bg-accent-primary hover:bg-accent-hover text-white shadow-sm gap-2 h-10 flex-1 sm:flex-none">
              <Download className="h-4 w-4" />
              <span className="font-semibold tracking-wide">Exportar</span>
            </Button>
          </div>
        </div>

        {/* Table Content */}
        <div className="w-full overflow-x-auto custom-scrollbar">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-[11px] font-bold text-text-muted uppercase tracking-wider border-b border-border-subtle bg-surface-card">
              <tr>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Mensagem</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Sentimento</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {filteredFeedbacks.length > 0 ? (
                filteredFeedbacks.map((feedback) => (
                  <tr
                    key={feedback.id}
                    onClick={() => handleRowClick(feedback)}
                    className="hover:bg-surface-hover transition-colors duration-200 group cursor-pointer"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm",
                            feedback.initialsColor,
                          )}
                        >
                          {feedback.initials}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-text-primary leading-tight">
                            {feedback.clientName}
                          </span>
                          <span className="text-[13px] font-medium text-text-muted mt-0.5">
                            {feedback.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-text-secondary font-medium truncate inline-block max-w-[280px] lg:max-w-[400px]">
                        {feedback.message}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-text-secondary font-medium">
                        {feedback.date}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full",
                            getSentimentDotColor(feedback.sentiment),
                          )}
                        />
                        <span
                          className={cn(
                            "font-bold text-[13px] tracking-wide",
                            getSentimentTextColor(feedback.sentiment),
                          )}
                        >
                          {feedback.sentiment}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <button
                        type="button"
                        onClick={(e) => e.stopPropagation()}
                        className={cn(
                          "flex items-center justify-between gap-2 px-3 py-1.5 rounded-button border text-[13px] font-bold tracking-wide transition-colors min-w-[130px] cursor-default",
                          getStatusStyles(feedback.status),
                        )}
                      >
                        {feedback.status}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-text-secondary font-medium"
                  >
                    Nenhum feedback encontrado para os filtros selecionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-border-subtle p-6 gap-4">
          <p className="text-sm font-medium text-text-secondary">
            Mostrando{" "}
            <strong className="text-text-primary">
              {filteredFeedbacks.length > 0 ? 1 : 0}
            </strong>{" "}
            a{" "}
            <strong className="text-text-primary">
              {Math.min(5, filteredFeedbacks.length)}
            </strong>{" "}
            de{" "}
            <strong className="text-text-primary">
              {filteredFeedbacks.length}
            </strong>{" "}
            resultados
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-button border border-border-default text-text-secondary bg-surface-page hover:bg-surface-hover hover:text-text-primary h-9 font-semibold"
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-button border border-border-default text-text-secondary bg-surface-page hover:bg-surface-hover hover:text-text-primary h-9 font-semibold"
            >
              Próxima
            </Button>
          </div>
        </div>
      </Card>

      <FeedbackDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        feedback={selectedFeedback}
        onStatusChange={handleStatusChange}
      />
    </>
  );
}
