import { Frown, Meh, Smile } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RatingsSummary() {
  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-base">Avaliações do App</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <Smile className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Avaliações Positivas
            </p>
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-green-500 w-[85%]" />
              </div>
              <span className="text-sm font-bold w-8 text-right">85%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30">
            <Meh className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Avaliações Neutras
            </p>
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-yellow-500 w-[10%]" />
              </div>
              <span className="text-sm font-bold w-8 text-right">10%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <Frown className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Avaliações Negativas
            </p>
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-red-500 w-[5%]" />
              </div>
              <span className="text-sm font-bold w-8 text-right">5%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
