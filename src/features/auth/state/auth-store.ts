import { TokenPayload } from "@/features/auth/types/token";
import { camelCaseParser } from "@/utils/camel-case-parser";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  accessToken?: string;
  userId?: string;
  roles: string[];
  setAccessToken: (accessToken: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: undefined,
      userId: undefined,
      roles: [],
      setAccessToken: (accessToken) =>
        set(() => {
          let userId: string | null = null;
          let roles: string[] = [];

          try {
            const decoded = camelCaseParser<TokenPayload>(jwtDecode(accessToken));
            userId = decoded.sub;
            roles = decoded.roles;
          } catch (error) {
            return { accessToken: undefined, userId: undefined, roles: [] };
          }

          return { accessToken: accessToken, userId, roles };
        }),
      clearToken: () => set({ accessToken: undefined, userId: undefined, roles: [] }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
