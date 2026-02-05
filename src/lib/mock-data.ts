export const getClientData = (id: string) => {
  // This would typically come from an API
  const hasB3 = id === "1" || id === "2"; // Clients 1 and 2 have B3
  const hasOpenFinance = id === "1" || id === "3"; // Clients 1 and 3 have Open Finance

  // Mock 12-month history
  const balanceHistory = hasOpenFinance
    ? [
        { month: "Jan", balance: 45000 },
        { month: "Fev", balance: 48000 },
        { month: "Mar", balance: 47500 },
        { month: "Abr", balance: 52000 },
        { month: "Mai", balance: 54000 },
        { month: "Jun", balance: 58000 },
        { month: "Jul", balance: 56000 },
        { month: "Ago", balance: 61000 },
        { month: "Set", balance: 64000 },
        { month: "Out", balance: 68000 },
        { month: "Nov", balance: 72000 },
        { month: "Dez", balance: 75000 },
      ]
    : [];

  return {
    id,
    name:
      id === "1" ? "João Silva" : id === "2" ? "Maria Santos" : "Cliente " + id,
    email: `cliente${id}@exemplo.com`,
    phone: "+55 (11) 99999-1234",
    lastLogin: "há 2 horas",
    createdAt: "15 Jan, 2024",
    age: 34,
    childrenCount: 2,
    hasB3,
    hasOpenFinance,
    netWorth: hasB3 ? "R$ 1.250.000,00" : null,
    balanceHistory,
    hasLifePlan: id === "1", // Mock Life Plan for Client 1
    connectedBanks:
      hasOpenFinance && id === "1"
        ? [
            { name: "Nubank", type: "Digital", lastSync: "há 2 horas" },
            { name: "Itaú", type: "Tradicional", lastSync: "há 1 dia" },
            {
              name: "XP Investimentos",
              type: "Investimento",
              lastSync: "há 5 min",
            },
          ]
        : [],
    categories:
      hasOpenFinance && id === "1"
        ? [
            {
              id: "cat_1",
              name: "Habitação",
              limit: 5000,
              spent: 4500,
              subcategories: [
                { id: "sub_1", name: "Aluguel", spent: 3500 },
                { id: "sub_2", name: "Contas", spent: 650 },
                { id: "sub_3", name: "Manutenção", spent: 350 },
              ],
            },
            {
              id: "cat_2",
              name: "Alimentação",
              limit: 3000,
              spent: 2800,
              subcategories: [
                { id: "sub_4", name: "Mercado", spent: 1800 },
                { id: "sub_5", name: "Restaurantes", spent: 1000 },
              ],
            },
            {
              id: "cat_3",
              name: "Transporte",
              limit: 1200,
              spent: 1500,
              subcategories: [
                { id: "sub_6", name: "Combustível", spent: 800 },
                { id: "sub_7", name: "Uber/Táxi", spent: 500 },
                { id: "sub_8", name: "Manutenção", spent: 200 },
              ],
            },
            {
              id: "cat_4",
              name: "Lazer",
              limit: 1000,
              spent: 1200,
              subcategories: [
                { id: "sub_9", name: "Cinema", spent: 200 },
                { id: "sub_10", name: "Hobbies", spent: 600 },
                { id: "sub_11", name: "Viagem", spent: 400 },
              ],
            },
          ]
        : [],
  };
};

export interface Transaction {
  id: string;
  date: string;
  name: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  subcategory: string;
  ignored: boolean;
}

export const getTransactions = (clientId: string): Transaction[] => {
  // Generate some mock transactions
  return Array.from({ length: 50 }).map((_, i) => {
    const isExpense = Math.random() > 0.3;
    const amount = isExpense
      ? Math.floor(Math.random() * 500) + 50
      : Math.floor(Math.random() * 5000) + 2000;

    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 90)); // Last 90 days

    return {
      id: `trans_${i}`,
      date: date.toISOString().split("T")[0],
      name: isExpense ? `Compra ${i}` : `Salário/Renda ${i}`,
      amount,
      type: isExpense ? "expense" : "income",
      category: isExpense ? "Alimentação" : "Renda",
      subcategory: isExpense ? "Mercado" : "Salário",
      ignored: Math.random() > 0.95, // 5% ignored
    };
  });
};
