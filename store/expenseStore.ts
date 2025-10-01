
import { create  } from "zustand";

export type Expense = {
  id: number;
  amount: string;
  description: string;
  in_month: string;
  in_day: string;
  in_year: string;
  createdAt?: string;
};

type ExpenseStore = {
  update_Expense: any;
  create_Expense: any;
  expenseData: Expense[];
  fetchExpense: () => Promise<void>;
  remove_Expense: (id: number) => void;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
export const useExpenseStore = create<ExpenseStore>((set,get) => ({
  expenseData: [],
  fetchExpense: async () => {
    try {
      const res = await fetch(`${API_URL}/finance/expense/`, {
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

  remove_Expense: (id: number) => {
    set({ expenseData: get().expenseData.filter((inc) => inc.id !== id) });
  },

  create_Expense: async (newExpense: any) => {
    try {
      const res = await fetch(`${API_URL}/finance/expense/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExpense),
      });
      if (!res.ok) throw new Error("Failed to create expense");
      const resJson = await res.json();
      
      set({ expenseData: [...get().expenseData, resJson.data] });
      
    } catch (err) {
      console.error("Error creating expense:", err);
    }
  },

  update_Expense: async (expense: any) => {
    try {
      const res = await fetch(
        `${API_URL}/finance/expense/${expense.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(expense),
        }
      );
      if (!res.ok) throw new Error("Failed to update expense");
      const resJson = await res.json();

      set({
        expenseData: get().expenseData.map((exp: any) =>
          exp.id === expense.id ? resJson.data : exp
        ),
      });
    } catch (err) {
      console.error("Error updating expense:", err);
    }
  },
  
}));
