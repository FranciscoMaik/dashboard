"use client";

import { AlertCircle, Calendar, MessageSquare, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClientAvatar } from "../ClientAvatar";
import type { FeedbackItem } from "../FeedbackRow";
import { SentimentBadge } from "../SentimentBadge";

interface FeedbackDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  feedback: FeedbackItem | null;
  onStatusChange: (status: string) => void;
}

export function FeedbackDetailsModal({
  isOpen,
  onClose,
  feedback,
  onStatusChange,
}: FeedbackDetailsModalProps) {
  if (!isOpen || !feedback) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-100 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed left-[50%] top-[50%] z-101 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border-default bg-surface-elevated p-6 shadow-float sm:rounded-card">
        <div className="flex flex-col space-y-1.5 text-center sm:text-left mb-2">
          <div className="flex items-start justify-between">
            <h2 className="text-xl font-bold tracking-tight text-text-primary">
              Detalhes do Feedback
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-button text-text-muted hover:bg-surface-hover hover:text-text-primary transition-colors"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Fechar</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <ClientHeader feedback={feedback} />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <DateInfo date={feedback.date} />
            <SentimentInfo sentiment={feedback.sentiment} />
            <StatusSelect
              status={feedback.status}
              onStatusChange={onStatusChange}
            />
          </div>

          <MessageContent message={feedback.message} />
        </div>

        <div className="flex justify-end gap-3 mt-4 border-t border-border-subtle pt-4">
          <Button
            variant="outline"
            className="rounded-button border border-border-default bg-surface-page hover:bg-surface-hover text-text-secondary hover:text-text-primary font-semibold"
            onClick={onClose}
          >
            Fechar
          </Button>
          <Button className="rounded-button bg-accent-primary hover:bg-accent-hover text-white shadow-sm font-semibold">
            Responder Cliente
          </Button>
        </div>
      </div>
    </>
  );
}

function ClientHeader({ feedback }: { feedback: FeedbackItem }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-card bg-surface-page border border-border-default">
      <ClientAvatar
        initials={feedback.initials}
        colorClass={feedback.initialsColor}
        size="lg"
      />
      <div className="flex flex-col">
        <span className="text-xs uppercase tracking-wider font-semibold text-text-muted mb-0.5 flex items-center gap-1.5">
          <User className="h-3.5 w-3.5" />
          Cliente
        </span>
        <span className="text-lg font-bold text-text-primary leading-tight">
          {feedback.clientName}
        </span>
      </div>
    </div>
  );
}

function DateInfo({ date }: { date: string }) {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-card border border-border-subtle bg-surface-page/50">
      <div className="flex flex-col">
        <span className="text-[11px] uppercase tracking-wider font-semibold text-text-muted mb-1 flex items-center gap-1.5">
          <Calendar className="h-3 w-3" />
          Data de Envio
        </span>
        <span className="font-semibold text-text-primary text-sm">{date}</span>
      </div>
    </div>
  );
}

function SentimentInfo({ sentiment }: { sentiment: "Bom" | "Médio" | "Ruim" }) {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-card border border-border-subtle bg-surface-page/50">
      <div className="flex flex-col">
        <span className="text-[11px] uppercase tracking-wider font-semibold text-text-muted mb-1 flex items-center gap-1.5">
          <AlertCircle className="h-3 w-3" />
          Classificação
        </span>
        <div className="mt-1">
          <SentimentBadge sentiment={sentiment} size="md" showDot />
        </div>
      </div>
    </div>
  );
}

function StatusSelect({
  status,
  onStatusChange,
}: {
  status: string;
  onStatusChange: (status: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-card border border-border-subtle bg-surface-page/50">
      <div className="flex flex-col h-full justify-between">
        <span className="text-[11px] uppercase tracking-wider font-semibold text-text-muted mb-1 flex items-center gap-1.5">
          <AlertCircle className="h-3 w-3" />
          Status
        </span>
        <div className="mt-1">
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger className="w-full h-8 text-xs font-semibold rounded-button">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Resolvido" className="text-xs font-semibold">
                Resolvido
              </SelectItem>
              <SelectItem
                value="Em Progresso"
                className="text-xs font-semibold"
              >
                Em Progresso
              </SelectItem>
              <SelectItem value="Recebido" className="text-xs font-semibold">
                Recebido
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

function MessageContent({ message }: { message: string }) {
  return (
    <div className="flex flex-col p-5 rounded-card bg-surface-page border border-border-default">
      <span className="text-[11px] uppercase tracking-wider font-semibold text-text-muted mb-3 flex items-center gap-1.5 border-b border-border-subtle pb-3">
        <MessageSquare className="h-3.5 w-3.5" />
        Mensagem do Cliente
      </span>
      <p className="text-text-secondary leading-relaxed font-medium text-[15px]">
        &quot;{message}&quot;
      </p>
    </div>
  );
}
