"use client";

import { postRequestPattern } from "@/features/request-pattern/api/post-request-pattern";
import {
  RequestPatternInput,
  RequestPatternRead,
} from "@/features/request-pattern/types/request-pattern";
import { useMutation } from "@tanstack/react-query";

export const usePostRequestPattern = () => {
  return useMutation<RequestPatternRead, Error, RequestPatternInput>({
    mutationFn: (input: RequestPatternInput) => postRequestPattern(input),
  });
};
