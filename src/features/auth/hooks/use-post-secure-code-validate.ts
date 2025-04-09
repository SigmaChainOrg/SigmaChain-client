"use client";
import { postSecureCodeValidate } from "@/features/auth/api/post-secure-code-validate";
import { SecureCodeValidate } from "@/features/auth/types/secure-code";
import { TokenRead } from "@/features/auth/types/token";
import { useMutation } from "@tanstack/react-query";

export const usePostSecureCodeValidate = () => {
  return useMutation<TokenRead, Error, SecureCodeValidate>({
    mutationFn: (input: SecureCodeValidate) => postSecureCodeValidate(input),
  });
};
