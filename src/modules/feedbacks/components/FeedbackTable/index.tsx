"use client";

import { Download } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FeedbackDetailsModal } from "../FeedbackDetailsModal";
import { FeedbackFilters } from "../FeedbackFilters";
import { FeedbackPagination } from "../FeedbackPagination";
import { type FeedbackItem, FeedbackRow } from "../FeedbackRow";

const initialFeedbacks: FeedbackItem[] = [
  {
    id: "1",
    clientName: "Ana Silva",
    email: "ana.silva@email.com",
    initials: "AS",
    initialsColor: "bg-status-success/10 text-status-success",
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

export function FeedbackTable() {
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("todos");
  const [filterDate, setFilterDate] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const uniqueDates = useMemo(() => {
    const dates = feedbacks.map((f) => f.date);
    return Array.from(new Set(dates));
  }, [feedbacks]);

  const filteredFeedbacks = useMemo(() => {
    return feedbacks.filter((feedback) => {
      const matchStatus =
        filterStatus === "todos" || feedback.status === filterStatus;
      const matchDate = filterDate === "todos" || feedback.date === filterDate;
      return matchStatus && matchDate;
    });
  }, [filterStatus, filterDate, feedbacks]);

  const handleRowClick = (feedback: FeedbackItem) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  const handleStatusChange = (status: string) => {
    if (!selectedFeedback) return;

    setFeedbacks((prev) =>
      prev.map((f) =>
        f.id === selectedFeedback.id
          ? { ...f, status: status as FeedbackItem["status"] }
          : f,
      ),
    );

    setSelectedFeedback((prev) =>
      prev ? { ...prev, status: status as FeedbackItem["status"] } : null,
    );
  };

  const handleClearFilters = () => {
    setFilterStatus("todos");
    setFilterDate("todos");
  };

  return (
    <>
      <Card className="bg-surface-card rounded-card shadow-card border-none flex flex-col w-full overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 gap-4 border-b border-border-subtle">
          <h3 className="text-lg font-bold text-text-primary tracking-tight">
            Feedbacks Recentes
          </h3>
          <div className="flex items-center gap-3 w-full sm:w-auto mt-4 sm:mt-0">
            <FeedbackFilters
              filterStatus={filterStatus}
              filterDate={filterDate}
              onFilterStatusChange={setFilterStatus}
              onFilterDateChange={setFilterDate}
              onClearFilters={handleClearFilters}
              uniqueDates={uniqueDates}
            />
            <Button className="rounded-button bg-accent-primary hover:bg-accent-hover text-white shadow-sm gap-2 h-10">
              <Download className="h-4 w-4" />
              <span className="font-semibold tracking-wide">Exportar</span>
            </Button>
          </div>
        </div>

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
                filteredFeedbacks
                  .slice(
                    (currentPage - 1) * itemsPerPage,
                    currentPage * itemsPerPage,
                  )
                  .map((feedback) => (
                    <FeedbackRow
                      key={feedback.id}
                      feedback={feedback}
                      onClick={() => handleRowClick(feedback)}
                      onStatusClick={() => handleRowClick(feedback)}
                    />
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

        <FeedbackPagination
          currentPage={currentPage}
          totalItems={filteredFeedbacks.length}
          itemsPerPage={itemsPerPage}
          onPrevious={() => setCurrentPage((p) => Math.max(1, p - 1))}
          onNext={() => setCurrentPage((p) => p + 1)}
        />
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
