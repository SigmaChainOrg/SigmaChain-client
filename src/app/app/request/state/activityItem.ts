import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface Activity {
  id: string;
  order: number;
  name: string;
  reviewerGroup: string;
  responsable: string;
  error: { name?: string; reviewerGroup?: string; responsable?: string };
}

type ActivityField = keyof Omit<Activity, "id" | "order" | "error">;

export interface RequestPatternField {
  id: string;
  order: number;
  name: string;
  description: string;
  type: string;
  options?: string[];
  isRequired: boolean;
  uploadFileSize?: number;
  valueType: string;
  value: string[];
  error: { value?: string };
}

export interface RequestPatternState {
  id: string;
  name: string;
  fields: RequestPatternField[];
  activities: Activity[];
  error: { name?: string };
  setName: (name: string) => void;
  setFieldValue: (order: number, value: string[]) => void;
  addActivity: () => void;
  deleteActivity: (id: string) => void;
  setActivityField: (id: string, field: ActivityField, value: string) => void;
  setNameError: (error: string | undefined) => void;
  setFieldError: (order: number, error: RequestPatternField["error"]) => void;
  setActivityError: (order: number, error: Activity["error"]) => void;
}

const fieldsData = [
  {
    id: "f-1",
    order: 0,
    name: "Descripción",
    description:
      "Coloque una descripción de la solicitud. Esta descripción será vista por los revisores y los solicitantes de la solicitud.",
    type: "textarea",
    isRequired: true,
    options: [],
    valueType: "text",
    value: [],
    error: {},
  },
  {
    id: "f-2",
    order: 1,
    name: "Grupo Solicitante",
    description: "Escoja el grupo de usuarios que podrán iniciar una solicitud.",
    type: "combobox",
    options: ["Estudiantes", "Docentes Ingeniería", "Estudiantes postgrado"],
    isRequired: true,
    valueType: "multiple-choice",
    value: [],
    error: {},
  },
];

export const useRequestPatternStore = create(
  immer<RequestPatternState>((set) => ({
    id: "1",

    name: "",

    fields: fieldsData,

    activities: [
      {
        id: Date.now().toString(),
        order: 0,
        name: "",
        reviewerGroup: "",
        responsable: "",
        error: {},
      },
    ],

    error: {},

    setName: (name) =>
      set((state) => {
        state.name = name;
        state.error.name = undefined;
      }),

    setNameError: (error) =>
      set((state) => {
        state.error.name = error;
      }),

    setFieldValue: (order, value) =>
      set((state) => {
        const field = state.fields.find((f) => f.order === order);
        if (field) {
          field.value = value;
          field.error.value = undefined;
        }
      }),

    setFieldError: (order, error) =>
      set((state) => {
        const field = state.fields.find((f) => f.order === order);
        if (field) {
          field.error = error;
        }
      }),

    addActivity: () =>
      set((state) => {
        const newId = Date.now().toString();
        state.activities.push({
          id: newId,
          order: state.activities.length,
          name: "",
          reviewerGroup: "",
          responsable: "",
          error: {},
        });
      }),

    deleteActivity: (id: string) =>
      set((state) => {
        state.activities = state.activities.filter((a) => a.id !== id);
        state.activities.forEach((a, i) => {
          a.order = i;
        });
      }),

    setActivityField: (id: string, field: ActivityField, value: string) =>
      set((state) => {
        const activity = state.activities.find((a) => a.id === id);
        if (activity) {
          activity[field] = value;
          activity.error[field] = undefined;
        }
      }),

    setActivityError: (order, error) =>
      set((state) => {
        const activity = state.activities.find((a) => a.order === order);
        if (activity) {
          activity.error = error;
        }
      }),
  })),
);
