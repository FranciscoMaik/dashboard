import { cn } from "@/lib/utils";

type Status = "Resolvido" | "Em Progresso" | "Recebido";

interface StatusBadgeProps {
  status: Status;
  onClick?: () => void;
}

const statusStyles: Record<Status, string> = {
  Resolvido:
    "border-status-success/30 text-status-success bg-status-success/5 hover:bg-status-success/10",
  "Em Progresso":
    "border-status-warning/30 text-status-warning bg-status-warning/5 hover:bg-status-warning/10",
  Recebido:
    "border-border-default text-text-secondary bg-surface-page hover:bg-surface-hover",
};

export function StatusBadge({ status, onClick }: StatusBadgeProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex items-center justify-between gap-2 px-3 py-1.5 rounded-button border text-[13px] font-bold tracking-wide transition-colors min-w-[130px]",
        statusStyles[status],
        onClick ? "cursor-pointer" : "cursor-default",
      )}
    >
      {status}
    </button>
  );
}
