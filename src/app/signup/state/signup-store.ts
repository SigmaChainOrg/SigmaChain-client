import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface SignupState {
  step: number;
  email: string;
  password: string;
  repeatPassword: string;
  secureCode: string;
  firstName: string;
  lastName: string;
  idType: string;
  idNumber: string;
  birthdate: Date;
  error: {
    email?: string;
    password?: string;
    repeatPassword?: string;
    secureCode?: string;
    firstName?: string;
    lastName?: string;
    idType?: string;
    idNumber?: string;
    birthdate?: string;
  };
  setStep: (step: number) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setRepeatPassword: (repeatPassword: string) => void;
  setSecureCode: (secureCode: string) => void;
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setIdType: (idType: string) => void;
  setIdNumber: (idNumber: string) => void;
  setBirthdate: (birthdate: Date) => void;
  setError: (error: SignupState["error"]) => void;
}

export const useSignupStore = create(
  immer<SignupState>((set) => ({
    step: 1,
    email: "",
    password: "",
    repeatPassword: "",
    secureCode: "",
    firstName: "",
    lastName: "",
    idType: "",
    idNumber: "",
    birthdate: new Date(),
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
    setRepeatPassword: (repeatPassword) =>
      set((state) => {
        state.repeatPassword = repeatPassword;
        state.error = { repeatPassword: undefined };
      }),
    setSecureCode: (secureCode) =>
      set((state) => {
        state.secureCode = secureCode;
        state.error = { secureCode: undefined };
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
    setBirthdate: (birthdate) =>
      set((state) => {
        state.birthdate = birthdate;
        state.error = { birthdate: undefined };
      }),
    setError: (error) =>
      set((state) => {
        state.error = error;
      }),
  })),
);
