// stores/sidebar-store.ts
import { create } from "zustand";

type SidebarState = {
  leftOpen: boolean;
  rightOpen: boolean;
  setLeftOpen: (open: boolean) => void;
  setRightOpen: (open: boolean) => void;
  toggleLeft: () => void;
  toggleRight: () => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  leftOpen: false,
  rightOpen: false,
  setLeftOpen: (open) => set({ leftOpen: open }),
  setRightOpen: (open) => set({ rightOpen: open }),
  toggleLeft: () => set((state) => ({ leftOpen: !state.leftOpen })),
  toggleRight: () => set((state) => ({ rightOpen: !state.rightOpen })),
}));
