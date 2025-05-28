"use client";

import { getMe } from "@/features/auth/api/get-me";
import { UserQuery } from "@/features/auth/types/user";
import { useQuery } from "@tanstack/react-query";

export const useGetMe = (query: UserQuery) => {
  return useQuery({
    queryKey: ["me", query],
    queryFn: () => getMe(query),
  });
};
