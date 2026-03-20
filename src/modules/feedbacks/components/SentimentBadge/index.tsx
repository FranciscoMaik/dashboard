import { cn } from "@/lib/utils";

type Sentiment = "Bom" | "Médio" | "Ruim";

interface SentimentBadgeProps {
  sentiment: Sentiment;
  showDot?: boolean;
  size?: "sm" | "md";
}

const dotColors: Record<Sentiment, string> = {
  Bom: "bg-status-success",
  Médio: "bg-status-warning",
  Ruim: "bg-status-error",
};

const textColors: Record<Sentiment, string> = {
  Bom: "text-status-success",
  Médio: "text-status-warning",
  Ruim: "text-status-error",
};

export function SentimentBadge({
  sentiment,
  showDot = true,
  size = "sm",
}: SentimentBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      {showDot && (
        <div className={cn("w-2 h-2 rounded-full", dotColors[sentiment])} />
      )}
      <span
        className={cn(
          "font-bold tracking-wide",
          size === "sm" ? "text-[13px]" : "text-sm",
          textColors[sentiment],
        )}
      >
        {sentiment}
      </span>
    </div>
  );
}

export function getSentimentDotColor(sentiment: Sentiment) {
  return dotColors[sentiment];
}

export function getSentimentTextColor(sentiment: Sentiment) {
  return textColors[sentiment];
}
