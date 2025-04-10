import { create } from "zustand";

interface ActivityFormSectionStore {
  name: string;
  description?: string;
  errors: { name?: string };
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setErrors: (errors: ActivityFormSectionStore["errors"]) => void;
}

export const useActivityFormSectionStore = create<ActivityFormSectionStore>((set) => ({
  name: "",
  description: "",
  errors: {},
  setName: (name) => set((state) => ({ name, errors: { ...state.errors, name: undefined } })),
  setDescription: (description) => set({ description }),
  setErrors: (errors) => set({ errors }),
}));
