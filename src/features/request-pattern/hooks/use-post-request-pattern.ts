"use client";
import { useAuthStore } from "@/features/auth/state/auth-store";
import { postRequestPattern } from "@/features/request-pattern/api/post-request-pattern";
import {
  RequestPatternInput,
  RequestPatternRead,
} from "@/features/request-pattern/types/request-pattern";
import { useMutation } from "@tanstack/react-query";

export const usePostRequestPattern = () => {
  const token = useAuthStore((state) => state.accessToken);
  return useMutation<RequestPatternRead, Error, RequestPatternInput>({
    mutationFn: (input: RequestPatternInput) => postRequestPattern(input, token ? token : ""),
  });
};
