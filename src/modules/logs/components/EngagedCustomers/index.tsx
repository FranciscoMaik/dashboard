import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

import { engagedClients } from "./mock";

export default function EngagedCustomers() {
  return (
    <Card className="p-6 bg-surface-card shadow-card border-none rounded-card">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-text-primary tracking-tight">
          Clientes Mais Engajados
        </h3>
      </div>

      <div className="w-full">
        <div className="grid grid-cols-12 gap-4 pb-3 border-b border-border-subtle text-[10px] uppercase font-bold text-text-muted tracking-widest">
          <div className="col-span-8">Cliente</div>
          <div className="col-span-4 text-right">Cliques</div>
        </div>

        <div className="flex flex-col mt-2">
          {engagedClients.map((client) => (
            <div
              key={client.id}
              className="grid grid-cols-12 gap-4 items-center py-4 border-b border-border-subtle last:border-0 hover:bg-surface-hover/50 transition-colors -mx-2 px-2 rounded-lg"
            >
              <div className="col-span-8 flex items-center gap-3">
                <Avatar className="h-10 w-10 border border-border-subtle shadow-sm flex items-center justify-center">
                  <AvatarFallback className="font-bold bg-accent-subtle text-accent-primary">
                    {client.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .substring(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-text-primary tracking-tight">
                    {client.name}
                  </span>
                  <span className="text-[10px] text-text-muted font-medium">
                    Email: {client.email}
                  </span>
                </div>
              </div>
              <div className="col-span-4 text-right text-sm font-semibold text-text-primary">
                {client.clicks}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
