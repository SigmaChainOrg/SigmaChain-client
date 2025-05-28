"use client";

import { postSignup } from "@/features/auth/api/post-signup";
import { useMutation } from "@tanstack/react-query";
import { SecureCodeRead } from "../types/secure-code";
import { SignupInput } from "../types/sign";

export const usePostSignup = () => {
  return useMutation<SecureCodeRead, Error, SignupInput>({
    mutationFn: (input: SignupInput) => postSignup(input),
  });
};
