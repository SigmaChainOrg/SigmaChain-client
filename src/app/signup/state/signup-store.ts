import { IdType } from "@/features/auth/types/user";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface SignupState {
  step: number;
  email: string;
  password: string;
  confirmPassword: string;
  secureCode: string;
  secureCodeId?: string | null;
  firstName: string;
  lastName: string;
  idType?: IdType;
  idNumber: string;
  birthDate: Date;
  error: {
    email?: string;
    password?: string;
    confirmPassword?: string;
    secureCode?: string;
    firstName?: string;
    lastName?: string;
    idType?: string;
    idNumber?: string;
    birthDate?: string;
  };
  setStep: (step: number) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setSecureCode: (secureCode: string) => void;
  setSecureCodeId: (secureCodeId: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setIdType: (idType: IdType) => void;
  setIdNumber: (idNumber: string) => void;
  setBirthDate: (birthDate: Date) => void;
  setError: (error: SignupState["error"]) => void;
}

export const useSignupStore = create(
  immer<SignupState>((set) => ({
    step: 1,
    email: "",
    password: "",
    confirmPassword: "",
    secureCode: "",
    firstName: "",
    lastName: "",
    idType: undefined,
    idNumber: "",
    birthDate: new Date(),
    error: {},

    setStep: (step) =>
      set((state) => {
        state.step = step;
      }),
    setEmail: (email) =>
      set((state) => {
        state.email = email;
        state.error = { email: undefined };
      }),
    setPassword: (password) =>
      set((state) => {
        state.password = password;
        state.error = { password: undefined };
      }),
    setConfirmPassword: (confirmPassword) =>
      set((state) => {
        state.confirmPassword = confirmPassword;
        state.error = { confirmPassword: undefined };
      }),
    setSecureCode: (secureCode) =>
      set((state) => {
        state.secureCode = secureCode;
        state.error = { secureCode: undefined };
      }),
    setSecureCodeId: (secureCodeId) =>
      set((state) => {
        state.secureCodeId = secureCodeId;
      }),
    setFirstName: (firstName) =>
      set((state) => {
        state.firstName = firstName;
        state.error = { firstName: undefined };
      }),
    setLastName: (lastName) =>
      set((state) => {
        state.lastName = lastName;
        state.error = { lastName: undefined };
      }),
    setIdType: (idType) =>
      set((state) => {
        state.idType = idType;
        state.error = { idType: undefined };
      }),
    setIdNumber: (idNumber) =>
      set((state) => {
        state.idNumber = idNumber;
        state.error = { idNumber: undefined };
      }),
    setBirthDate: (birthDate) =>
      set((state) => {
        state.birthDate = birthDate;
        state.error = { birthDate: undefined };
      }),
    setError: (error) =>
      set((state) => {
        state.error = error;
      }),
  })),
);
