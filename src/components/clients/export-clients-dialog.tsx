import { Download, FileSpreadsheet } from "lucide-react";
import { useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { getClientData } from "@/lib/mock-data";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  hasOpenFinance: boolean;
  hasB3?: boolean; // Optional in original mock data?
  hasLifePlan?: boolean; // Optional in original mock data?
  [key: string]: any; // Allow other checks if needed, but preferably strict
}

interface ExportClientsDialogProps {
  clients: Client[];
}

const AVAILABLE_FIELDS = [
  { id: "name", label: "Nome" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Telefone" },
  { id: "hasOpenFinance", label: "Tem Open Finance" },
  { id: "hasB3", label: "Tem B3" },
  { id: "hasLifePlan", label: "Tem Life Plan" },
  { id: "netWorth", label: "Patrimônio Líquido" },
];

export function ExportClientsDialog({ clients }: ExportClientsDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedFields, setSelectedFields] = useState<string[]>(
    AVAILABLE_FIELDS.map((field) => field.id),
  );

  const toggleField = (fieldId: string) => {
    if (selectedFields.includes(fieldId)) {
      setSelectedFields(selectedFields.filter((id) => id !== fieldId));
    } else {
      setSelectedFields([...selectedFields, fieldId]);
    }
  };

  const handleExport = () => {
    // Transform data based on selected fields
    const dataToExport = clients.map((client) => {
      // Get full details including Net Worth which might not be in the list view
      const fullClientData = getClientData(client.id);

      const row: Record<string, string | number | boolean | null> = {};

      if (selectedFields.includes("name")) row["Nome"] = client.name;
      if (selectedFields.includes("email")) row["Email"] = client.email;
      if (selectedFields.includes("phone")) row["Telefone"] = client.phone;
      if (selectedFields.includes("hasOpenFinance"))
        row["Open Finance"] = client.hasOpenFinance ? "Sim" : "Não";
      if (selectedFields.includes("hasB3"))
        row["B3"] = client.hasB3 ? "Sim" : "Não";
      if (selectedFields.includes("hasLifePlan"))
        row["Life Plan"] = client.hasLifePlan ? "Sim" : "Não";
      if (selectedFields.includes("netWorth"))
        row["Patrimônio Líquido"] = fullClientData.netWorth || "N/A";

      return row;
    });

    // Create workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clientes");

    // Generate buffer and download
    XLSX.writeFile(workbook, "clientes_dashboard.xlsx");
    setOpen(false);
  };

  const toggleAll = () => {
    if (selectedFields.length === AVAILABLE_FIELDS.length) {
      setSelectedFields([]);
    } else {
      setSelectedFields(AVAILABLE_FIELDS.map((f) => f.id));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <FileSpreadsheet className="h-4 w-4" />
          Exportar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Exportar Dados de Clientes</DialogTitle>
          <DialogDescription>
            Selecione quais dados deseja incluir no arquivo Excel (.xlsx).
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center space-x-2 mb-4 pb-4 border-b">
            <Checkbox
              id="select-all"
              checked={selectedFields.length === AVAILABLE_FIELDS.length}
              onCheckedChange={toggleAll}
            />
            <Label htmlFor="select-all" className="font-semibold">
              Selecionar Todos
            </Label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {AVAILABLE_FIELDS.map((field) => (
              <div key={field.id} className="flex items-center space-x-2">
                <Checkbox
                  id={field.id}
                  checked={selectedFields.includes(field.id)}
                  onCheckedChange={() => toggleField(field.id)}
                />
                <Label htmlFor={field.id}>{field.label}</Label>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleExport}
            disabled={selectedFields.length === 0}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Baixar Excel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
