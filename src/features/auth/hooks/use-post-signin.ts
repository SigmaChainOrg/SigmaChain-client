"use client";
import { postSignin } from "@/features/auth/api/post-signin";
import { TokenRead } from "@/features/auth/types/token";
import { useMutation } from "@tanstack/react-query";
import { SecureCodeRead } from "../types/secure-code";
import { SigninInput } from "../types/sign";

export const usePostSignin = () => {
  return useMutation<TokenRead | SecureCodeRead, Error, SigninInput>({
    mutationFn: (input: SigninInput) => postSignin(input),
  });
};
