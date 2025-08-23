"use client";

import { getGroups } from "@/features/group/api/get-groups";
import { GroupFilters } from "@/features/group/types/group";
import { useQuery } from "@tanstack/react-query";

export const useGetGroups = (filters: GroupFilters) => {
  return useQuery({
    queryKey: ["groups", filters],
    queryFn: () => getGroups(filters),
  });
};
