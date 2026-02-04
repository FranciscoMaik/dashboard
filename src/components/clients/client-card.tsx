import { ChevronRight, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ClientCardProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  hasOpenFinance?: boolean;
  hasB3?: boolean;
  hasLifePlan?: boolean;
}

export function ClientCard({
  id,
  name,
  email,
  phone,
  hasOpenFinance,
  hasB3,
  hasLifePlan,
}: ClientCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{name}</CardTitle>
          <div className="flex gap-1">
            {hasOpenFinance && <Badge variant="secondary">Open Finance</Badge>}
            {hasB3 && <Badge variant="outline">B3</Badge>}
            {hasLifePlan && (
              <Badge className="bg-indigo-600 hover:bg-indigo-700 border-transparent text-white">
                Plano de Vida
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          <span>{phone}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/dashboard/clients/${id}`} className="w-full">
          <Button variant="outline" className="w-full justify-between group">
            Ver Perfil
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
