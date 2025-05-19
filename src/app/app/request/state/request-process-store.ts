import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface ActivityField {
  id: string;
  order: number;
  name: string;
  description: string;
  type: string;
  value?: string[];
  options?: string[];
  optional: boolean;
  error: { value?: string };
}

export interface Activity {
  id: string;
  order: number;
  name: string;
  isComplete: boolean;
  fields: ActivityField[];
}

export interface RequestProcessState {
  activities: Activity[];
  setIsCompleteActivity: (activityOrder: number, value: boolean) => void;
  setActivityFieldValue: (activityOrder: number, fieldOrder: number, value: string[]) => void;
  setActivityFieldError: (activityOrder: number, fieldOrder: number, error: string) => void;
}

export const useRequestProcessStore = create(
  immer<RequestProcessState>((set) => ({
    activities: [
      {
        id: "a1",
        order: 1,
        name: "string",
        isComplete: false,
        fields: [],
      },
    ],

    setIsCompleteActivity: (activityOrder, value) =>
      set((state) => {
        const activity = state.activities.find((a) => a.order === activityOrder);
        if (activity) {
          activity.isComplete = value;
        }
      }),

    setActivityFieldValue: (activityOrder, fieldOrder, value) =>
      set((state) => {
        const activity = state.activities.find((a) => a.order === activityOrder);
      }),

    setActivityFieldError: (activityOrder, fieldOrder, error) =>
      set((state) => {
        const activity = state.activities.find((a) => a.order === activityOrder);
      }),
  })),
);
