"use client";

import { getRequestPatterns } from "@/features/request-pattern/api/get-request-patterns";
import { RequestPatternFilters } from "@/features/request-pattern/types/request-pattern";
import { useQuery } from "@tanstack/react-query";

export const useGetRequestPatterns = (filters: RequestPatternFilters) => {
  return useQuery({
    queryKey: ["requestPatterns", filters],
    queryFn: () => getRequestPatterns(filters),
  });
};
