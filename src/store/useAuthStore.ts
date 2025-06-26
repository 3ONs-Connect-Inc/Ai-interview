  
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface AuthState {
   user: any | null;
  role: "Admin" | "User" | "Company" | null;
  loading: boolean;
  setUser: (user: any | null) => void;
  setRole: (role: "Admin" | "User" | "Company" | null) => void;
  setLoading: (loading: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      loading: true,
      setUser: (user) => set({ user }),
      setRole: (role) => set({ role }),
      setLoading: (loading) => set({ loading }),
      reset: () => set({ user: null, role: null, loading: false }),
    }),
    {
      name: "auth-storage", // key in localStorage
      partialize: (state) => ({ user: state.user, role: state.role }),
    }
  )
);
