import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ageData = [
  { group: "18-24", count: 145, percentage: "12%" },
  { group: "25-34", count: 480, percentage: "39%" },
  { group: "35-44", count: 320, percentage: "26%" },
  { group: "45-54", count: 180, percentage: "15%" },
  { group: "55+", count: 109, percentage: "8%" },
];

export function AgeDistributionTable() {
  return (
    <Card className="col-span-4 lg:col-span-4">
      <CardHeader>
        <CardTitle className="text-base">
          Demografia de Idade dos Usuários
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Faixa Etária</TableHead>
              <TableHead className="text-right">Usuários</TableHead>
              <TableHead className="text-right">% do Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ageData.map((item) => (
              <TableRow key={item.group}>
                <TableCell className="font-medium">{item.group}</TableCell>
                <TableCell className="text-right">{item.count}</TableCell>
                <TableCell className="text-right font-medium text-muted-foreground">
                  {item.percentage}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
