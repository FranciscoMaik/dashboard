import { Building2, Landmark, Smartphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ConnectedBank {
  name: string;
  type: string;
  lastSync: string;
}

interface ConnectedBanksProps {
  banks: ConnectedBank[];
}

export function ConnectedBanks({ banks }: ConnectedBanksProps) {
  if (!banks || banks.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case "Digital":
        return <Smartphone className="h-4 w-4 text-accent-primary" />;
      case "Tradicional":
        return <Landmark className="h-4 w-4 text-accent-primary" />;
      case "Investimento":
        return <Building2 className="h-4 w-4 text-accent-primary" />;
      default:
        return <Landmark className="h-4 w-4 text-text-muted" />;
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-sm font-semibold text-text-primary tracking-tight mb-4">
          Instituições Conectadas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {banks.map((bank) => (
            <div
              key={bank.name}
              className="flex items-center justify-between p-3.5 border border-border-subtle rounded-card hover:bg-surface-hover transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-card bg-accent-subtle">
                  {getIcon(bank.type)}
                </div>
                <div>
                  <p className="font-medium text-sm text-text-primary">
                    {bank.name}
                  </p>
                  <p className="text-xs text-text-muted">{bank.type}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="bg-surface-page border border-border-default text-text-secondary rounded-full px-2.5 py-0.5 text-[10px] font-medium tracking-wide uppercase">
                  Ativo
                </span>
                <p className="text-[10px] text-text-muted mt-1">
                  Sinc: {bank.lastSync}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
