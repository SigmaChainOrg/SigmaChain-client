import { create } from "zustand";

interface SigninStore {
  email: string;
  password: string;
  secureCode: string;
  errors: { email?: string; password?: string; secureCode?: string };
  step: number;
  secureCodeId: string | null;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setSecureCode: (secureCode: string) => void;
  setErrors: (errors: SigninStore["errors"]) => void;
  setStep: (step: number) => void;
  setSecureCodeId: (secureCodeId: string) => void;
}

export const useSigninStore = create<SigninStore>((set) => ({
  email: "",
  password: "",
  secureCode: "",
  errors: {},
  step: 1,
  secureCodeId: null,
  setEmail: (email) =>
    set((state) => ({
      email,
      errors: { ...state.errors, email: undefined },
    })),
  setPassword: (password) =>
    set((state) => ({ password, errors: { ...state.errors, password: undefined } })),
  setSecureCode: (secureCode) =>
    set((state) => ({
      secureCode: secureCode,
      errors: { ...state.errors, secureCode: undefined },
    })),
  setErrors: (errors) => set({ errors }),
  setStep: (step) => set({ step }),
  setSecureCodeId: (secureCodeId) => set({ secureCodeId }),
}));
