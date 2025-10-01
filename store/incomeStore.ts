// src/store/incomeStore.ts
import { create } from "zustand";

export type Income = {
  id: number;
  amount: string;
  description: string;
  in_month: string;
  in_day: string;
  in_year: string;
  createdAt?: string;
};


type IncomeStore = {
  update_Income: any;
  create_Income: any;
  incomeData: Income[];
  fetchIncome: () => Promise<void>;
  remove_Income: (id: number) => void;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const useIncomeStore = create<IncomeStore>((set, get) => ({
  incomeData: [],
  fetchIncome: async () => {
    try {
      const res = await fetch(`${API_URL}/finance/income/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch income data");
      const resJson = await res.json();
      set({ incomeData: resJson.data || [] });
    } catch (err) {
      console.error("Error fetching income:", err);
    }
  },

  remove_Income: (id: number) => {
    set({ incomeData: get().incomeData.filter((inc) => inc.id !== id) });
  },


  create_Income: async (newIncome: any) => {
    try {
      const res = await fetch(`${API_URL}/finance/income/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newIncome),
      });
      if (!res.ok) throw new Error("Failed to create income");
      const resJson = await res.json();
      
      set({ incomeData: [...get().incomeData, resJson.data] });
      
    } catch (err) {
      console.error("Error creating income:", err);
    }
  },

  update_Income: async (income: any) => {
    try {
      const res = await fetch(
        `${API_URL}/finance/income/${income.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(income),
        }
      );
      if (!res.ok) throw new Error("Failed to update income");
      const resJson = await res.json();

      set({
        incomeData: get().incomeData.map((inc: any) =>
          inc.id === income.id ? resJson.data : inc
        ),
      });
    } catch (err) {
      console.error("Error updating income:", err);
    }
  },

}));