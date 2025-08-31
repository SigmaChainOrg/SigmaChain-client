import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface ActivityItem {
  id: string;
  name: string;
  isCompleted: boolean;
}

export interface RequestProcessState {
  activities: ActivityItem[];
  activeTab: string;
  setActivities: (activities: ActivityItem[]) => void;
  setActiveTab: (id: string) => void;
  setIsCompleteActivity: (activityId: string, value: boolean) => void;
}

export const useRequestProcessStore = create(
  immer<RequestProcessState>((set) => ({
    activities: [],
    activeTab: "",
    setActivities: (activities) =>
      set((state) => {
        state.activities = activities;
        if (activities.length > 0) {
          state.activeTab = activities[0].id;
        }
      }),
    setActiveTab: (id) =>
      set((state) => {
        state.activeTab = id;
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
