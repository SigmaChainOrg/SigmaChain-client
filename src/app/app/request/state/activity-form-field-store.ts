import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface Field {
  id: string;
  order: number;
  prevOrder: number | undefined;
  name: string;
  type: string;
  description?: string;
  isRequired: boolean;
  options: string[];
  uploadFileSize?: number;
  error: {
    name?: string;
    description?: string;
    options?: string;
    uploadFileSize?: string;
  };
}

export interface Section {
  id: string;
  order: number;
  prevOrder: number | undefined;
  name: string;
  description?: string;
  fields: Field[];
  error: { name?: string; description?: string };
}

export interface ActivityFormState {
  sections: Section[];

  addSection: (prevOrder: number) => void;
  deleteSection: (sectionOrder: number) => void;
  setSectionError: (sectionOrder: number, errors: Section["error"]) => void;
  setSectionFieldValue: (
    sectionOrder: number,
    field: keyof Section["error"],
    value: string,
  ) => void;

  addField: (sectionOrder: number, fieldPrevOrder: number) => void;
  deleteField: (sectionOrder: number, fieldOrder: number) => void;
  setFieldError: (sectionOrder: number, fieldOrder: number, error: Field["error"]) => void;
  clearField: (sectionOrder: number, fieldOrder: number) => void;
  setFieldValue: (
    sectionOrder: number,
    fieldOrder: number,
    key: "name" | "description" | "type" | "isRequired" | "options" | "uploadFileSize",
    value: number | string | string[],
  ) => void;
}

export const useActivityFormStore = create(
  immer<ActivityFormState>((set) => ({
    sections: [
      {
        id: "s1",
        order: 0,
        prevOrder: undefined,
        name: "",
        description: "",
        fields: [
          {
            id: `f-${Date.now()}`,
            order: 0,
            prevOrder: NaN,
            name: "",
            type: "short-answer",
            isRequired: false,
            options: [],
            uploadFileSize: 0,
            error: {},
          },
        ],
        error: {},
      },
    ],

    addSection: (prevOrder) =>
      set((state) => {
        const newSection = {
          id: "s1",
          order: prevOrder + 1,
          prevOrder: prevOrder,
          name: "",
          description: "",
          fields: [
            {
              id: `f-${Date.now()}`,
              order: 0,
              prevOrder: undefined,
              name: "",
              type: "short-answer",
              isRequired: false,
              options: [],
              uploadFileSize: 0,
              error: {},
            },
          ],
          error: {},
        };
        state.sections.splice(newSection.order, 0, newSection);
        state.sections.forEach((section, idx) => {
          section.order = idx;
          section.prevOrder = idx > 0 ? idx - 1 : undefined;
        });
      }),

    deleteSection: (order) =>
      set((state) => {
        if (state.sections.length <= 1) return;
        state.sections = state.sections.filter((section) => section.order !== order);
        state.sections.forEach((section, index) => {
          section.order = index;
        });
      }),

    setSectionError: (sectionOrder, errors) =>
      set((state) => {
        const section = state.sections.find((s) => s.order === sectionOrder);
        if (section) {
          section.error = errors;
        }
      }),

    addField: (sectionOrder, fieldPrevOrder) =>
      set((state) => {
        const section = state.sections.find((s) => s.order === sectionOrder);
        if (section) {
          const field = {
            id: `f-${Date.now()}`,
            order: fieldPrevOrder + 1,
            prevOrder: fieldPrevOrder,
            name: "",
            type: "short-answer",
            isRequired: false,
            options: [],
            uploadFileSize: 0,
            error: {},
          };
          section.fields.splice(field.order, 0, field);
          section.fields.forEach((field, idx) => {
            field.order = idx;
            field.prevOrder = idx > 0 ? idx - 1 : undefined;
          });
        }
      }),

    deleteField: (sectionOrder, fieldOrder) =>
      set((state) => {
        const section = state.sections.find((s) => s.order === sectionOrder);
        if (section && section.fields.length > 1) {
          section.fields = section.fields.filter((f) => f.order !== fieldOrder);
          section.fields.forEach((f, i) => {
            f.order = i;
          });
        }
      }),

    clearField: (sectionOrder: number, fieldOrder: number) =>
      set((state) => {
        const section = state.sections.find((s) => s.order === sectionOrder);
        if (section) {
          const f = section.fields.find((f) => f.order === fieldOrder);
          if (f) {
            f.options = [];
            f.uploadFileSize = 0;
            f.error = {};
          }
        }
      }),

    setFieldError: (sectionOrder, fieldOrder, errors) =>
      set((state) => {
        const section = state.sections.find((s) => s.order === sectionOrder);
        if (section) {
          const f = section.fields.find((f) => f.order === fieldOrder);
          if (f) f.error = errors;
        }
      }),

    setSectionFieldValue: (sectionOrder, field, value) =>
      set((state) => {
        const section = state.sections.find((s) => s.order === sectionOrder);
        if (section) {
          (section as any)[field] = value;
          section.error[field] = undefined;
        }
      }),

    setFieldValue: (sectionOrder, fieldOrder, key, value) =>
      set((state) => {
        const section = state.sections.find((s) => s.order === sectionOrder);
        const field = section?.fields.find((f) => f.order === fieldOrder);
        if (field) {
          (field as any)[key] = value;
          if (key !== "isRequired" && key !== "type") field.error[key] = undefined;
        }
      }),
  })),
);
