import { create } from "zustand";

export interface Activity {
  id: number;
  name: string;
}

interface ActivityStore {
  activities: Activity[];
  addActivity: () => void;
  deleteActivity: (id: number) => void;
}

export const useActivityStore = create<ActivityStore>((set) => ({
  activities: [{ id: 0, name: "Actividad inicial" }],
  addActivity: (): void =>
    set((state) => ({
      activities: [
        ...state.activities,
        {
          id: state.activities.length,
          name: `Actividad ${state.activities.length}`,
        },
      ],
    })),
  deleteActivity: (id: number): void =>
    set((state) => ({
      activities: state.activities.filter((activity) => activity.id !== id),
    })),
}));
