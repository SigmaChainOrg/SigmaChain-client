import { create } from "zustand";

//short answer
export interface ActivityFormFieldStore {
  name: string;
  description?: string;
  isRequired: boolean;
  options?: string[];
  errors: { name?: string };
  setName: (name: string) => void;
  setDescription: (description: string) => void;
  setIsRequired: (isRequired: boolean) => void;
  setErrors: (errors: ActivityFormFieldStore["errors"]) => void;
}

//single and multiple choice
export interface ActivityFormChoiceStore extends ActivityFormFieldStore {
  options: string[];
  errors: { name?: string; options?: string[] };
  setOptions: (options: string[]) => void;
  setErrors: (errors: ActivityFormFieldStore["errors"]) => void;
}

export interface ActivityFormUploadFilesStore extends ActivityFormFieldStore {
  acceptedFiles: string[];
  maxSize: number;
  errors: { name?: string; acceptedFiles?: string[]; maxSize?: number };
  setAcceptedFiles: (acceptedFiles: string[]) => void;
  setMaxSize: (maxSize: number) => void;
}

export const useActivityFormFieldShortAnswerStore = create<ActivityFormFieldStore>((set) => ({
  name: "",
  description: "",
  isRequired: false,
  errors: {},
  setName: (name) => set({ name }),
  setDescription: (description) => set({ description }),
  setIsRequired: (isRequired) => set({ isRequired }),
  setErrors: (errors) => set({ errors }),
}));

export const useActivityFormFieldChoiceStore = create<ActivityFormChoiceStore>((set) => ({
  name: "",
  description: "",
  isRequired: false,
  options: [],
  errors: {},
  setName: (name) => set((state) => ({ name, errors: { ...state.errors, name: undefined } })),
  setDescription: (description) => set({ description }),
  setIsRequired: (isRequired) => set({ isRequired }),
  setOptions: (options) =>
    set((state) => ({ options, errors: { ...state.errors, options: undefined } })),
  setErrors: (errors) => set({ errors }),
}));

export const useActivityFormUploadFilesStore = create<ActivityFormUploadFilesStore>((set) => ({
  name: "",
  description: "",
  isRequired: false,
  acceptedFiles: [],
  maxSize: 0,
  errors: {},
  setName: (name) => set({ name }),
  setDescription: (description) => set({ description }),
  setIsRequired: (isRequired) => set({ isRequired }),
  setAcceptedFiles: (acceptedFiles) =>
    set((state) => ({ acceptedFiles, errors: { ...state.errors, acceptedFiles: undefined } })),
  setMaxSize: (maxSize) =>
    set((state) => ({ maxSize, errors: { ...state.errors, maxSize: undefined } })),
  setErrors: (errors) => set({ errors }),
}));
