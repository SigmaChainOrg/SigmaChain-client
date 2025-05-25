"use client";
import { patchUserInfo } from "@/features/auth/api/patch-me-user-info";
import { UserInfoUpdate, UserRead } from "@/features/auth/types/user";
import { useMutation } from "@tanstack/react-query";

export const usePatchUserInfo = () => {
  return useMutation<UserRead, Error, UserInfoUpdate>({
    mutationFn: (input: UserInfoUpdate) => patchUserInfo(input),
  });
};
