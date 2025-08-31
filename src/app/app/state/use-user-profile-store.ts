import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface UserState {
  userProfile: "manager" | "reviewer" | "requester";
  setUserProfile: (profile: "manager" | "reviewer" | "requester") => void;
}

export const useUserProfileStore = create<UserState>()(
  immer((set) => ({
    userProfile: "manager",
    setUserProfile: (profile) =>
      set((state) => {
        state.userProfile = profile;
      }),
  })),
);
