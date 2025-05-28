"use client";

import { patchUserInfo } from "@/features/auth/api/patch-me-user-info";
import { UserInfoUpdate, UserRead } from "@/features/auth/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePatchUserInfo = () => {
  const queryClient = useQueryClient();

  return useMutation<UserRead, Error, UserInfoUpdate>({
    mutationFn: (input) => patchUserInfo(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
