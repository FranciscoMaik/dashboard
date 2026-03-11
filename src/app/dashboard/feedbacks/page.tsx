import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeedbackOverview } from "./components/feedback-overview";
import { FeedbackTable } from "./components/feedback-table";

export default function FeedbacksPage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-screen-2xl mx-auto pb-10 fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary">
            Gestão de Feedbacks
          </h1>
          <p className="text-sm md:text-base text-text-secondary">
            Acompanhe e gerencie a opinião dos seus clientes.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-surface-card border border-border-default rounded-card p-1 shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-button text-text-secondary hover:text-text-primary"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2 px-3 text-sm font-medium text-text-primary">
            <Calendar className="h-4 w-4 text-text-muted" />
            Outubro 2023
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-button text-text-secondary hover:text-text-primary"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <FeedbackOverview />
      <FeedbackTable />
    </div>
  );
}
