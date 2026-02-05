export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatDate(date: string | number | Date): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) {
    // Return original if invalid, or could throw.
    // Ensuring basic safety if string is passed that isn't a date.
    // For now assuming valid input or letting generic Date handling work.
    // If strict handling needed, we can adjust.
    return String(date);
  }
  return new Intl.DateTimeFormat("pt-BR").format(d);
}
