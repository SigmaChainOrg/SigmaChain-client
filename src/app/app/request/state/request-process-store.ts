import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Activity } from "./activityItem";

export interface RequestProcessState {
  activities: Activity[];
  activeTabId: string;
  setActivities: (activities: Activity[]) => void;
  setActiveTabId: (id: string) => void;
  setIsCompleteActivity: (activityId: string, value: boolean) => void;
}

export const useRequestProcessStore = create(
  immer<RequestProcessState>((set) => ({
    activities: [],
    activeTabId: "",
    setActivities: (activities) =>
      set((state) => {
        state.activities = activities;
        if (activities.length > 0) {
          state.activeTabId = activities[0].id;
        }
      }),
    setActiveTabId: (id) =>
      set((state) => {
        state.activeTabId = id;
      }),
    setIsCompleteActivity: (activityId, value) =>
      set((state) => {
        const activity = state.activities.find((a) => a.id === activityId);
        if (activity) {
          activity.isCompleted = value;
        }
      }),
  })),
);
