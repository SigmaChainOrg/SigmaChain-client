import { create } from "zustand";

export interface Activity {
  id: number;
  name: string;
  reviewerGroup: string;
  responsable: string;
}

interface ActivityStore {
  activities: Activity[];
  addActivity: () => void;
  deleteActivity: (id: number) => void;
  setActivityName: (id: number, name: string) => void;
  setActivityReviewerGroup: (id: number, reviewerGroup: string) => void;
  setActivityResponsable: (id: number, responsable: string) => void;
}

export const useActivityStore = create<ActivityStore>((set) => ({
  activities: [
    { id: 0, name: "Actividad inicial", reviewerGroup: "", responsable: "" },
  ],
  addActivity: (): void =>
    set((state) => ({
      activities: [
        ...state.activities,
        {
          id: state.activities.length,
          name: `Actividad ${state.activities.length}`,
          reviewerGroup: "",
          responsable: "",
        },
      ],
    })),
  deleteActivity: (id: number): void =>
    set((state) => ({
      activities: state.activities.filter((activity) => activity.id !== id),
    })),
  setActivityName: (id: number, name: string): void =>
    set((state) => ({
      activities: state.activities.map((activity) =>
        activity.id === id ? { ...activity, name } : activity,
      ),
    })),
  setActivityReviewerGroup: (id: number, reviewerGroup: string): void =>
    set((state) => ({
      activities: state.activities.map((activity) =>
        activity.id === id ? { ...activity, reviewerGroup } : activity,
      ),
    })),
  setActivityResponsable: (id: number, responsable: string): void =>
    set((state) => ({
      activities: state.activities.map((activity) =>
        activity.id === id ? { ...activity, responsable } : activity,
      ),
    })),
}));
