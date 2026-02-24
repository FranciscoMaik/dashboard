import {
  Activity,
  BrainCircuit,
  CreditCard,
  UserPlus,
  Users,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function KpiGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-text-primary">
            Uso de IA
          </CardTitle>
          <BrainCircuit className="h-4 w-4 text-text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-text-primary">843</div>
          <p className="text-xs text-text-muted">Requisições no período</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-text-primary">
            Logins
          </CardTitle>
          <Activity className="h-4 w-4 text-text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-text-primary">12,402</div>
          <p className="text-xs text-text-muted">Sessões com sucesso</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-text-primary">
            Novas Contas
          </CardTitle>
          <UserPlus className="h-4 w-4 text-status-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-text-primary">+128</div>
          <p className="text-xs text-text-muted">+12% vs último período</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-text-primary">
            Open Finance
          </CardTitle>
          <CreditCard className="h-4 w-4 text-text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-text-primary">45</div>
          <p className="text-xs text-text-muted">Novas conexões</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-text-primary">
            Novas Assinaturas
          </CardTitle>
          <Users className="h-4 w-4 text-accent-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-text-primary">32</div>
          <p className="text-xs text-text-muted">Upgrades Premium</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-text-primary">
            Cancelamentos
          </CardTitle>
          <XCircle className="h-4 w-4 text-status-error" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-text-primary">4</div>
          <p className="text-xs text-text-muted">Churn no período</p>
        </CardContent>
      </Card>
    </div>
  );
}
