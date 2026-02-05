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
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-lg">{name}</CardTitle>
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
        <div className="flex gap-1 mt-4 w-full align-center justify-end min-h-[25px]">
          {hasOpenFinance && (
            <Badge className="bg-blue-400 border-transparent text-white">
              Open Finance
            </Badge>
          )}
          {hasB3 && (
            <Badge className="bg-green-500 border-transparent text-white">
              B3
            </Badge>
          )}
          {hasLifePlan && (
            <Badge className="bg-indigo-600 border-transparent text-white">
              Life Plan
            </Badge>
          )}
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
