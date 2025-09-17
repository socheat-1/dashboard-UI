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
  user: User | null;
  fetchUser: (userId: string) => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  fetchUser: async (userId: string) => {
    try {
      const res = await fetch(`http://localhost:3001/users/${userId}`, {
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
