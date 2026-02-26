import { ChevronRight, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    <Card className="bg-surface-card rounded-card shadow-card hover:shadow-hover border-none transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-1 ring-border-default ring-offset-2 ring-offset-surface-card">
              <AvatarImage src="" />
              <AvatarFallback className="bg-accent-subtle text-accent-primary font-semibold text-sm">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-lg font-semibold tracking-tight text-text-primary">
              {name}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-text-muted">
        <div className="flex items-center gap-2.5">
          <Mail className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{email}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Phone className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{phone}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-5 w-full items-center justify-end min-h-[24px]">
          {hasOpenFinance && (
            <Badge className="bg-surface-page border border-border-default text-text-secondary rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase hover:bg-surface-hover">
              Open Finance
            </Badge>
          )}
          {hasB3 && (
            <Badge className="bg-surface-page border border-border-default text-text-secondary rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase hover:bg-surface-hover">
              B3
            </Badge>
          )}
          {hasLifePlan && (
            <Badge className="bg-surface-page border border-border-default text-text-secondary rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase hover:bg-surface-hover">
              Life Plan
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/dashboard/clients/${id}`} className="w-full">
          <Button className="w-full justify-between group rounded-button border border-border-default bg-surface-page text-text-secondary hover:text-text-primary hover:bg-surface-hover shadow-none transition-colors h-9">
            Ver Perfil
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
