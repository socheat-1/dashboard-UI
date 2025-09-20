"use client";
import { create } from "zustand";

type User = {
  id: number;
  name: string;
  email: string;
  image?: string;
  location?: string;
};

type UserStore = {
  user: User | any;
  fetchUser: (userId: string) => Promise<void>;
};
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const useUserStore = create<UserStore>((set) => ({
  
  user: null,
  fetchUser: async (userId: string) => {
    try {
      const res = await fetch(`${API_URL}/users/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch user");

      const resJson = await res.json();
      set({ user: resJson.data || null });
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  },
}));
