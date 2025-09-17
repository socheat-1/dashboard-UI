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
  updateIncome: any;
  cIncome: any;
  incomeData: Income[];
  fetchIncome: () => Promise<void>;
  removeIncome: (id: number) => void;
};

export const useIncomeStore = create<IncomeStore>((set, get) => ({
  incomeData: [],
  fetchIncome: async () => {
    try {
      const res = await fetch("http://localhost:3001/finance/income/", {
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

  removeIncome: (id: number) => {
    set({ incomeData: get().incomeData.filter((inc) => inc.id !== id) });
  },


  cIncome: async (newIncome: any) => {
    try {
      const res = await fetch("http://localhost:3001/finance/income/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newIncome),
      });
      if (!res.ok) throw new Error("Failed to create income");
      const resJson = await res.json();

      // Update local store
      set({ incomeData: [...get().incomeData, resJson.data] });
      
    } catch (err) {
      console.error("Error creating income:", err);
    }
  },

  updateIncome: async (income: any) => {
    try {
      const res = await fetch(
        `http://localhost:3001/finance/income/${income.id}`,
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