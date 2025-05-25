import { TokenPayload } from "@/features/auth/types/token";
import { camelCaseParser } from "@/utils/camel-case-parser";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserInfoRead } from "../types/user";

interface AuthStore {
  accessToken: string | null;
  userId: string | null;
  roles: string[];
  userInfo: UserInfoRead | null;
  setAccessToken: (accessToken: string) => void;
  clearToken: () => void;
  setUserInfo: (userInfo: UserInfoRead) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      userId: null,
      roles: [],
      userInfo: null,
      setAccessToken: (accessToken) =>
        set(() => {
          let userId: string | null = null;
          let roles: string[] = [];

          try {
            const decoded = camelCaseParser<TokenPayload>(jwtDecode(accessToken));
            userId = decoded.sub;
            roles = decoded.roles;
          } catch (error) {
            return { accessToken: null, userId: null, roles: [] };
          }

          return { accessToken: accessToken, userId, roles };
        }),
      clearToken: () => set({ accessToken: null, userId: null, roles: [] }),
      setUserInfo: (userInfo) => set({ userInfo }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
