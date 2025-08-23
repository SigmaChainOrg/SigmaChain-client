"use client";

import { getRequestPatternsId } from "@/features/request-pattern/api/get-request-patterns-id";
import { RequestPatternQuery } from "@/features/request-pattern/types/request-pattern";
import { useQuery } from "@tanstack/react-query";

export const useGetRequestPatternsId = (id: string, query: RequestPatternQuery) => {
  return useQuery({
    queryKey: ["requestPatterns", id, query],
    queryFn: () => getRequestPatternsId(id, query),
  });
};
