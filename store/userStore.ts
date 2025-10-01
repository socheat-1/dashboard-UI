"use client";
import { create } from "zustand";

export type CreateUser = {
  name: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  description: string;
  location: string;
  gender: string;
  image?: string;
  createdAt?: string;
};

type User = CreateUser & { id: number };

type UserStore = {
  user: User | null;
  userData: User[];
  fetchUser: (userId: string) => Promise<void>;
  createUser: (newUser: FormData | CreateUser) => Promise<void>;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  userData: [],

  fetchUser: async (userId: string) => {
    try {
      const res = await fetch(`${API_URL}/users/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to fetch user");

      const resJson = await res.json();
      set({ user: resJson.data || null });
    } catch (err) {
      console.error("Error fetching user:", err);
      throw err;
    }
  },

  createUser: async (newUser: FormData | CreateUser) => {
    try {
      // Check if it's FormData (with file) or regular object
      const isFormData = newUser instanceof FormData;

      console.log('Sending request to:', `${API_URL}/users`);
      console.log('Request type:', isFormData ? 'FormData' : 'JSON');

      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        // Don't set Content-Type header for FormData - let browser set it with boundary
        headers: isFormData ? {} : { "Content-Type": "application/json" },
        body: isFormData ? newUser : JSON.stringify(newUser),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Server response error:', errorText);
        throw new Error(errorText || `Failed to create user: ${res.status} ${res.statusText}`);
      }

      const resJson = await res.json();
      console.log('User created successfully:', resJson);

      // Update state with new user
      const newUserData = resJson.data || resJson;
      set(state => ({
        userData: [...state.userData, newUserData]
      }));

      return newUserData;
    } catch (err) {
      console.error("Error creating user:", err);
      throw err;
    }
  },
}));