import { Building2, Landmark, Smartphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        return <Smartphone className="h-4 w-4 text-purple-500" />;
      case "Tradicional":
        return <Landmark className="h-4 w-4 text-orange-500" />;
      case "Investimento":
        return <Building2 className="h-4 w-4 text-blue-500" />;
      default:
        return <Landmark className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">
          Instituições Conectadas
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {banks.map((bank) => (
          <div
            key={bank.name}
            className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-muted rounded-full">
                {getIcon(bank.type)}
              </div>
              <div>
                <p className="font-medium text-sm">{bank.name}</p>
                <p className="text-xs text-muted-foreground">{bank.type}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                Ativo
              </span>
              <p className="text-[10px] text-muted-foreground mt-1">
                Sinc: {bank.lastSync}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
