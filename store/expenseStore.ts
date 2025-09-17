
import { create } from "zustand";

export type Expense = {
  id: number;
  amount: string;
  description: string;
  in_month: string;
  in_day: string;
  createdAt?: string;
};

type ExpenseStore = {
  expenseData: Expense[];
  fetchExpense: () => Promise<void>;
};

export const useExpenseStore = create<ExpenseStore>((set) => ({
  expenseData: [],
  fetchExpense: async () => {
    try {
      const res = await fetch("http://localhost:3001/finance/expense/", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch Expense data");
      const resJson = await res.json();
      set({ expenseData: resJson.data || [] });
    } catch (err) {
      console.error("Error fetching Expense:", err);
    }
  },
}));
