import { ClientAvatar } from "../ClientAvatar";
import { SentimentBadge } from "../SentimentBadge";
import { StatusBadge } from "../StatusBadge";

export interface FeedbackItem {
  id: string;
  clientName: string;
  email: string;
  initials: string;
  initialsColor: string;
  message: string;
  date: string;
  sentiment: "Bom" | "Médio" | "Ruim";
  status: "Resolvido" | "Em Progresso" | "Recebido";
}

interface FeedbackRowProps {
  feedback: FeedbackItem;
  onClick: () => void;
  onStatusClick: () => void;
}

export function FeedbackRow({
  feedback,
  onClick,
  onStatusClick,
}: FeedbackRowProps) {
  return (
    <tr
      onClick={onClick}
      className="hover:bg-surface-hover transition-colors duration-200 group cursor-pointer"
    >
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <ClientAvatar
            initials={feedback.initials}
            colorClass={feedback.initialsColor}
          />
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
        <span className="text-text-secondary font-medium">{feedback.date}</span>
      </td>
      <td className="px-6 py-5">
        <SentimentBadge sentiment={feedback.sentiment} />
      </td>
      <td className="px-6 py-5">
        <StatusBadge status={feedback.status} onClick={onStatusClick} />
      </td>
    </tr>
  );
}
